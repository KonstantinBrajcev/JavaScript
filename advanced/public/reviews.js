let initialData = [];

// Функция для загрузки отзывов
async function loadReviews() {
  try {
    const response = await fetch('reviews_3.json');
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    initialData = await response.json();
    displayReviews();
  } catch (error) {
    console.error(error);
  }
}

// Функция для отображения отзывов в таблице
function displayReviews() {
  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.innerHTML = '';

  // Создаем таблицу
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  // Заголовки таблицы
  const headers = ['ID', 'Продукт', 'Текст'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Сортируем отзывы по ID и добавляем в таблицу
  initialData.forEach(product => {
    product.reviews.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    product.reviews.forEach(review => {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const productCell = document.createElement('td');
      const textCell = document.createElement('td');

      idCell.textContent = review.id;
      productCell.textContent = product.product;
      textCell.textContent = review.text;

      row.appendChild(idCell);
      row.appendChild(productCell);
      row.appendChild(textCell);
      table.appendChild(row);
    });
  });

  reviewsContainer.appendChild(table);
}

// Функция для добавления отзыва
function addReview() {
  const productInput = document.getElementById('product-input');
  const reviewInput = document.getElementById('review-input');
  const productName = productInput.value;
  const reviewText = reviewInput.value;

  if (productName.length < 1 || reviewText.length < 5 || reviewText.length > 500) {
    throw new Error('Наименование продукта не может быть пустым, а длина отзыва должна быть от 5 до 500 символов.');
  }

  const newReview = {
    id: (initialData.reduce((maxId, product) => Math.max(maxId, Math.max(...product.reviews.map(r => parseInt(r.id)))), 0) + 1).toString(),
    text: reviewText,
  };

  // Проверяем, существует ли продукт в массиве
  const existingProduct = initialData.find(product => product.product === productName);

  if (existingProduct) {
    // Если продукт существует, добавляем отзыв к этому продукту
    existingProduct.reviews.push(newReview);
  } else {
    // Если продукта нет, создаем новый объект продукта
    initialData.push({ product: productName, reviews: [newReview] });
  }

  productInput.value = ''; // Очистка текстового поля
  reviewInput.value = ''; // Очистка текстового поля
  displayReviews(); // Обновляем отображение отзывов
  saveReviews(); // Сохраняем отзывы в файл
}


// Функция для сохранения отзывов в файл
async function saveReviews() {
  try {
    await fetch('save_reviews.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialData),
    });
  } catch (error) {
    console.error('Ошибка сохранения отзывов:', error);
  }
}

document.getElementById('submit-button').addEventListener('click', () => {
  try {
    addReview();
  } catch (error) {
    alert(error.message);
  }
});

// Загрузка отзывов при загрузке страницы
loadReviews();