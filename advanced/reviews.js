let initialData = [];
const reviewsContainer = document.getElementById('reviewsContainer');


async function loadReviews() {
  try {
    const response = await fetch('/reviews'); // Убедись, что путь правильный
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    initialData = await response.json();
    displayReviews();
  } catch (error) {
    console.error(error);
  }
}

// Функция для отображения отзывов
function displayReviews() {
  const reviewsContainer = document.getElementById('reviewsContainer'); // Используй правильный ID
  reviewsContainer.innerHTML = '';

  initialData.forEach(product => {
    product.reviews.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.innerHTML = `<strong>${product.product}</strong>: ${review.text}`;
      reviewsContainer.appendChild(reviewDiv);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  // Загрузка отзывов при загрузке страницы
  loadReviews();

  // Добавление обработчика события для кнопки (если требуется)
  const submitButton = document.getElementById('submit-button');
  if (submitButton) {
    submitButton.addEventListener('click', () => {
      try {
        addReview();
      } catch (error) {
        alert(error.message);
      }
    });
  }
});


// Загрузка отзывов при загрузке страницы
loadReviews();
