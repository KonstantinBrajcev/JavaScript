const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработчик для добавления отзыва
app.post('/add-review', (req, res) => {
  const { product, text } = req.body;

  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return res.status(500).send('Ошибка при чтении файла');
    }

    let reviewsData = JSON.parse(data);
    const productIndex = reviewsData.findIndex(item => item.product === product);

    // Генерация нового ID
    let newId = 1; // Начинаем с 1
    for (const item of reviewsData) {
      for (const review of item.reviews) {
        const reviewId = parseInt(review.id, 10);
        if (reviewId >= newId) {
          newId = reviewId + 1; // Увеличиваем новый ID, если он меньше или равен существующему
        }
      }
    }

    if (productIndex === -1) {
      // Продукт не найден, создаем новую запись
      const newProduct = {
        product: product,
        reviews: [{
          id: newId.toString(), // Присваиваем новый ID
          text: text
        }]
      };
      reviewsData.push(newProduct);
    } else {
      // Продукт найден, добавляем новый отзыв
      const newReview = {
        id: newId.toString(), // Присваиваем новый ID
        text: text
      };
      reviewsData[productIndex].reviews.push(newReview);
    }

    // Сохранение обновленных данных в файл
    fs.writeFile('reviews.json', JSON.stringify(reviewsData, null, 2), (err) => {
      if (err) {
        console.error('Ошибка при сохранении файла:', err);
        return res.status(500).send('Ошибка при сохранении файла');
      }
      res.send('Отзыв успешно добавлен');
    });
  });
});


// Обработчик для загрузки отзывов
app.get('/reviews', (req, res) => {
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка при чтении файла');
    }
    res.send(data);
  });
});

// Запуск сервера
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
