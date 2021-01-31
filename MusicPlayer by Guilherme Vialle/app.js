const grid_container = document.getElementById('grid-container')
const copy = document.getElementById('copy') 

const imgDaMusica = document.getElementById('imgDaMusica')
const nomeDaMusica = document.getElementById('nomeDaMusica')
const audioDaMusica = document.getElementById('audioDaMusica')

const timeRange = document.getElementById('time') 

const controller = document.getElementById('controllers')
const toPlay = document.getElementById('toPlay')
const noVolume = document.getElementById('noVolume')
const repeat = document.getElementById('repeat')
const volumeRange = document.getElementById('volumeRange')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const volumeShow = document.getElementById('volumeShow')

const nomeDaFaixa = document.querySelectorAll('#nomeDaFaixa')
const faixa = document.querySelectorAll('#faixa')
const img = document.querySelectorAll('#img')
const music = document.querySelectorAll('#music')

for (let i = 0; i < nomeDaFaixa.length && music.length && faixa.length && img.length; i++) {
    faixa[i].addEventListener('click', () => {
        
        resetarTime()
        controller.style.display = 'flex'
        
        nomeDaMusica.textContent = nomeDaFaixa[i].textContent
        imgDaMusica.src = img[i].src
        audioDaMusica.src = music[i].src

        audioDaMusica.volume = 0.5
        audioDaMusica.autoplay = 1

        imgDaMusica.style.border = '1px solid #6fdb9a'
        imgDaMusica.style.borderRadius = '2px'
        timeRange.style.display = 'block'
    
        // faxia atual
        const faixaAtual = [i]
        const musicaAtual = music[i].src
        const nomeAtual = nomeDaFaixa[i].textContent

        // proxima musica
        //nextMusic(faixaAtual)

        // musica anterior
        //prevMusic(faixaAtual)

        // btn funcs
        volumeRange.addEventListener('change',volumerChanger,false)
        toPlay.addEventListener('click',getPlay,false)
        noVolume.addEventListener('click',volumer,false)
        repeat.addEventListener('click', repeater, false)   

        var newtimer = setInterval(rangeSlider, 1000)
    }, false)
}

volumeShow.textContent = volumeRange.value + '%'

function volumerChanger(e) {
    volumeShow.textContent = volumeRange.value + '%' 
    audioDaMusica.volume = (volumeRange.value / 100)
}

function getPlay() {
        if (audioDaMusica.paused) {
            toPlay.src = "/icons/paused.png"
            audioDaMusica.play();
                
        }
        else {
            toPlay.src = "/icons/play.png"
            audioDaMusica.pause();
    }
}

function volumer() {
        if (audioDaMusica.volume != 0) {
        audioDaMusica.volume = 0
        noVolume.src = "/icons/novolume.png"
                
        }
        else {
        audioDaMusica.volume = (volumeRange.value / 100)
        noVolume.src = "/icons/maxvolume.png"
    }
}

function repeater() {
    if (audioDaMusica.loop == 0) {
        repeat.style.backgroundColor = 'rgb(204, 79, 99)'
        audioDaMusica.loop = 1
    }
    else {
        audioDaMusica.loop = 0
        repeat.style.backgroundColor = 'transparent'
    }
}

// funcoes de previous e next -*---DESATIVADAS---*-
/*
function nextMusic(faixa) {
    next.addEventListener('click', () => {
        
        var newFaixa = faixa.toString()
        newFaixa = eval(newFaixa + '+ 1')
        imgDaMusica.src = img[newFaixa].src
        audioDaMusica.src = music[newFaixa].src
        nomeDaMusica.textContent = nomeDaFaixa[newFaixa].textContent
    },false)
}

function prevMusic(faixa) {
    prev.addEventListener('click', () => {
        
        var newFaixa = faixa.toString()
        newFaixa = eval(newFaixa + '- 1')
        imgDaMusica.src = img[newFaixa].src
        audioDaMusica.src = music[newFaixa].src
        nomeDaMusica.textContent = nomeDaFaixa[newFaixa].textContent
    },false)
}
*/
var mainArray = 0 

next.addEventListener('click',clickNextMusic,false)

function clickNextMusic() {
    mainArray += 1 

    if (mainArray > img.length || mainArray > music.length || mainArray > nomeDaFaixa.length) {
        mainArray = music.length
        return;
    }
    else {
        imgDaMusica.src = img[mainArray].src
        audioDaMusica.src = music[mainArray].src
        nomeDaMusica.textContent = nomeDaFaixa[mainArray].textContent
    }
}

prev.addEventListener('click', () => {
    mainArray -= 1
    if (mainArray > img.length || mainArray > music.length || mainArray > nomeDaFaixa.length) {
       mainArray = music.length
        return;
    }
    else if (mainArray < 0) {
        mainArray = 0
    }
    else {
        imgDaMusica.src = img[mainArray].src
        audioDaMusica.src = music[mainArray].src
        nomeDaMusica.textContent = nomeDaFaixa[mainArray].textContent
    }
 
},false)

// funcao de adc musicas -----DESATIVEI POR CONTA DE BUGS-----

/*

const grid_container = document.getElementById('grid-container')
const boxEscuro = document.getElementById('boxEscuro')
    
function mostrarBox() {
    boxEscuro.style.display = 'flex'
    grid_container.classList.toggle('tampar')
}

const aparecer = document.getElementById('aparecer')

function renderizar(event) {
    const imgDinamica = URL.createObjectURL(event.target.files[0]);
    aparecer.src = imgDinamica
}

const aparecerSong = document.getElementById('aparecerSong')

function pegarMusica(event) {
    const songDinamico = URL.createObjectURL(event.target.files[0]);
    aparecerSong.src = songDinamico 
}

const musicas = document.getElementById('musicas')




function enviarFiles() {
    const fileNome = document.getElementById('fileNome').value
    console.log(fileNome)
    if (aparecer.src && aparecerSong.src && fileNome != '') {

        const newDiv = document.createElement('div')
        
        // primeira div
        newDiv.id = 'faixa'
        newDiv.className = 'faixa'

        // elementos dinamicos
        const divDentroDeFaixa = document.createElement('div')
        const newImg = document.createElement('img')
        const newAudio = document.createElement('audio')

        musicas.appendChild(newDiv)
        newDiv.appendChild(divDentroDeFaixa)
        divDentroDeFaixa.appendChild(newImg)
        divDentroDeFaixa.appendChild(newAudio)

        // criando audio 
        newAudio.id = 'music'
        newAudio.src = '/musicas/music2.mp3'

        // criando img
        newImg.id = 'img'
        newImg.src = '/img/img2.jpg'
        newImg.style.maxWidth = '70px'


        // ultima div
        const ultimaDiv = document.createElement('div')
        const tituloDaMusica = document.createElement('h3')
        const descricaoDaMusica = document.createElement('p')

        tituloDaMusica.id = 'nomeDaFaixa'
        tituloDaMusica.textContent = fileNome

        newDiv.appendChild(ultimaDiv)
        ultimaDiv.appendChild(tituloDaMusica)
        ultimaDiv.appendChild(descricaoDaMusica)
    }
    else {
        alert('preencha os campos')
    }
}

*/

faixa[faixa.length-1].addEventListener('mouseenter', () => {
    faixa[faixa.length-1].style.borderBottomLeftRadius = '40px'
},false)

function fade() {
    grid_container.style.transform = 'translateY(0)'
    grid_container.style.opacity = '1'
    copy.style.transform = 'translateX(0)'
    copy.style.opacity = '1'
}

function changeDuration() {
    sliderPosition = audioDaMusica.duration * (timeRange.value / 100)
    audioDaMusica.currentTime = sliderPosition
}

function rangeSlider() {
    let posicao = 0

    if (!isNaN(audioDaMusica.duration)) {
        position = audioDaMusica.currentTime * (100 / audioDaMusica.duration)
        timeRange.value = position
        
        if (position == 100) {
            clickNextMusic()
       }
    }
}

function resetarTime() {
    timeRange.value = 0
}

