const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Для статических файлов

// Эндпоинт для получения отзывов
app.get('/reviews', (req, res) => {
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения файла');
    }
    // Если файл пуст, возвращаем пустой массив
    const reviews = data ? JSON.parse(data) : [];
    res.json(reviews);
  });
});

// Эндпоинт для сохранения отзывов
app.post('/reviews', (req, res) => {
  const newReview = req.body;

  fs.readFile('reviews.json', 'utf8', (err, data) => {
    let reviews = {};
    if (!err && data) {
      reviews = JSON.parse(data);
    }

    if (!reviews[newReview.productName]) {
      reviews[newReview.productName] = [];
    }
    reviews[newReview.productName].push(newReview.reviewText);

    fs.writeFile('reviews.json', JSON.stringify(reviews), (err) => {
      if (err) {
        return res.status(500).send('Ошибка записи файла');
      }
      res.send('Отзыв сохранен');
    });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
