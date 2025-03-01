// Slider Functionality
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

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);
// Animation for team members on scroll
window.addEventListener('scroll', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member) => {
        const memberPosition = member.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (memberPosition < screenHeight - 100) {
            member.style.opacity = 1;
            member.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.team-member').forEach((member) => {
    member.style.opacity = 0;
    member.style.transform = 'translateY(50px)';
    member.style.transition = 'all 0.8s ease-out';
});
// Animation for cards on scroll
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
// Gestion des mises à jour
document.getElementById('update-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer le texte de la mise à jour
    const updateText = document.getElementById('update-text').value;

    // Vérifier si le texte n'est pas vide
    if (updateText.trim() === "") {
        alert("Veuillez entrer une mise à jour valide.");
        return;
    }

    // Créer un nouvel élément de mise à jour
    const updateItem = document.createElement('div');
    updateItem.classList.add('update-item');

    // Ajouter le contenu de la mise à jour
    const updateContent = document.createElement('p');
    updateContent.classList.add('update-content');
    updateContent.textContent = updateText;

    // Ajouter la date de la mise à jour
    const updateDate = document.createElement('p');
    updateDate.classList.add('update-date');
    updateDate.textContent = `Posté le ${new Date().toLocaleString()}`;

    // Ajouter le contenu et la date à l'élément de mise à jour
    updateItem.appendChild(updateContent);
    updateItem.appendChild(updateDate);

    // Ajouter la mise à jour à la liste
    document.getElementById('updates-container').prepend(updateItem);

    // Réinitialiser le champ de texte
    document.getElementById('update-text').value = "";
});
// Charger les mises à jour depuis le localStorage au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    const updates = JSON.parse(localStorage.getItem('updates')) || [];
    updates.forEach(update => {
        addUpdateToDOM(update.text, update.date);
    });
});

// Gestion des mises à jour
document.getElementById('update-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer le texte de la mise à jour
    const updateText = document.getElementById('update-text').value;

    // Vérifier si le texte n'est pas vide
    if (updateText.trim() === "") {
        alert("Veuillez entrer une mise à jour valide.");
        return;
    }

    // Créer un objet de mise à jour
    const update = {
        text: updateText,
        date: new Date().toLocaleString()
    };

    // Ajouter la mise à jour au DOM
    addUpdateToDOM(update.text, update.date);

    // Sauvegarder la mise à jour dans le localStorage
    const updates = JSON.parse(localStorage.getItem('updates')) || [];
    updates.unshift(update); // Ajouter au début du tableau
    localStorage.setItem('updates', JSON.stringify(updates));

    // Réinitialiser le champ de texte
    document.getElementById('update-text').value = "";
});

// Fonction pour ajouter une mise à jour au DOM
function addUpdateToDOM(text, date) {
    const updateItem = document.createElement('div');
    updateItem.classList.add('update-item');

    const updateContent = document.createElement('p');
    updateContent.classList.add('update-content');
    updateContent.textContent = text;

    const updateDate = document.createElement('p');
    updateDate.classList.add('update-date');
    updateDate.textContent = `Posté le ${date}`;

    updateItem.appendChild(updateContent);
    updateItem.appendChild(updateDate);

    // Ajouter la mise à jour en haut de la liste
    document.getElementById('updates-container').prepend(updateItem);
}