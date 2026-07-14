let allElem = document.querySelectorAll('.elem');
let allElemDetails = document.querySelector('.allElemDetails');
let elemDetail = document.querySelectorAll('.elemDetail');
let closeButtons = document.querySelectorAll('.closeButton');


allElem.forEach((elem) => {
        elem.addEventListener('click', ()=>{
            elemDetail[elem.id].style.display = 'block'
            allElemDetails.style.display = 'block'
        })
    }
)

closeButtons.forEach((elem) => {
    elem.addEventListener('click', () => {  
        setTimeout(() => {
            elemDetail[elem.id].style.display = 'none';
        allElemDetails.style.display = 'none';
        },2000)
    })
})