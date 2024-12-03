document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('reviewForm');
  const reviewsContainer = document.getElementById('reviewsContainer');

  // Добавление отзыва
  if (reviewForm) {
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const productName = document.getElementById('productName').value;
      const reviewText = document.getElementById('reviewText').value;

      fetch('/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName, reviewText })
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          reviewForm.reset();
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    });
  }

  // Просмотр отзывов
  if (reviewsContainer) {
    fetch('/reviews')
      .then(response => response.json())
      .then(reviews => {
        for (const product in reviews) {
          const productDiv = document.createElement('div');
          productDiv.innerHTML = `<strong>${product}</strong>`;
          productDiv.addEventListener('click', () => {
            alert(reviews[product].join('\n'));
          });

          reviewsContainer.appendChild(productDiv);

          reviews[product].forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            reviewDiv.innerHTML = `${review} <span class="delete-btn" data-product="${product}" data-index="${index}">Удалить</span>`;
            reviewsContainer.appendChild(reviewDiv);
          });
        }

        reviewsContainer.addEventListener('click', (event) => {
          if (event.target.classList.contains('delete-btn')) {
            // Удаление отзыва нужно реализовать на сервере
            // Можно добавить соответствующий API для этого
          }
        });
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }
});
