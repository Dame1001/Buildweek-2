function cercaArtista(){
let ricerca=document.querySelector('#cerca').value
console.log(ricerca);
chiamaJson(ricerca);
function chiamaJson(numero) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${numero}`)
    .then(function (response) {
        return response.json()
    })
    .then(function(album){
        console.log(album);
        return album.data[0].artist.id;
    })
    .then(function(id){
        console.log(id);
        window.location.href = "artist.html"
        sessionStorage.setItem('album', JSON.stringify(id))
    })
}
}
