const queries = {
    ensureDatabase: `CREATE DATABASE IF NOT EXISTS mdblog`,
    ensureConteudo: `CREATE TABLE IF NOT EXISTS Conteudo(
        conteudo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        conteudo_markdown MEDIUMTEXT NOT NULL,
        autor_id INT NOT NULL,
        contagem_leituras BIGINT DEFAULT 0,
    );`,
    ensureMaterialExterno: `CREATE TABLE IF NOT EXISTS MaterialExterno(
        material_externo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        material TEXT NOT NULL,
        tipo_material_id INT NOT NULL
    );`,
    ensureTipoMaterial: `CREATE TABLE IF NOT EXISTS TipoMaterial(
        tipo_material_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome TEXT NOT NULL
    )`,
    ensureUsuario: `CREATE TABLE IF NOT EXISTS Usuario(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        usuario VARCHAR(255) NOT NULL
    )`,
    ensureRecomendacao: `CREATE TABLE IF NOT EXISTS Recomendacao(
        recomendacao_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        conteudo_id INT NOT NULL,
        material_externo_id INT NOT NULL,
        FOREIGN KEY (conteudo_id) REFERENCES Conteudo(conteudo_id),
        FOREIGN KEY (material_externo_id) REFERENCES MaterialExterno(material_externo_id)
    )`,
    ensurePalavraChave: `CREATE TABLE IF NOT EXISTS PalavraChave(
        palavrachave_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        palavrachave TEXT NOT NULL,
    )`,
    ensureTagConteudo: `CREATE TABLE IF NOT EXISTS TagConteudo(
        id_tag_conteudo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_conteudo INT NOT NULL,
        id_palavrachave INT NOT NULL,
        FOREIGN KEY (id_conteudo) REFERENCES Conteudo(id_conteudo),
        FOREIGN KEY (id_palavrachave) REFERENCES PalavraChave(id_palavrachave)
    )`
    
}