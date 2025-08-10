const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 200);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

const mouseBg = document.getElementById("mouseBg");
let mouseX = 0,
  mouseY = 0;
let bgX = 0,
  bgY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateMouseBg() {
  bgX += (mouseX - bgX) * 0.1;
  bgY += (mouseY - bgY) * 0.1;

  mouseBg.style.left = bgX - 50 + "px";
  mouseBg.style.top = bgY - 50 + "px";

  requestAnimationFrame(updateMouseBg);
}
updateMouseBg();

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax-element");

  parallaxElements.forEach((element, index) => {
    const rate = scrolled * -0.5 * (index + 1);
    element.style.transform = `translateY(${rate}px)`;
  });

  const header = document.querySelector(".header");
  header.style.transform = `translateY(${scrolled * 0.3}px)`;
});

const logo = document.querySelector(".logo");
const originalText = logo.textContent;
logo.textContent = "";

function typeWriter(text, element, speed = 120) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 1000);
}

typeWriter(originalText, logo);

const cards = document.querySelectorAll(".section-card, .feature-card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.style.setProperty("--mouse-x", x + "px");
    this.style.setProperty("--mouse-y", y + "px");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

document.querySelectorAll(".floating-icon").forEach((icon, index) => {
  icon.style.animationDelay = index * 1.2 + "s";
});

let gradientAngle = 0;
setInterval(() => {
  gradientAngle += 1;
  document.documentElement.style.setProperty(
    "--gradient-angle",
    gradientAngle + "deg"
  );
}, 50);

let ticking = false;
function updateAnimations() {
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  requestTick();
});
