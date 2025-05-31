const queries = require('./queries')

const mysql = require('mysql2/promise')
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     // database: ''
// })

// connection.connect()

// function ensureAll(){
//     connection.query(queries['ensureDatabase'])
//     connection.query("USE zynlibrary")
//     connection.query(queries['ensureArea'])
//     connection.query(queries['ensureTopico'])
//     connection.query(queries['ensureConteudo'])
//     connection.query(queries['ensureMaterialExterno'])
//     connection.query(queries['ensureUsuario'])
//     connection.query(queries['ensureRecomendacao'])
//     connection.query(queries['ensurePalavraChave'])
//     connection.query(queries['ensureTagConteudo'])
// }
// // ensureAll()

// connection.end()

class DataManager {

    static pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'zynlibrary',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })

    static async genericInsert(table, placeholder, values){
        DataManager.pool.query(`INSERT INTO ${table} VALUES (NULL, ${placeholder})`, values)
    }

    static async genericUpdate(table, column, value, id_name, id){
        DataManager.pool.query(`UPDATE ${table} SET ${column} = ? WHERE ${id_name} = ?`, [value, id])
    }

    static async genericDelete(table, id_name, id){
        DataManager.pool.query(`DELETE FROM ${table} WHERE ${id_name} = ?`, [id])
    }

    static async genericGetById(table, id_name, id){
        const [rows, fields] = await DataManager.pool.query(`SELECT * FROM ${table} WHERE ${id_name} = ?`, [id])
        return rows[0]
    }

    static async genericGetAll(table){
        const [rows, fields] = await DataManager.pool.query(`SELECT * FROM ${table}`)
        return rows
    }

    static Area = {
        insert: async (nome, descricao) => {
            DataManager.genericInsert("Area", "?, ?", [nome, descricao])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("Area", column, value, "id_area", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("Area", "id_area", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("Area", "id_area", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("Area")
        },
    }
    static Topico = {
        insert: async (nome, id_area) => {
            DataManager.genericInsert("Topico", "?, ?", [nome, id_area])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("Topico", column, value, "id_topico", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("Topico", "id_topico", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("Topico", "id_topico", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("Topico")
        },
        getByArea: async (id) => {
            const [rows, fields] = await DataManager.pool.query(`SELECT * FROM Topico WHERE id_area = ?`, [id])
            return rows
        }
    }
    static Conteudo = {
        insert: async (conteudo_markdown, id_usuario) => {
            DataManager.genericInsert("Conteudo", "?, ?", [conteudo_markdown, id_usuario])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("Conteudo", column, value, "id_conteudo", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("Conteudo", "id_conteudo", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("Conteudo", "id_conteudo", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("Conteudo")
        },
        getAllSearch: async () => {
            // ! Testar query
            // Objetivo: recuperar o ID do
            const [rows, fields] = await DataManager.pool.query("SELECT Conteudo.id_conteudo, Usuario.id_usuario FROM Conteudo INNER JOIN Usuario ON (Conteudo.id_usuario = Usuario.id_usuario)")
            return rows
        }
    }
    static MaterialExterno = {
        insert: async (material, tipo_material) => {
            DataManager.genericInsert("MaterialExterno", "?, ?", [material, tipo_material])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("MaterialExterno", column, value, "id_material_externo", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("MaterialExterno", "id_material_externo", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("MaterialExterno", "id_material_externo", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("MaterialExterno")
        },
    }
    static Usuario = {
        insert: async (nome, usuario, senha, email, tipo_perfil, imagem_perfil) => {
            DataManager.genericInsert("Usuario", "?, ?, ?, ?, ?, ?", [nome, usuario, senha, email, tipo_perfil, imagem_perfil])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("Usuario", column, value, "id_usuario", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("Usuario", "id_usuario", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("Usuario", "id_usuario", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("Usuario")
        },
        matchUsernamePassword: async (usuario, senha) => {
            const [rows, fields] = await DataManager.pool.query(`SELECT * FROM Usuario WHERE (Usuario.usuario = ?) AND (Usuario.senha = ?)`, [usuario, senha])
            return rows.length > 0 ? rows[0] : null 
        }
    }
    static Recomendacao = {
        insert: async (id_conteudo, id_material_externo) => {
            DataManager.genericInsert("Recomendacao", "?, ?", [id_conteudo, id_material_externo])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("Recomendacao", column, value, "id_recomendacao", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("Recomendacao", "id_recomendacao", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("Recomendacao", "id_recomendacao", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("Recomendacao")
        },
    }
    static PalavraChave = {
        insert: async (palavrachave) => {
            DataManager.genericInsert("PalavraChave", "?", [palavrachave])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("PalavraChave", column, value, "id_palavrachave", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("PalavraChave", "id_palavrachave", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("PalavraChave", "id_palavrachave", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("PalavraChave")
        },
    }
    static TagConteudo = {
        insert: async (id_conteudo, id_palavrachave) => {
            DataManager.genericInsert("TagConteudo", "?, ?", [id_conteudo, id_palavrachave])
        },
        update: async (column, value, id) => {
            DataManager.genericUpdate("TagConteudo", column, value, "id_tag_conteudo", id)
        },
        delete: async (id) => {
            DataManager.genericDelete("TagConteudo", "id_tag_conteudo", id)
        },
        getById: async (id) => {
            return await DataManager.genericGetById("TagConteudo", "id_tag_conteudo", id)
        },
        getAll: async () => {
            return await DataManager.genericGetAll("TagConteudo")
        },
    }
}

module.exports = DataManager