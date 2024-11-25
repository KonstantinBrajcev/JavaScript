// Функция для возведения числа в куб
function cube(num) {
  return num * num * num;
}

function calculateCubes() {
  const num1 = parseFloat(document.getElementById('userInput1').value);
  const num2 = parseFloat(document.getElementById('userInput2').value);

  // Проверяем, являются ли введенные значения числами
  if (isNaN(num1) || isNaN(num2)) {
      document.getElementById('resultsum').textContent = "Значение задано неверно.";
      return;
  }

  // Вычисляем кубы и результат
  const result = cube(num1) + cube(num2);

  // Выводим результат на страницу
  document.getElementById('resultsum').textContent = `Результат: ${result}`;
}

// Добавляем обработчик события на кнопку
document.getElementById('sumButton').addEventListener('click', calculateCubes);
