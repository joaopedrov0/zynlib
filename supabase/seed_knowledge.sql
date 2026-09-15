-- Seed completo de disciplinas, assuntos, tópicos e materiais 1:1 a partir dos documentos

BEGIN;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Biologia', 'biologia', 'Estudo da vida, dos organismos vivos, de suas estruturas, funções, evolução e interações com o meio ambiente.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('91db1976-5685-5098-abe1-2412bebbd49e', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Ecologia e Ciências Ambientais', 'ecologia-e-ciencias-ambientais', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('63d7d2c0-3a84-5cc3-ab24-31d3ac0d4411', '91db1976-5685-5098-abe1-2412bebbd49e', 'Conceitos Fundamentais', 'conceitos-fundamentais', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('19668957-b345-5d89-b1fe-dca5a9afc72d', '63d7d2c0-3a84-5cc3-ab24-31d3ac0d4411')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('147ec3d1-f020-5614-9a9e-2b8003efd54f', '91db1976-5685-5098-abe1-2412bebbd49e', 'Cadeias e Teias Alimentares', 'cadeias-e-teias-alimentares', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ef382eb1-af82-54c2-9fd8-bbe981614a5e', '147ec3d1-f020-5614-9a9e-2b8003efd54f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5af7f4ab-bcf5-5f2c-87d9-26b856b8c8bd', '91db1976-5685-5098-abe1-2412bebbd49e', 'Ciclos Biogeoquímicos', 'ciclos-biogeoquimicos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bef11002-4681-5a24-8c29-252f161f6ae7', '5af7f4ab-bcf5-5f2c-87d9-26b856b8c8bd')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('81bcefd3-2543-586c-bd2c-9975ea35f7e4', '91db1976-5685-5098-abe1-2412bebbd49e', 'Relações Ecológicas', 'relacoes-ecologicas', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1eab13ed-0c20-5c52-95ad-dc6f67aa1484', '81bcefd3-2543-586c-bd2c-9975ea35f7e4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1d07dfee-9020-524e-a04a-2fe49f4e1f62', '91db1976-5685-5098-abe1-2412bebbd49e', 'Dinâmica de Populações', 'dinamica-de-populacoes', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ec6c721e-cc7d-57f3-b639-25ac1e131c6d', '1d07dfee-9020-524e-a04a-2fe49f4e1f62')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('0c0d3eeb-2d2e-5364-a104-ee585fd236bc', '91db1976-5685-5098-abe1-2412bebbd49e', 'Sucessão Ecológica', 'sucessao-ecologica', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('35a066d2-d332-5ccb-a71b-5116886a499d', '0c0d3eeb-2d2e-5364-a104-ee585fd236bc')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fc759091-4411-50fa-aed6-66d2560820a0', '91db1976-5685-5098-abe1-2412bebbd49e', 'Biomas', 'biomas', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bde03c9b-54db-5cd0-a49f-780db63c1b2c', 'fc759091-4411-50fa-aed6-66d2560820a0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5e4666ab-381d-5578-8468-93318e7cf3a0', '91db1976-5685-5098-abe1-2412bebbd49e', 'Desequilíbrios Ambientais', 'desequilibrios-ambientais', NULL, 8)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9fad4a51-e6c6-556e-b644-6dad2ba444dd', '5e4666ab-381d-5578-8468-93318e7cf3a0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('fa901321-d029-550f-ab4d-619b14099684', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Bioquímica Celular e Nutrição', 'bioquimica-celular-e-nutricao', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('961cb4a2-ae2c-54a3-b0ec-c18ca3dd16fe', 'fa901321-d029-550f-ab4d-619b14099684', 'Compostos Orgânicos - Biomoléculas', 'compostos-organicos-biomoleculas', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ae5b06c3-933e-5765-953b-47dbefdf1ec0', '961cb4a2-ae2c-54a3-b0ec-c18ca3dd16fe')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('1f629179-929c-50af-8a5f-26617a6bc56c', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Citologia (Biologia Celular)', 'citologia-biologia-celular', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('357cd479-bdc5-5961-96a1-4071c7e2074b', '1f629179-929c-50af-8a5f-26617a6bc56c', 'Envoltórios Celulares', 'envoltorios-celulares', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bcf6ab5e-7540-57d3-8c8a-46e0c295cbbc', '357cd479-bdc5-5961-96a1-4071c7e2074b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fee8248d-f3b3-590b-a6d4-7b3c38f01381', '1f629179-929c-50af-8a5f-26617a6bc56c', 'Citoplasma e Organelas', 'citoplasma-e-organelas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ede49de3-cb19-54af-8cb3-b5b35fe556af', 'fee8248d-f3b3-590b-a6d4-7b3c38f01381')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('632f6677-ea74-5ca3-8cc0-90fdaa9a0474', '1f629179-929c-50af-8a5f-26617a6bc56c', 'Metabolismo Energético', 'metabolismo-energetico', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ba53cf43-3d8d-56f6-b782-0e991f1b6d44', '632f6677-ea74-5ca3-8cc0-90fdaa9a0474')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e3fd812c-feef-508f-bc4f-cc60aff50e4a', '1f629179-929c-50af-8a5f-26617a6bc56c', 'Núcleo Celular e Divisão Celular', 'nucleo-celular-e-divisao-celular', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('348f185b-3828-50cc-a611-a379ff129784', 'e3fd812c-feef-508f-bc4f-cc60aff50e4a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('8e19781e-7c77-55d2-b563-f80f0cfc9892', '1f629179-929c-50af-8a5f-26617a6bc56c', 'Síntese Proteica', 'sintese-proteica', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6b3d9d6e-63fd-5b08-beb2-b5465fb89989', '8e19781e-7c77-55d2-b563-f80f0cfc9892')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('e8b0a36b-83de-5951-99b0-3d842d79c843', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Genética e Biotecnologia', 'genetica-e-biotecnologia', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('117bcd65-c8b4-584f-8f2c-b5adc403f647', 'e8b0a36b-83de-5951-99b0-3d842d79c843', 'Conceitos Básicos', 'conceitos-basicos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4a0178c6-4e82-5d5b-b91e-f1d8fe429dcd', '117bcd65-c8b4-584f-8f2c-b5adc403f647')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5e2bdc3f-6906-5b92-9a2e-375adfdf3bf5', 'e8b0a36b-83de-5951-99b0-3d842d79c843', 'Leis de Mendel', 'leis-de-mendel', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c1e74f1d-5e2f-5641-8fbf-683f98605820', '5e2bdc3f-6906-5b92-9a2e-375adfdf3bf5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3c38f12a-02bf-56a9-9c1b-79f5891cb340', 'e8b0a36b-83de-5951-99b0-3d842d79c843', 'Polialelia e Grupos Sanguíneos', 'polialelia-e-grupos-sanguineos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1f2b3fbb-860f-5e81-9865-0baa5b0012af', '3c38f12a-02bf-56a9-9c1b-79f5891cb340')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d01aac25-feb8-5e0a-be61-44bf35d8bd3c', 'e8b0a36b-83de-5951-99b0-3d842d79c843', 'Interação Gênica e Genética do Sexo', 'interacao-genica-e-genetica-do-sexo', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6f2e9498-0061-5638-a09f-c3aac69515cb', 'd01aac25-feb8-5e0a-be61-44bf35d8bd3c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('300ffb07-45b3-50cb-b949-6314f7a06f0c', 'e8b0a36b-83de-5951-99b0-3d842d79c843', 'Mutações e Biotecnologia', 'mutacoes-e-biotecnologia', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1ad3c12b-755e-552e-bca8-8d8df3c39cc5', '300ffb07-45b3-50cb-b949-6314f7a06f0c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4dbe7e00-f8f9-5056-817b-1e8d9ed3bc87', 'e8b0a36b-83de-5951-99b0-3d842d79c843', 'Bioética', 'bioetica', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('acfa4194-b679-5272-84f7-6641ac60635b', '4dbe7e00-f8f9-5056-817b-1e8d9ed3bc87')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('7ec89269-7327-5343-8d00-e06b0acec975', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Evolução', 'evolucao', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('726570b9-952a-59d9-b00f-c96251a727df', '7ec89269-7327-5343-8d00-e06b0acec975', 'Origem da Vida', 'origem-da-vida', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('30e690b9-14e1-5f80-8111-522c80c4e537', '726570b9-952a-59d9-b00f-c96251a727df')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4dc3e419-1782-5809-baf4-c5cf5f953cfd', '7ec89269-7327-5343-8d00-e06b0acec975', 'Teorias Evolutivas', 'teorias-evolutivas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4acdcb60-c4f6-588c-a2bf-76798c92676b', '4dc3e419-1782-5809-baf4-c5cf5f953cfd')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('89dc070a-f74e-582c-896a-4c0e40062157', '7ec89269-7327-5343-8d00-e06b0acec975', 'Evidências da Evolução', 'evidencias-da-evolucao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c5498199-588c-5e3b-9dbd-e92b0a537579', '89dc070a-f74e-582c-896a-4c0e40062157')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fb18fd81-4607-5771-9dec-1b3f0f2c0248', '7ec89269-7327-5343-8d00-e06b0acec975', 'Especiação e Genética de Populações', 'especiacao-e-genetica-de-populacoes', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('461982a2-d9ec-5f4f-98f0-353fa4828a30', 'fb18fd81-4607-5771-9dec-1b3f0f2c0248')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('a3447dbc-db11-5af7-bac2-4aee0e43c811', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Fisiologia Humana e Anatomia', 'fisiologia-humana-e-anatomia', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('20c76b8e-96b7-552a-b7ed-65fc63b038be', 'a3447dbc-db11-5af7-bac2-4aee0e43c811', 'Histologia Animal', 'histologia-animal', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f6c5f846-4d53-5281-998f-44decab116b5', '20c76b8e-96b7-552a-b7ed-65fc63b038be')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e0ef1d58-702d-557b-859f-151b537916e0', 'a3447dbc-db11-5af7-bac2-4aee0e43c811', 'Sistema Esquelético e Muscular', 'sistema-esqueletico-e-muscular', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('e0ce2b40-1527-5934-ab4f-e53d839d7283', 'e0ef1d58-702d-557b-859f-151b537916e0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3adf838f-a568-5c42-bbd0-200028f21427', 'a3447dbc-db11-5af7-bac2-4aee0e43c811', 'Sistemas Digestório e Respiratório', 'sistemas-digestorio-e-respiratorio', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('43bbc8a1-1243-5f44-a594-eda81729090f', '3adf838f-a568-5c42-bbd0-200028f21427')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f1ea3530-5dbb-559f-b9a0-7630a2d733d8', 'a3447dbc-db11-5af7-bac2-4aee0e43c811', 'Sistemas Cardiovascular e Excretor', 'sistemas-cardiovascular-e-excretor', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c590419b-6e95-50b4-b354-166e7de9ba9f', 'f1ea3530-5dbb-559f-b9a0-7630a2d733d8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c08d2840-6794-56e0-b158-97421d7d94e6', 'a3447dbc-db11-5af7-bac2-4aee0e43c811', 'Sistemas Endócrino e Nervoso', 'sistemas-endocrino-e-nervoso', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5d925470-f601-5539-8f67-d9fdf649d695', 'c08d2840-6794-56e0-b158-97421d7d94e6')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d2e59297-a15e-5b30-8ce3-cb6baf742395', 'a3447dbc-db11-5af7-bac2-4aee0e43c811', 'Sistemas Imunológico e Reprodutor', 'sistemas-imunologico-e-reprodutor', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9cc584de-879c-556e-b636-48906b2447a9', 'd2e59297-a15e-5b30-8ce3-cb6baf742395')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('4c0a7a52-fd0e-52ad-abf8-51091e50e2f0', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Microbiologia, Parasitologia e Programas de Saúde', 'microbiologia-parasitologia-e-programas-de-saude', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('686a830b-12c9-5146-9853-15af5b7961ce', '4c0a7a52-fd0e-52ad-abf8-51091e50e2f0', 'Vírus', 'virus', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7f438566-52ef-57cd-a5be-3034cb7ddb52', '686a830b-12c9-5146-9853-15af5b7961ce')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('779b153f-14eb-5fd1-967d-77563472e91e', '4c0a7a52-fd0e-52ad-abf8-51091e50e2f0', 'Bactérias', 'bacterias', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f65c5231-6f80-5cda-9e2a-0e6c3a6e8e7a', '779b153f-14eb-5fd1-967d-77563472e91e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b6c93052-d761-5171-86d6-e456892442b4', '4c0a7a52-fd0e-52ad-abf8-51091e50e2f0', 'Protozoários e Verminoses', 'protozoarios-e-verminoses', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9990a8cb-694d-5041-8e7a-2c63dfc81f2f', 'b6c93052-d761-5171-86d6-e456892442b4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('88d4aad1-4bf0-5450-ae1c-98a092c96ee4', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Botânica', 'botanica', NULL, 8)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('2d7b7889-cf35-5d36-bd3c-536dc022d48b', '88d4aad1-4bf0-5450-ae1c-98a092c96ee4', 'Grupos Vegetais', 'grupos-vegetais', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0adbc062-5cb5-5b6f-8456-9c6bceb2b816', '2d7b7889-cf35-5d36-bd3c-536dc022d48b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d54700ee-b3e9-5d3e-b047-689f7656a98b', '88d4aad1-4bf0-5450-ae1c-98a092c96ee4', 'Fisiologia e Histologia Vegetal', 'fisiologia-e-histologia-vegetal', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('17e6b03f-e6d5-524a-bb3f-62914fc0af6e', 'd54700ee-b3e9-5d3e-b047-689f7656a98b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('e8f6b96f-cbdb-5675-ae44-cafc2004f950', 'ab02bad6-78fa-5c4e-a491-cc828a22da28', 'Zoologia', 'zoologia', NULL, 9)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('520c1d15-4959-5ddb-8fa2-2b1a77f93f58', 'e8f6b96f-cbdb-5675-ae44-cafc2004f950', 'Invertebrados', 'invertebrados', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ed113a21-7802-5f00-a474-a9fd88dbbf38', '520c1d15-4959-5ddb-8fa2-2b1a77f93f58')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('232576d7-c0d6-5b6a-8664-97733cc7d108', 'e8f6b96f-cbdb-5675-ae44-cafc2004f950', 'Vertebrados (Cordados)', 'vertebrados-cordados', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4068050a-1a13-56e8-938c-aa89d5c7a66f', '232576d7-c0d6-5b6a-8664-97733cc7d108')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('b8abb352-71ab-5eae-a493-731e2848cce3', 'Filosofia', 'filosofia', 'Reflexão crítica sobre questões fundamentais da existência, conhecimento, valores, razão, mente e linguagem.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('19f88236-0950-5148-9163-159e1884417b', 'b8abb352-71ab-5eae-a493-731e2848cce3', 'Introdução à Filosofia', 'introducao-a-filosofia', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('51fbd6c6-02e0-54cb-acad-d88c7724e499', '19f88236-0950-5148-9163-159e1884417b', 'Origem do Pensamento Filosófico', 'origem-do-pensamento-filosofico', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fd4f3527-0d9f-5bf3-96db-b3e9986ee3ea', '51fbd6c6-02e0-54cb-acad-d88c7724e499')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('657a92da-70d4-57df-b98a-6fe86fca6f91', 'b8abb352-71ab-5eae-a493-731e2848cce3', 'Filosofia Antiga', 'filosofia-antiga', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('984ae47f-7299-5136-bbca-e49e7c05e596', '657a92da-70d4-57df-b98a-6fe86fca6f91', 'Pré-Socráticos', 'pre-socraticos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('97375a8b-a2b1-5d65-a39c-3f2a32fe9c86', '984ae47f-7299-5136-bbca-e49e7c05e596')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('2f1dae7f-00f7-5e29-bd7e-ccb92f31f899', '657a92da-70d4-57df-b98a-6fe86fca6f91', 'Sofistas e Sócrates', 'sofistas-e-socrates', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bcda4be5-826c-52f6-9136-ca988fe9a66e', '2f1dae7f-00f7-5e29-bd7e-ccb92f31f899')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cdf55837-438b-59ad-8ef0-1236ca0d78a5', '657a92da-70d4-57df-b98a-6fe86fca6f91', 'Platão', 'platao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b69bd2fe-426a-5f91-960f-ff0b031e896c', 'cdf55837-438b-59ad-8ef0-1236ca0d78a5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a4727381-5e50-529b-b2d2-03b96649f886', '657a92da-70d4-57df-b98a-6fe86fca6f91', 'Aristóteles', 'aristoteles', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('cb76030f-2a15-528c-807c-d646adb009a8', 'a4727381-5e50-529b-b2d2-03b96649f886')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b41597a3-93dc-5d87-aeb9-15efd289f912', '657a92da-70d4-57df-b98a-6fe86fca6f91', 'Escolas Helenísticas', 'escolas-helenisticas', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1338ce46-ed7b-5951-96ae-b3f3d116ab42', 'b41597a3-93dc-5d87-aeb9-15efd289f912')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('65506983-d63b-5de9-9e66-54f569707661', 'b8abb352-71ab-5eae-a493-731e2848cce3', 'Filosofia Medieval', 'filosofia-medieval', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f93ee67e-6aa3-5a60-8cdd-1752dd296220', '65506983-d63b-5de9-9e66-54f569707661', 'Patrística', 'patristica', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('18cee102-dab8-5115-807d-9d30b81ec6ed', 'f93ee67e-6aa3-5a60-8cdd-1752dd296220')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('27b03654-36f0-5438-a53e-b69dc390c4f5', '65506983-d63b-5de9-9e66-54f569707661', 'Escolástica', 'escolastica', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5dc5899e-9bad-5fbb-a09f-92f6b5e7b037', '27b03654-36f0-5438-a53e-b69dc390c4f5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('1245e0e8-a9b3-5c79-9ebe-eaffbac9dff8', 'b8abb352-71ab-5eae-a493-731e2848cce3', 'Filosofia Moderna', 'filosofia-moderna', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('623839b7-7ae4-5839-84ac-f7e65bfe0ace', '1245e0e8-a9b3-5c79-9ebe-eaffbac9dff8', 'Racionalismo', 'racionalismo', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a0e0bfaf-6089-57aa-80d9-eef12cf9a7bf', '623839b7-7ae4-5839-84ac-f7e65bfe0ace')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f7f4dbdb-b6ac-5c9e-b2e8-0f3f4d4991c4', '1245e0e8-a9b3-5c79-9ebe-eaffbac9dff8', 'Empirismo', 'empirismo', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ee4515db-2b65-54ee-8aec-6fc92852723a', 'f7f4dbdb-b6ac-5c9e-b2e8-0f3f4d4991c4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d862e1a7-ecfa-5243-99be-cc3e71f7c9fe', '1245e0e8-a9b3-5c79-9ebe-eaffbac9dff8', 'Iluminismo', 'iluminismo', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b90b1db9-3b42-56da-8ee5-d4fe138af962', 'd862e1a7-ecfa-5243-99be-cc3e71f7c9fe')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a7b80d1b-6b8e-5cb6-a311-642ba467c71c', '1245e0e8-a9b3-5c79-9ebe-eaffbac9dff8', 'Contratualismo', 'contratualismo', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('700318fd-9a0e-552c-90fa-abb160930e99', 'a7b80d1b-6b8e-5cb6-a311-642ba467c71c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b2836cf4-90a8-5957-8c18-46b2c8b25881', '1245e0e8-a9b3-5c79-9ebe-eaffbac9dff8', 'Criticismo Kantiano', 'criticismo-kantiano', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c63e74db-08fd-5c5c-9edf-49961f2d62d2', 'b2836cf4-90a8-5957-8c18-46b2c8b25881')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('555cc5f9-b384-54e2-9056-a5fb2424fce5', 'b8abb352-71ab-5eae-a493-731e2848cce3', 'Filosofia Política e Ética', 'filosofia-politica-e-etica', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9b88d21f-176e-55cd-8e78-a75c0ad5cb8d', '555cc5f9-b384-54e2-9056-a5fb2424fce5', 'Conceitos de Poder e Estado', 'conceitos-de-poder-e-estado', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('de725a70-c193-5dd5-9735-f6b2bd742fb3', '9b88d21f-176e-55cd-8e78-a75c0ad5cb8d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('97029683-a0af-5dca-9221-08eeb8422d2d', '555cc5f9-b384-54e2-9056-a5fb2424fce5', 'Correntes Éticas', 'correntes-eticas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8e7309f6-f449-5cdd-9541-3be420dacb8c', '97029683-a0af-5dca-9221-08eeb8422d2d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('82f4db93-d88a-54a2-a6c4-20d565b18de7', '555cc5f9-b384-54e2-9056-a5fb2424fce5', 'Direitos Humanos', 'direitos-humanos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('e94c8437-39a2-5f41-955d-1269b85dbe26', '82f4db93-d88a-54a2-a6c4-20d565b18de7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('7a50718c-875d-5355-8a3a-3f009f73f975', 'b8abb352-71ab-5eae-a493-731e2848cce3', 'Filosofia Contemporânea', 'filosofia-contemporanea', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('29b22dfb-9f5f-55cf-96b3-1b9f3e0c7570', '7a50718c-875d-5355-8a3a-3f009f73f975', 'Marxismo', 'marxismo', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d639b28a-72d4-5ed5-8430-65f174fa81c5', '29b22dfb-9f5f-55cf-96b3-1b9f3e0c7570')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e0561e0c-6a68-5aa2-8459-7bb5aca6f0a2', '7a50718c-875d-5355-8a3a-3f009f73f975', 'Existencialismo', 'existencialismo', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ba6b9044-7e63-5127-9a6b-7f5876298c89', 'e0561e0c-6a68-5aa2-8459-7bb5aca6f0a2')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('61093563-01b4-5c24-afc0-f24e4151284b', '7a50718c-875d-5355-8a3a-3f009f73f975', 'Escola de Frankfurt', 'escola-de-frankfurt', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ceb21d3e-0ad3-5542-bdda-ab571ca2b4d2', '61093563-01b4-5c24-afc0-f24e4151284b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1b98798e-b2f5-50da-90ab-651a5c8b9b7a', '7a50718c-875d-5355-8a3a-3f009f73f975', 'Filosofia Contemporânea e Pós-Modernidade', 'filosofia-contemporanea-e-pos-modernidade', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('636317d1-adec-5e13-98f5-19fd76961193', '1b98798e-b2f5-50da-90ab-651a5c8b9b7a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('a6e80e06-47ec-53f1-8975-b4add171def8', 'Física', 'fisica', 'Ciência natural que estuda a matéria, seu movimento e comportamento no espaço e no tempo, juntamente com energia e forças.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('1a8a62cf-f541-5247-9ba4-4e1bfb5c4efc', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Mecânica', 'mecanica', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6ec6e5f9-0655-5679-a8a4-2c90cb515db7', '1a8a62cf-f541-5247-9ba4-4e1bfb5c4efc', 'Cinemática', 'cinematica', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6b761ef7-6b7f-5725-8041-bd2f575dc378', '6ec6e5f9-0655-5679-a8a4-2c90cb515db7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('acf4304b-9964-51ee-a54d-bb642b90e7a3', '1a8a62cf-f541-5247-9ba4-4e1bfb5c4efc', 'Dinâmica', 'dinamica', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0ccb0c79-faf4-55db-99df-80a1a17742b6', 'acf4304b-9964-51ee-a54d-bb642b90e7a3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ec71fcca-c86e-55b6-927c-48132bf489ef', '1a8a62cf-f541-5247-9ba4-4e1bfb5c4efc', 'Estática', 'estatica', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a2013b3a-2dc6-5e4b-b9aa-5be4759058fa', 'ec71fcca-c86e-55b6-927c-48132bf489ef')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('268f3193-7ffe-5c2c-86c4-0d1085cc5449', '1a8a62cf-f541-5247-9ba4-4e1bfb5c4efc', 'Hidrostática', 'hidrostatica', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3e4ccd02-056f-5ccf-bce0-2a9b76d625b3', '268f3193-7ffe-5c2c-86c4-0d1085cc5449')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6ebcd592-660a-5ee0-831e-991bc7f5ecf4', '1a8a62cf-f541-5247-9ba4-4e1bfb5c4efc', 'Gravitação', 'gravitacao', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d3220f46-b416-5452-bc19-97342d824ca3', '6ebcd592-660a-5ee0-831e-991bc7f5ecf4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('be02aba5-a0fe-5bc2-b9cf-91b6ae163925', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Física Térmica', 'fisica-termica', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cb7a0872-6293-5f4c-b2d0-c383c927e0fa', 'be02aba5-a0fe-5bc2-b9cf-91b6ae163925', 'Termologia', 'termologia', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5689bbc7-af70-566b-99d5-479e05946c4b', 'cb7a0872-6293-5f4c-b2d0-c383c927e0fa')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('bb936ff3-a732-57b9-a9e3-f0f428c83142', 'be02aba5-a0fe-5bc2-b9cf-91b6ae163925', 'Calorimetria', 'calorimetria', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a23a7c57-cd09-5489-ba41-a337997cd540', 'bb936ff3-a732-57b9-a9e3-f0f428c83142')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('f8e42b8e-a9b7-5a8f-ad99-fdede9971fea', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Física dos Gases e Termodinâmica', 'fisica-dos-gases-e-termodinamica', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a57e6e55-6987-5038-8516-d70f1de219fe', 'f8e42b8e-a9b7-5a8f-ad99-fdede9971fea', 'Física dos Gases', 'fisica-dos-gases', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a3a5309b-d23a-578c-8306-26717de556f5', 'a57e6e55-6987-5038-8516-d70f1de219fe')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6be89a34-357c-5c99-8c84-521579e285e0', 'f8e42b8e-a9b7-5a8f-ad99-fdede9971fea', 'Termodinâmica', 'termodinamica', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0e4f66cc-2e79-526a-9948-a8f6334601a3', '6be89a34-357c-5c99-8c84-521579e285e0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('160443a2-a2a1-592b-bbc2-fffcb8ea239a', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Ondulatória', 'ondulatoria', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f0f2cb81-8b5c-5199-88c7-cef3e1e80474', '160443a2-a2a1-592b-bbc2-fffcb8ea239a', 'Fundamentos', 'fundamentos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('baf78ccf-2623-5663-afb5-e22d1e241c93', 'f0f2cb81-8b5c-5199-88c7-cef3e1e80474')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('145ed87a-9fe4-59f8-8a20-478d20cf8077', '160443a2-a2a1-592b-bbc2-fffcb8ea239a', 'Fenômenos Ondulatórios', 'fenomenos-ondulatorios', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c70954e5-1cac-5c61-a3a8-c4cf059e7695', '145ed87a-9fe4-59f8-8a20-478d20cf8077')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('566736ff-0185-5290-96bf-251fb4eccf0e', '160443a2-a2a1-592b-bbc2-fffcb8ea239a', 'Ondas Estacionárias', 'ondas-estacionarias', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('182cf30f-d88d-5daa-bada-8aab1fe5b890', '566736ff-0185-5290-96bf-251fb4eccf0e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5cc7ce64-cf01-5672-bd77-60950aa9c320', '160443a2-a2a1-592b-bbc2-fffcb8ea239a', 'Sonoridade', 'sonoridade', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8f583cfd-d9bd-5c34-8196-90a5ba347dd8', '5cc7ce64-cf01-5672-bd77-60950aa9c320')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('045349fc-266b-5cdb-a267-18ab3631430d', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Óptica Geométrica', 'optica-geometrica', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b65ce964-a045-5955-a566-5dadf320ccfa', '045349fc-266b-5cdb-a267-18ab3631430d', 'Luz e Cor', 'luz-e-cor', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('186f30da-9057-50fa-b17a-6b99fccc7639', 'b65ce964-a045-5955-a566-5dadf320ccfa')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('82facfea-e1d3-50a7-baae-eee8dbf1d79a', '045349fc-266b-5cdb-a267-18ab3631430d', 'Reflexão da Luz e Espelhos Planos', 'reflexao-da-luz-e-espelhos-planos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('775c6e0b-96b1-5d03-8cb8-16204cc0aad0', '82facfea-e1d3-50a7-baae-eee8dbf1d79a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('922ad694-31c1-596f-9f7f-5c7b17e361a4', '045349fc-266b-5cdb-a267-18ab3631430d', 'Espelhos Curvos', 'espelhos-curvos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('615eacbb-4a10-5c03-a55e-d1806b4d6ce9', '922ad694-31c1-596f-9f7f-5c7b17e361a4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('7ccd81ba-ce2d-580d-bbce-13e4ab324baa', '045349fc-266b-5cdb-a267-18ab3631430d', 'Refração da Luz', 'refracao-da-luz', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9f895523-d65c-5a18-a28c-5a3fbd17281b', '7ccd81ba-ce2d-580d-bbce-13e4ab324baa')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('62625701-3373-566f-b05d-ca2cbbe07c6d', '045349fc-266b-5cdb-a267-18ab3631430d', 'Lentes Delgadas', 'lentes-delgadas', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ba6d0577-5867-5c7b-9577-a66ba531038c', '62625701-3373-566f-b05d-ca2cbbe07c6d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('0d32f548-f852-5ff2-8a99-a4f50e13a211', '045349fc-266b-5cdb-a267-18ab3631430d', 'Visão Humana', 'visao-humana', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0d7f75f3-f7f5-5281-98ff-e182d100edca', '0d32f548-f852-5ff2-8a99-a4f50e13a211')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c85bda11-9147-50de-83af-e46ee0293d5a', '045349fc-266b-5cdb-a267-18ab3631430d', 'Instrumentos Ópticos', 'instrumentos-opticos', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bd44c00e-e981-5e66-9716-68f34969e77a', 'c85bda11-9147-50de-83af-e46ee0293d5a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('f20d60e9-3780-51d4-a2b3-6712a86512e0', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Eletromagnetismo', 'eletromagnetismo', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fa4de88e-83bd-58f5-84fa-deccbafdf7a8', 'f20d60e9-3780-51d4-a2b3-6712a86512e0', 'Eletrostática', 'eletrostatica', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f314ab6a-614c-5a7d-9402-1c209ac3c971', 'fa4de88e-83bd-58f5-84fa-deccbafdf7a8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d68326c8-2fec-594d-86e3-0e2c5a68c89a', 'f20d60e9-3780-51d4-a2b3-6712a86512e0', 'Eletrodinâmica', 'eletrodinamica', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d269e4b3-dc1c-559a-83b3-1b648a0414c2', 'd68326c8-2fec-594d-86e3-0e2c5a68c89a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a3f1b067-3ad4-56aa-aa8d-836bb1e55c95', 'f20d60e9-3780-51d4-a2b3-6712a86512e0', 'Magnetismo', 'magnetismo', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d421d627-b46d-5f74-ad31-96fd23feb73d', 'a3f1b067-3ad4-56aa-aa8d-836bb1e55c95')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('96b72dbb-a076-5102-9307-3d18d42c9082', 'f20d60e9-3780-51d4-a2b3-6712a86512e0', 'Eletromagnetismo (Indução)', 'eletromagnetismo-inducao', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('11dcb89c-48ae-5e37-aab4-526f7a5111a3', '96b72dbb-a076-5102-9307-3d18d42c9082')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('a145e26b-23e5-514e-aefb-2b7d98166206', 'a6e80e06-47ec-53f1-8975-b4add171def8', 'Física Moderna', 'fisica-moderna', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ae0367cf-9ab2-50b4-98d3-12108c56ac1f', 'a145e26b-23e5-514e-aefb-2b7d98166206', 'Efeito Fotoelétrico', 'efeito-fotoeletrico', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fc743949-067e-5b26-a7ee-6535e0b1257c', 'ae0367cf-9ab2-50b4-98d3-12108c56ac1f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3aaa6f60-91e4-5110-9924-7410a8ddfd64', 'a145e26b-23e5-514e-aefb-2b7d98166206', 'Dualidade Onda-Partícula', 'dualidade-onda-particula', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('810991b9-6f9a-59e7-90fd-fb8ee93ecfa2', '3aaa6f60-91e4-5110-9924-7410a8ddfd64')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('be0818bc-a070-5f03-9850-792719d049a7', 'a145e26b-23e5-514e-aefb-2b7d98166206', 'Radioatividade e Energia Nuclear', 'radioatividade-e-energia-nuclear', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('00fe90ce-24fc-5dcb-a49e-ebb1aa5bfc3c', 'be0818bc-a070-5f03-9850-792719d049a7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('7a9d199b-9545-5073-bb8d-69ac2102c75a', 'a145e26b-23e5-514e-aefb-2b7d98166206', 'Noções de Relatividade', 'nocoes-de-relatividade', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5bd18505-fb7f-5ac9-a4a4-6945791042d8', '7a9d199b-9545-5073-bb8d-69ac2102c75a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('70921b0c-5207-52e7-b290-4bec444b2438', 'Geografia', 'geografia', 'Estudo do espaço geográfico, suas dinâmicas físicas e socioeconômicas, relevo, clima e ocupação humana.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('d111ac6b-5aef-52a6-9eda-5d9d0176f7cc', '70921b0c-5207-52e7-b290-4bec444b2438', 'Geografia Física', 'geografia-fisica', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('be1fb18d-e41d-525c-8951-8824c88ed2f1', 'd111ac6b-5aef-52a6-9eda-5d9d0176f7cc', 'Estrutura Geológica e Relevo', 'estrutura-geologica-e-relevo', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a1447698-f41b-5e2f-a5d5-42c1bbb74ed7', 'be1fb18d-e41d-525c-8951-8824c88ed2f1')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ca21b330-328b-5dad-a1cf-58c998d67084', 'd111ac6b-5aef-52a6-9eda-5d9d0176f7cc', 'Climatologia', 'climatologia', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7232840f-b3b2-54c0-af6e-a2f8f30e8c50', 'ca21b330-328b-5dad-a1cf-58c998d67084')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('39fb4982-65c5-573f-a2c0-792ada74d4c3', 'd111ac6b-5aef-52a6-9eda-5d9d0176f7cc', 'Hidrografia', 'hidrografia', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('75622c34-bfed-5665-a876-85edec7deb9e', '39fb4982-65c5-573f-a2c0-792ada74d4c3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ae832400-2587-5839-a4cf-2bc9aadf8a72', 'd111ac6b-5aef-52a6-9eda-5d9d0176f7cc', 'Vegetação e Biomas', 'vegetacao-e-biomas', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c485228f-eba0-5773-a93a-d8327640ef49', 'ae832400-2587-5839-a4cf-2bc9aadf8a72')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('0b1ee460-687b-5cc5-99b2-3bd8d204ed1d', 'd111ac6b-5aef-52a6-9eda-5d9d0176f7cc', 'Solos', 'solos', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1444cbb6-0e71-565c-95ad-917ec0d0d392', '0b1ee460-687b-5cc5-99b2-3bd8d204ed1d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('ccaed683-42ad-5236-8d3f-5fa23ce364db', '70921b0c-5207-52e7-b290-4bec444b2438', 'Geografia da População', 'geografia-da-populacao', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ab65e5be-a186-53d5-9945-c3b0b30758cb', 'ccaed683-42ad-5236-8d3f-5fa23ce364db', 'Dinâmica Demográfica', 'dinamica-demografica', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b30f8ec7-6f91-5691-a832-aa577e0d92eb', 'ab65e5be-a186-53d5-9945-c3b0b30758cb')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1cfef67f-5b33-57c3-85d8-7c277a2d1344', 'ccaed683-42ad-5236-8d3f-5fa23ce364db', 'Migrações', 'migracoes', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a143d0b0-8621-5d59-857a-a34bf5f8cabe', '1cfef67f-5b33-57c3-85d8-7c277a2d1344')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f678b7a2-84de-559a-9f73-b7f7205a20ef', 'ccaed683-42ad-5236-8d3f-5fa23ce364db', 'Urbanização', 'urbanizacao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('e4b8c83f-5a10-5662-adbe-d822fbd8ca36', 'f678b7a2-84de-559a-9f73-b7f7205a20ef')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b4bde93e-d81a-5f18-97f0-f48226b510a3', 'ccaed683-42ad-5236-8d3f-5fa23ce364db', 'Indicadores Sociais', 'indicadores-sociais', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ba99a4bc-37b7-5cd4-a570-4fc910ea6c82', 'b4bde93e-d81a-5f18-97f0-f48226b510a3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('9332f4b2-84e5-5893-aac3-529d391e46a6', '70921b0c-5207-52e7-b290-4bec444b2438', 'Geografia Econômica', 'geografia-economica', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e09d913c-6958-5d2d-a6e2-6eed78e9764e', '9332f4b2-84e5-5893-aac3-529d391e46a6', 'Setores da Economia', 'setores-da-economia', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('86b13ed7-fbd5-508d-8653-a7cbe1541826', 'e09d913c-6958-5d2d-a6e2-6eed78e9764e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4f73ba70-6928-5862-aec1-9f64ae6c4895', '9332f4b2-84e5-5893-aac3-529d391e46a6', 'Globalização e Blocos Econômicos', 'globalizacao-e-blocos-economicos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a0124ece-a1f2-52bd-8894-ea3ee7030590', '4f73ba70-6928-5862-aec1-9f64ae6c4895')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b2a136e5-1ba5-51cd-a386-e8d1fa6e79f7', '9332f4b2-84e5-5893-aac3-529d391e46a6', 'Industrialização', 'industrializacao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('750e8dc9-18d7-50d1-b1df-715f71748d78', 'b2a136e5-1ba5-51cd-a386-e8d1fa6e79f7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('05aa7dce-3327-500e-a313-8cb720d8086c', '9332f4b2-84e5-5893-aac3-529d391e46a6', 'Agropecuária e Agronegócio', 'agropecuaria-e-agronegocio', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('563fc586-323f-5f67-9cbb-0b0528746df5', '05aa7dce-3327-500e-a313-8cb720d8086c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1a4113ee-cba7-5e71-9607-244eb72fe123', '9332f4b2-84e5-5893-aac3-529d391e46a6', 'Fontes de Energia', 'fontes-de-energia', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('16781a50-efbb-5d10-8b10-5d78caf8d206', '1a4113ee-cba7-5e71-9607-244eb72fe123')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('2355a600-7efd-5ac4-b295-7033d433c5a4', '70921b0c-5207-52e7-b290-4bec444b2438', 'Geopolítica', 'geopolitica', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('494c88fa-05b9-5226-8350-b7eb00c4374c', '2355a600-7efd-5ac4-b295-7033d433c5a4', 'Nova Ordem Mundial', 'nova-ordem-mundial', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b1a3539f-b184-56c5-82d7-bc49b790b51d', '494c88fa-05b9-5226-8350-b7eb00c4374c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('aeaaee97-f04a-5448-9d24-d3a43e7834f9', '2355a600-7efd-5ac4-b295-7033d433c5a4', 'Conflitos Geopolíticos', 'conflitos-geopoliticos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a2ee2b71-3b8c-5cff-b5b8-d07ec40db7c1', 'aeaaee97-f04a-5448-9d24-d3a43e7834f9')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('bce9512d-259c-5e9f-b350-3ddd1114b631', '70921b0c-5207-52e7-b290-4bec444b2438', 'Geografia do Brasil', 'geografia-do-brasil', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3ecd9b20-0a1d-5154-ab06-a1688d326256', 'bce9512d-259c-5e9f-b350-3ddd1114b631', 'Regionalização do Brasil', 'regionalizacao-do-brasil', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7ba9dc68-923d-58c5-9491-14609bab63e7', '3ecd9b20-0a1d-5154-ab06-a1688d326256')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fef66f5b-d76e-5245-adb6-ecf113593746', 'bce9512d-259c-5e9f-b350-3ddd1114b631', 'População Brasileira', 'populacao-brasileira', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b159e4c5-64eb-5fd0-9b26-0bb9a2038244', 'fef66f5b-d76e-5245-adb6-ecf113593746')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('27e623d6-1737-5999-9e94-4728662f1ca4', 'bce9512d-259c-5e9f-b350-3ddd1114b631', 'Economia Brasileira', 'economia-brasileira', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ac429901-a1b3-5186-a97d-454bb6bac327', '27e623d6-1737-5999-9e94-4728662f1ca4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('5e44b33a-f0a7-53d1-b39b-6c493919ca63', '70921b0c-5207-52e7-b290-4bec444b2438', 'Meio Ambiente e Sustentabilidade', 'meio-ambiente-e-sustentabilidade', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('03c39acd-9aaa-582b-ada6-7b4832f887b2', '5e44b33a-f0a7-53d1-b39b-6c493919ca63', 'Impactos Ambientais', 'impactos-ambientais', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f5e93b3f-3282-5ff4-810f-db65b3e1f655', '03c39acd-9aaa-582b-ada6-7b4832f887b2')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ccbb03d1-16c3-5270-81d4-d8ab51de4699', '5e44b33a-f0a7-53d1-b39b-6c493919ca63', 'Mudanças Climáticas', 'mudancas-climaticas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a243029b-5035-51fe-9fcb-8799b58c8011', 'ccbb03d1-16c3-5270-81d4-d8ab51de4699')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('95b02b30-bcc1-5311-a296-8889a4c9b1bc', '5e44b33a-f0a7-53d1-b39b-6c493919ca63', 'Desenvolvimento Sustentável', 'desenvolvimento-sustentavel', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('87c177fa-2a33-50fa-95ad-18d58b593e1c', '95b02b30-bcc1-5311-a296-8889a4c9b1bc')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('a116ec53-359d-5576-8f4c-60e2ed841bea', '70921b0c-5207-52e7-b290-4bec444b2438', 'Cartografia', 'cartografia', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('68450484-544a-557f-9111-b5c2846ec90d', 'a116ec53-359d-5576-8f4c-60e2ed841bea', 'Elementos Cartográficos', 'elementos-cartograficos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1deb1d26-819b-5f7c-a4d5-29699bde9d92', '68450484-544a-557f-9111-b5c2846ec90d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('09711dd0-30c1-5a2e-8b0f-330ad2e1c710', 'a116ec53-359d-5576-8f4c-60e2ed841bea', 'Leitura e Interpretação', 'leitura-e-interpretacao', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c08205c0-1e60-5746-aa9d-f7fda2fe20aa', '09711dd0-30c1-5a2e-8b0f-330ad2e1c710')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('83877e33-fff3-54dc-ad17-03afdc678f17', 'História', 'historia', 'Análise crítica dos processos sociais, políticos, econômicos e culturais das civilizações humanas ao longo do tempo.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('f1078bae-f1b7-5812-bd70-a11085ed510f', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Pré-História e Antiguidade', 'pre-historia-e-antiguidade', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1a1693fa-407f-5790-b98e-253c55c931ba', 'f1078bae-f1b7-5812-bd70-a11085ed510f', 'Pré-História', 'pre-historia', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8603603a-f677-5af0-b983-ddb5ebb7f509', '1a1693fa-407f-5790-b98e-253c55c931ba')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ad14e3cb-571d-541e-9a3d-83de4d187fae', 'f1078bae-f1b7-5812-bd70-a11085ed510f', 'Antiguidade Oriental', 'antiguidade-oriental', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('98b6a2b1-ea84-5b20-be5c-7545e207d0da', 'ad14e3cb-571d-541e-9a3d-83de4d187fae')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('787d578c-b130-5c4d-a07f-c4b5bea6b7d3', 'f1078bae-f1b7-5812-bd70-a11085ed510f', 'Grécia Antiga', 'grecia-antiga', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d29e7a7e-c517-5da7-8276-3daf46bc1b18', '787d578c-b130-5c4d-a07f-c4b5bea6b7d3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('773dbdb9-dfea-54a6-858a-f7ae91eb0d1d', 'f1078bae-f1b7-5812-bd70-a11085ed510f', 'Roma Antiga', 'roma-antiga', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4c5782ea-8064-51fb-aca3-6b08ebd8cf4e', '773dbdb9-dfea-54a6-858a-f7ae91eb0d1d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('4e719638-d950-56be-96ce-176194f59522', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Idade Média', 'idade-media', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f8565c82-374e-5c23-b954-916fc5743fb8', '4e719638-d950-56be-96ce-176194f59522', 'Formação do Feudalismo', 'formacao-do-feudalismo', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5db9e730-c36e-531d-9b05-b5b001fbea1a', 'f8565c82-374e-5c23-b954-916fc5743fb8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e59df22e-cd2e-560f-b958-4732d57875ae', '4e719638-d950-56be-96ce-176194f59522', 'Sociedade e Cultura Medieval', 'sociedade-e-cultura-medieval', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6c0acf8f-e7a4-5c67-893e-f28ba25e7fd1', 'e59df22e-cd2e-560f-b958-4732d57875ae')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('7f3f7d87-07e4-51b2-8f7a-9383f27f1f51', '4e719638-d950-56be-96ce-176194f59522', 'Crise do Feudalismo', 'crise-do-feudalismo', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ddcac9be-acc0-53a7-b41e-334a4ad73f12', '7f3f7d87-07e4-51b2-8f7a-9383f27f1f51')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('db8fde3b-5829-5812-b3e4-a05e7f7bd218', '4e719638-d950-56be-96ce-176194f59522', 'Civilizações Não Europeias', 'civilizacoes-nao-europeias', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6b262d6a-c3f5-5676-87ba-c3e18f18f9f1', 'db8fde3b-5829-5812-b3e4-a05e7f7bd218')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('27a73a4d-9c23-5aed-9d54-a378103663d6', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Idade Moderna', 'idade-moderna', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b087a504-a10c-505a-bcf6-f07eb6614f9b', '27a73a4d-9c23-5aed-9d54-a378103663d6', 'Renascimento e Reforma', 'renascimento-e-reforma', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('900ebab5-5d4e-5d1c-bf59-e37980126bc7', 'b087a504-a10c-505a-bcf6-f07eb6614f9b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('25b37803-24d9-5d3d-b8cf-611b858e4048', '27a73a4d-9c23-5aed-9d54-a378103663d6', 'Formação dos Estados Modernos', 'formacao-dos-estados-modernos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ba185cb7-2058-540e-b9e9-2a1580946bb4', '25b37803-24d9-5d3d-b8cf-611b858e4048')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('be559cef-ba95-5996-991e-514193265c74', '27a73a4d-9c23-5aed-9d54-a378103663d6', 'Expansão Marítima e Colonização', 'expansao-maritima-e-colonizacao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('433c8da0-4dde-5731-a1af-17ccd6b75716', 'be559cef-ba95-5996-991e-514193265c74')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4382f453-491f-5c51-ab96-1d232a10119d', '27a73a4d-9c23-5aed-9d54-a378103663d6', 'Economia Colonial no Brasil', 'economia-colonial-no-brasil', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('294723e6-9421-54a6-97ef-3af66c49a500', '4382f453-491f-5c51-ab96-1d232a10119d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('208d697b-ba12-5a11-9684-1548189b3284', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Revoluções Burguesas e Iluminismo', 'revolucoes-burguesas-e-iluminismo', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('8bcda952-eda5-524c-bdc4-f68d653d7c52', '208d697b-ba12-5a11-9684-1548189b3284', 'Iluminismo', 'iluminismo', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bc6aa69e-94ff-5744-93e7-75151e8fd8b9', '8bcda952-eda5-524c-bdc4-f68d653d7c52')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b5a54457-ce18-5ab1-abbf-cf404760da40', '208d697b-ba12-5a11-9684-1548189b3284', 'Revoluções Inglesas', 'revolucoes-inglesas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('cda824c1-3e74-5a55-994b-755aeaaea526', 'b5a54457-ce18-5ab1-abbf-cf404760da40')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('69b13b6b-2ac2-5a83-a6da-299f9a370d3b', '208d697b-ba12-5a11-9684-1548189b3284', 'Independência dos Estados Unidos', 'independencia-dos-estados-unidos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('124d41ca-a71c-572f-b280-9fc0cf458354', '69b13b6b-2ac2-5a83-a6da-299f9a370d3b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cdd5be9e-f23f-5e46-a154-f210af510765', '208d697b-ba12-5a11-9684-1548189b3284', 'Revolução Francesa', 'revolucao-francesa', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a0b7edc5-2c7c-527a-8df0-6b823b216525', 'cdd5be9e-f23f-5e46-a154-f210af510765')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('43910e80-4524-5493-a734-4656eeced792', '208d697b-ba12-5a11-9684-1548189b3284', 'Revolução Industrial', 'revolucao-industrial', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('740be1da-d32c-5bf2-8934-5bc581f329e4', '43910e80-4524-5493-a734-4656eeced792')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('271b6463-dbae-5347-9653-e2b0e0ba6168', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Brasil Império', 'brasil-imperio', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e25ccb3d-2d63-5e91-8622-7ff6ea78994b', '271b6463-dbae-5347-9653-e2b0e0ba6168', 'Independência do Brasil', 'independencia-do-brasil', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7be47189-c6ae-5441-9738-c84f2b6027f4', 'e25ccb3d-2d63-5e91-8622-7ff6ea78994b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5055ff2e-9e3d-5467-9dd1-7a3589490c4e', '271b6463-dbae-5347-9653-e2b0e0ba6168', 'Primeiro Reinado e Regência', 'primeiro-reinado-e-regencia', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3cc2a825-6053-5e32-af37-8bb0c9b62b41', '5055ff2e-9e3d-5467-9dd1-7a3589490c4e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5e562d2c-422f-50b4-ad67-846550e93dbf', '271b6463-dbae-5347-9653-e2b0e0ba6168', 'Segundo Reinado', 'segundo-reinado', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9cb1424a-2dba-5fd3-8444-c78adcd9aa15', '5e562d2c-422f-50b4-ad67-846550e93dbf')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('179fecc1-f75b-5eaf-9b62-74a47dcd8fef', '271b6463-dbae-5347-9653-e2b0e0ba6168', 'Abolição e Fim do Império', 'abolicao-e-fim-do-imperio', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5a1a5054-26bd-595a-94a2-50de3a0297c9', '179fecc1-f75b-5eaf-9b62-74a47dcd8fef')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('3abb27fc-e876-56df-91c1-27a4fd6b8a79', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Brasil República', 'brasil-republica', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('be7ac1fb-3402-5843-83df-7ed4199a5448', '3abb27fc-e876-56df-91c1-27a4fd6b8a79', 'República Velha', 'republica-velha', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('47949446-94f2-5079-9d3a-e30c7bc19516', 'be7ac1fb-3402-5843-83df-7ed4199a5448')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('323b4273-d18f-5728-9c45-136e43e7f0ad', '3abb27fc-e876-56df-91c1-27a4fd6b8a79', 'Era Vargas', 'era-vargas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('cd691088-8983-51fe-8e8d-7632b87dc0f7', '323b4273-d18f-5728-9c45-136e43e7f0ad')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6c590ba5-0c28-52ec-9fdb-04d0d0e08b54', '3abb27fc-e876-56df-91c1-27a4fd6b8a79', 'República Populista', 'republica-populista', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3a75bcce-2d8c-5212-aa8b-98f15b5d0c32', '6c590ba5-0c28-52ec-9fdb-04d0d0e08b54')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e6e1ee44-0bca-53a1-86d5-a94389d3ac42', '3abb27fc-e876-56df-91c1-27a4fd6b8a79', 'Ditadura Militar', 'ditadura-militar', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('57bd27e2-5d5f-5767-8b4d-d28ee01ef15c', 'e6e1ee44-0bca-53a1-86d5-a94389d3ac42')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3d5c48d3-1bed-5497-ba5b-8f78863fff13', '3abb27fc-e876-56df-91c1-27a4fd6b8a79', 'Redemocratização', 'redemocratizacao', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('85e17a6d-d2b9-5d0f-ae9a-a80463ad08c0', '3d5c48d3-1bed-5497-ba5b-8f78863fff13')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('e15e45bd-8fd6-559f-add9-e267b35038c4', '83877e33-fff3-54dc-ad17-03afdc678f17', 'História Mundial Contemporânea', 'historia-mundial-contemporanea', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('2170199f-41a4-5657-a8cd-25ad47249911', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Imperialismo', 'imperialismo', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('05343abc-2529-559d-b69e-7827a4824b01', '2170199f-41a4-5657-a8cd-25ad47249911')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('01a9d090-a543-533f-b248-c70e095225a0', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Primeira Guerra Mundial', 'primeira-guerra-mundial', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9b37b3e0-58bd-5449-93ed-7c8c0545ae60', '01a9d090-a543-533f-b248-c70e095225a0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c5b300f5-73f3-51ec-adf9-5fe37ce9446a', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Revolução Russa', 'revolucao-russa', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('43c2770d-cd16-50c5-bf5c-9d072d58550a', 'c5b300f5-73f3-51ec-adf9-5fe37ce9446a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cd953b60-5984-5697-9534-34a543c4d1eb', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Crise de 1929 e Totalitarismos', 'crise-de-1929-e-totalitarismos', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('150299ba-10b5-51fc-99a4-cca5f346a15d', 'cd953b60-5984-5697-9534-34a543c4d1eb')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('64c30a5f-2338-5c06-b3a0-cb19c9c8c4b6', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Segunda Guerra Mundial', 'segunda-guerra-mundial', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1dd06e74-5627-5594-8d8c-193f743c966a', '64c30a5f-2338-5c06-b3a0-cb19c9c8c4b6')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('03bb8a7c-98df-5982-a8e0-0c677e39ff54', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Guerra Fria', 'guerra-fria', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9134acf3-8b49-567c-bd70-2d68757aa5db', '03bb8a7c-98df-5982-a8e0-0c677e39ff54')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e9b78bdd-ab09-57ff-9747-2f42ddde1799', 'e15e45bd-8fd6-559f-add9-e267b35038c4', 'Descolonização Afro-Asiática', 'descolonizacao-afro-asiatica', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d22f8fd5-5877-5743-a91e-c56c29cf0426', 'e9b78bdd-ab09-57ff-9747-2f42ddde1799')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('b988d027-0167-52ac-bc36-5747951e2903', '83877e33-fff3-54dc-ad17-03afdc678f17', 'Mundo Contemporâneo', 'mundo-contemporaneo', NULL, 8)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b6d62829-fede-5a40-9262-d3430452e425', 'b988d027-0167-52ac-bc36-5747951e2903', 'Fim da Guerra Fria', 'fim-da-guerra-fria', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ebe62841-43b4-5d93-bf01-1e16a842af9c', 'b6d62829-fede-5a40-9262-d3430452e425')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f6891fc4-c7cf-516c-af97-de7482ef3641', 'b988d027-0167-52ac-bc36-5747951e2903', 'Globalização', 'globalizacao', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('654fb31d-7679-5e7d-ba81-31221f032417', 'f6891fc4-c7cf-516c-af97-de7482ef3641')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5a781997-d9c6-50bc-b8b9-0a09a9012b28', 'b988d027-0167-52ac-bc36-5747951e2903', 'Conflitos Contemporâneos', 'conflitos-contemporaneos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0c3678bb-540d-5bd6-9741-84e777e68546', '5a781997-d9c6-50bc-b8b9-0a09a9012b28')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('336b4ed0-7bdc-5150-89f4-dfd0bb30ff8a', 'b988d027-0167-52ac-bc36-5747951e2903', 'América Latina Contemporânea', 'america-latina-contemporanea', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('564ee396-641a-5390-8943-f7ea99c24fdd', '336b4ed0-7bdc-5150-89f4-dfd0bb30ff8a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Língua Portuguesa', 'lingua-portuguesa', 'Estudo da linguagem, interpretação textual, gêneros, gramática aplicada, semântica e comunicação.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('b16e092f-7095-5c60-8570-63262e6a3784', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Interpretação de textos', 'interpretacao-de-textos', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('bbab5228-0da9-5d6b-aab3-9303fde478c5', 'b16e092f-7095-5c60-8570-63262e6a3784', 'Identificação de tema e tese', 'identificacao-de-tema-e-tese', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3a4f7bc0-b3ee-5a6f-ba16-ccc39d8880a1', 'bbab5228-0da9-5d6b-aab3-9303fde478c5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('de47f79c-1deb-5694-abce-f9e70a127298', 'b16e092f-7095-5c60-8570-63262e6a3784', 'Inferências', 'inferencias', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('546bd4d3-15a7-5d9f-9f49-8537edfe9c0b', 'de47f79c-1deb-5694-abce-f9e70a127298')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a0e870e1-91bf-5c82-a3e8-4d99f45346f4', 'b16e092f-7095-5c60-8570-63262e6a3784', 'Intencionalidade do autor', 'intencionalidade-do-autor', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('20e60582-0ad2-54d1-a228-d800b49ff427', 'a0e870e1-91bf-5c82-a3e8-4d99f45346f4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('18ea017e-dcc7-56ad-8eb8-7c468690da4f', 'b16e092f-7095-5c60-8570-63262e6a3784', 'Relações entre textos', 'relacoes-entre-textos', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fd6fa051-7ece-513b-ad30-4987a7970612', '18ea017e-dcc7-56ad-8eb8-7c468690da4f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e075ddbd-da86-50fc-b8a2-b37f71b3bde1', 'b16e092f-7095-5c60-8570-63262e6a3784', 'Leitura de textos verbais e não verbais', 'leitura-de-textos-verbais-e-nao-verbais', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7a743988-9e1e-51a3-b5fb-74a4e92698a5', 'e075ddbd-da86-50fc-b8a2-b37f71b3bde1')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e29ae2f3-287d-5449-90d7-4ffd80588984', 'b16e092f-7095-5c60-8570-63262e6a3784', 'Análise crítica de informações', 'analise-critica-de-informacoes', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('31384a26-5d22-5937-99cb-2d878c9ab9ec', 'e29ae2f3-287d-5449-90d7-4ffd80588984')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('78a72c54-d721-50ea-bc76-bbf90f6a75d9', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Gêneros textuais', 'generos-textuais', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c763665a-25ac-5a62-bf4b-cc11a9b1524c', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Artigo de opinião', 'artigo-de-opiniao', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('607a6ee2-3b6a-53f5-b3e2-4bca03b94b28', 'c763665a-25ac-5a62-bf4b-cc11a9b1524c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6c8d032d-5ec4-52cc-869b-0eec19d4c4d0', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Reportagem', 'reportagem', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8291becd-48e6-5549-bf0c-5c1e80a6d403', '6c8d032d-5ec4-52cc-869b-0eec19d4c4d0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('177b3783-6cf4-5dd4-a1d5-1f00a860fc03', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Notícia', 'noticia', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('760899db-a172-5622-a1bf-30ddb7069150', '177b3783-6cf4-5dd4-a1d5-1f00a860fc03')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5cf4bd64-3720-5c06-93fc-8c3f3c0410a6', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Charge', 'charge', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('02be489e-9156-5511-b41e-e48665c60a1e', '5cf4bd64-3720-5c06-93fc-8c3f3c0410a6')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e2c11f39-fc80-554c-b607-5380d7b48fa9', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Tirinha', 'tirinha', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4ddb6f91-cb23-53f8-ad75-3a8b19f2dd46', 'e2c11f39-fc80-554c-b607-5380d7b48fa9')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e8d96e61-3264-5311-86a5-ffc9c0d86527', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Cartum', 'cartum', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c37555a2-3de7-53f9-b665-4810ce803b20', 'e8d96e61-3264-5311-86a5-ffc9c0d86527')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ec7bc02a-e707-5cfb-b0a6-0f333edd3e99', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Propaganda', 'propaganda', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fa65fdbd-e7e7-5afe-b339-c14765d4f53f', 'ec7bc02a-e707-5cfb-b0a6-0f333edd3e99')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('adf679b1-db8d-58a6-9e4b-6435eb67fda7', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Meme', 'meme', NULL, 8)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3b2c2e3a-c16f-5e5e-bef2-048a9e96f683', 'adf679b1-db8d-58a6-9e4b-6435eb67fda7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('07639fad-a187-5b25-a63e-1c092c55de5f', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Texto científico', 'texto-cientifico', NULL, 9)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3911e313-6798-58cb-a68d-747acaff85ff', '07639fad-a187-5b25-a63e-1c092c55de5f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4c058a4e-a090-57ab-a668-7e6cebd5ae48', '78a72c54-d721-50ea-bc76-bbf90f6a75d9', 'Texto literário', 'texto-literario', NULL, 10)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c05edbe1-4578-505b-98c8-c8846a5e43cd', '4c058a4e-a090-57ab-a668-7e6cebd5ae48')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('fd945097-f76e-5fb0-90f5-2cd451cfa39f', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Funções da linguagem', 'funcoes-da-linguagem', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fa07f8fd-d062-57e8-8306-41781ede4ed5', 'fd945097-f76e-5fb0-90f5-2cd451cfa39f', 'Referencial', 'referencial', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('49d3963b-9352-5cd9-baab-926900a84ac9', 'fa07f8fd-d062-57e8-8306-41781ede4ed5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9e544712-953b-5ac6-8a43-d8219e31857d', 'fd945097-f76e-5fb0-90f5-2cd451cfa39f', 'Emotiva', 'emotiva', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d91122e7-669d-5a1b-b184-fc6116c664da', '9e544712-953b-5ac6-8a43-d8219e31857d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d91b55c6-bd29-5968-bda1-965a0d2f96b8', 'fd945097-f76e-5fb0-90f5-2cd451cfa39f', 'Conativa (apelativa)', 'conativa-apelativa', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5fbb9f62-df1f-5905-baa4-64546746383d', 'd91b55c6-bd29-5968-bda1-965a0d2f96b8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('be609303-79f7-5ea3-b1fb-5e69a24a67c5', 'fd945097-f76e-5fb0-90f5-2cd451cfa39f', 'Fática', 'fatica', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('87ea39c6-1388-5492-8373-c1d688cf5c97', 'be609303-79f7-5ea3-b1fb-5e69a24a67c5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a7789f72-3f48-54ce-9217-06985cc42d9d', 'fd945097-f76e-5fb0-90f5-2cd451cfa39f', 'Metalinguística', 'metalinguistica', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('48bf1257-409c-5e3f-a9f5-c2aaedc4426a', 'a7789f72-3f48-54ce-9217-06985cc42d9d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d5a197c0-dc91-5c19-9d20-a754b71a88ff', 'fd945097-f76e-5fb0-90f5-2cd451cfa39f', 'Poética', 'poetica', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('31329588-b799-5937-98b3-3600cb1dfe64', 'd5a197c0-dc91-5c19-9d20-a754b71a88ff')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('3f8aa273-f379-547f-b7e9-74ec466058a5', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Variação linguística', 'variacao-linguistica', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6ca2cfa4-7113-5f86-aec2-4b55cc8c3b7e', '3f8aa273-f379-547f-b7e9-74ec466058a5', 'Linguagem formal e informal', 'linguagem-formal-e-informal', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('dca538fd-c811-5b96-b246-e83b492d4f56', '6ca2cfa4-7113-5f86-aec2-4b55cc8c3b7e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b7037074-56b9-5600-98e2-1e0ac5d9bf3d', '3f8aa273-f379-547f-b7e9-74ec466058a5', 'Preconceito linguístico', 'preconceito-linguistico', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1d41e155-b5f3-5286-aba3-ce12c4e7ff87', 'b7037074-56b9-5600-98e2-1e0ac5d9bf3d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3910f0d7-f8f4-5ece-878b-27d9a3a2387a', '3f8aa273-f379-547f-b7e9-74ec466058a5', 'Regionalismos', 'regionalismos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fed70a86-746e-5128-96ae-2b3d5d652b50', '3910f0d7-f8f4-5ece-878b-27d9a3a2387a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('93005fb4-dcfc-54d7-8e6a-5492455290f4', '3f8aa273-f379-547f-b7e9-74ec466058a5', 'Variedades sociais e culturais da língua', 'variedades-sociais-e-culturais-da-lingua', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7f7b80ae-d659-5fb9-8521-d616c0c535a0', '93005fb4-dcfc-54d7-8e6a-5492455290f4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3406f158-6497-5b2e-909d-38dbef7682ba', '3f8aa273-f379-547f-b7e9-74ec466058a5', 'Adequação linguística', 'adequacao-linguistica', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3d1fd92d-d9a1-52fb-838c-47382e7fb5f8', '3406f158-6497-5b2e-909d-38dbef7682ba')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('20f238aa-ecfa-5c34-8a06-b488063d91b4', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Linguagem verbal, não verbal e multimodal', 'linguagem-verbal-nao-verbal-e-multimodal', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c38ec7a9-8cfd-5cd9-88cf-698886ef7149', '20f238aa-ecfa-5c34-8a06-b488063d91b4', 'Imagens', 'imagens', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7402c496-b4e3-52e7-814b-9d1d12dbf912', 'c38ec7a9-8cfd-5cd9-88cf-698886ef7149')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c2395509-1325-5bdd-b71b-ab76ef42dc8d', '20f238aa-ecfa-5c34-8a06-b488063d91b4', 'Charges', 'charges', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a5d6e857-79e3-55f7-a9d3-05207d6fd704', 'c2395509-1325-5bdd-b71b-ab76ef42dc8d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6c9bae8a-0245-5f01-91cf-4e871946151f', '20f238aa-ecfa-5c34-8a06-b488063d91b4', 'Infográficos', 'infograficos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0b0359b0-8895-55e7-a31a-4e4ad217a6da', '6c9bae8a-0245-5f01-91cf-4e871946151f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3fb7c14f-cba6-5379-b9f0-a4cdb9c2cf1f', '20f238aa-ecfa-5c34-8a06-b488063d91b4', 'Propagandas', 'propagandas', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('79ecebf7-47ef-5c99-a7bc-920a90908cba', '3fb7c14f-cba6-5379-b9f0-a4cdb9c2cf1f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f6090634-fa0b-5340-a448-c7f8050bc4ef', '20f238aa-ecfa-5c34-8a06-b488063d91b4', 'Campanhas publicitárias', 'campanhas-publicitarias', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6dfce594-b8e7-50ae-a1cf-f09a05dbfb2e', 'f6090634-fa0b-5340-a448-c7f8050bc4ef')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('0abbbe50-ea76-5018-bc74-b3223b67dfb3', '20f238aa-ecfa-5c34-8a06-b488063d91b4', 'Linguagem digital', 'linguagem-digital', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('706e7dfc-f538-5cff-94ac-daf886a98b08', '0abbbe50-ea76-5018-bc74-b3223b67dfb3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('cc4d3725-f261-5872-bbd1-7fd8e7156447', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Coesão e coerência', 'coesao-e-coerencia', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('8d24e112-4d22-5237-82a0-d46404738259', 'cc4d3725-f261-5872-bbd1-7fd8e7156447', 'Conectivos', 'conectivos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fd6fe473-1358-550d-a2bf-bfac61efe4f4', '8d24e112-4d22-5237-82a0-d46404738259')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e8b7317c-813e-5bf5-b4dc-c7e8b6113d91', 'cc4d3725-f261-5872-bbd1-7fd8e7156447', 'Progressão textual', 'progressao-textual', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('29b2a7f6-bf9e-5eae-9d0c-8e7e2a161b16', 'e8b7317c-813e-5bf5-b4dc-c7e8b6113d91')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e3d71594-6208-5bfe-8b48-0aad2295a3d4', 'cc4d3725-f261-5872-bbd1-7fd8e7156447', 'Referenciação', 'referenciacao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c08ad028-53ae-5581-8741-d38bded5fd01', 'e3d71594-6208-5bfe-8b48-0aad2295a3d4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('785836e6-7e07-51fa-bcba-203d2275bd33', 'cc4d3725-f261-5872-bbd1-7fd8e7156447', 'Relações lógico-semânticas', 'relacoes-logico-semanticas', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fc8a1df8-f552-5796-bdc7-6e5767066d4d', '785836e6-7e07-51fa-bcba-203d2275bd33')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1c82f3c1-77dd-5a00-872c-72370e27d350', 'cc4d3725-f261-5872-bbd1-7fd8e7156447', 'Organização argumentativa', 'organizacao-argumentativa', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('e633473e-5896-5ad4-9c50-36db7605b9f3', '1c82f3c1-77dd-5a00-872c-72370e27d350')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('eda3d347-ae6f-56da-a8eb-c43f3699102c', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Figuras de linguagem', 'figuras-de-linguagem', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('186db863-5cea-51a8-b799-79cbea7e5889', 'eda3d347-ae6f-56da-a8eb-c43f3699102c', 'Metáfora', 'metafora', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('27cf0a7f-f81f-5757-8772-4420b8bfa5f1', '186db863-5cea-51a8-b799-79cbea7e5889')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e7035312-4cac-5c21-86c4-3f243a9e0e65', 'eda3d347-ae6f-56da-a8eb-c43f3699102c', 'Ironia', 'ironia', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4f56144e-ff02-5009-b8e9-ffe30fa46738', 'e7035312-4cac-5c21-86c4-3f243a9e0e65')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('099bed09-63b6-5ffb-ae63-42ab97a4dab1', 'eda3d347-ae6f-56da-a8eb-c43f3699102c', 'Antítese', 'antitese', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('db876664-d8ed-53fe-88db-a7c0eb0b004c', '099bed09-63b6-5ffb-ae63-42ab97a4dab1')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b88ff0ff-d42a-55d2-96f4-3d489166ab45', 'eda3d347-ae6f-56da-a8eb-c43f3699102c', 'Hipérbole', 'hiperbole', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('59d84a2a-ee10-5581-9948-b30b91369d8c', 'b88ff0ff-d42a-55d2-96f4-3d489166ab45')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6244d3a0-78a3-5eb7-b941-ba6bcfbd7739', 'eda3d347-ae6f-56da-a8eb-c43f3699102c', 'Metonímia', 'metonimia', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2a5f2f6e-ece0-53d7-8b9a-08d77e3b6cd0', '6244d3a0-78a3-5eb7-b941-ba6bcfbd7739')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3a4302dc-ecf6-526c-a8d0-d8f6a6fa4286', 'eda3d347-ae6f-56da-a8eb-c43f3699102c', 'Personificação', 'personificacao', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('723a7f38-d459-5c83-be71-76ac6276c33e', '3a4302dc-ecf6-526c-a8d0-d8f6a6fa4286')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('28576585-3294-53e7-8885-cc957af65cf0', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Semântica', 'semantica', NULL, 8)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f703abbd-aa0d-5a6f-a002-56d0522b9a9c', '28576585-3294-53e7-8885-cc957af65cf0', 'Polissemia', 'polissemia', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0cf363de-4b11-5348-ae0e-fdc2caab4718', 'f703abbd-aa0d-5a6f-a002-56d0522b9a9c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b66fd10d-cf07-5404-bda4-842908341b25', '28576585-3294-53e7-8885-cc957af65cf0', 'Ambiguidade', 'ambiguidade', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c49fd299-280a-5d2f-8ffa-f574b8e97d69', 'b66fd10d-cf07-5404-bda4-842908341b25')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a00c1b08-5222-5271-9095-94c1b24b9026', '28576585-3294-53e7-8885-cc957af65cf0', 'Denotação e conotação', 'denotacao-e-conotacao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('545ed72f-f84b-5fbf-9560-adcb0c055e7c', 'a00c1b08-5222-5271-9095-94c1b24b9026')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('83b79c36-5235-52a0-b457-084d338679fa', '28576585-3294-53e7-8885-cc957af65cf0', 'Intertextualidade', 'intertextualidade', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7cc96145-060c-5872-b6e4-72cd88c3ca7d', '83b79c36-5235-52a0-b457-084d338679fa')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cbe60c0c-a31f-517b-992d-b97874589763', '28576585-3294-53e7-8885-cc957af65cf0', 'Ironia', 'ironia', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1359c8be-07e5-5d7c-83f4-b088d8919570', 'cbe60c0c-a31f-517b-992d-b97874589763')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d711b03c-9397-5230-87e8-7c76de121428', '28576585-3294-53e7-8885-cc957af65cf0', 'Humor', 'humor', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2f8ec58f-69de-58ba-bb4f-b670d5cd44c8', 'd711b03c-9397-5230-87e8-7c76de121428')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('5b27ee7d-1bab-5464-812e-222cdcff6f5f', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Argumentação', 'argumentacao', NULL, 9)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f68c7a09-a414-5da3-90dd-f6a94a1cea09', '5b27ee7d-1bab-5464-812e-222cdcff6f5f', 'Tese', 'tese', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('235c9936-ab93-533a-9b8c-2cb7814a9847', 'f68c7a09-a414-5da3-90dd-f6a94a1cea09')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ad7b228f-040c-51a6-80da-cedf47c4efa9', '5b27ee7d-1bab-5464-812e-222cdcff6f5f', 'Argumentos', 'argumentos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fae05b45-7fd4-5da2-afec-d2fdfd62d33a', 'ad7b228f-040c-51a6-80da-cedf47c4efa9')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('970676d0-17b0-558b-826a-91d5dc93fb50', '5b27ee7d-1bab-5464-812e-222cdcff6f5f', 'Estratégias persuasivas', 'estrategias-persuasivas', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9edbe931-dcb4-5f5c-ac9a-391bc9a270d7', '970676d0-17b0-558b-826a-91d5dc93fb50')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('36aa9f82-3749-5cdf-ae86-b7a726dab2be', '5b27ee7d-1bab-5464-812e-222cdcff6f5f', 'Posicionamento crítico', 'posicionamento-critico', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6f7169b8-afbe-52e7-a3fc-2e3038b3cbed', '36aa9f82-3749-5cdf-ae86-b7a726dab2be')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('41439e64-0875-5769-8729-05f038eca511', '5b27ee7d-1bab-5464-812e-222cdcff6f5f', 'Recursos argumentativos', 'recursos-argumentativos', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('318fd612-0343-5b56-9893-9af2c28d38e9', '41439e64-0875-5769-8729-05f038eca511')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('442ca518-0443-51df-b821-9ef54576d2eb', '3207dcaf-42e4-5fd3-a7b2-82c5e63a4e66', 'Tecnologias da comunicação e informação', 'tecnologias-da-comunicacao-e-informacao', NULL, 10)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('faedcb44-db53-5d31-b4d1-5931db669794', '442ca518-0443-51df-b821-9ef54576d2eb', 'Redes sociais', 'redes-sociais', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1c3b2f21-4035-50fe-ae7e-9ec88f9bb58f', 'faedcb44-db53-5d31-b4d1-5931db669794')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('48e55318-1d85-51e9-ab80-f0b85734738e', '442ca518-0443-51df-b821-9ef54576d2eb', 'Cultura digital', 'cultura-digital', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7e3c2ed4-1086-538b-957d-9c8d22725722', '48e55318-1d85-51e9-ab80-f0b85734738e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f9b6f010-9d13-5324-9514-7d3a36efaee1', '442ca518-0443-51df-b821-9ef54576d2eb', 'Fake news', 'fake-news', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('673c70d5-91d8-54ef-9e25-f54cba41ac91', 'f9b6f010-9d13-5324-9514-7d3a36efaee1')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('79b4d8c6-1156-5c08-9afe-c3c91dce55c7', '442ca518-0443-51df-b821-9ef54576d2eb', 'Comunicação na internet', 'comunicacao-na-internet', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('31fd03a6-8825-5ea2-a151-2863eb4edf4c', '79b4d8c6-1156-5c08-9afe-c3c91dce55c7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1339850c-8915-5a77-a3ae-ed456f0eea76', '442ca518-0443-51df-b821-9ef54576d2eb', 'Impactos das tecnologias na linguagem', 'impactos-das-tecnologias-na-linguagem', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a42b1cea-9ce4-5563-a818-1dc5e0edebed', '1339850c-8915-5a77-a3ae-ed456f0eea76')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('e11c8f04-f109-594a-bc47-84383394b7d7', 'Matemática', 'matematica', 'Ciência do raciocínio lógico, padrões, números, estruturas, formas geométricas, álgebra e análise de dados.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('45137419-1a4a-5bb4-aa5a-c12f0d000228', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Aritmética e Fundamentos Numéricos', 'aritmetica-e-fundamentos-numericos', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1707b359-cfae-56f2-b9b0-f89c39a9c40f', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Operações Básicas', 'operacoes-basicas', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f24313af-16cf-53fc-a951-282692083bc7', '1707b359-cfae-56f2-b9b0-f89c39a9c40f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('912e61c9-8ceb-5b8b-8927-af2084fc1653', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Números Inteiros', 'numeros-inteiros', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('44a76d0c-bddd-57cc-869d-c4fb034236ff', '912e61c9-8ceb-5b8b-8927-af2084fc1653')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('61ed92e8-e907-5dbb-8fae-898e45245d2b', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Frações', 'fracoes', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('e573086f-7e04-5fc5-a76b-dd5b51306b2a', '61ed92e8-e907-5dbb-8fae-898e45245d2b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c37f6549-093d-5ada-8626-e56c25a56bf7', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Números Decimais', 'numeros-decimais', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('483c9b2c-799f-5948-b431-fa5135227010', 'c37f6549-093d-5ada-8626-e56c25a56bf7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d4672c7d-3cc3-55ec-becd-1310d3181cf2', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Razão e Proporção', 'razao-e-proporcao', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9da671e4-7e56-5ed9-98c2-d1586a66ebc6', 'd4672c7d-3cc3-55ec-becd-1310d3181cf2')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cb7a5ea9-24c0-5b39-aaa9-0497342322b4', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Porcentagem', 'porcentagem', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('83d1e2ec-0dc3-5be4-ba5a-f5463d6c89fa', 'cb7a5ea9-24c0-5b39-aaa9-0497342322b4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('dc4cd737-e254-52d5-8ff3-81e66bcbac8a', '45137419-1a4a-5bb4-aa5a-c12f0d000228', 'Notação Científica', 'notacao-cientifica', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('255b6048-23e8-52d5-a1f8-c0cb1ea58c66', 'dc4cd737-e254-52d5-8ff3-81e66bcbac8a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('e297640c-ba2e-5816-9372-783843132335', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Álgebra', 'algebra', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ccdf3fdb-ca42-5202-8f60-d80054d807c8', 'e297640c-ba2e-5816-9372-783843132335', 'Expressões Algébricas', 'expressoes-algebricas', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('23552c25-1c19-5a07-96ac-fbc5a32e7509', 'ccdf3fdb-ca42-5202-8f60-d80054d807c8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5434c37c-5c27-55f0-89c0-a6b16e8680fd', 'e297640c-ba2e-5816-9372-783843132335', 'Equações', 'equacoes', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2a2cc012-6501-5454-8158-8f1fa5cce597', '5434c37c-5c27-55f0-89c0-a6b16e8680fd')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1a7b05b0-d232-5b7b-811c-f29ab82f2bb9', 'e297640c-ba2e-5816-9372-783843132335', 'Inequações', 'inequacoes', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f30e449e-65ea-5db1-8faa-f4ec4ac9f026', '1a7b05b0-d232-5b7b-811c-f29ab82f2bb9')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('56eb33d8-a51b-50d0-bd83-4c8edc59bd79', 'e297640c-ba2e-5816-9372-783843132335', 'Equações Polinomiais', 'equacoes-polinomiais', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('42da40e7-8d90-5631-889a-5ea6adb5ab14', '56eb33d8-a51b-50d0-bd83-4c8edc59bd79')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5e0e1661-4d24-5d91-bc5a-ef485562a917', 'e297640c-ba2e-5816-9372-783843132335', 'Números Complexos', 'numeros-complexos', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c87f56a9-2e03-5d04-96ef-5d6b59e9c2b7', '5e0e1661-4d24-5d91-bc5a-ef485562a917')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('da12da96-1a25-5910-99ca-e0950228ce58', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Funções', 'funcoes', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('8fd6efe6-5236-5ce5-9d05-9885e61041e0', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Conceitos Básicos', 'conceitos-basicos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2b9b2e59-2b5e-5b56-80cf-8eb2d28f737c', '8fd6efe6-5236-5ce5-9d05-9885e61041e0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('df1acf86-64f5-596b-a44a-4d29c3e4dec8', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Função Afim', 'funcao-afim', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f3a9f70d-ac5c-5238-8b0c-f4e2b93a6c37', 'df1acf86-64f5-596b-a44a-4d29c3e4dec8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d3684bd7-c596-5f2d-ab4e-7b90e0b17438', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Função Quadrática', 'funcao-quadratica', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('176a43b5-6931-59b2-a6a7-cc76d83ae1c8', 'd3684bd7-c596-5f2d-ab4e-7b90e0b17438')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('75abaa34-d7d0-5974-8a9e-34928824c1f4', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Função Modular', 'funcao-modular', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c78ea30c-d4b5-56d1-a027-9033cc0d7fcc', '75abaa34-d7d0-5974-8a9e-34928824c1f4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('895088f9-81ae-57a0-95d1-e15011e35a04', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Função Exponencial', 'funcao-exponencial', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1a4db5db-7563-5af7-b931-9f51a7e64720', '895088f9-81ae-57a0-95d1-e15011e35a04')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4890a7de-3b0a-5ee9-b2a4-9def133f17c3', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Função Logarítmica', 'funcao-logaritmica', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7e06b6ec-5507-5cf1-beba-081a9ba4556e', '4890a7de-3b0a-5ee9-b2a4-9def133f17c3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('78019b42-33f0-5765-b83e-c648f3015e33', 'da12da96-1a25-5910-99ca-e0950228ce58', 'Funções Trigonométricas', 'funcoes-trigonometricas', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7e4e389c-c00e-5a8d-8f9f-570e4ddd2006', '78019b42-33f0-5765-b83e-c648f3015e33')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('8e2580e9-0636-5de3-8f30-b857249fbb1d', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Geometria Plana', 'geometria-plana', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('7c8f0f03-2ce5-5b91-b13e-e692cbdefd00', '8e2580e9-0636-5de3-8f30-b857249fbb1d', 'Ângulos', 'angulos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('51405377-30df-5214-ac2b-fd8528268c19', '7c8f0f03-2ce5-5b91-b13e-e692cbdefd00')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cffcafd8-547e-58bb-be5e-fedab8852ced', '8e2580e9-0636-5de3-8f30-b857249fbb1d', 'Triângulos', 'triangulos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bb3fec00-03ef-5e1e-b5e1-2c5050594e15', 'cffcafd8-547e-58bb-be5e-fedab8852ced')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('4ff351f5-1dab-56a6-9320-c6f4893776d5', '8e2580e9-0636-5de3-8f30-b857249fbb1d', 'Quadriláteros', 'quadrilateros', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7864dc9f-755d-5e74-bc43-5bbfc53d1b5d', '4ff351f5-1dab-56a6-9320-c6f4893776d5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('23d43fc6-b66b-5b83-82a0-090ebbe1c17e', '8e2580e9-0636-5de3-8f30-b857249fbb1d', 'Circunferência', 'circunferencia', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c4623ffd-9590-5cc3-8ca9-81c9382059d9', '23d43fc6-b66b-5b83-82a0-090ebbe1c17e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d5818002-50fd-5d14-abc5-7ac159bf239c', '8e2580e9-0636-5de3-8f30-b857249fbb1d', 'Polígonos', 'poligonos', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d51faf56-b823-5f72-98b8-7a84b50d2be1', 'd5818002-50fd-5d14-abc5-7ac159bf239c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('bb312a85-9e99-53a6-89f0-9eaaf2fa7b4b', '8e2580e9-0636-5de3-8f30-b857249fbb1d', 'Áreas', 'areas', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a3efab9d-31b5-5799-ae35-fc6c27d344e2', 'bb312a85-9e99-53a6-89f0-9eaaf2fa7b4b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('d5b83ee5-c08e-5691-8792-15763854a949', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Geometria Espacial', 'geometria-espacial', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a11ee626-10fb-5ba3-8953-bfebb96b5d00', 'd5b83ee5-c08e-5691-8792-15763854a949', 'Geometria de Posição', 'geometria-de-posicao', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0a83802d-c1d4-5270-8a1e-ed32226db0c3', 'a11ee626-10fb-5ba3-8953-bfebb96b5d00')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('096fb4a7-25a7-5462-b318-79292977d21b', 'd5b83ee5-c08e-5691-8792-15763854a949', 'Prismas', 'prismas', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bccab296-16d6-54de-b8c5-12812672ca43', '096fb4a7-25a7-5462-b318-79292977d21b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('de69511c-8240-5d76-b6c1-e12172b16c8b', 'd5b83ee5-c08e-5691-8792-15763854a949', 'Pirâmides', 'piramides', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fca73009-0d58-5675-b63e-99472aa43ae3', 'de69511c-8240-5d76-b6c1-e12172b16c8b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('0c6e343c-d86c-5126-a5d0-a28f05bdf80d', 'd5b83ee5-c08e-5691-8792-15763854a949', 'Cilindros', 'cilindros', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('30e4b637-f55d-58df-92b1-2619bd14f6c1', '0c6e343c-d86c-5126-a5d0-a28f05bdf80d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9ad96699-e2eb-57ba-bf58-71f6ed6b5440', 'd5b83ee5-c08e-5691-8792-15763854a949', 'Cones', 'cones', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2a5be3f4-e050-58fa-adde-9a95825a70f8', '9ad96699-e2eb-57ba-bf58-71f6ed6b5440')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('53555562-e704-5cbb-8d8d-73825cc4fe7b', 'd5b83ee5-c08e-5691-8792-15763854a949', 'Esferas', 'esferas', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9fe3c57b-ec00-59a1-b4b5-2aa420e69405', '53555562-e704-5cbb-8d8d-73825cc4fe7b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('640809ae-4242-5edc-bd4f-4d62e005c1a0', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Geometria Analítica', 'geometria-analitica', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e494f8a5-6d4c-5d06-94eb-5ad6e8fd7aa0', '640809ae-4242-5edc-bd4f-4d62e005c1a0', 'Plano Cartesiano', 'plano-cartesiano', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('51a0f11c-23d6-5913-8d2b-a32dfd05ba29', 'e494f8a5-6d4c-5d06-94eb-5ad6e8fd7aa0')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('515344dd-c03e-5bc0-9ebe-ef6e2315e272', '640809ae-4242-5edc-bd4f-4d62e005c1a0', 'Distância entre pontos', 'distancia-entre-pontos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f360e85e-6c00-5b51-8bea-879d13143745', '515344dd-c03e-5bc0-9ebe-ef6e2315e272')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c1ee4032-42b0-5ba9-a568-561022882ef2', '640809ae-4242-5edc-bd4f-4d62e005c1a0', 'Ponto médio', 'ponto-medio', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bc15328f-0b4f-5313-8e06-145d36d2d4b4', 'c1ee4032-42b0-5ba9-a568-561022882ef2')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ef3aa236-10c9-5183-8244-7cc8e4d12206', '640809ae-4242-5edc-bd4f-4d62e005c1a0', 'Equação da reta', 'equacao-da-reta', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7bd8413f-5a11-5655-b45d-96171e4d51c1', 'ef3aa236-10c9-5183-8244-7cc8e4d12206')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('efdfdd2d-2025-59bc-85f4-8f915edd13bf', '640809ae-4242-5edc-bd4f-4d62e005c1a0', 'Coeficiente angular', 'coeficiente-angular', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b0110088-2de0-57d8-b82c-18d2ed7b339b', 'efdfdd2d-2025-59bc-85f4-8f915edd13bf')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d3bb5a73-6505-5a79-8077-0f4c1b405591', '640809ae-4242-5edc-bd4f-4d62e005c1a0', 'Circunferência', 'circunferencia', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8fa9595c-1504-5845-b93d-f78fc2e25bd3', 'd3bb5a73-6505-5a79-8077-0f4c1b405591')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('5d38c901-75d6-5731-a24d-73c4e172eb35', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Trigonometria', 'trigonometria', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('51a4031e-359e-5e12-981c-e4ddfda63cf6', '5d38c901-75d6-5731-a24d-73c4e172eb35', 'Razões trigonométricas', 'razoes-trigonometricas', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('481822d6-a4d4-5308-9caf-5607ebdc672b', '51a4031e-359e-5e12-981c-e4ddfda63cf6')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('fddab7e2-6d70-5b33-a033-69c17aa30164', '5d38c901-75d6-5731-a24d-73c4e172eb35', 'Ciclo trigonométrico', 'ciclo-trigonometrico', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('cb136238-2fd3-5786-afca-f03bbad13e1b', 'fddab7e2-6d70-5b33-a033-69c17aa30164')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a849a09c-49bd-5f1c-bbee-8bd7fa1bceb6', '5d38c901-75d6-5731-a24d-73c4e172eb35', 'Lei dos senos', 'lei-dos-senos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c055c1a7-cdc3-551f-8a24-cf031e5c2583', 'a849a09c-49bd-5f1c-bbee-8bd7fa1bceb6')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3669c96e-0f5d-5910-b6a0-506a315a0f8c', '5d38c901-75d6-5731-a24d-73c4e172eb35', 'Lei dos cossenos', 'lei-dos-cossenos', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8be45186-16a2-50a4-9166-ed7aa1309bea', '3669c96e-0f5d-5910-b6a0-506a315a0f8c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9e4fd863-02e2-5a3a-97bc-81ee67c99d3d', '5d38c901-75d6-5731-a24d-73c4e172eb35', 'Identidades trigonométricas', 'identidades-trigonometricas', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f5324742-6e04-515b-8bb2-a2852206af0c', '9e4fd863-02e2-5a3a-97bc-81ee67c99d3d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Análise Combinatória e Probabilidade', 'analise-combinatoria-e-probabilidade', NULL, 8)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('0ec8cdc6-4e7e-53c9-a0fa-ca7acef40c2c', '3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'Princípio Fundamental da Contagem', 'principio-fundamental-da-contagem', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8eceab0c-7384-591e-9e15-23f47ad799b7', '0ec8cdc6-4e7e-53c9-a0fa-ca7acef40c2c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('8e80b7e6-3303-5765-8e55-4af9cc23276a', '3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'Permutações', 'permutacoes', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('12957fdd-26b5-5315-8cef-f95201e24b8c', '8e80b7e6-3303-5765-8e55-4af9cc23276a')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ea640f88-79ec-531a-a977-ebca673e1372', '3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'Arranjos', 'arranjos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b95c3ec3-8073-57c9-bef8-c123c66bfeb9', 'ea640f88-79ec-531a-a977-ebca673e1372')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('dff1558c-0a6b-5b61-8fa9-7a9e91e0b2d3', '3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'Combinações', 'combinacoes', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('203a2096-2c68-59e5-8767-c0fa0f433cdb', 'dff1558c-0a6b-5b61-8fa9-7a9e91e0b2d3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('68bfd86a-1574-5e1a-8663-ca4fd2c2e28c', '3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'Binômio de Newton', 'binomio-de-newton', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0085f41e-9dc1-59ab-9f17-67798510db25', '68bfd86a-1574-5e1a-8663-ca4fd2c2e28c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('92a5b894-d441-5d66-b68a-aeae9092d10c', '3de76cf8-20ff-5eee-89cb-d8bbe13669c3', 'Probabilidade', 'probabilidade', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('75fa8c49-a7ca-5793-8dc3-cd1c9877a980', '92a5b894-d441-5d66-b68a-aeae9092d10c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Estatística', 'estatistica', NULL, 9)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cf5919d1-381c-5393-97c2-1c196c271e30', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Média', 'media', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9eeaac95-db60-5378-8a13-8890acc7e9fd', 'cf5919d1-381c-5393-97c2-1c196c271e30')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('deb15453-ac4d-51b3-81e2-5462d43c7e8f', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Moda', 'moda', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('38c0b38a-79c7-5a98-83b4-cd805b3de5f2', 'deb15453-ac4d-51b3-81e2-5462d43c7e8f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9be74f03-13ed-5068-a136-adcd1e405de4', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Mediana', 'mediana', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6662d80a-3c6f-5338-b644-47c617579f6c', '9be74f03-13ed-5068-a136-adcd1e405de4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('7d47db44-cf79-5bd8-aeef-d6c68e71bbe2', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Desvio padrão', 'desvio-padrao', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('7dd5f651-68e1-5a93-b0c1-042e5731e92c', '7d47db44-cf79-5bd8-aeef-d6c68e71bbe2')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e2dda8d9-ddd9-5f1f-9e4d-d69804cf06ef', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Variância', 'variancia', NULL, 5)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ea03915a-200f-58a3-8064-5eb82aa9cb92', 'e2dda8d9-ddd9-5f1f-9e4d-d69804cf06ef')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('24ca7e77-c9a3-5dc1-93cd-7f155d11bf76', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Quartis e percentis', 'quartis-e-percentis', NULL, 6)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('9d0c381c-c1dc-5cbb-992c-8ff89654aef1', '24ca7e77-c9a3-5dc1-93cd-7f155d11bf76')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('769fb75b-3359-5ea1-a7ee-72e526574c29', '79dd45b5-575d-5cb8-b854-ecdbe96cab54', 'Interpretação de gráficos', 'interpretacao-de-graficos', NULL, 7)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4540eb86-5ad5-56dd-99b7-37bca1086c30', '769fb75b-3359-5ea1-a7ee-72e526574c29')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('13e9e46f-009a-5f57-81d5-75946705fc08', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Matemática Financeira', 'matematica-financeira', NULL, 10)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('81173663-2bd9-5974-a699-151f147c1056', '13e9e46f-009a-5f57-81d5-75946705fc08', 'Juros simples', 'juros-simples', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('e7763d01-ee8f-5b85-9f3b-164d0c2096a5', '81173663-2bd9-5974-a699-151f147c1056')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1f7a8557-8578-53f0-93f2-155a4e5c7386', '13e9e46f-009a-5f57-81d5-75946705fc08', 'Juros compostos', 'juros-compostos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a9955478-1688-5e11-a6c6-d8b7bca868f3', '1f7a8557-8578-53f0-93f2-155a4e5c7386')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5748ea5d-da17-5304-adfa-453569c01b2b', '13e9e46f-009a-5f57-81d5-75946705fc08', 'Descontos', 'descontos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('73d0be63-0e68-57b4-88c5-9552f4cef172', '5748ea5d-da17-5304-adfa-453569c01b2b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('af93457d-a9fd-5f78-923b-50281b5dcbb4', '13e9e46f-009a-5f57-81d5-75946705fc08', 'Sistemas de amortização', 'sistemas-de-amortizacao', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('b454ca71-a96b-5c3b-873e-7a32fdb2047e', 'af93457d-a9fd-5f78-923b-50281b5dcbb4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('14c734e3-3f8d-5c11-9f49-b00b5f2c145a', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Sequências', 'sequencias', NULL, 11)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('7ee7674e-2e1b-5264-b31d-3594a22a6532', '14c734e3-3f8d-5c11-9f49-b00b5f2c145a', 'Progressão Aritmética (PA)', 'progressao-aritmetica-pa', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d4f5070b-0780-5811-b676-ace2ba749d69', '7ee7674e-2e1b-5264-b31d-3594a22a6532')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f4be1fc2-aee7-57ee-9576-46538d59bc70', '14c734e3-3f8d-5c11-9f49-b00b5f2c145a', 'Progressão Geométrica (PG)', 'progressao-geometrica-pg', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('63bd25b9-1a2c-59a4-b9e7-944d1bbcffca', 'f4be1fc2-aee7-57ee-9576-46538d59bc70')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e1972aa7-1bb2-57f9-9be2-1d95f0e699c9', '14c734e3-3f8d-5c11-9f49-b00b5f2c145a', 'Soma dos termos', 'soma-dos-termos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('00828097-31fe-5215-856b-0cc0a3f190b1', 'e1972aa7-1bb2-57f9-9be2-1d95f0e699c9')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('fe17de47-1e3d-5eb8-8f95-21ea17cf7b6e', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Matrizes, Determinantes e Sistemas', 'matrizes-determinantes-e-sistemas', NULL, 12)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e63ff64a-17f7-5935-afac-7c1b88a7ef76', 'fe17de47-1e3d-5eb8-8f95-21ea17cf7b6e', 'Matrizes', 'matrizes', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0250682b-2a72-595b-83e5-fbd3fb554eab', 'e63ff64a-17f7-5935-afac-7c1b88a7ef76')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('6e30aec6-3f7b-58d8-9e0b-85d477b83a3e', 'fe17de47-1e3d-5eb8-8f95-21ea17cf7b6e', 'Determinantes', 'determinantes', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d4e79e89-1c8e-514d-863b-a9644dfacb2a', '6e30aec6-3f7b-58d8-9e0b-85d477b83a3e')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('cd72573c-5293-5cd5-95f6-dc7c4092fb4b', 'fe17de47-1e3d-5eb8-8f95-21ea17cf7b6e', 'Sistemas lineares', 'sistemas-lineares', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('97f41693-c0eb-526c-a4fc-e23d53e788e2', 'cd72573c-5293-5cd5-95f6-dc7c4092fb4b')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('6846b425-85a5-579a-adc4-b1c7ccc5d247', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Conjuntos', 'conjuntos', NULL, 13)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('2b04f6c8-3a15-5263-950b-84e8ceb99e75', '6846b425-85a5-579a-adc4-b1c7ccc5d247', 'Operações entre conjuntos', 'operacoes-entre-conjuntos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('dda41b71-c222-5a19-b01f-a894aac59743', '2b04f6c8-3a15-5263-950b-84e8ceb99e75')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('af0dccd0-f153-5d38-a49e-af0ba79c31c5', '6846b425-85a5-579a-adc4-b1c7ccc5d247', 'Diagramas de Venn', 'diagramas-de-venn', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('c197d182-0d12-54f0-8e60-b1601fccf55a', 'af0dccd0-f153-5d38-a49e-af0ba79c31c5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b8fad37a-de2e-5390-bb0f-c74903034a28', '6846b425-85a5-579a-adc4-b1c7ccc5d247', 'Intervalos', 'intervalos', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('bd07f85c-8865-588c-8fbe-2318ec747e71', 'b8fad37a-de2e-5390-bb0f-c74903034a28')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('1fd9c880-2d1f-5923-a5fb-f5e9d411f363', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Lógica Matemática', 'logica-matematica', NULL, 14)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('44781ad8-9629-5a90-a54f-74ec63b9d880', '1fd9c880-2d1f-5923-a5fb-f5e9d411f363', 'Proposições', 'proposicoes', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('868b4ae9-9ef3-5dd4-b51f-44ae9011ee12', '44781ad8-9629-5a90-a54f-74ec63b9d880')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('549a2702-b51e-5c51-aa92-33c1155db267', '1fd9c880-2d1f-5923-a5fb-f5e9d411f363', 'Conectivos lógicos', 'conectivos-logicos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0afa6854-e0fd-599b-858e-14865bada807', '549a2702-b51e-5c51-aa92-33c1155db267')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('eb055cc8-59d9-57de-8607-a80aaa2c4422', '1fd9c880-2d1f-5923-a5fb-f5e9d411f363', 'Tabelas verdade', 'tabelas-verdade', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('3d88eab9-159f-52fa-85f6-c91b2cc1a64d', 'eb055cc8-59d9-57de-8607-a80aaa2c4422')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f10dd666-70e6-52d8-921d-b5f7f6a10640', '1fd9c880-2d1f-5923-a5fb-f5e9d411f363', 'Argumentação lógica', 'argumentacao-logica', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('51d4ce5f-49dd-57dc-883a-5a9b0a0fa647', 'f10dd666-70e6-52d8-921d-b5f7f6a10640')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('ddcac6b0-3cb6-5c60-b120-2cdef9336fc6', 'e11c8f04-f109-594a-bc47-84383394b7d7', 'Interpretação Matemática', 'interpretacao-matematica', NULL, 15)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('e4493b34-3c4a-5e22-8fc2-44d9818abd45', 'ddcac6b0-3cb6-5c60-b120-2cdef9336fc6', 'Leitura de gráficos', 'leitura-de-graficos', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f0ec7ded-f0cd-545d-922c-5e624fbeb667', 'e4493b34-3c4a-5e22-8fc2-44d9818abd45')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('b97320c4-b72c-5b27-983e-d1f1dce2b8e7', 'ddcac6b0-3cb6-5c60-b120-2cdef9336fc6', 'Modelagem matemática', 'modelagem-matematica', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('48fa1406-e115-5c1a-91fe-250b105c407a', 'b97320c4-b72c-5b27-983e-d1f1dce2b8e7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1e55b7ea-247f-58a2-ab74-6a168cc55c12', 'ddcac6b0-3cb6-5c60-b120-2cdef9336fc6', 'Problemas contextualizados', 'problemas-contextualizados', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1c54c961-d118-599f-a86c-2ecdc06ba610', '1e55b7ea-247f-58a2-ab74-6a168cc55c12')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('c571809d-57d5-56c6-adc3-3f198b32f14f', 'ddcac6b0-3cb6-5c60-b120-2cdef9336fc6', 'Análise de tabelas', 'analise-de-tabelas', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2fbce396-828c-555b-ba79-4d7a7c4e8e58', 'c571809d-57d5-56c6-adc3-3f198b32f14f')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.disciplines (id, name, slug, description)
VALUES ('006a6b7a-e214-5574-b246-7788ab0a0e23', 'Sociologia', 'sociologia', 'Investigação científica das relações sociais, instituições, cultura, estruturas de poder e transformações da sociedade.')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('791b343b-9b35-5785-ad47-d878babf37a3', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Fundamentos da Sociologia', 'fundamentos-da-sociologia', NULL, 1)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('a3bcfca5-6f4f-51ae-b9b6-36d7e638449c', '791b343b-9b35-5785-ad47-d878babf37a3', 'Surgimento da Sociologia', 'surgimento-da-sociologia', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('dba508aa-5ee2-583c-bf58-0e2d6d77619f', 'a3bcfca5-6f4f-51ae-b9b6-36d7e638449c')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3e76284b-e2fb-57fd-91a8-9db543889116', '791b343b-9b35-5785-ad47-d878babf37a3', 'Teóricos Clássicos', 'teoricos-classicos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('facc0bea-8c8f-5fcf-8bff-496fda27ac92', '3e76284b-e2fb-57fd-91a8-9db543889116')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('f3c19f86-9016-5e0c-87e6-2f3fa18aa1c5', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Cultura e Sociedade', 'cultura-e-sociedade', NULL, 2)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('1bdeaa48-f892-54ae-bb74-debc5e0645c6', 'f3c19f86-9016-5e0c-87e6-2f3fa18aa1c5', 'Conceito de Cultura', 'conceito-de-cultura', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('910af14e-e669-5998-a4c2-257feb35bf79', '1bdeaa48-f892-54ae-bb74-debc5e0645c6')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('d760ea7e-2db0-5561-bae8-db9da3f345e7', 'f3c19f86-9016-5e0c-87e6-2f3fa18aa1c5', 'Diversidade Cultural', 'diversidade-cultural', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5289de67-383b-52ac-a6ce-fe581d5718e4', 'd760ea7e-2db0-5561-bae8-db9da3f345e7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('98bad643-f617-53be-ad63-a8ee051e30e8', 'f3c19f86-9016-5e0c-87e6-2f3fa18aa1c5', 'Identidade Social', 'identidade-social', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('fda53370-efc9-55a6-8655-a6e4e8a7af3b', '98bad643-f617-53be-ad63-a8ee051e30e8')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('50435a04-8774-5744-b94e-86fef500c9e8', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Estratificação e Desigualdade Social', 'estratificacao-e-desigualdade-social', NULL, 3)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9a2bac9f-2cf1-5228-9456-a16eeed43f03', '50435a04-8774-5744-b94e-86fef500c9e8', 'Classes Sociais', 'classes-sociais', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('a55bf131-5146-533e-a379-73e4c8298abf', '9a2bac9f-2cf1-5228-9456-a16eeed43f03')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('8cb3879a-e58a-51a0-a1bc-a6841966a378', '50435a04-8774-5744-b94e-86fef500c9e8', 'Desigualdade e Pobreza', 'desigualdade-e-pobreza', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('cb6e8586-6c9b-55b3-a22e-22d0ec7a1d8b', '8cb3879a-e58a-51a0-a1bc-a6841966a378')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('131b5640-6acf-5753-ba5e-5ae6d5942c90', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Trabalho e Sociedade', 'trabalho-e-sociedade', NULL, 4)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('3eee5d1e-ceb8-517f-90e0-37600b13b841', '131b5640-6acf-5753-ba5e-5ae6d5942c90', 'Divisão Social do Trabalho', 'divisao-social-do-trabalho', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('8057b7ec-9f0f-5ca0-bfaa-e49d62ea0c93', '3eee5d1e-ceb8-517f-90e0-37600b13b841')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('2449d848-9f0f-5584-8ca4-4c9e138494ad', '131b5640-6acf-5753-ba5e-5ae6d5942c90', 'Transformações no Mundo do Trabalho', 'transformacoes-no-mundo-do-trabalho', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('aa788ab1-9c2c-56e6-b476-a13ae6cb89c7', '2449d848-9f0f-5584-8ca4-4c9e138494ad')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('8479eb12-e2a9-5d97-99cf-9912163bd9ad', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Movimentos Sociais e Cidadania', 'movimentos-sociais-e-cidadania', NULL, 5)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('89fc5e83-e7ab-58af-85e4-20d01e04dfe3', '8479eb12-e2a9-5d97-99cf-9912163bd9ad', 'Movimentos Sociais', 'movimentos-sociais', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('1930974b-176f-5ddd-9cc1-617f01ab862f', '89fc5e83-e7ab-58af-85e4-20d01e04dfe3')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5a8fb642-083c-56fd-9dab-4b7953c1fde2', '8479eb12-e2a9-5d97-99cf-9912163bd9ad', 'Cidadania e Direitos', 'cidadania-e-direitos', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('0a86926e-9d56-54fb-abd5-f59fcf8bf380', '5a8fb642-083c-56fd-9dab-4b7953c1fde2')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('eb9f1771-746f-5ff3-8a24-7573728d77f2', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Instituições Sociais', 'instituicoes-sociais', NULL, 6)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('783272ff-43c5-5cc6-a6e0-984f804f44f1', 'eb9f1771-746f-5ff3-8a24-7573728d77f2', 'Família', 'familia', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('d6fc806b-71a4-5efe-8a05-2f2d79c2d6cf', '783272ff-43c5-5cc6-a6e0-984f804f44f1')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('152fc3e2-b615-50a7-a556-1275e70096f4', 'eb9f1771-746f-5ff3-8a24-7573728d77f2', 'Educação', 'educacao', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('ce1f9df8-4b5f-5574-8dd9-9021eb1d28a9', '152fc3e2-b615-50a7-a556-1275e70096f4')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('9d625e0e-fb45-58a7-bb98-bd6986465f7d', 'eb9f1771-746f-5ff3-8a24-7573728d77f2', 'Religião', 'religiao', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('102d5c71-a273-5739-b5f3-8c5f2b267d5c', '9d625e0e-fb45-58a7-bb98-bd6986465f7d')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('ffd47e0e-2250-5c37-89e7-b655ecfae1a5', 'eb9f1771-746f-5ff3-8a24-7573728d77f2', 'Estado', 'estado', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('6a90834a-0e2f-5f95-9d05-2024d18114f6', 'ffd47e0e-2250-5c37-89e7-b655ecfae1a5')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.subjects (id, discipline_id, name, slug, description, order_index)
VALUES ('33c438aa-6222-5d81-b18f-9f4688df3605', '006a6b7a-e214-5574-b246-7788ab0a0e23', 'Questões Contemporâneas', 'questoes-contemporaneas', NULL, 7)
ON CONFLICT (discipline_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('5fa22331-27b3-534e-b010-1842995ef7d7', '33c438aa-6222-5d81-b18f-9f4688df3605', 'Globalização e Sociedade', 'globalizacao-e-sociedade', NULL, 1)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('2a0130d5-70ce-5663-a016-0c121ec66660', '5fa22331-27b3-534e-b010-1842995ef7d7')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('213bf3c8-7252-5704-9828-ddac174de982', '33c438aa-6222-5d81-b18f-9f4688df3605', 'Violência e Segurança Pública', 'violencia-e-seguranca-publica', NULL, 2)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('f5100db4-1ac8-52a4-b10b-9918b99dca02', '213bf3c8-7252-5704-9828-ddac174de982')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('661050eb-68da-5016-a92e-a0297f087d04', '33c438aa-6222-5d81-b18f-9f4688df3605', 'Questões de Gênero e Raça', 'questoes-de-genero-e-raca', NULL, 3)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('4cd36bc1-9c2e-511d-9601-f3cf56a89f8d', '661050eb-68da-5016-a92e-a0297f087d04')
ON CONFLICT (topic_id) DO NOTHING;

INSERT INTO public.topics (id, subject_id, name, slug, description, order_index)
VALUES ('f26a4ebe-ca4b-570e-97c5-8202bbbca6d1', '33c438aa-6222-5d81-b18f-9f4688df3605', 'Meio Ambiente e Sociedade', 'meio-ambiente-e-sociedade', NULL, 4)
ON CONFLICT (subject_id, slug) DO UPDATE
SET name = EXCLUDED.name, order_index = EXCLUDED.order_index;

INSERT INTO public.materials (id, topic_id)
VALUES ('5dc87714-b1a6-55e5-92d1-6a570371943f', 'f26a4ebe-ca4b-570e-97c5-8202bbbca6d1')
ON CONFLICT (topic_id) DO NOTHING;

COMMIT;