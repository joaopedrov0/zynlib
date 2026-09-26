#!/bin/sh
set -e

echo "=========================================================="
echo " [ZynLib Pre-commit Hook] Validando qualidade de codigo..."
echo "=========================================================="

echo "1/3 Verificando Linter (ESLint)..."
npm run lint

echo "2/3 Verificando Testes Automatizados e Cobertura >= 90%..."
npm test

# Os testes rodam em jsdom e não separam Server/Client Components;
# só o build do Next pega, por exemplo, hooks do React importados numa página do servidor.
echo "3/3 Verificando Build de Produção (Next.js)..."
npm run build

echo "=========================================================="
echo " [ZynLib Pre-commit Hook] Todas as validacoes passaram! OK"
echo "=========================================================="
