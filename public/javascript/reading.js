const easyMDE = new EasyMDE();
const html = easyMDE.options.previewRender(content);
const conteudoHTML = document.querySelector('.conteudo-box')
conteudoHTML.innerHTML = html