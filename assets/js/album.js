window.addEventListener('load', caricaContenuto);
function caricaContenuto() {
    const div = document.querySelector('tbody');
    const head = document.querySelector('#album_head')
    const session = sessionStorage.getItem('album')
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${session}`).then(function (response) {
        return response.json();
    }).then(function (json) {
        let album = json;
        console.log(album)
        let year = (album.release_date).substring(0,4)
        let minuti = Math.floor(album.duration / 60)
        let secondi = album.duration % 60
        head.innerHTML = `
        <div class="col-12 bg-transparent text-white pb-3">
            <div class="w-100 d-flex align-items-end p-2">
            <img src="${album.cover_big}" class="card-img-top border border-dark shadow w-25" alt="#">
            <div class="card-body w-100 px-3">
                <p>ALBUM</p>
                <h1 class="card-title pt-1 pb-4">${album.title}</h1>
                <div class="card-text w-100 d-flex"><img src="${album.contributors[0].picture_small}" class="img-piccola"
                    alt="#">
                <p class="card-text ps-2">${album.artist.name} - ${year} - ${album.nb_tracks} brani,  ${minuti}min ${secondi}sec.</p>
                </div>

            </div>
            </div>
        </div>
        `
        for (let i = 0; i < album.tracks.data.length; i++) {
            div.innerHTML +=
                `<tr>
                    <td class="text-end mostra_tabella">${i + 1}</td>
                    <td><p class="m-0 fw-bold">${album.tracks.data[i].title}</p><p class="m-0 fw-light">${album.tracks.data[i].artist.name}</p></td>
                    <td class="text-end mostra_tabella">${album.tracks.data[i].rank}</td>
                    <td class="text-end d-lg-none text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                     <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                    </td>
                    <td class="text-end mostra_tabella">${album.tracks.data[i].duration}</td>
                </tr>`

        }
    });
}