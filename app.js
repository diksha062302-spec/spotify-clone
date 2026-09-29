// =========================================================
// SONG DATA
// =========================================================

const songs = [

    {
        title: "Finding Her",
        artist: "Khushgra, Bharat",
        image: "image copy 2.png",
        music: "finding-her.mp3"
    },

    {
        title: "Song Two",
        artist: "Artist Two",
        image: "card2img.jpeg",
        music: "song2.mp3"
    },

    {
        title: "Song Three",
        artist: "Artist Three",
        image: "card3img.jpeg",
        music: "song3.mp3"
    },

    {
        title: "Song Four",
        artist: "Artist Four",
        image: "card4img.jpeg",
        music: "song4.mp3"
    },

    {
        title: "Song Five",
        artist: "Artist Five",
        image: "card5img.jpeg",
        music: "song5.mp3"
    },

    {
        title: "Song Six",
        artist: "Artist Six",
        image: "card6img.jpeg",
        music: "song6.mp3"
    },

    {
        title: "Song Seven",
        artist: "Artist Seven",
        image: "card7img.jpeg",
        music: "song7.mp3"
    },

    {
        title: "Song Eight",
        artist: "Artist Eight",
        image: "card8img.jpeg",
        music: "song8.mp3"
    }

];


// =========================================================
// ELEMENTS
// =========================================================

const audio =
    document.querySelector("#audio");


const playBtn =
    document.querySelector("#playBtn");


const playIcon =
    playBtn.querySelector("i");


const previousBtn =
    document.querySelector("#previousBtn");


const nextBtn =
    document.querySelector("#nextBtn");


const shuffleBtn =
    document.querySelector("#shuffleBtn");


const repeatBtn =
    document.querySelector("#repeatBtn");


const likeBtn =
    document.querySelector("#likeBtn");


const songTitle =
    document.querySelector(".find");


const artistName =
    document.querySelector(".khush");


const albumImage =
    document.querySelector(".image");


const progressBar =
    document.querySelector(".progress-bar");


const currentTime =
    document.querySelector(".curr-time");


const totalTime =
    document.querySelector(".tot-time");


const volume =
    document.querySelector("#volume");


const volumeButton =
    document.querySelector("#volumeButton");


const volumeIcon =
    document.querySelector("#volumeIcon");


const cards =
    document.querySelectorAll(".card");


const searchButton =
    document.querySelector("#searchButton");


const homeButton =
    document.querySelector("#homeButton");


const searchInput =
    document.querySelector("#searchInput");


const clearSearch =
    document.querySelector("#clearSearch");


const searchHeading =
    document.querySelector("#searchHeading");


const noResults =
    document.querySelector("#noResults");


const searchContainer =
    document.querySelector("#searchContainer");


const backButton =
    document.querySelector("#backButton");


const forwardButton =
    document.querySelector("#forwardButton");


const signupButton =
    document.querySelector("#signupButton");


const loginButton =
    document.querySelector("#loginButton");


const createPlaylist =
    document.querySelector("#createPlaylist");


const libraryAdd =
    document.querySelector("#libraryAdd");


const browsePodcast =
    document.querySelector("#browsePodcast");


// =========================================================
// VARIABLES
// =========================================================

let currentSong = 0;

let isShuffle = false;

let isRepeat = false;

let isMuted = false;


// =========================================================
// LOCAL STORAGE
// =========================================================

let likedSongs =
    JSON.parse(
        localStorage.getItem("likedSongs")
    ) || [];


let recentSongs =
    JSON.parse(
        localStorage.getItem("recentSongs")
    ) || [];


let savedVolume =
    localStorage.getItem("volume");


if (savedVolume !== null) {

    volume.value =
        savedVolume;

    audio.volume =
        Number(savedVolume);

} else {

    audio.volume = 1;

}


// =========================================================
// PLAY ICON
// =========================================================

function setPlayIcon(isPlaying) {

    playIcon.classList.toggle(
        "fa-play",
        !isPlaying
    );


    playIcon.classList.toggle(
        "fa-pause",
        isPlaying
    );


    playBtn.title =
        isPlaying
            ? "Pause"
            : "Play";

}


// =========================================================
// UPDATE PLAYING CARD
// =========================================================

function updatePlayingCard() {

    cards.forEach(card => {

        const index =
            Number(
                card.dataset.songIndex
            );


        const isCurrent =
            index === currentSong &&
            !audio.paused;


        card.classList.toggle(
            "playing",
            isCurrent
        );

    });

}


// =========================================================
// UPDATE LIKE BUTTON
// =========================================================

function updateLikeButton() {

    const isLiked =
        likedSongs.includes(
            currentSong
        );


    likeBtn.classList.toggle(
        "liked",
        isLiked
    );


    if (isLiked) {

        likeBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        likeBtn.title =
            "Unlike";

    } else {

        likeBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

        likeBtn.title =
            "Like";

    }

}


// =========================================================
// SAVE RECENT SONG
// =========================================================

function saveRecentSong(index) {

    recentSongs =
        recentSongs.filter(
            songIndex =>
                songIndex !== index
        );


    recentSongs.unshift(index);


    recentSongs =
        recentSongs.slice(0, 8);


    localStorage.setItem(
        "recentSongs",
        JSON.stringify(recentSongs)
    );

}


// =========================================================
// LOAD SONG
// =========================================================

function loadSong(index) {

    currentSong = index;


    const song =
        songs[currentSong];


    audio.src =
        song.music;


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;


    albumImage.src =
        song.image;


    progressBar.value =
        0;


    currentTime.textContent =
        "0:00";


    totalTime.textContent =
        "0:00";


    updateLikeButton();

    updatePlayingCard();

}


// =========================================================
// PLAY SONG
// =========================================================

function playSong() {

    audio.play()

        .then(() => {

            setPlayIcon(true);

            updatePlayingCard();

            saveRecentSong(
                currentSong
            );

        })

        .catch(error => {

            console.log(
                "Audio cannot play:",
                error
            );

        });

}


// =========================================================
// PAUSE SONG
// =========================================================

function pauseSong() {

    audio.pause();

    setPlayIcon(false);

    updatePlayingCard();

}


// =========================================================
// PLAY / PAUSE
// =========================================================

playBtn.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


// =========================================================
// NEXT SONG
// =========================================================

nextBtn.addEventListener(
    "click",
    () => {

        let nextSong;


        if (isShuffle) {

            do {

                nextSong =
                    Math.floor(
                        Math.random() *
                        songs.length
                    );

            }

            while (
                nextSong === currentSong &&
                songs.length > 1
            );

        } else {

            nextSong =
                currentSong + 1;


            if (
                nextSong >=
                songs.length
            ) {

                nextSong = 0;

            }

        }


        loadSong(nextSong);

        playSong();

    }
);


// =========================================================
// PREVIOUS SONG
// =========================================================

previousBtn.addEventListener(
    "click",
    () => {

        let previousSong =
            currentSong - 1;


        if (previousSong < 0) {

            previousSong =
                songs.length - 1;

        }


        loadSong(previousSong);

        playSong();

    }
);


// =========================================================
// TIME UPDATE
// =========================================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {

            return;

        }


        const progress =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progressBar.value =
            progress;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


// =========================================================
// TOTAL TIME
// =========================================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        totalTime.textContent =
            formatTime(
                audio.duration
            );

    }
);


// =========================================================
// FORMAT TIME
// =========================================================

function formatTime(time) {

    if (
        isNaN(time) ||
        !isFinite(time)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            time / 60
        );


    const seconds =
        Math.floor(
            time % 60
        );


    return (
        minutes +
        ":" +
        seconds
            .toString()
            .padStart(2, "0")
    );

}


// =========================================================
// PROGRESS BAR
// =========================================================

progressBar.addEventListener(
    "input",
    () => {

        if (!audio.duration) {

            return;

        }


        audio.currentTime =
            (
                progressBar.value /
                100
            ) *
            audio.duration;

    }
);


// =========================================================
// SONG ENDED
// =========================================================

audio.addEventListener(
    "ended",
    () => {

        if (isRepeat) {

            audio.currentTime =
                0;

            playSong();

            return;

        }


        nextBtn.click();

    }
);


// =========================================================
// VOLUME
// =========================================================

volume.addEventListener(
    "input",
    () => {

        const value =
            Number(
                volume.value
            );


        audio.volume =
            value;


        isMuted =
            value === 0;


        updateVolumeIcon();


        localStorage.setItem(
            "volume",
            value
        );

    }
);


// =========================================================
// VOLUME ICON
// =========================================================

function updateVolumeIcon() {

    volumeIcon.classList.remove(
        "fa-volume-high",
        "fa-volume-low",
        "fa-volume-xmark"
    );


    if (audio.volume === 0) {

        volumeIcon.classList.add(
            "fa-volume-xmark"
        );

    }

    else if (audio.volume < 0.5) {

        volumeIcon.classList.add(
            "fa-volume-low"
        );

    }

    else {

        volumeIcon.classList.add(
            "fa-volume-high"
        );

    }

}


// =========================================================
// MUTE / UNMUTE
// =========================================================

volumeButton.addEventListener(
    "click",
    () => {

        if (audio.volume > 0) {

            audio.dataset.previousVolume =
                audio.volume;


            audio.volume = 0;

            volume.value = 0;

            isMuted = true;

        }

        else {

            const previousVolume =
                Number(
                    audio.dataset.previousVolume
                ) || 1;


            audio.volume =
                previousVolume;


            volume.value =
                previousVolume;


            isMuted = false;

        }


        updateVolumeIcon();


        localStorage.setItem(
            "volume",
            audio.volume
        );

    }
);


// =========================================================
// CARD CLICK
// =========================================================

cards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const index =
                Number(
                    card.dataset.songIndex
                );


            if (
                index === currentSong
            ) {

                if (audio.paused) {

                    playSong();

                } else {

                    pauseSong();

                }

            }

            else {

                loadSong(index);

                playSong();

            }

        }
    );

});


// =========================================================
// SEARCH BUTTON
// =========================================================

searchButton.addEventListener(
    "click",
    () => {

        searchInput.focus();

        searchContainer.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }
);


// =========================================================
// HOME BUTTON
// =========================================================

homeButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterSongs("");

        homeButton.classList.add(
            "active"
        );

        searchButton.classList.remove(
            "active"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// =========================================================
// SEARCH
// =========================================================

searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        filterSongs(value);


        if (value.length > 0) {

            clearSearch.classList.add(
                "show"
            );

            searchHeading.classList.add(
                "active"
            );

            homeButton.classList.remove(
                "active"
            );

            searchButton.classList.add(
                "active"
            );

        }

        else {

            clearSearch.classList.remove(
                "show"
            );

            searchHeading.classList.remove(
                "active"
            );

            homeButton.classList.add(
                "active"
            );

            searchButton.classList.remove(
                "active"
            );

        }

    }
);


// =========================================================
// FILTER SONGS
// =========================================================

function filterSongs(value) {

    let visibleCards = 0;


    cards.forEach(card => {

        const index =
            Number(
                card.dataset.songIndex
            );


        const song =
            songs[index];


        const title =
            song.title
                .toLowerCase();


        const artist =
            song.artist
                .toLowerCase();


        const matches =
            value === "" ||
            title.includes(value) ||
            artist.includes(value);


        if (matches) {

            card.style.display =
                "";

            visibleCards++;

        }

        else {

            card.style.display =
                "none";

        }

    });


    if (
        value !== "" &&
        visibleCards === 0
    ) {

        noResults.classList.add(
            "show"
        );

    }

    else {

        noResults.classList.remove(
            "show"
        );

    }

}


// =========================================================
// CLEAR SEARCH
// =========================================================

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        filterSongs("");

        clearSearch.classList.remove(
            "show"
        );

        searchHeading.classList.remove(
            "active"
        );

        homeButton.classList.add(
            "active"
        );

        searchButton.classList.remove(
            "active"
        );

        searchInput.focus();

    }
);


// =========================================================
// LIKE BUTTON
// =========================================================

likeBtn.addEventListener(
    "click",
    () => {

        const alreadyLiked =
            likedSongs.includes(
                currentSong
            );


        if (alreadyLiked) {

            likedSongs =
                likedSongs.filter(
                    index =>
                        index !== currentSong
                );

        }

        else {

            likedSongs.push(
                currentSong
            );

        }


        localStorage.setItem(
            "likedSongs",
            JSON.stringify(
                likedSongs
            )
        );


        updateLikeButton();

    }
);


// =========================================================
// SHUFFLE
// =========================================================

shuffleBtn.addEventListener(
    "click",
    () => {

        isShuffle =
            !isShuffle;


        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );

    }
);


// =========================================================
// REPEAT
// =========================================================

repeatBtn.addEventListener(
    "click",
    () => {

        isRepeat =
            !isRepeat;


        repeatBtn.classList.toggle(
            "active",
            isRepeat
        );

    }
);


// =========================================================
// BACK BUTTON
// =========================================================

backButton.addEventListener(
    "click",
    () => {

        window.history.back();

    }
);


// =========================================================
// FORWARD BUTTON
// =========================================================

forwardButton.addEventListener(
    "click",
    () => {

        window.history.forward();

    }
);


// =========================================================
// SIGN UP
// =========================================================

signupButton.addEventListener(
    "click",
    () => {

        alert(
            "Sign up feature can be connected to a backend later."
        );

    }
);


// =========================================================
// LOGIN
// =========================================================

loginButton.addEventListener(
    "click",
    () => {

        alert(
            "Login feature can be connected to a backend later."
        );

    }
);


// =========================================================
// CREATE PLAYLIST
// =========================================================

function createPlaylistMessage() {

    const playlistName =
        prompt(
            "Enter playlist name:"
        );


    if (
        playlistName &&
        playlistName.trim() !== ""
    ) {

        alert(
            `"${playlistName.trim()}" playlist created.`
        );

    }

}


createPlaylist.addEventListener(
    "click",
    createPlaylistMessage
);


libraryAdd.addEventListener(
    "click",
    createPlaylistMessage
);


// =========================================================
// PODCAST
// =========================================================

browsePodcast.addEventListener(
    "click",
    () => {

        alert(
            "Podcast section can be added later."
        );

    }
);


// =========================================================
// AUDIO PLAY EVENT
// =========================================================

audio.addEventListener(
    "play",
    () => {

        setPlayIcon(true);

        updatePlayingCard();

    }
);


// =========================================================
// AUDIO PAUSE EVENT
// =========================================================

audio.addEventListener(
    "pause",
    () => {

        setPlayIcon(false);

        updatePlayingCard();

    }
);


// =========================================================
// INITIAL SETUP
// =========================================================

loadSong(0);

setPlayIcon(false);

updateVolumeIcon();

filterSongs("");