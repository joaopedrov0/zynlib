const titleForm = document.querySelector('#content-title')
const areaForm = document.querySelector('#content-area')
const topicForm = document.querySelector('#content-topic')
// const keywordsForm = document.querySelector('')
// const externalMaterial = document.querySelector('')
const sendContentBtn = document.querySelector(".btn-save-content")


const MDE_HTML = document.querySelector('textarea#markdown-editor')
const easyMDE = new EasyMDE({
    element: MDE_HTML,
    spellChecker: false,
    sideBySideFullscreen: false,
    // previewClass: ['markdown-content']
})

areaForm.addEventListener('change', (e) => {
    console.log('event')
    console.log(e)
    console.log(areaForm.value)
    getTopics(areaForm.value)
})

sendContentBtn.addEventListener("click", (e) => {
    sendContent()
})

function sendContent(){

    fetch('/create-content', {
        body: JSON.stringify({
            "titulo": titleForm.value,
            "area": areaForm.value,
            "topico": topicForm.value,
            "markdown": easyMDE.value(),
            "autor": ''
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res)
    })
}

async function getTopics(id_area){
    fetch(`/get-topics/${id_area}`, {
        // body: JSON.stringify({
        //     id_area: id_area
        // })
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((data) => {
            renderTopics(data.topics)
        })
        // console.log(res)
    })
}

function renderTopics(topics){
    let temp = `<option value="" disabled selected>Selecione o tópico</option>`
    for(let topic of topics){
        temp += `<option value="${topic.id_topico}">${topic.nome}</option>`
    }
    topicForm.innerHTML = temp
}