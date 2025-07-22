const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".Nasheed-player h1");
const artistName = document.querySelector(".Nasheed-player p");

const welcomePopup = document.getElementById("welcomePopup");
const closePopupButton = document.getElementById("closePopup");

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

let isPlaying = false;

const songs = [
  {
    title: " Wedding Nasheed  ",
    name: "TZ Releases",
    source:
      "/home/lyrics/Wedding Nasheed TZ Releases.wav",
  },
  {
    title: " Kisi ke Muskurahaton ",
    name: "TZ Releases",
    source:
      "/home/lyrics/Without Music Famous Nazam - Kisi Ki Muskurahaton - TZ Releases - Jeena Isi Ka Naam Hai - Mohd Talib.mp3",
  },
  {
    title: "Mujhe Kya Khabar",
    name: "TZ Releases",
    source:
      "/home/lyrics/Most Beautiful Ghazal - Mujhe Kya Khabar Mere Doston - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Mere Hujre Mein Nahi",
    name: "TZ Releases",
    source:
      "/home/lyrics/Mere hujre.mp3",
  },
  {
    title: "Madine Ka Safar",
    name: "TZ Releases",
    source:
      "/home/lyrics/Tribute to the Viral man Aamir Mehdi goes to hajj - Madine Ka Safar - Muhammad Talib - TZ Releases.mp3",
  },

  {
    title: "Dost ka paigham aa gaya",
    name: "TZ Releases",
    source:
      "/home/lyrics/Dost ka paigham aa gaya - Beautiful Ghazal by Jigar Muradabadi - Hafiz Muhammad Talib - TZ Releases.mp3",
  },

  {
    title: "Dastoor",
    name: "TZ Releases",
    source:
      "/home/lyrics/DASTOOR - Beautiful Nazam by Habib Jalib - Main Nahi Manta - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Tob Tobi Tob",
    name: "TZ Releases",
    source:
      "/home/lyrics/Viral Arabic Nasheed - Tob Tobi Tob - With Urdu Translation in Description - TZ Releases.mp3",
  },
  {
    title: "Aye Khuda",
    name: "TZ Releases",
    source:
      "/home/lyrics/Aye Khuda Aye Khuda - Beautiful Hamd - Jisne Ki Justuju - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Daastan-E-Badr",
    name: "TZ Releases",
    source:
      "/home/lyrics/Daastan e Badr - Story of Battle of Badr in poetry style - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Zara Hoshiyar Main Roze Se Hu",
    name: "TZ Releases",
    source:
      "/home/lyrics/Zara Hoshiyar Main Roze Se Hu - Ramadan Funny Kalaam - TZ Releases.mp3",
  },
  {
    title: "Ham Wafa Kar Ke Bhi Tanha Reh Gaye",
    name: "TZ Releases",
    source:
      "/home/lyrics/Without Music Sad Ghazal - Ham Wafa Kar Ke Bhi Tanha Reh Gaye - TZ Releases - Dil Ke Armaan Aansuon.mp3",
  },
  {
    title: "Give Thanks To Allah",
    name: "TZ Releases",
    source:
      "/home/lyrics/Beautiful Hamd - Give Thanks To Allah - Without Duff Version - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Mera Bharat Anokha Hai",
    name: "TZ Releases",
    source:
      "/home/lyrics/Mera Bharat Anokha Hai - Republic Day Special Kalaam - Ye Hindustan Hamara Hai - TZ Releases.mp3",
  },
  {
    title: "Ramadan Special Collection",
    name: "TZ Releases",
    source:
      "/home/Beautiful 7 Nasheeds Collection - Ramadan Special Playlist - Hafiz Muhammad Talib - TZ Releases.mp3",
    image: "/home/lyrics/Ramazan Special.jpg",
  },
  {
    title: "Chai Lovers",
    name: "TZ Releases",
    source:
      "/home/lyrics/Beautiful Duff Nasheed For Chai Lovers - Chai Pee Kitaben Parh - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
];

let currentSongIndex = 0;

function closePopup() {
  welcomePopup.style.animation = "fadeOut 0.5s forwards";
  setTimeout(() => {
    welcomePopup.style.display = "none";
  }, 500);
}

closePopupButton.addEventListener("click", closePopup);

setTimeout(closePopup, 10000);

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  playSong();
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (!isPlaying) {
    playSong();
    isPlaying = true;
  } else {
    pauseSong();
    isPlaying = false;
  }
}

function checkPlay() {
  if (!isPlaying) return;
  setTimeout(() => {
    playSong();
  }, 25);
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  checkPlay();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 0) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  checkPlay();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 0 + songs.length) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  checkPlay();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 0,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});



badge.className = "badge";
badge.textContent = "New";
firstSlide.appendChild(badge);
