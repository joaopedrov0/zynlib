const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const DataManager = require("./modules/Database")

// Settings

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// DataManager.Area.insert("Engenharia de Software", "Uma área dedicada ao estudo dos processos de alto nível do desenvolvimento de software.")

let res = DataManager.Area.getAll()

console.log(res)

// res.then(()=>{
//     console.log(res)
// })

// ! ====================================================
// ! SEGUINTE: Você terminou de criar os métodos de 
// ! interação com o banco de dados, mas não testou eles, 
// ! então da próxima vez que você for codar nesse 
// ! projeto, você vai programar as rotas de criação de 
// ! areas, topicos, conteudos etc... 
// ! ====================================================



app.get('/', (req, res) => {
    res.render('index')
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})