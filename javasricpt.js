function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (cardPosition < screenHeight - 100) {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.card').forEach((card) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease-out';
});

// Fonction pour le défilement d'images
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    slides.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Optionnel : Défilement automatique
setInterval(nextSlide, 500); // Change d'image toutes les 5 secondes