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
    title: "Mere Nabi Pyare Nabi",
    name: "TZ Releases",
    source: "/home/lyrics/Tribute to Shaheed Junaid Jamshed - Mere Nabi Pyare Nabi - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Jagah Ji Lagane Ki Duniya Nahi Hai",
    name: "TZ Releases",
    source: "/home/lyrics/Jagah ji lagane ki duniya nahi hai - Junaid Jamshed - Cover by Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Kya haseen samaan hoga",
    name: "TZ Releases",
    source: "/home/lyrics/Beautiful Hajj Kalam - Kya haseen samaan hoga - Hafiz Muhammad Talib - Meri Hazri Hogi - TZ releases.mp3",
  },
  
  {
    title: "Ae rasool e ameen",
    name: "TZ Releases",
    source: "/home/lyrics/A Beautiful tribute to Junaid Jamshed  Ae rasool e ameen  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Muhammad Ka Roza",
    name: "TZ Releases",
    source: "/home/lyrics/Muhammad Ka Roza  Hafiz Muhammad Talib  Junaid Jamshed  TZ releases.mp3",
  },
  {
    title: "Me to ummati hu",
    name: "TZ Releases",
    source: "/home/lyrics/Me to ummati hu  Tribute to Junaid Jamshed  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Ae Nabi Pyare Nabi",
    name: "TZ Releases",
    source: "/home/lyrics/Ae Nabi Pyare Nabi  Hafiz Muhammad Talib  Lyirical Video  TZ releases.mp3",
  },
  {
    title: "Ilahi teri chokhat par",
    name: "TZ Releases",
    source: "/home/lyrics/Ilahi teri chokhat par  Junaid Jamshed (RA)  Super hit  Hafiz Muhammad Talib  TZ releases.mp3",
  },
  {
    title: "Mere Nabi Pyare Nabi",
    name: "TZ Releases",
    source: "/home/lyrics/Mere Nabi Pyare Nabi  Junaid Jamshed  Cover by Hafiz Muhammad Talib  TZ releases.mp3",
  },
    ];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  
  progress.value = 0;
  progress.max = 0;
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
  console.log("Song ended, moving to next song");
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  
  song.addEventListener("loadeddata", function playNext() {
    song.removeEventListener("loadeddata", playNext);
    playSong();
  });
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
  isPlaying = false;
}

function playSong() {
  const playPromise = song.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      controlIcon.classList.add("fa-pause");
      controlIcon.classList.remove("fa-play");
      isPlaying = true;
    }).catch(error => {
      console.error("Error playing song:", error);
      controlIcon.classList.remove("fa-pause");
      controlIcon.classList.add("fa-play");
      isPlaying = false;
    });
  }
}

function playPause() {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
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
  
  if (isPlaying) {
    song.addEventListener("loadeddata", function playNext() {
      song.removeEventListener("loadeddata", playNext);
      playSong();
    });
  }
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 0 + songs.length) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  
  if (isPlaying) {
    song.addEventListener("loadeddata", function playPrev() {
      song.removeEventListener("loadeddata", playPrev);
      playSong();
    });
  }
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
  const wasPlaying = isPlaying;
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  
  if (wasPlaying) {
    song.addEventListener("loadeddata", function playSlide() {
      song.removeEventListener("loadeddata", playSlide);
      playSong();
    });
  } else {
    pauseSong();
  }
});