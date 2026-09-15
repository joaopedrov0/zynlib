-- Inserir Disciplina inicial
INSERT INTO public.disciplines (id, name, slug, description)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Ciência da Computação',
    'ciencia-da-computacao',
    'Estudo dos fundamentos teóricos da computação, algoritmos, arquiteturas e sistemas de software.'
) ON CONFLICT (slug) DO NOTHING;

-- Inserir Assuntos iniciais
INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Estruturas de Dados',
    'estruturas-de-dados',
    'Organizações fundamentais de dados em memória para acesso e manipulação eficientes.',
    1
) ON CONFLICT (discipline_id, slug) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES (
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'Banco de Dados',
    'banco-de-dados',
    'Modelagem relacional, álgebra relacional, SQL e sistemas de gerenciamento de dados.',
    2
) ON CONFLICT (discipline_id, slug) DO NOTHING;

-- Inserir Tópicos iniciais
INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'Árvores Binárias de Busca',
    'arvores-binarias-de-busca',
    'Árvores binárias onde os nós à esquerda são estritamente menores e à direita são maiores.',
    1
) ON CONFLICT (subject_id, slug) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES (
    'c0000000-0000-0000-0000-000000000002',
    'b0000000-0000-0000-0000-000000000001',
    'Grafos e Algoritmos de Busca',
    'grafos-e-algoritmos-de-busca',
    'Representação por matriz/lista de adjacência, BFS (largura) e DFS (profundidade).',
    2
) ON CONFLICT (subject_id, slug) DO NOTHING;
