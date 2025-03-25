window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.querySelector(".dropdown");
    dropdown.addEventListener("click", function() {
        this.classList.toggle("active");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const aboutItems = document.querySelectorAll(".about-item");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.3 });
    aboutItems.forEach(item => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", function() {
    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero img");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroText.classList.add("fade-in");

                // Delay the image fade-in effect
                setTimeout(() => {
                    heroImage.classList.add("fade-in");
                }, 950); 
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroText);
});