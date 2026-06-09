let box = document.querySelector("#box");
let btn = document.querySelector("button");
let resetbtn = document.querySelector("#reset");
let relodtbtn = document.querySelector("#relod");

let box2 = document.querySelector("#box2");
let phone = document.querySelector("#phone");
let btn2 = document.querySelector("#btn2");
let resetbtn2 = document.querySelector("#reset2");
let relodtbtn2 = document.querySelector("#relod2");

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

btn.addEventListener("click", () => {
    let ran1 = Math.floor(Math.random()*256);
    let ran2 = Math.floor(Math.random()*256);
    let ran3 = Math.floor(Math.random()*256);
    box.style.backgroundColor = `rgb(${ran1}, ${ran2}, ${ran3})`;
    console.log(ran1, ran2, ran3);
    localStorage.setItem("color", `rgb(${ran1}, ${ran2}, ${ran3})`);
})

resetbtn.addEventListener("click", () => {
    localStorage.removeItem("color")
    location.reload();
})

relodtbtn.addEventListener("click", () => {
    location.reload();
})



console.log(localStorage);

box.style.backgroundColor = localStorage.getItem("color")

btn2.addEventListener("click", () => {
 let num = Math.floor(Math.random()*arr.length)
 box2.style.backgroundColor = arr[num].color
 box2.innerHTML = arr[num].name
 phone.innerHTML = arr[num].phone
})