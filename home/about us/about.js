document.addEventListener('DOMContentLoaded', function() {
 
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            document.querySelector('#experience').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    function animateRoadmap() {
        const roadmapItems = document.querySelectorAll('.roadmap-item');
        roadmapItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 150 * index);
            }
        });
    }
    window.addEventListener('scroll', animateRoadmap);
    animateRoadmap();

    const heroQuote = document.querySelector('.hero-quote');
    if (heroQuote) {
        const text = heroQuote.innerHTML;
        heroQuote.innerHTML = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroQuote.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        }
        setTimeout(typeWriter, 1000);
    }
});