var albums = [];
const codiciAlbum = [454050,340878,86511,212377,14400134,8887733,226383,721846,8524915,217281,14581358,98304,91258,81827,1262014,72487842
    ,8015598,7821476];
const divPrimeCard = document.getElementById('popolaPrimeCard');
const divSecondeCard = document.getElementById('popolaSecondeCard');
const cardGrande = document.getElementById('card-grande');
// Select all the elements in the HTML page
// and assign them to a variable
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

window.addEventListener('load', caricaContenuto);
async function caricaContenuto() {
    for (let codice of codiciAlbum) {
        let result = await chiamaJson(codice);
        albums.push(result);
    }
    console.log(albums);
    // sessionStorage.setItem('albums', JSON.stringify(albums));
    // let prova = JSON.parse(sessionStorage.getItem('albums'));
    // console.log(prova);
    let random = Math.floor(Math.random() * 18);
    let annuncio = albums[random];
    cardGrande.innerHTML = `
    <img src="${annuncio.cover_big}" class="card-img-left" alt="#" id="immagine-card-grande">
        <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between">
                <p id="p1">ALBUM</p>
                <p id="p2">NASCONDI ANNUNCI</p>
            </div>
            <h3 class="card-title">${annuncio.title}</h3>
            <p class="card-text manina" onclick="getIdArtist(${annuncio.artist.id})">${annuncio.artist.name}</p>
            <p class="card-text">Ascolta il nuovo album di: <span class="manina" onclick="getIdArtist(${annuncio.artist.id})">${annuncio.artist.name}</span></p>
            <div class="d-flex flex-start">
                <button class="me-3" id="button1" onclick="getId(${annuncio.id})">Play</button>
                <button class="me-3" id="button2" onclick="changeBtn()"><b>Salva</b></button>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#fff"
                class="bi bi-three-dots align-self-center" viewBox="0 0 16 16">
                <path
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </div>
        </div>
    `
    for (let i=0; i<albums.length/3;i++) {
        divPrimeCard.innerHTML += `
        <div class="col-6 col-lg-4">
            
                <div class="card d-flex flex-row my-3 manina" onclick="getId(${albums[i].id})">
                    <img src="${albums[i].cover_big}" class="card-img-left" alt="#">
                    <div class="card-body d-flex align-items-center w-75">
                        <p class="card-text text-truncate w-75">${albums[i].title}</p>
                    </div>
                </div>
            
        </div>
        `
    }
    for (let i = albums.length/3; i < albums.length; i++) {
        divSecondeCard.innerHTML += `
        <div class="col-12 col-lg-2 my-3 d-flex flex-column">
            <div class="card d-flex flex-row flex-lg-column justify-content-center align-items-center manina h-100">
                <img src="${albums[i].cover_medium}" class="card-img-top mb-1" alt="#" onclick="getId(${albums[i].id})">
                <h5 class="card-title w-75 text-truncate text-center" onclick="getId(${albums[i].id})">${albums[i].title}</h5>
                <p class="card-text w-75 text-truncate pb-3 text-center" onclick="getIdArtist(${albums[i].artist.id})">${albums[i].artist.name}</p>
            </div>
        </div>
        `
    }
    // for (let i = 0; i < albums.length; i++) {
    //     divSecondeCard.innerHTML += `
    //     <div class="col-12 col-lg-2 my-3">
    //         <div class="card d-flex flex-lg-column justify-content-center align-items-center manina h-100">
    //             <img src="${albums[i].cover_medium}" class="card-img-top mb-1" alt="#" onclick="getId(${albums[i].id})">
    //             <h5 class="card-title w-75 text-truncate text-center" onclick="getId(${albums[i].id})">${albums[i].title}</h5>
    //             <p class="card-text w-75 text-truncate pb-3 text-center" onclick="getIdArtist(${albums[i].artist.id})">${albums[i].artist.name}</p>
    //         </div>
    //     </div>
    //     `
    // }
    caricaMusicaAlbumAnnuncio(annuncio);
}
function caricaMusicaAlbumAnnuncio(album) {
    let track_list = album.tracks.data;
    let track_index = 0;
    playpause_btn.addEventListener('click', () => {
        playpauseTrack();
    })
    seek_slider.addEventListener('change', () => {
        seekTo();
    })
    volume_slider.addEventListener('change', () => {
        setVolume();
    })
    next_btn.addEventListener('click', () => {
        nextTrack();
    })
    prev_btn.addEventListener('click', () => {
        prevTrack();
    })
    function loadTrack(track_index) {
        // Clear the previous seek timer
        clearInterval(updateTimer);
        resetValues();

        // Load a new track
        curr_track.src = track_list[track_index].preview;
        curr_track.load();
        // Update details of the track
        track_art.style.backgroundImage =
            `url(" ${track_list[track_index].album.cover_small} ")`;
        track_name.textContent = track_list[track_index].title_short;
        track_artist.textContent = track_list[track_index].artist.name;

        // Set an interval of 1000 milliseconds
        // for updating the seek slider
        updateTimer = setInterval(seekUpdate, 1000);

        // Move to the next track if the current finishes playing
        // using the 'ended' event
        curr_track.addEventListener("ended", nextTrack);

        // // Apply a random background color
        // random_bg_color();
        // }

        // function random_bg_color() {
        // // Get a random number between 64 to 256
        // // (for getting lighter colors)
        // let red = Math.floor(Math.random() * 256) + 64;
        // let green = Math.floor(Math.random() * 256) + 64;
        // let blue = Math.floor(Math.random() * 256) + 64;

        // // Construct a color with the given values
        // let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

        // // Set the background to the new color
        // document.body.style.background = bgColor;
        // }
    }
    // Function to reset all values to their default
    function resetValues() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }

    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
    }

    function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;

        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
    }

    function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;

        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
    }

    function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;

        // Load and play the new track
        loadTrack(track_index);
        playTrack();
    }

    function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;

        // Load and play the new track
        loadTrack(track_index);
        playTrack();
    }

    function seekTo() {
        // Calculate the seek position by the
        // percentage of the seek slider
        // and get the relative duration to the track
        seekto = curr_track.duration * (seek_slider.value / 100);

        // Set the current track position to the calculated seek position
        curr_track.currentTime = seekto;
    }

    function setVolume() {
        // Set the volume according to the
        // percentage of the volume slider set
        curr_track.volume = volume_slider.value / 100;
    }

    function seekUpdate() {
        let seekPosition = 0;

        // Check if the current track duration is a legible number
        if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;

            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

            // Display the updated duration
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }
    loadTrack(track_index);
}

function getId(id) {
    window.location.href = "album.html"
    sessionStorage.setItem('album', JSON.stringify(id))
}

function getIdArtist(id) {
    window.location.href = "artist.html"
    sessionStorage.setItem('album', JSON.stringify(id))
}

function changeBtn() {
    document.querySelector('#button2').innerHTML = `<b>Salvato</b>`
}

async function chiamaJson(numero) {
    let obj = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${numero}`);
    return await obj.json();
}

