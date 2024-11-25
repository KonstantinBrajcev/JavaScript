function calculateTax() {
  const input = document.getElementById('userInput').value;
  const number = parseFloat(input);

  // Проверяем, является ли введенное значение числом
  if (isNaN(number)) {
      document.getElementById('resultcalc').textContent = "Значение задано неверно.";
  } else {
      const tax = number * 0.13;
      console.log(`Размер заработной платы за вычетом налогов равен ${number - tax}`);
      document.getElementById('resultcalc').textContent = `Размер заработной платы за вычетом налогов равен ${number - tax}`;
  }
}

// Добавляем обработчик события на кнопку
document.getElementById('calculateButton').addEventListener('click', calculateTax);