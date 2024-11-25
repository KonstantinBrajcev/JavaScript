function findMax(num1, num2, num3) {
  return Math.max(num1, num2, num3);
}

document.getElementById('findMaxButton').addEventListener('click', function() {
  const number1 = parseFloat(document.getElementById('number1').value);
  const number2 = parseFloat(document.getElementById('number2').value);
  const number3 = parseFloat(document.getElementById('number3').value);

  // Проверяем, являются ли введенные значения числами
  if (isNaN(number1) || isNaN(number2) || isNaN(number3)) {
      document.getElementById('resultsumma').textContent = "Пожалуйста, введите корректные числа.";
      return;
  }

  const maxNumber = findMax(number1, number2, number3);
  document.getElementById('resultsumma').textContent = `Максимальное значение: ${maxNumber}`;
});
