
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

// Функция для показа текущего слайда
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

// Функция для смены слайда
function moveSlide(step) {
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// События для кнопок
document.querySelector('.next-button').addEventListener('click', () => moveSlide(1));
document.querySelector('.prev-button').addEventListener('click', () => moveSlide(-1));

// Изначально показываем первый слайд
showSlide(currentSlide);

// Обработчик события для кнопки отправки
document.querySelector('button[type="submit"]').addEventListener('click', () => {
    // Показать сообщение о том, что рецепт отправлен на модерацию
    alert('Ваш рецепт отправлен на модерацию.');
});
