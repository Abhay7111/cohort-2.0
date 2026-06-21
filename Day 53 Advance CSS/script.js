let p = document.querySelector('p');
let text = p.innerText
let char = `1234567890!@#$%^&*()_+{}[]|\/.,;':"`;
// let char = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
let int = 0;


function randomChar() {
    const str = text.split('').map((chr, index) => {
        if(index < int){
            return chr
        }
        return char.split('')[Math.floor(Math.random() * 52)]
    }).join("")
    p.innerText = str
    int += 0.2
}

p.addEventListener('mouseenter', () => {
    setInterval(randomChar, 35)
})
 