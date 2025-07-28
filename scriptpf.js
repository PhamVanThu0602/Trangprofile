function goTo(url) {
  window.open(url, "_blank");
}


const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const cards = document.querySelectorAll('.carousel-track .card');

let currentIndex = 0;
const totalCards = cards.length;

function updateCarousel() {
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
});
