let btn = document.querySelector("button");
let main = document.querySelector("main");

let arr = [
    {
    name:"ajay",
    color:"crimson",
    phone:"9795946027"
},
{
    name:"abhay",
    color:"#F69D39",
    phone:"7408638739"
},
{
    name:"bicky",
    color:"red",
    phone:"1234567890"
},
{
    name:"mohit",
    color:"green",
    phone:"0985634715"
},
{
    name:"ayushi",
    color:"#D92243",
    phone:"7408638739"
},
];

main.addEventListener("mousemove", function(){
    let x = Math.random()*100;
    let y = Math.random()*100;
    let R = Math.random()*70;

    let clr1 = Math.floor(Math.random()*256);
    let clr2 = Math.floor(Math.random()*256);
    let clr3 = Math.floor(Math.random()*256);

    let arrRandom = Math.floor(Math.random()*arr.length);

    let div = document.createElement("div");
    div.id = "hi";
    // div.innerHTML = arr[arrRandom].name
    main.appendChild(div);

    div.style.position = "absolute";
    div.style.top = y+"%"
    div.style.left = x+"%"
    // div.style.padding = '10px 20px'
    // div.style.backgroundColor = arr[arrRandom].color
    div.style.rotate = R+"deg"
    div.style.scale = Math.floor(Math.random()*3)
    
})