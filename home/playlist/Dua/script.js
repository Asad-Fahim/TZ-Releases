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
    title: "Main Qabr Andheri Mein Ghabraunga Jab Tanha",
    name: "TZ Releases",
    source: "/home/lyrics/Main Qabr Andheri Mein Ghabraunga Jab Tanha - Most Emotional Dua - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Khaak e Sir Syed",
    name: "TZ Releases",
    source: "/home/lyrics/Khaak e Sir Syed - Sir Syed day special - Beautiful Dua for AMU - Hafiz Muhammad Talib - TZ releases.mp3",
  },
  {
    title: "Har Tamanna ",
    name: "TZ Releases",
    source: "/home/lyrics/Most Emotional Nazm - Har Tamanna - Khwaja Aziz ul Hasan Majzub - Hafiz Muhammad Talib - TZ releases.mp3",
  },
  
  {
    title: "Khaak e Sir Syed  ",
    name: "TZ Releases",
    source: "/home/lyrics/Khaak e Sir Syed  Beautiful Nazam by Muhammad Adeel  17th October Sir Syed Day  TZ releases.mp3",
  },
  {
    title: "Rabb e kaaba mujhe maaf kar de",
    name: "TZ Releases",
    source: "/home/lyrics/Rabb e kaaba mujhe maaf kar de  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Me to ummati hu ",
    name: "TZ Releases",
    source: "/home/lyrics/Me to ummati hu  Tribute to Junaid Jamshed  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Tahajjud ki Fariyaad",
    name: "TZ Releases",
    source: "/home/lyrics/Tahajjud ki Fariyaad  Ab Raat Guzarne Wali he  Hafiz Muhammad Talib  TZ Releases.mp3",
  },
  {
    title: "Dua Mangta Hoon",
    name: "TZ Releases",
    source: "/home/lyrics/Dua Mangta Hoon  Hafiz Muhammad Talib  TZ Releases.mp3",
  },
  {
    title: "Mera Zulmat Me Duba Dil Badal De",
    name: "TZ Releases",
    source: "/home/lyrics/Mera Zulmat Me Duba Dil Badal De  Self composed  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Ilahi teri chokhat par",
    name: "TZ Releases",
    source: "/home/lyrics/Ilahi teri chokhat par  Junaid Jamshed (RA)  Super hit  Hafiz Muhammad Talib  TZ releases.mp3",
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
