addEventListener("mousemove", (event) => {
    document.body.style.setProperty('--top', event.y+"px")
    document.body.style.setProperty('--left', event.x+"px")
})

addEventListener("click", () => {
    document.body.style.setProperty('--size', '200px')
})
addEventListener("dblclick", () => {
    document.body.style.setProperty('--size', '100px')
})