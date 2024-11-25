// Функция сложения
function sum(a, b) {
  return a + b;
}
// Функция разности
function difference(a, b) {
  return a > b ? a - b : (a < b ? b - a : 0);
}
// Функция умножения
function multiply(a, b) {
  return a * b;
}
// Функция деления
function divide(a, b) {
  return b !== 0 ? a / b : Infinity; // Проверка на деление на ноль
}

document.getElementById('allFunctions').addEventListener('click', function() {
  const num1 = parseFloat(document.getElementById('func1').value);
  const num2 = parseFloat(document.getElementById('func2').value);
  
  const summ = sum(num1, num2);
  const dif = difference(num1, num2);
  const mult = multiply(num1, num2);
  const div = divide(num1, num2);

  const formatDiv = div.toFixed(2); // Округляем до 2 знаков после запятой

  // Пример использования
  document.getElementById('mathFunction').innerHTML = `Сумма чисел: ${summ}<br> Разность чисел: ${dif}<br> Произведение чисел: ${mult}<br> Частное чисел: ${formatDiv}`;
});

