class Library {
  #books;

  constructor(initialBooks = []) {
    const uniqueBooks = [...new Set(initialBooks)];
    if (uniqueBooks.length !== initialBooks.length) {
      throw new Error("Начальный список книг не должен содержать дубликатов.");
    }
    this.#books = uniqueBooks;
  }

  get allBooks() {
    return this.#books;
  }

  addBook(title) {
    if (this.#books.includes(title)) {
      throw new Error(`Книга "${title}" уже существует в библиотеке.`);
    }
    this.#books.push(title);
  }

  removeBook(title) {
    const index = this.#books.indexOf(title);
    if (index === -1) {
      throw new Error(`Книга "${title}" не найдена в библиотеке.`);
    }
    this.#books.splice(index, 1);
  }

  hasBook(title) {
    return this.#books.includes(title);
  }
}

const library = new Library(['1984', 'Мастер и Маргарита', 'Константин']);
const bookList = document.getElementById('bookList');
const bookTitleInput = document.getElementById('bookTitle');
const searchInput = document.getElementById('searchInput');
const message = document.getElementById('message');
const addBookButton = document.getElementById('addBookButton');

function displayBooks(filter = '') {
  bookList.innerHTML = '';
  library.allBooks
    .filter(book => book.toLowerCase().includes(filter.toLowerCase()))
    .forEach(book => {
      const li = document.createElement('li');
      li.textContent = book;

      // Создаем кнопку "Удалить"
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Удалить';
      removeButton.onclick = () => {
        try {
          library.removeBook(book);
          displayBooks(searchInput.value); // Обновляем список после удаления
        } catch (error) {
          message.textContent = error.message;
        }
      };

      li.appendChild(removeButton);
      bookList.appendChild(li);
    });
}

addBookButton.addEventListener('click', () => {
  const title = bookTitleInput.value.trim();
  if (title) {
    try {
      library.addBook(title);
      bookTitleInput.value = '';
      message.textContent = '';
      displayBooks(searchInput.value); // Обновляем список после добавления
    } catch (error) {
      message.textContent = error.message;
    }
  } else {
    message.textContent = 'Введите название книги.';
  }
});



searchInput.addEventListener('input', () => {
  displayBooks(searchInput.value); // Обновляем список при вводе в поле поиска
});

// Инициализация отображения книг
displayBooks();