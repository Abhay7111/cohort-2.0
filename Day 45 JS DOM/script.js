let btn = document.querySelector('button');
let bar = document.querySelector('.bar');
let status = document.querySelector('p');
let total = document.querySelector('p>span');

let count = 0;

let random = 50 + Math.floor(Math.random() * 50);

btn.addEventListener("click", () => {
    btn.style.pointerEvents = "none";
    btn.style.opacity = 30 + '%'
    let intervel = setInterval(() => {
        count++;
        status.innerHTML = count + "%"; 
        bar.style.width = count + "%";
        total.innerHTML = random/10;
    }, random);

    setTimeout(() => {
        clearInterval(intervel)
    }, random*100)
})