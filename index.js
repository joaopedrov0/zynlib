const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const cookieParser = require("cookie-parser")
// const bodyParser = require('body-parser')

const DataManager = require("./modules/Database")

// Settings

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// DataManager.Area.insert("Engenharia de Software", "Uma área dedicada ao estudo dos processos de alto nível do desenvolvimento de software.")

const cookieConfig = {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
}

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
    const loginInfo = req.cookies.user
    
    res.render('index', {
        loginInfo
    })
})

app.get('/search', (req, res) => {
    const loginInfo = req.cookies.user
    DataManager.Area.getAll().then((areas) => {
        console.dir(areas)
        res.render("search-area", {
            "data": areas,
            loginInfo
        })
    })
})

app.get('/search/:area', (req, res) => {
    const loginInfo = req.cookies.user
    const { area } = req.params
    DataManager.Topico.getByArea(area).then((topicos) => {
        console.dir(topicos)
        res.render("search-topico", {
            "data": topicos,
            loginInfo
        })
    })
})

app.get('/search/:area/:topic', (req, res) => {
    const loginInfo = req.cookies.user
    const { area, topic } = req.params
    DataManager.Conteudo.getByTopic(topic).then((conteudos) => {
        res.render('search-conteudo', {loginInfo, conteudos})
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
        DataManager.Usuario.matchUsernamePassword(username, senha).then((usuario) => {
            res.cookie("user", usuario, cookieConfig)
            res.redirect('/')
        })
    }
})

app.get('/create-area', (req, res) => {
    const loginInfo = req.cookies.user

    res.render('create-area', {loginInfo})
})

app.get('/create-topic', (req, res) => {
    const loginInfo = req.cookies.user

    DataManager.Area.getAll().then((areas) => {
        res.render('create-topic', {loginInfo, areas})
    })
})

app.get('/create-content', (req, res) => {
    const loginInfo = req.cookies.user
    DataManager.Area.getAll().then((areas) => {
        res.render('content-editor', {loginInfo, areas})
    })
    // ! ele deve tentar recuperar as áreas, e os tópicos apenas sob ordem do frontend
})

app.post('/create-content', (req, res) => {
    if (req.method == "POST") {
        const { titulo, area, topico, markdown, autor } = req.body
        console.log("Inserindo novo material")
        console.log(`Titulo: ${titulo}`)
        console.log(`Area: ${area}`)
        console.log(`Tópico: ${topico}`)
        console.log(`==== Markdown ==== \n${markdown}`)
        console.log(`Autor: ${autor}`)
        DataManager.Conteudo.insert(titulo, topico, markdown)
    }
})

app.post('/create-area', (req, res) => {
    if (req.method == "POST"){
        const { nome, descricao } = req.body
        console.log(`Criando nova área "${nome}"`)
        DataManager.Area.insert(nome, descricao)
        res.redirect('/')
    }
})

app.post('/create-topic', (req, res) => {
    if (req.method == "POST"){
        const { nome, area } = req.body
        console.log(`Criando novo tópico ${nome} da área de ID ${area}`)
        DataManager.Topico.insert(nome, area)
        res.redirect('/')
    }
})


// ? API ROUTES

app.get('/get-topics/:id_area', (req, res) => {
    const { id_area } = req.params
    DataManager.Topico.getByArea(id_area).then((topics) => {
        console.log(id_area)
        console.log(topics)
        res.json({topics})
    })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})