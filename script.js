let points = 0;
let autoClick = 0;
let multiplier = 1;
let isPlaying = false;


// MUSIC
let music = document.getElementById("bgMusic");
let currentSong = 0;
let volume = 0.3;

let songs = ["music.mp3","music2.mp3","music3.mp3","music4.mp3","music5.mp3","music6.mp3","music7.mp3",];
let songNames = ["Retro Beat","Arcade Loop","Pixel Vibes","Hero of Pixel","Hyper Pixel","The Arcade World","The Return of Pixel"];

function startMusic() {
    music.src = songs[currentSong];
    music.volume = volume;
    music.play();
    updateSongName();
}

function updateSongName() {
    document.getElementById("songName").innerText = songNames[currentSong];
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    startMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    startMusic();
}

function volumeUp() {
    volume = Math.min(volume + 0.1, 1);
    music.volume = volume;
}

function volumeDown() {
    volume = Math.max(volume - 0.1, 0);
    music.volume = volume;
}

// GAME
function addPoint() {
    points += multiplier;
    updateUI();
}

setInterval(() => {
    points += autoClick * multiplier;
    updateUI();
}, 1000);

function updateUI() {
    document.getElementById("score").innerText = points;
}

// SHOP
function openShop() {
    document.getElementById("shopMenu").style.display = "block";
}

function closeShop() {
    document.getElementById("shopMenu").style.display = "none";
}

// BUY
function buyAuto() {
    if (points >= 50) {
        points -= 50;
        autoClick++;
        updateUI();
    }
}

function buyMultiplier() {
    if (points >= 100) {
        points -= 100;
        multiplier++;
        updateUI();
    }
}

// THEMES
function buyTheme(type, cost) {
    if (points < cost) return;

    points -= cost;

    let bg = document.getElementById("background");

    if (type === "lava") bg.style.background = "linear-gradient(red, black)";
    if (type === "sky") bg.style.background = "lightblue";
    if (type === "galaxy") bg.style.background = "black";

    updateUI();
}

// TABS
function switchTab(tab) {
    document.getElementById("tab-upgrades").style.display = "none";
    document.getElementById("tab-themes").style.display = "none";

    document.getElementById("tab-" + tab).style.display = "block";
}function toggleMusic() {

    if (!music.src) {
        startMusic();
        isPlaying = true;
        updateButton();
        return;
    }

    if (music.paused) {
        music.play();
        isPlaying = true;
    } else {
        music.pause();
        isPlaying = false;
    }

    updateButton();
}

function updateButton() {
    let btn = document.getElementById("playPauseBtn");

    if (isPlaying) {
        btn.innerText = "⏸";
    } else {
        btn.innerText = "▶️";
    }
}