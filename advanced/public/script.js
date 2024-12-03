// Просмотр отзывов
if (reviewsContainer) {
  fetch('/reviews')
      .then(response => response.json())
      .then(reviews => {
          if (reviews.length === 0) {
              reviewsContainer.innerHTML = '<p>Нет отзывов.</p>';
              return;
          }

          reviews.forEach(product => {
              const productDiv = document.createElement('div');
              productDiv.innerHTML = `<strong>${product.product}</strong>`;
              productDiv.addEventListener('click', () => {
                  alert(product.reviews.map(review => review.text).join('\n'));
              });

              reviewsContainer.appendChild(productDiv);

              product.reviews.forEach((review) => {
                  const reviewDiv = document.createElement('div');
                  reviewDiv.className = 'review';
                  reviewDiv.innerHTML = `${review.text} <span class="delete-btn" data-product="${product.product}" data-id="${review.id}">Удалить</span>`;
                  reviewsContainer.appendChild(reviewDiv);
              });
          });
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });
}
