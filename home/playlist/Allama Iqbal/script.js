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
    title: "Ye Aashik",
    name: "TZ Releases",
    source: "/home/lyrics/Allama Iqbal Poetry  Ye aashik  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Himalya",
    name: "TZ Releases",
    source: "/home/lyrics/HIMALAYA - Kalam e Iqbal - 15 August Special - Muhammad Talib - Happy Independence day - TZ Releases.mp3",
  },
  {
    title: "Mere Watan Wahi He",
    name: "TZ Releases",
    source: "/home/lyrics/Mera Watan Wahi He  15 August  Allama Iqbal  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Ye Aashik",
    name: "TZ Releases",
    source: "/home/lyrics/Ye Aashiq - Most Beautiful Kalaam 2024 - Allama Iqbal - Muhammad Talib - TZ Releases.mp3",
  },
];

let currentSongIndex = 3;

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


























// const progress = document.getElementById("progress");
// const song = document.getElementById("song");
// const controlIcon = document.getElementById("controlIcon");
// const playPauseButton = document.querySelector(".play-pause-btn");
// const nextButton = document.querySelector(".controls button.forward");
// const prevButton = document.querySelector(".controls button.backward");
// const songName = document.querySelector(".Nasheed-player h1");
// const artistName = document.querySelector(".Nasheed-player p");

// const welcomePopup = document.getElementById("welcomePopup");
// const closePopupButton = document.getElementById("closePopup");

// let isPlaying = false;

// const songs = [
 
//   {
//     title: "Habbat Krryh",
//     name: "Glitch.Nasheed.Library",
//     source: "Habbat Krryh.mp3",
//   },
//   {
//     title: "Salaktu Tariqi",
//     name: "Glitch.Nasheed.Library",
//     source: "Salaktu Tariqi.mp3",
//   },
//   {
//     title: "Ummat Al Islami",
//     name: "Glitch.Nasheed.Library",
//     source: "Ummat Al Islami.mp3",
//   },
//   {
//     title: "Ya Shahida",
//     name: "Glitch.Nasheed.Library",
//     source: "Ya Shahida.mp3",
//   },
// ];

// let currentSongIndex = 3;

// function closePopup() {
//   welcomePopup.style.animation = "fadeOut 0.5s forwards";
//   setTimeout(() => {
//     welcomePopup.style.display = "none";
//   }, 500);
// }

// closePopupButton.addEventListener("click", closePopup);

// setTimeout(closePopup, 10000);

// function updateSongInfo() {
//   songName.textContent = songs[currentSongIndex].title;
//   artistName.textContent = songs[currentSongIndex].name;
//   song.src = songs[currentSongIndex].source;
// }

// song.addEventListener("timeupdate", () => {
//   if (!song.paused) {
//     progress.value = song.currentTime;
//   }
// });

// song.addEventListener("loadedmetadata", () => {
//   progress.max = song.duration;
//   progress.value = song.currentTime;
// });

// song.addEventListener("ended", () => {
//   currentSongIndex = (swiper.activeIndex + 1) % songs.length;
//   updateSongInfo();
//   swiper.slideTo(currentSongIndex);
//   playSong();
// });

// function pauseSong() {
//   song.pause();
//   controlIcon.classList.remove("fa-pause");
//   controlIcon.classList.add("fa-play");
// }

// function playSong() {
//   song.play();
//   controlIcon.classList.add("fa-pause");
//   controlIcon.classList.remove("fa-play");
// }

// function playPause() {
//   if (!isPlaying) {
//     playSong();
//     isPlaying = true;
//   } else {
//     pauseSong();
//     isPlaying = false;
//   }
// }

// function checkPlay() {
//   if (!isPlaying) return;
//   setTimeout(() => {
//     playSong();
//   }, 25);
// }

// playPauseButton.addEventListener("click", playPause);

// progress.addEventListener("input", () => {
//   song.currentTime = progress.value;
// });

// progress.addEventListener("change", () => {
//   checkPlay();
// });

// nextButton.addEventListener("click", () => {
//   currentSongIndex = (currentSongIndex + 0) % songs.length;
//   updateSongInfo();
//   swiper.slideTo(currentSongIndex);
//   checkPlay();
// });

// prevButton.addEventListener("click", () => {
//   currentSongIndex = (currentSongIndex - 0 + songs.length) % songs.length;
//   updateSongInfo();
//   swiper.slideTo(currentSongIndex);
//   checkPlay();
// });

// updateSongInfo();

// var swiper = new Swiper(".swiper", {
//   effect: "coverflow",
//   centeredSlides: true,
//   initialSlide: 3,
//   slidesPerView: "auto",
//   grabCursor: true,
//   spaceBetween: 40,
//   coverflowEffect: {
//     rotate: 25,
//     stretch: 0,
//     depth: 50,
//     modifier: 1,
//     slideShadows: false,
//   },
//   navigation: {
//     nextEl: ".forward",
//     prevEl: ".backward",
//   },
// });

// swiper.on("slideChange", () => {
//   currentSongIndex = swiper.activeIndex;
//   updateSongInfo();
//   pauseSong();
// });