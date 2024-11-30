// Определяем поваров и их специализации
const chefs = new Map([
  ['Виктор', 'Пицца'],
  ['Ольга', 'Суши'],
  ['Дмитрий', 'Десерты']
]);

// Определяем блюда и их поваров
const dishes = new Map([
  ['Пицца "Маргарита"', 'Виктор'],
  ['Пицца "Пепперони"', 'Виктор'],
  ['Суши "Филадельфия"', 'Ольга'],
  ['Суши "Калифорния"', 'Ольга'],
  ['Тирамису', 'Дмитрий'],
  ['Чизкейк', 'Дмитрий']
]);

// Определяем заказы
const orders = new Map();

const clientAlexey = { name: 'Алексей' };
const clientMaria = { name: 'Мария' };
const clientIrina = { name: 'Ирина' };

orders.set(clientAlexey, ['Пицца "Пепперони"', 'Тирамису']);
orders.set(clientMaria, ['Суши "Калифорния"', 'Пицца "Маргарита"']);
orders.set(clientIrina, ['Чизкейк']);

document.getElementById('displayClients').style.display = 'none';

// Функция для отображения заказов
function displayOrders() {
  const ordersDiv = document.getElementById('all_orders');
  ordersDiv.innerHTML = '';

  orders.forEach((orderedDishes, client) => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order';

    const dishDetails = orderedDishes.map(dish => {
      const chef = dishes.get(dish);
      return `${dish} (повар: ${chef})`;
    }).join(', ');

    orderDiv.innerHTML = `<strong>${client.name}</strong> заказал: ${dishDetails}`;
    ordersDiv.appendChild(orderDiv);
  });
}

// Обработка клика по кнопке "Добавить клиента"
document.getElementById('addClientBtn').onclick = function () {
  document.getElementById('myModal').style.display = 'block';
  populateDishOptions();
};

// Закрытие модального окна
document.querySelector('.close').onclick = function () {
  document.getElementById('myModal').style.display = 'none';
};

// Заполнение опций для выбора блюд
function populateDishOptions() {
  const dishOptionsDiv = document.getElementById('dishOptions');
  dishOptionsDiv.innerHTML = '';
  dishes.forEach((chef, dish) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = dish;
    checkbox.id = dish;

    const label = document.createElement('label');
    label.htmlFor = dish;
    label.appendChild(document.createTextNode(dish));

    dishOptionsDiv.appendChild(checkbox);
    dishOptionsDiv.appendChild(label);
    dishOptionsDiv.appendChild(document.createElement('br'));
  });
}

// Обработка добавления заказа
document.getElementById('submitOrder').onclick = function () {
  const clientName = document.getElementById('clientName').value;
  const selectedDishes = Array.from(document.querySelectorAll('#dishOptions input:checked')).map(input => input.value);

  if (clientName && selectedDishes.length > 0) {
    const newClient = { name: clientName };
    orders.set(newClient, selectedDishes);
    displayOrders();
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('clientName').value = '';
  } else {
    alert('Пожалуйста, введите имя клиента и выберите хотя бы одно блюдо.');
  }
};

// Функция для отображения клиентов
function displayClients() {
  document.getElementById('all_orders').style.display = 'block';
  document.getElementById('hideClients').style.display = 'block';
  document.getElementById('displayClients').style.display = 'none';
}

// Функция для скрытия клиентов
function hideClients() {
  document.getElementById('all_orders').style.display = 'none';
  document.getElementById('hideClients').style.display = 'none';
  document.getElementById('displayClients').style.display = 'block';
}

// Отображаем заказы
displayOrders();