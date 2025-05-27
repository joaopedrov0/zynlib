const DataManager = require('./modules/Database')

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


DataManager.Area.getById(2).then((res) => {
    console.log(res)
})


// DataManager.Area.update('descricao', 'A área que se dedica a entender e descobrar os pilares da matemática e suas consequências', 2)


// DataManager.Area.delete(2)



// let all = DataManager.Area.getAll()

// all.then(() => {
//     console.log("All")
//     console.log(all)
// })