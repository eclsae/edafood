
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Функция для обновления списка избранного
function updateFavoritesDisplay() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // Очистить предыдущий список

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>Ваши избранные рецепты будут отображаться здесь.</p>';
    } else {
        favorites.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('favorite-item');

            // Создаем элемент изображения
            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.name; // Используем имя рецепта в качестве alt-текста
            recipeImage.style.width = '30%'; // Установите желаемую ширину
            recipeItem.appendChild(recipeImage);

            // Создаем элемент текста
            const recipeText = document.createElement('p');
            recipeText.textContent = recipe.name;
            recipeItem.appendChild(recipeText);

            favoritesList.appendChild(recipeItem);
        });
    }
}

// Обработчики событий для кнопок "Добавить в избранное"
document.querySelectorAll('.favorite-button').forEach((button) => {
    const recipeCard = button.closest('.recipe-card');
    const recipeName = recipeCard.querySelector('h3').textContent;
    const recipeImage = recipeCard.querySelector('img').src;

    // Проверяем, есть ли уже рецепт в избранном
    const isFavorite = favorites.some(favorite => favorite.name === recipeName);
    button.textContent = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';

    button.addEventListener('click', () => {
        const recipeObject = { name: recipeName, image: recipeImage };

        // Проверка на наличие рецепта в избранном
        const index = favorites.findIndex(fav => fav.name === recipeName);
        if (index === -1) {
            favorites.push(recipeObject); // Добавляем объект в избранное
            button.textContent = 'Убрать из избранного';
        } else {
            favorites.splice(index, 1); // Убираем рецепт из избранного
            button.textContent = 'Добавить в избранное';
        }

        // Сохраняем избранное в Local Storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesDisplay(); // Обновить отображение списка избранного
    });
});

// Изначально загружаем и отображаем избранное при загрузке страницы
updateFavoritesDisplay();

// Прокрутка страницы вверх
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});
