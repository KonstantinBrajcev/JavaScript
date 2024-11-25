const products = [
  { id: 3,
    price: 200, },
  { id: 4,
    price: 900, },
  { id: 1,
    price: 1000, },
];

// Уменьшаем цену на 15%
products.forEach(product => {
  product.price *= 0.85; // Умножаем на 0.85 для уменьшения на 15%
});

// Выводим измененный массив в консоль
console.log(products);
