const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".Nasheed-player h1");
const artistName = document.querySelector(".Nasheed-player p");

let isPlaying = false;

const songs = [
   {
    title: "",
    name: "TZ Releases",
    source: "/home/lyrics/Aye Khuda Aye Khuda - Beautiful Hamd - Jisne Ki Justuju - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Give Thanks To Allah -without duff",
    name: "TZ Releases",
    source: "/home/lyrics/Beautiful Hamd - Give Thanks To Allah - Without Duff Version - Hafiz Muhammad Talib - TZ Releases.mp3",
  }, {
    title: "Give Thanks To Allah -Duff",
    name: "TZ Releases",
    source: "/home/lyrics/Give Thanks To Allah - Without Music Beautiful Hamd - Duff Only - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Give Thanks To Allah -Three Languages",
    name: "TZ Releases",
    source: "/home/lyrics/Give Thanks To Allah - Three Languages Hamd - English - Arabic - Urdu - Muhammad Talib - TZ Releases.mp3",
  }, {
    title: "Har Tamanna",
    name: "TZ Releases",
    source: "/home/lyrics/Most Emotional Nazm - Har Tamanna - Khwaja Aziz ul Hasan Majzub - Hafiz Muhammad Talib - TZ releases.mp3",
  },
  {
    title: "Give Thanks To Allah ",
    name: "TZ Releases",
    source: "/home/lyrics/Beautiful Hamd by Hafiz Muhammad Talib - Allah Allah - With beautiful scene on house boat Kerala.mp3",
  }, {
    title: "Tu Ameer e Haram",
    name: "TZ Releases",
    source: "/home/lyrics/Tu Ameer e Haram  Most Beautiful Kalam  Tu Kuja Man Kuja  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Wohi Khuda He",
    name: "TZ Releases",
    source: "/home/lyrics/Wohi Khuda He  Beautiful Hamd  Koi To He Jo  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Ae Khuda Tere Liye",
    name: "TZ Releases",
    source: "/home/lyrics/Ae Khuda Tere Liye  Hafiz Muhammad Talib  Self Composed  TZ releases.mp3",
  },
  {
    title: "Manzoom Tarjuma AL-HAMD Shareef",
    name: "TZ Releases",
    source: "/home/lyrics/Manzoom Tarjuma AL-HAMD Shareef l Hafiz Muhammad Talib l TZ releases.mp3",
  },
  {
    title: "Allah u Allah - Three Languages",
    name: "TZ Releases",
    source: "/home/lyrics/Allah u Allah  3 languages  Hafiz Muhammad Talib  TZ releases.mp3",
  },
];

let currentSongIndex = 1;

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
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
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

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  pauseSong();
});
