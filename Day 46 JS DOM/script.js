let image = document.querySelector('img');
let like = document.querySelector('i');

image.addEventListener('dblclick', function() {
    like.style.opacity = 1;
    like.style.scale = 1;
    like.style.color = 'red';
    setTimeout(() => {
        like.style.opacity = 0;
        like.style.scale = 0;
        like.style.color = 'white';
    }, 2000)
})
