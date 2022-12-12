window.addEventListener('load', caricaContenuto);
function caricaContenuto() {
    const div = document.querySelector('tbody');
    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/75621062').then(function (response) {
        return response.json();
    }).then(function (json) {
        let album = json;
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