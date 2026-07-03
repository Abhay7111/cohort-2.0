let openfacebookPop = document.querySelector('#openfacebook');
let openfacebookButton = document.querySelector('#facebookButton');

let windowButton = document.querySelector('#windowButton');
let openwindow = document.querySelector('#openwindow');

let chromeButton = document.querySelector('#chromeButton');
let openchrome = document.querySelector('#openchrome');

let mainWindow = document.querySelector('#window');
let contextMenupop = document.querySelector('.contextMenupop');

// let close = 

openfacebookButton.addEventListener('click', () => {
    openfacebookPop.style.height = '100%'
    openfacebookPop.style.width = '100%'
    openfacebookPop.style.fontSize = '3rem'
    openfacebookPop.style.backgroundColor = '#277CE2'
    openfacebookPop.style.color = '#fff'
    openfacebookPop.style.fontWeight = '700'

    openchrome.style.height = '10px'
    openchrome.style.width = '10px'
    openchrome.style.fontSize = '0'
    openchrome.style.backgroundColor = 'white'
    openchrome.style.color = '#277CE2'
    openchrome.style.fontWeight = '0'

    openwindow.style.height = '10px'
    openwindow.style.width = '10px'
    openwindow.style.fontSize = '0rem'
    openwindow.style.backgroundColor = '#277CE2'
    openwindow.style.color = '#fff'
    openwindow.style.fontWeight = '0'
})
chromeButton.addEventListener('click', () => {
    openchrome.style.height = '100%'
    openchrome.style.width = '100%'
    openchrome.style.fontSize = '3rem'
    openchrome.style.backgroundColor = 'white'
    openchrome.style.color = '#277CE2'
    openchrome.style.fontWeight = '700'

    openfacebookPop.style.height = '10px'
    openfacebookPop.style.width = '10px'
    openfacebookPop.style.fontSize = '0rem'
    openfacebookPop.style.backgroundColor = '#277CE2'
    openfacebookPop.style.color = '#fff'
    openfacebookPop.style.fontWeight = '0'
    
    openwindow.style.height = '10px'
    openwindow.style.width = '10px'
    openwindow.style.fontSize = '0rem'
    openwindow.style.backgroundColor = '#277CE2'
    openwindow.style.color = '#fff'
    openwindow.style.fontWeight = '0'
})


windowButton.addEventListener('click', () => {
    openwindow.style.height = '100%'
    openwindow.style.width = '100%'
    openwindow.style.fontSize = '3rem'
    openwindow.style.backgroundColor = '#b790ff'
    openwindow.style.color = '#d7e654'
    openwindow.style.fontWeight = '700'
    
    openchrome.style.height = '10px'
    openchrome.style.width = '10px'
    openchrome.style.fontSize = '0rem'
    openchrome.style.backgroundColor = 'white'
    openchrome.style.color = '#277CE2'
    openchrome.style.fontWeight = '0'

    openfacebookPop.style.height = '10px'
    openfacebookPop.style.width = '10px'
    openfacebookPop.style.fontSize = '0rem'
    openfacebookPop.style.backgroundColor = '#277CE2'
    openfacebookPop.style.color = '#fff'
    openfacebookPop.style.fontWeight = '0'
})
openwindow.addEventListener('click', () => {
    openwindow.style.height = '10px'
    openwindow.style.width = '10px'
    openwindow.style.fontSize = '0rem'
    openwindow.style.backgroundColor = '#277CE2'
    openwindow.style.color = '#fff'
    openwindow.style.fontWeight = '0'
})
openchrome.addEventListener('click', () => {
    openchrome.style.height = '10px'
    openchrome.style.width = '10px'
    openchrome.style.fontSize = '0rem'
    openchrome.style.backgroundColor = '#277CE2'
    openchrome.style.color = '#fff'
    openchrome.style.fontWeight = '0'
})
openfacebookPop.addEventListener('click', () => {
    openfacebookPop.style.height = '10px'
    openfacebookPop.style.width = '10px'
    openfacebookPop.style.fontSize = '0rem'
    openfacebookPop.style.backgroundColor = '#277CE2'
    openfacebookPop.style.color = '#fff'
    openfacebookPop.style.fontWeight = '0'
})


mainWindow.addEventListener('contextmenu', (e) => {
    contextMenupop.style.display = 'block'
    contextMenupop.style.top = e.y +'px'
    contextMenupop.style.left = e.x +'px'
})

mainWindow.addEventListener('click', (e) => {
    contextMenupop.style.display = 'none'
    contextMenupop.style.top = e.y +'px'
    contextMenupop.style.left = e.x +'px'
})