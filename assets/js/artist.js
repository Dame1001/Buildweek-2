window.addEventListener('load', caricaContenuto);
function caricaContenuto() {
    const div = document.querySelector('tbody');
    const prof = document.querySelector('#band_profile')
    const sup = document.querySelector('#sez_sup')
    
    fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/1').then(function (response) {
        return response.json();
    }).then(function (json) {
        let band = json;
        console.log(band.picture_xl)
        sup.innerHTML = `
            <div class='d-flex'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#00f" class="bi bi-patch-check-fill me-2 mt-1" viewBox="0 0 16 16">
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                </svg>
                <p class='align-self-center'>Artista verificato</p>
            </div>
            <h1>${band.name}</h1>
            <p>${band.nb_fan} ascoltatori seriali</p>
        `
        sup.style.background = `url(${band.picture_xl})`;
    });

    fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/1/top?limit=50').then(function (response) {
        return response.json();
    }).then(function (json) {
        let album = json;
        for (let i = 0; i < album.data.length; i++) {
            div.innerHTML +=
                `<tr>
                    <td class="text-end mostra_tabella"><h5 class="m-0">${i + 1}</h5></td>
                    <td><img src="${album.data[i].album.cover_small}" alt="cover-album"></td>
                    <td><h4 class="m-0">${album.data[i].title}</h4></td>
                    <td class="text-end mostra_tabella"><p class="m-0">${album.data[i].rank}</p></td>
                    <td class="text-end mostra_tabella"><p class="m-0">${album.data[i].duration}</p></td>
                </tr>`
        }
        prof.innerHTML = `
            <tr>
                <td><img src="${album.data[0].contributors[0].picture}" alt="band_profile" class="rounded-circle"></td>
                <td><h4>Hai messo Mi piace a ${Math.floor(Math.random()*21)} Brani</h4><p>Di  ${album.data[0].artist.name}</p></td>
            </tr>
        `
    });
}

let button = document.querySelector('#follow')
let counter = 0
button.addEventListener('click', () => {
    if(counter == 0){
        button.textContent = 'Following'
        counter = 1
    } else {
        button.textContent = 'Follow'
        counter = 0
    }
})
