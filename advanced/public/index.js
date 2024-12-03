// Получаем контейнер для отзывов
const reviewsContainer = document.getElementById('reviewsContainer');

// Функция для добавления отзыва
function addReview() {
    const productInput = document.getElementById('productName');
    const reviewInput = document.getElementById('reviewText');
    const productName = productInput.value;
    const reviewText = reviewInput.value;

    // Проверка на длину текста
    if (productName.length < 1 || reviewText.length < 5 || reviewText.length > 500) {
        alert('Наименование продукта не может быть пустым, а длина отзыва должна быть от 5 до 500 символов.');
        return;
    }

    fetch('/add-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product: productName, text: reviewText })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при добавлении отзыва');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            productInput.value = ''; // Очистка текстового поля
            reviewInput.value = ''; // Очистка текстового поля
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
