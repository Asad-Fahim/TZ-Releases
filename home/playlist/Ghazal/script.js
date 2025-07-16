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
    title: " Mujhe Kya Khabar Mere Doston",
    name: "TZ Releases",
    source: "/home/lyrics/Most Beautiful Ghazal - Mujhe Kya Khabar Mere Doston - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Mere Hujre Mein Nahi",
    name: "TZ Releases",
    source: "/home/lyrics/Rahat Indori Most Famous Ghazal - Mere Hujre Mein Nahi - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Dost ka paigham aa gaya",
    name: "TZ Releases",
    source: "/home/lyrics/Dost ka paigham aa gaya - Beautiful Ghazal by Jigar Muradabadi - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  
  {
    title: "Tob Tobi Tob",
    name: "TZ Releases",
    source: "/home/lyrics/Viral Arabic Nasheed - Tob Tobi Tob - With Urdu Translation in Description - TZ Releases.mp3",
  },
  {
    title: "Ham Wafa Kar Ke Bhi Tanha Reh Gaye",
    name: "TZ Releases",
    source: "/home/lyrics/Without Music Sad Ghazal - Ham Wafa Kar Ke Bhi Tanha Reh Gaye - TZ Releases - Dil Ke Armaan Aansuon.mp3",
  },
  {
    title: "Ye Aashiq",
    name: "TZ Releases",
    source: "/home/lyrics/Ye Aashiq - Most Beautiful Kalaam 2024 - Allama Iqbal - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Abhi Mohabbat Nayi Nayi Hai",
    name: "TZ Releases",
    source: "/home/lyrics/Abhi Mohabbat Nayi Nayi Hai - Most Beautiful Ghazal - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Muhabbat mein ye kya maqaam aa rahe hain",
    name: "TZ Releases",
    source: "/home/lyrics/Muhabbat mein ye kya maqaam aa rahe hain - Jigar Series - Episode 3 - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Wo Ada e Dilbaree Ho",
    name: "TZ Releases",
    source: "/home/lyrics/Wo Ada e Dilbaree Ho - Jigar Series - Episode 2 - Muhammad Talib - Faatih e Zamana - TZ Releases.mp3",
  },
  {
    title: "Dil ko sukoon rooh ko aram aa gaya",
    name: "TZ Releases",
    source: "/home/lyrics/Dil ko sukoon rooh ko aram aa gaya - Jigar Series - Episode 1 - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Kitab Saada Rahegi Kab Tak",
    name: "TZ Releases",
    source: "/home/lyrics/Kitab Saada Rahegi Kab Tak - Most Famous Beautiful Ghazal - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Main bohot dino se udaas hu",
    name: "TZ Releases",
    source: "/home/lyrics/Main bohot dino se udaas hu - Sad urdu ghazal - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Abhi mohabbat nayi nayi hai",
    name: "TZ Releases",
    source: "/home/lyrics/Abhi mohabbat nayi nayi hai - Beautiful Ghazal - Shabeena Adeeb - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Sab hi kuch ulta hai",
    name: "TZ Releases",
    source: "/home/lyrics/Sab hi kuch ulta hai - Most Emotional Urdu Ghazal _ Official Ghazal - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Kashti tera naseeb chamakdar kar diya",
    name: "TZ Releases",
    source: "/home/lyrics/Tribute to Raahat Indori - Kashti tera naseeb chamakdar kar diya - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Yu hi be sabab na phira karo",
    name: "TZ Releases",
    source: "/home/lyrics/Most Beautiful Poetry - Bashir Badr - Yu hi be sabab na phira karo - Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Jazba e Dil",
    name: "TZ Releases",
    source: "/home/lyrics/Jazba e Dil - Most Inspirational Ghazal - Samne Manzil aa Jaye - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Abhi to main Jawan hu",
    name: "TZ Releases",
    source: "/home/lyrics/Abhi to main Jawan hu - Hafeez Jhalandri - Beautiful Ghazal - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Pyaar Ka Qissa",
    name: "TZ Releases",
    source: "/home/lyrics/Pyaar Ka Qissa - Story of LOVE - Most Emotional Ghazal - Cover by Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "Jinhey Sahar Nigal Gayi",
    name: "TZ Releases",
    source: "/home/lyrics/Jinhey Sahar Nigal Gayi - Full Ghazal - Maulana Aamir Usmani - Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "",
    name: "TZ Releases",
    source: "/home/lyrics/Kalaam e Iqbal - Ye Aashiq - World Urdu Day Special - Cover by Hafiz Muhammad Talib - TZ Releases.mp3",
  },
  {
    title: "",
    name: "TZ Releases",
    source: "/home/lyrics/Wo ada e Dil bareen ho - Beautiful Ghazal by Jigar Moradabadi - Hafiz Muhammad Talib - TZ releases.mp3",
  },
  {
    title: "",
    name: "TZ Releases",
    source: "/home/lyrics/Allama Iqbal Poetry  Ye aashik  Hafiz Muhammad Talib  TZ releases.mp3",
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