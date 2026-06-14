let audQ = new Audio('./Audios/Q.m4a')
let audW = new Audio('./Audios/W.m4a')
let audE = new Audio('./Audios/E.m4a')
let audR = new Audio('./Audios/R.m4a')
let audT = new Audio('./Audios/T.m4a')
let audY = new Audio('./Audios/Y.m4a')
let audU = new Audio('./Audios/U.m4a')
let audI = new Audio('./Audios/I.m4a')
let audO = new Audio('./Audios/O.m4a')
let audP = new Audio('./Audios/P.m4a')

const body = document.body;
const cursor = document.querySelector('#cursor');
const btnQ = document.querySelector('#btnQ');
const showP = document.querySelector('#p')

body.addEventListener('mousemove', (event) => {
    cursor.style.left = event.x +'px';
    cursor.style.top = event.y +'px';
})

body.addEventListener('keydown', (event) =>{
    showP.innerHTML = event.key;
})

addEventListener('keydown', (event) => {
    if(event.key === 'q'){
        btnQ.style.backgroundColor = '#ddd';
        btnQ.style.color = '#222';
        audQ.play();
    }
    if(event.key === 'w'){
        btnW.style.backgroundColor = '#ddd';
        btnW.style.color = '#222';
        audW.play();
    }
    if(event.key === 'e'){
        btnE.style.backgroundColor = '#ddd';
        btnE.style.color = '#222';
        audE.play();
    }
    if(event.key === 'r'){
        btnR.style.backgroundColor = '#ddd';
        btnR.style.color = '#222';
        audR.play();
    }
    if(event.key === 't'){
        btnT.style.backgroundColor = '#ddd';
        btnT.style.color = '#222';
        audT.play();
    }
    if(event.key === 'y'){
        btnY.style.backgroundColor = '#ddd';
        btnY.style.color = '#222';
        audY.play();
    }
    if(event.key === 'u'){
        btnU.style.backgroundColor = '#ddd';
        btnU.style.color = '#222';
        audU.play();
    }
    if(event.key === 'i'){
        btnI.style.backgroundColor = '#ddd';
        btnI.style.color = '#222';
        audI.play();
    }
    if(event.key === 'o'){
        btnO.style.backgroundColor = '#ddd';
        btnO.style.color = '#222';
        audO.play();
    }
    if(event.key === 'p'){
        btnP.style.backgroundColor = '#ddd';
        btnP.style.color = '#222';
        audP.play();
    }

    body.addEventListener('keyup', (event) => {
        if(event.key === 'q'){
            btnQ.style.backgroundColor = '#fff';
            btnQ.style.color = '#444';
            audQ.pause();
            audQ.currentTime = 0.1;
        }
        if(event.key === 'w'){
            btnW.style.backgroundColor = '#fff';
            btnW.style.color = '#444';
            audW.pause();
            audW.currentTime = 0.1;
        }
        if(event.key === 'e'){
            btnE.style.backgroundColor = '#fff';
            btnE.style.color = '#444';
            audE.pause();
            audE.currentTime = 0.1;
        }
        if(event.key === 'r'){
            btnR.style.backgroundColor = '#fff';
            btnR.style.color = '#444';
            audR.pause();
            audR.currentTime = 0.1;
        }
        if(event.key === 't'){
            btnT.style.backgroundColor = '#fff';
            btnT.style.color = '#444';
            audT.pause();
            audT.currentTime = 0.1;
        }
        if(event.key === 'y'){
            btnY.style.backgroundColor = '#fff';
            btnY.style.color = '#444';
            audY.pause();
            audY.currentTime = 0.1;
        }
        if(event.key === 'u'){
            btnU.style.backgroundColor = '#fff';
            btnU.style.color = '#444';
            audU.pause();
            audU.currentTime = 0.1;
        }
        if(event.key === 'i'){
            btnI.style.backgroundColor = '#fff';
            btnI.style.color = '#444';
            audI.pause();
            audI.currentTime = 0.1;
        }
        if(event.key === 'o'){
            btnO.style.backgroundColor = '#fff';
            btnO.style.color = '#444';
            audO.pause();
            audO.currentTime = 0.1;
        }
        if(event.key === 'p'){
            btnP.style.backgroundColor = '#fff';
            btnP.style.color = '#444';
            audP.pause();
            audP.currentTime = 0.1;
        }
    })

})