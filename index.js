const express = require('express')
const path = require('path')
const app = express()
const port = 3000
// const bodyParser = require('body-parser')

const DataManager = require("./modules/Database")

// Settings

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
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

app.get('/search', (req, res) => {
    DataManager.Area.getAll().then((areas) => {
        console.dir(areas)
        res.render("search-area", {"data": areas})
    })
})

app.get('/search/:area', (req, res) => {
    const { area } = req.params
    DataManager.Topico.getByArea(area).then((topicos) => {
        console.dir(topicos)
        res.render("search-topico", {
            "data": topicos
        })
    })
})

app.get('/register', (req, res) => {
    res.render('cadastro')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/register', (req, res) => {
    if (req.method == "POST"){
        const { nome, username, senha } = req.body
        console.log(`Tentativa de cadastro de nome ${nome}, username ${username} e senha ${senha}`)
        DataManager.Usuario.insert(nome, username, senha, null, null, null)
        res.redirect('/')
    }
})
app.post('/login', (req, res) => {
    if (req.method == "POST"){
        const { username, senha } = req.body
        console.log(`Tentativa de login de username ${username} e senha ${senha}`)
        res.redirect('/')
    }
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})