const queries = {
    ensureDatabase: `CREATE DATABASE IF NOT EXISTS zynlibrary`,
    ensureArea: `CREATE TABLE IF NOT EXISTS Area(
        id_area INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome TEXT NOT NULL,
        descricao TEXT
    );`,
    ensureTopico: `CREATE TABLE IF NOT EXISTS Topico(
        id_topico INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome TEXT NOT NULL,
        id_area INT NOT NULL,
        FOREIGN KEY (id_area) REFERENCES Area(id_area)
    );`,
    ensureMaterialExterno: `CREATE TABLE IF NOT EXISTS MaterialExterno(
        id_material_externo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        material TEXT NOT NULL,
        tipo_material TEXT NOT NULL
        );`,
    ensureUsuario: `CREATE TABLE IF NOT EXISTS Usuario(
        id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        usuario VARCHAR(255) NOT NULL,
        senha TEXT NOT NULL,
        email VARCHAR(255),
        tipo_perfil ENUM('admin', 'professor', 'estudante'),
        imagem_perfil BLOB(65535)
        );`,
    ensureConteudo: `CREATE TABLE IF NOT EXISTS Conteudo(
        id_conteudo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nome TEXT NOT NULL,
        id_topico INT NOT NULL,
        conteudo_markdown MEDIUMTEXT NOT NULL,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_topico) REFERENCES Topico(id_topico),
        FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
    );`,
    ensureRecomendacao: `CREATE TABLE IF NOT EXISTS Recomendacao(
        id_recomendacao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_conteudo INT NOT NULL,
        id_material_externo INT NOT NULL,
        FOREIGN KEY (id_conteudo) REFERENCES Conteudo(id_conteudo),
        FOREIGN KEY (id_material_externo) REFERENCES MaterialExterno(id_material_externo)
    );`,
    ensurePalavraChave: `CREATE TABLE IF NOT EXISTS PalavraChave(
        id_palavrachave INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        palavrachave TEXT NOT NULL
    );`,
    ensureTagConteudo: `CREATE TABLE IF NOT EXISTS TagConteudo(
        id_tag_conteudo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_conteudo INT NOT NULL,
        id_palavrachave INT NOT NULL,
        FOREIGN KEY (id_conteudo) REFERENCES Conteudo(id_conteudo),
        FOREIGN KEY (id_palavrachave) REFERENCES PalavraChave(id_palavrachave)
    );`,
}

module.exports = queries