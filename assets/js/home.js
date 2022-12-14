var albums = [];
const codiciAlbum = [5327691, 363906907, 217489292, 359324967, 313482367, 65373012];
const divPrimeCard = document.getElementById('popolaPrimeCard');
const divSecondeCard = document.getElementById('popolaSecondeCard');
const cardGrande = document.getElementById('card-grande');


window.addEventListener('load', caricaContenuto);
async function caricaContenuto() {
    for (let codice of codiciAlbum) {
        let result = await chiamaJson(codice);
        albums.push(result);
    }
    console.log(albums);
    sessionStorage.setItem('albums', JSON.stringify(albums));
    let prova = JSON.parse(sessionStorage.getItem('albums'));
    console.log(prova);
    let annuncio = albums[0];
    cardGrande.innerHTML = `
    <img src="${annuncio.cover_big}" class="card-img-left" alt="#" id="immagine-card-grande">
        <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between">
                <p id="p1">ALBUM</p>
                <p id="p2">NASCONDI ANNUNCI</p>
            </div>
            <h3 class="card-title">${annuncio.title}</h3>
            <p class="card-text">${annuncio.artist.name}</p>
            <p class="card-text">Ascolta il nuovo album di: ${annuncio.artist.name}</p>
            <div class="d-flex flex-start">
                <button class="me-3" id="button1" onclick="getId(${annuncio.id})">Play</button>
                <button class="me-3" id="button2"><b>Salva</b></button>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#fff"
                class="bi bi-three-dots align-self-center" viewBox="0 0 16 16">
                <path
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </div>
        </div>
    `
    for (let elem of albums) {
        divPrimeCard.innerHTML += `
        <div class="col-6 col-lg-4">
            
                <div class="card d-flex flex-row my-3 manina" onclick="getId(${elem.id})">
                    <img src="${elem.cover_big}" class="card-img-left" alt="#">
                    <div class="card-body d-flex align-items-center">
                        <p class="card-text">${elem.title}</p>
                    </div>
                </div>
            
        </div>
        `
    }
    for (let i=0;i<albums.length;i++) {
        divSecondeCard.innerHTML += `
        <div class="col-12 col-lg-2 my-3">
            <div class="card d-flex justify-content-center align-items-center manina">
                <img src="${albums[i].cover_big}" class="card-img-top" alt="#" onclick="getId(${albums[i].id})">
                <h5 class="card-title" onclick="getId(${albums[i].id})">${albums[i].title}</h5>
                <p class="card-text" onclick="getIdArtist(${albums[i].artist.id})">${albums[i].artist.name}</p>
            </div>
        </div>
        `
    }
    for (let i=0;i<albums.length;i++) {
        divSecondeCard.innerHTML += `
        <div class="col-12 col-lg-2 my-3">
            <div class="card d-flex justify-content-center align-items-center manina">
                <img src="${albums[i].cover_big}" class="card-img-top" alt="#" onclick="getId(${albums[i].id})">
                <h5 class="card-title" onclick="getId(${albums[i].id})">${albums[i].title}</h5>
                <p class="card-text" onclick="getIdArtist(${albums[i].artist.id})">${albums[i].artist.name}</p>
            </div>
        </div>
        `
    }
}

function getId(id){
    window.location.href = "album.html"
    sessionStorage.setItem('album', JSON.stringify(id))
}

function getIdArtist(id) {
    window.location.href = "artist.html"
    sessionStorage.setItem('album', JSON.stringify(id))
}

async function chiamaJson(numero) {
    let obj = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${numero}`);
    return await obj.json();
}