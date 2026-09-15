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