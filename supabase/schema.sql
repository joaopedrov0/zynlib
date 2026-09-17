-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. TABELA PROFILES (Público, espelha auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'writer' CHECK (role IN ('admin', 'writer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Trigger para criar perfil automaticamente no primeiro login (Google ou Email)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Usuário'),
        NEW.raw_user_meta_data->>'avatar_url',
        'writer'
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. TABELA DISCIPLINES
CREATE TABLE IF NOT EXISTS public.disciplines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. TABELA SUBJECTS
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discipline_id UUID NOT NULL REFERENCES public.disciplines(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT unique_discipline_subject_slug UNIQUE (discipline_id, slug)
);

-- 5. TABELA TOPICS
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT unique_subject_topic_slug UNIQUE (subject_id, slug)
);

-- 6. TABELA MATERIALS (1:1 com topics)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID UNIQUE NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    current_revision_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. TABELA MATERIAL_REVISIONS
CREATE TABLE IF NOT EXISTS public.material_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id),
    revision_number INT NOT NULL,
    content_markdown TEXT NOT NULL,
    change_summary TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT unique_material_revision_number UNIQUE (material_id, revision_number)
);

-- FK de current_revision_id em materials
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_materials_current_revision'
    ) THEN
        ALTER TABLE public.materials
            ADD CONSTRAINT fk_materials_current_revision
            FOREIGN KEY (current_revision_id)
            REFERENCES public.material_revisions(id)
            ON DELETE SET NULL;
    END IF;
END $$;

-- 8. ÍNDICES DE PERFORMANCE E BUSCA
-- Índices trigram (GIN) para aceleração de buscas textuais com ILIKE
CREATE INDEX IF NOT EXISTS idx_disciplines_name_trgm ON public.disciplines USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_subjects_name_trgm ON public.subjects USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_topics_name_trgm ON public.topics USING gin (name gin_trgm_ops);

-- Índices de chaves estrangeiras e ordenação frequente
CREATE INDEX IF NOT EXISTS idx_subjects_discipline_id ON public.subjects(discipline_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject_id ON public.topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_materials_topic_id ON public.materials(topic_id);
CREATE INDEX IF NOT EXISTS idx_material_revisions_material_id ON public.material_revisions(material_id);
CREATE INDEX IF NOT EXISTS idx_material_revisions_created_at ON public.material_revisions(created_at DESC);

-- 9. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_revisions ENABLE ROW LEVEL SECURITY;

-- Limpeza de políticas existentes antes de recriar
DROP POLICY IF EXISTS "Leitura pública de perfis" ON public.profiles;
DROP POLICY IF EXISTS "Leitura pública de disciplinas" ON public.disciplines;
DROP POLICY IF EXISTS "Leitura pública de assuntos" ON public.subjects;
DROP POLICY IF EXISTS "Leitura pública de tópicos" ON public.topics;
DROP POLICY IF EXISTS "Leitura pública de materiais" ON public.materials;
DROP POLICY IF EXISTS "Leitura pública de revisões" ON public.material_revisions;

DROP POLICY IF EXISTS "Usuário pode atualizar o próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Escritores/Admins podem criar disciplinas" ON public.disciplines;
DROP POLICY IF EXISTS "Escritores/Admins podem gerenciar assuntos" ON public.subjects;
DROP POLICY IF EXISTS "Escritores/Admins podem gerenciar tópicos" ON public.topics;
DROP POLICY IF EXISTS "Escritores/Admins podem gerenciar materiais" ON public.materials;
DROP POLICY IF EXISTS "Escritores/Admins podem criar revisões" ON public.material_revisions;

-- REGRAS DE LEITURA PÚBLICA
CREATE POLICY "Leitura pública de perfis" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Leitura pública de disciplinas" ON public.disciplines FOR SELECT USING (true);
CREATE POLICY "Leitura pública de assuntos" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Leitura pública de tópicos" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Leitura pública de materiais" ON public.materials FOR SELECT USING (true);
CREATE POLICY "Leitura pública de revisões" ON public.material_revisions FOR SELECT USING (true);

-- REGRAS DE ESCRITA
CREATE POLICY "Usuário pode atualizar o próprio perfil" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Escritores/Admins podem criar disciplinas" ON public.disciplines
    FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'writer'))
    );

CREATE POLICY "Escritores/Admins podem gerenciar assuntos" ON public.subjects
    FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'writer'))
    );

CREATE POLICY "Escritores/Admins podem gerenciar tópicos" ON public.topics
    FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'writer'))
    );

CREATE POLICY "Escritores/Admins podem gerenciar materiais" ON public.materials
    FOR ALL TO authenticated USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'writer'))
    );

CREATE POLICY "Escritores/Admins podem criar revisões" ON public.material_revisions
    FOR INSERT TO authenticated WITH CHECK (
        author_id = auth.uid() AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'writer'))
    );
