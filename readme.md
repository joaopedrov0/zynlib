# Zyn Library (v2)

Uma plataforma colaborativa e aberta para catalogação e compartilhamento de conhecimento acadêmico e técnico.

## Arquitetura & Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions, TypeScript)
- **Backend & Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL gerenciado, Row Level Security, Supabase Auth com Google OAuth)
- **Estilização**: Tailwind CSS + Shadcn/UI
- **Versionamento de Conteúdo**: Revisões auditáveis com snapshots em Markdown e visualização de diffs estilo Git.

## Estrutura de Conhecimento
```text
Discipline (Disciplina) -> Subject (Assunto) -> Topic (Tópico) -> Material (1:1 Colaborativo)
```

## Documentação
- Modelo de dados relacional e script SQL DDL: [`docs/data-model.md`](./docs/data-model.md)

## Imagens dos materiais
A plataforma exibe imagens por URL e não tem upload próprio. As imagens ficam no bucket público `material-images` do Supabase Storage (criado em `supabase/schema.sql`).

1. Escreva o material em `materiais/<disciplina>/<assunto>/<material>.md` (pasta fora do git), referenciando as imagens por caminho relativo, como `![Legenda](imagens/figura.png)`.
2. Adicione `SUPABASE_SERVICE_ROLE_KEY` ao `.env.local` (veja `.env.example`).
3. Rode `npm run publish-images -- materiais/<disciplina>/<assunto>/<material>.md`.

O comando envia as imagens (PNG, JPEG, GIF ou WebP, até 5 MiB) e gera `<material>.zyn.md` com as URLs públicas, pronto para colar no editor. O arquivo original não é alterado, então dá para regenerar uma imagem e rodar de novo: a URL recebe uma versão nova e a imagem atualizada aparece sem esperar o cache.
