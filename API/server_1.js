const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/classes', (req, res) => {
  fs.readFile('training.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка чтения файла');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/update-classes', (req, res) => {
  const updatedClasses = req.body;
  fs.writeFile('training.json', JSON.stringify(updatedClasses, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно сохранены');
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
