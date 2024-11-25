const accessKey = 'WYP2e413gQZiQtPTjDlhurplC1WIjlStGsdkRRK_8VY';
const imageElement = document.getElementById('randomImage');
const photographerNameElement = document.getElementById('photographerName');
const likeButton = document.getElementById('likeButton');
const likeCountElement = document.getElementById('likeCount');
const historyContainer = document.getElementById('historyContainer');

let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
let history = JSON.parse(localStorage.getItem('imageHistory')) || [];

likeCountElement.textContent = likeCount;

// Функция для отображения истории изображений
function displayHistory() {
  historyContainer.innerHTML = '';
  history.forEach(item => {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'history-image';
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.description;
    imgDiv.appendChild(img);
    const caption = document.createElement('p');
    caption.textContent = `Фото: ${item.description}, Фотограф: ${item.photographer}`;
    imgDiv.appendChild(caption);
    historyContainer.appendChild(imgDiv);
  });
}

function fetchRandomImage() {
  fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
      imageElement.src = data.urls.regular;
      photographerNameElement.textContent = `Фото: ${data.alt_description || 'Неизвестно'}, Фотограф: ${data.user.name}`;

      // Добавляем изображение в историю
      const newImage = {
        url: data.urls.regular,
        description: data.alt_description || 'Неизвестно',
        photographer: data.user.name
      };

      history.push(newImage);
      localStorage.setItem('imageHistory', JSON.stringify(history));
      displayHistory();
    })
    .catch(err => console.error(err));
}

likeButton.addEventListener('click', () => {
  likeCount++;
  likeCountElement.textContent = likeCount;
  localStorage.setItem('likeCount', likeCount);
});

// Загружаем случайное изображение и историю при загрузке страницы
window.onload = () => {
  fetchRandomImage();
  displayHistory();
};
