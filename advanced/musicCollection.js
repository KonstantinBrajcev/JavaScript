// Создаем список альбомов
const musicCollection = {
  albums: [
    { title: "Dark Side of the Moon", artist: "Pink Floyd", year: "1973" },
    { title: "Abbey Road", artist: "The Beatles", year: "1969" },
    { title: "В Питере пить", artist: "Ленинград", year: "2012" },
    { title: "Thriller", artist: "Michael Jackson", year: "1982" },
    { title: "Вите надо выйти", artist: "ESTRADARADA", year: "2020" },
  ],

  [Symbol.iterator]: function () {
    let index = 0;
    const albums = this.albums;

    return {
      next: function () {
        if (index < albums.length) {
          return { value: albums[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

let iterator = musicCollection[Symbol.iterator]();
document.getElementById('hideAlbums').style.display = 'none';

// Функция для отображения альбомов
function displayAlbums() {
  document.getElementById('output').style.display = 'block';
  output.innerHTML = ''; // Очистка предыдущего вывода
  for (const album of musicCollection) {
    output.innerHTML += `<p>${album.title} - ${album.artist} (${album.year})</p>`;
  }
  document.getElementById('displayAlbums').style.display = 'none';
  document.getElementById('hideAlbums').style.display = 'block';
}

// Функция для скрытия альбомов
function hideAlbums() {
  document.getElementById('output').innerHTML = ''; // Очистка содержимого
  document.getElementById('hideAlbums').style.display = 'none';
  document.getElementById('displayAlbums').style.display = 'block';
}

// Вывод следующего альбома
function nextAlbum() {
  const currentAlbumDiv = document.getElementById('current-album');
  const result = iterator.next();

  if (!result.done) {
    const album = result.value;
    currentAlbumDiv.innerHTML = `${album.title} - ${album.artist} (${album.year})`;
  } else {
    // Сброс индекса на 0, чтобы начать с первого альбома
    iterator = musicCollection[Symbol.iterator]();
    const firstAlbum = iterator.next().value;
    currentAlbumDiv.innerHTML = `${firstAlbum.title} - ${firstAlbum.artist} (${firstAlbum.year})`;
  }
}
