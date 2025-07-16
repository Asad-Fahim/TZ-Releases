 const progress = document.getElementById("progress");
    const song = document.getElementById("song");
    const controlIcon = document.getElementById("controlIcon");
    const playPauseButton = document.querySelector(".play-pause-btn");
    const nextButton = document.querySelector(".controls button.forward");
    const prevButton = document.querySelector(".controls button.backward");
    const songName = document.querySelector(".Nasheed-player h1");
    const artistName = document.querySelector(".Nasheed-player p");
    const errorMessage = document.getElementById("errorMessage");

    let isPlaying = false;
    let swiper;

  
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

    let currentSongIndex = 0;

    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 3000);
    }

    function updateSongInfo() {
      if (currentSongIndex < 0 || currentSongIndex >= songs.length) {
        currentSongIndex = 0;
      }
      
      songName.textContent = songs[currentSongIndex].title;
      artistName.textContent = songs[currentSongIndex].name;
      song.src = songs[currentSongIndex].source;
    }

    song.addEventListener("timeupdate", () => {
      if (!song.paused && song.duration) {
        progress.value = song.currentTime;
      }
    });

    song.addEventListener("loadedmetadata", () => {
      progress.max = song.duration;
      progress.value = song.currentTime;
    });

    song.addEventListener("ended", () => {
      nextSong();
    });

    song.addEventListener("error", (e) => {
      showError("Error loading audio file. Please check the file path.");
      console.error("Audio error:", e);
    });

    function pauseSong() {
      song.pause();
      controlIcon.classList.remove("fa-pause");
      controlIcon.classList.add("fa-play");
      isPlaying = false;
    }

    function playSong() {
      song.play().catch((error) => {
        showError("Error playing audio. Please try again.");
        console.error("Play error:", error);
      });
      controlIcon.classList.add("fa-pause");
      controlIcon.classList.remove("fa-play");
      isPlaying = true;
    }

    function playPause() {
      if (!isPlaying) {
        playSong();
      } else {
        pauseSong();
      }
    }

    function nextSong() {
      currentSongIndex = (currentSongIndex + 0) % songs.length;
      updateSongInfo();
      if (swiper) {
        swiper.slideTo(currentSongIndex);
      }
      if (isPlaying) {
        setTimeout(() => {
          playSong();
        }, 100);
      }
    }

    function prevSong() {
      currentSongIndex = (currentSongIndex - 0 + songs.length) % songs.length;
      updateSongInfo();
      if (swiper) {
        swiper.slideTo(currentSongIndex);
      }
      if (isPlaying) {
        setTimeout(() => {
          playSong();
        }, 100);
      }
    }

    playPauseButton.addEventListener("click", playPause);

    progress.addEventListener("input", () => {
      song.currentTime = progress.value;
    });

    nextButton.addEventListener("click", nextSong);
    prevButton.addEventListener("click", prevSong);

    swiper = new Swiper(".swiper", {
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

    updateSongInfo();




























// const progress = document.getElementById("progress");
// const song = document.getElementById("song");
// const controlIcon = document.getElementById("controlIcon");
// const playPauseButton = document.querySelector(".play-pause-btn");
// const nextButton = document.querySelector(".controls button.forward");
// const prevButton = document.querySelector(".controls button.backward");
// const songName = document.querySelector(".Nasheed-player h1");
// const artistName = document.querySelector(".Nasheed-player p");

// let isPlaying = false;

// const songs = [
//   {
//     title: "Mere Nabi Pyare Nabi",
//     name: "TZ Releases",
//     source: "/home/lyrics/Tribute to Shaheed Junaid Jamshed - Mere Nabi Pyare Nabi - Hafiz Muhammad Talib - TZ Releases.mp3",
//   },
//   {
//     title: "Jagah Ji Lagane Ki Duniya Nahi Hai",
//     name: "TZ Releases",
//     source: "/home/lyrics/Jagah ji lagane ki duniya nahi hai - Junaid Jamshed - Cover by Hafiz Muhammad Talib - TZ Releases.mp3",
//   },
//   {
//     title: "Kya haseen samaan hoga",
//     name: "TZ Releases",
//     source: "/home/lyrics/Beautiful Hajj Kalam - Kya haseen samaan hoga - Hafiz Muhammad Talib - Meri Hazri Hogi - TZ releases.mp3",
//   },
  
//   {
//     title: "Ae rasool e ameen",
//     name: "TZ Releases",
//     source: "/home/lyrics/A Beautiful tribute to Junaid Jamshed  Ae rasool e ameen  Hafiz Muhammad Talib  TZ releases.mp3",
//   },
//   {
//     title: "Muhammad Ka Roza",
//     name: "TZ Releases",
//     source: "/home/lyrics/Muhammad Ka Roza  Hafiz Muhammad Talib  Junaid Jamshed  TZ releases.mp3",
//   },
//   {
//     title: "Me to ummati hu",
//     name: "TZ Releases",
//     source: "/home/lyrics/Me to ummati hu  Tribute to Junaid Jamshed  Hafiz Muhammad Talib  TZ releases.mp3",
//   },
//   {
//     title: "Ae Nabi Pyare Nabi",
//     name: "TZ Releases",
//     source: "/home/lyrics/Ae Nabi Pyare Nabi  Hafiz Muhammad Talib  Lyirical Video  TZ releases.mp3",
//   },
//   {
//     title: "Ilahi teri chokhat par",
//     name: "TZ Releases",
//     source: "/home/lyrics/Ilahi teri chokhat par  Junaid Jamshed (RA)  Super hit  Hafiz Muhammad Talib  TZ releases.mp3",
//   },
//   {
//     title: "Mere Nabi Pyare Nabi",
//     name: "TZ Releases",
//     source: "/home/lyrics/Mere Nabi Pyare Nabi  Junaid Jamshed  Cover by Hafiz Muhammad Talib  TZ releases.mp3",
//   },
// ];

// let currentSongIndex = 1;

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
//   initialSlide: 0 ,
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
