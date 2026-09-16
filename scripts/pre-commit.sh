#!/bin/sh
set -e

echo "=========================================================="
echo " [ZynLib Pre-commit Hook] Validando qualidade de codigo..."
echo "=========================================================="

echo "1/2 Verificando Linter (ESLint)..."
npm run lint

echo "2/2 Verificando Testes Automatizados e Cobertura >= 90%..."
npm test

echo "=========================================================="
echo " [ZynLib Pre-commit Hook] Todas as validacoes passaram! OK"
echo "=========================================================="
