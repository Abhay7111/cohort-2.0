const allElemDetails = document.querySelector('.allElemDetails');
const elemBtn1 = document.querySelector('#elemBtn1');
const elemBtn2 = document.querySelector('#elemBtn2');
const elemBtn3 = document.querySelector('#elemBtn3');
const elemBtn4 = document.querySelector('#elemBtn4');
const elemBtn5 = document.querySelector('#elemBtn5');

const elem1 = document.querySelector('#elem1');
const elem2 = document.querySelector('#elem2');
const elem3 = document.querySelector('#elem3');
const elem4 = document.querySelector('#elem4');
const elem5 = document.querySelector('#elem5');


// let allElemDN = elem1

elemBtn1.addEventListener('click', () => {
    allElemDetails.style.display = 'block'
    elem1.style.display = 'block'
})

elemBtn2.addEventListener('click', () => {
    allElemDetails.style.display = 'block'
    elem2.style.display = 'block'
})
elemBtn3.addEventListener('click', () => {
    allElemDetails.style.display = 'block'
    elem3.style.display = 'block'
})
elemBtn4.addEventListener('click', () => {
    allElemDetails.style.display = 'block'
    elem4.style.display = 'block'
})
elemBtn5.addEventListener('click', () => {
    allElemDetails.style.display = 'block'
    elem5.style.display = 'block'
})

allElemDetails.addEventListener('click', () => {
    allElemDetails.style.display = 'none'
    elem1.style.display = 'none'
    elem2.style.display = 'none'
    elem3.style.display = 'none'
    elem4.style.display = 'none'
    elem5.style.display = 'none'
})