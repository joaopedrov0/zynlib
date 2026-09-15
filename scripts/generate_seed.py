import zipfile
import xml.etree.ElementTree as ET
import os
import re
import unicodedata
import uuid

def slugify(text: str) -> str:
    normalized = unicodedata.normalize('NFD', text)
    without_accents = ''.join(c for c in normalized if unicodedata.category(c) != 'Mn')
    cleaned = re.sub(r'[^a-zA-Z0-9]+', '-', without_accents).lower().strip('-')
    return cleaned or 'item'

def clean_sql_str(val: str) -> str:
    return val.replace("'", "''").strip()

def main():
    folder = r'C:\root_lab\zynlib\estrutura-conhecimento'
    output_path = r'C:\root_lab\zynlib\supabase\seed_knowledge.sql'
    namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

    discipline_mapping = {
        'Conteúdos Biologia.docx': ('Biologia', 'Estudo da vida, dos organismos vivos, de suas estruturas, funções, evolução e interações com o meio ambiente.'),
        'Conteúdos Filosofia.docx': ('Filosofia', 'Reflexão crítica sobre questões fundamentais da existência, conhecimento, valores, razão, mente e linguagem.'),
        'Conteúdos Física.docx': ('Física', 'Ciência natural que estuda a matéria, seu movimento e comportamento no espaço e no tempo, juntamente com energia e forças.'),
        'Conteúdos Geografia.docx': ('Geografia', 'Estudo do espaço geográfico, suas dinâmicas físicas e socioeconômicas, relevo, clima e ocupação humana.'),
        'Conteúdos História.docx': ('História', 'Análise crítica dos processos sociais, políticos, econômicos e culturais das civilizações humanas ao longo do tempo.'),
        'Conteúdos Língua Portugues.docx': ('Língua Portuguesa', 'Estudo da linguagem, interpretação textual, gêneros, gramática aplicada, semântica e comunicação.'),
        'Conteúdos Matemática.docx': ('Matemática', 'Ciência do raciocínio lógico, padrões, números, estruturas, formas geométricas, álgebra e análise de dados.'),
        'Conteúdos Sociologia.docx': ('Sociologia', 'Investigação científica das relações sociais, instituições, cultura, estruturas de poder e transformações da sociedade.')
    }

    sql_statements = [
        "-- Seed completo de disciplinas, assuntos, tópicos e materiais 1:1 a partir dos documentos",
        "BEGIN;"
    ]

    for filename, (disc_name, disc_desc) in sorted(discipline_mapping.items()):
        disc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"zynlib.discipline.{disc_name}"))
        disc_slug = slugify(disc_name)

        sql_statements.append(f"""
INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('{disc_id}', '{clean_sql_str(disc_name)}', '{disc_slug}', '{clean_sql_str(disc_desc)}')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;
""".strip())

        path = os.path.join(folder, filename)
        with zipfile.ZipFile(path) as z:
            tree = ET.fromstring(z.read('word/document.xml'))
            paras = []
            for p in tree.findall('.//w:p', namespaces):
                text = ''.join(node.text for node in p.findall('.//w:t', namespaces) if node.text).strip()
                if text:
                    paras.append(text)

        subjects = []
        current_subject = None
        is_portugues = 'Língua Portugues' in filename

        for p in paras:
            m_x = re.match(r'^(\d+)\.\s+([^\d].*)$', p)
            m_xy = re.match(r'^(\d+\.\d+)\s+(.*)$', p)

            if m_x:
                current_subject = {
                    'name': m_x.group(2).strip(),
                    'order': int(m_x.group(1)),
                    'topics': []
                }
                subjects.append(current_subject)
            elif m_xy:
                if current_subject is not None:
                    current_subject['topics'].append(m_xy.group(2).strip())
            elif is_portugues and current_subject is not None:
                if not p.startswith('LÍNGUA') and not p.startswith('Conteúdos'):
                    current_subject['topics'].append(p.strip())

        used_subject_slugs = set()

        for s_idx, subj in enumerate(subjects, start=1):
            base_s_slug = slugify(subj['name'])
            s_slug = base_s_slug
            counter = 2
            while s_slug in used_subject_slugs:
                s_slug = f"{base_s_slug}-{counter}"
                counter += 1
            used_subject_slugs.add(s_slug)

            subj_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"zynlib.subject.{disc_name}.{subj['name']}.{s_idx}"))
            sql_statements.append(f"""
INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('{subj_id}', '{disc_id}', '{clean_sql_str(subj['name'])}', '{s_slug}', NULL, {subj['order']})
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;
""".strip())

            used_topic_slugs = set()
            for t_idx, top_name in enumerate(subj['topics'], start=1):
                base_t_slug = slugify(top_name)
                t_slug = base_t_slug
                t_counter = 2
                while t_slug in used_topic_slugs:
                    t_slug = f"{base_t_slug}-{t_counter}"
                    t_counter += 1
                used_topic_slugs.add(t_slug)

                topic_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"zynlib.topic.{disc_name}.{subj['name']}.{top_name}.{t_idx}"))
                material_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"zynlib.material.{topic_id}"))

                sql_statements.append(f"""
INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('{topic_id}', '{subj_id}', '{clean_sql_str(top_name)}', '{t_slug}', NULL, {t_idx})
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('{material_id}', '{topic_id}')
ON CONFLICT (topic_id) DO NOTHING;
""".strip())

    sql_statements.append("COMMIT;")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(sql_statements))

    print(f"Sucesso! Gerado {output_path} com {len(sql_statements)} blocos SQL.")

if __name__ == '__main__':
    main()
