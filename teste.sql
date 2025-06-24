-- Atualizar conteúdos com markdown didático completo (aspas simples escapadas)
UPDATE Conteudo SET conteudo_markdown = '# Geometria Analítica
A geometria analítica une a álgebra e a geometria para estudar objetos no plano cartesiano.

## Principais tópicos:
- Distância entre pontos
- Ponto médio
- Equação da reta

### Fórmula da distância:
`d = √[(x₂ - x₁)² + (y₂ - y₁)²]`' WHERE id_conteudo = 1;
UPDATE Conteudo SET conteudo_markdown = '# Álgebra Linear
Álgebra linear trata do estudo de espaços vetoriais e transformações lineares.

## Conteúdo:
- Vetores e operações
- Matrizes e determinantes
- Sistemas lineares
' WHERE id_conteudo = 2;
UPDATE Conteudo SET conteudo_markdown = '# Cálculo Diferencial
O cálculo diferencial estuda a taxa de variação das funções.

## Tópicos:
- Limite de uma função
- Derivadas e aplicações
- Regras de derivação

### Exemplo de derivada:
Se `f(x) = x²`, então `f''(x) = 2x`' WHERE id_conteudo = 3;
UPDATE Conteudo SET conteudo_markdown = '# Mecânica Clássica
A mecânica clássica descreve o movimento de corpos sob a ação de forças.

## Leis de Newton:
1. Inércia
2. F = m · a
3. Ação e reação' WHERE id_conteudo = 4;
UPDATE Conteudo SET conteudo_markdown = '# Eletromagnetismo
O campo elétrico é criado por cargas elétricas e exerce força em outras cargas.

### Fórmula:
`E = F / q`' WHERE id_conteudo = 5;
UPDATE Conteudo SET conteudo_markdown = '# Reações Químicas
Reações químicas são processos que transformam substâncias.

## Tipos:
- Síntese
- Decomposição
- Deslocamento
- Dupla troca' WHERE id_conteudo = 6;
UPDATE Conteudo SET conteudo_markdown = '# Cadeias Alimentares
Representam as relações alimentares entre organismos de um ecossistema.

## Níveis tróficos:
- Produtores
- Consumidores
- Decompositores' WHERE id_conteudo = 7;
UPDATE Conteudo SET conteudo_markdown = '# Revolução Francesa
A Revolução Francesa foi um marco na história moderna, derrubando a monarquia absolutista.

## Fases:
- Assembleia Nacional
- Convenção
- Diretório' WHERE id_conteudo = 8;
UPDATE Conteudo SET conteudo_markdown = '# Climas e Biomas
A Terra possui diversos climas, que influenciam a vegetação e os biomas.

## Principais climas:
- Equatorial
- Tropical
- Temperado
- Árido' WHERE id_conteudo = 9;
UPDATE Conteudo SET conteudo_markdown = '# Literatura Realista
O Realismo surgiu no século XIX como reação ao romantismo.

## Características:
- Descrição objetiva
- Crítica social
- Personagens complexos' WHERE id_conteudo = 10;
UPDATE Conteudo SET conteudo_markdown = '# Lógica Filosófica
Lógica é o estudo do raciocínio válido.

## Conceitos:
- Proposições
- Tabelas-verdade
- Argumentos válidos' WHERE id_conteudo = 11;
UPDATE Conteudo SET conteudo_markdown = '# Estrutura Social
As classes sociais dividem a população com base em critérios econômicos e sociais.

## Tipos:
- Classe alta
- Classe média
- Classe baixa' WHERE id_conteudo = 12;
UPDATE Conteudo SET conteudo_markdown = '# Estruturas de Dados
Arrays e listas são estruturas lineares para armazenar dados.

## Operações:
- Inserção
- Remoção
- Busca
- Iteração' WHERE id_conteudo = 13;
UPDATE Conteudo SET conteudo_markdown = '# Programação Orientada a Objetos
POO organiza o código em torno de objetos e classes.

## Conceitos:
- Classe
- Objeto
- Herança
- Encapsulamento' WHERE id_conteudo = 14;
