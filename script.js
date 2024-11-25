// script.js
const contentDiv = document.getElementById('content');

async function loadCat() {
  const catData = await fetchCatData(); // Получаем данные о коте

  // Создаем элементы
  const img = document.createElement('img');
  img.src = catData.url;
  img.alt = 'Котик';
  img.style.width = '300px'; // Задаем ширину изображения

  const title = document.createElement('h1');
  title.textContent = 'Это котик!';

  const paragraph = document.createElement('p');
  paragraph.textContent = 'Котики - это милые и пушистые создания, которые радуют нас каждый день.';

  // Добавляем элементы в контейнер
  contentDiv.appendChild(img);
  contentDiv.appendChild(title);
  contentDiv.appendChild(paragraph);
}

// Загружаем кота при загрузке страницы
loadCat();
