const DataManager = require('./modules/Database')
const queries = require('./modules/queries')
// let a = DataManager.Area.getById(1)
// let a = DataManager.genericGetById("Area", "id_area", 1)


    
// let a = DataManager.pool.query("SELECT * FROM Area WHERE id_area = 2")

// a.then(([rows, fields]) => {

//     console.log("A")
//     console.log(rows[0])   
// })

// let b = DataManager.genericGetById("Area", "id_area", 2)
// b.then(() => {
//     console.log("B")
//     console.log(b)
// })

// DataManager.pool.query("SELECT Topico.nome AS 'Topico', Area.nome AS 'Area' FROM Area INNER JOIN Topico ON (Topico.id_area = Area.id_area)").then((res) => {
//     const [rows, fields] = res
//     console.dir(rows)
// })

// DataManager.Usuario.matchUsernamePassword("emmaayers", "abacate").then((res) => {
//     console.log(res)
//     DataManager.pool.end()
// })

// DataManager.Conteudo.getByTopic(2).then((res) => {
//     console.log(res)
// })
// DataManager.pool.query()
// DataManager.pool.query("DROP TABLE Conteudo").then(() => {

//     DataManager.pool.query(queries['ensureConteudo']).then(() => {
//         DataManager.pool.end()
//     })
// })



// DataManager.Area.getById(2).then((res) => {
//     console.log(res)
// })


// DataManager.Area.insert("História", "Área que se dedica ao estudo e a documentação sistemática do passado humano")


// DataManager.Topico.insert("Revolução Francesa", 3)
// DataManager.Topico.insert("Império Romano", 3)
// DataManager.Topico.insert("Processos de Software", 1)
// DataManager.Topico.insert("Design Patterns", 1)

// DataManager.Area.update('descricao', 'A área que se dedica a entender e descobrar os pilares da matemática e suas consequências', 2)


// DataManager.Area.delete(2)



// let all = DataManager.Area.getAll()

// all.then(() => {
//     console.log("All")
//     console.log(all)
// })