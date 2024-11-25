// const catData = {
//   id: "5",
//   breeds: [],
//   url: "https://cdn2.thecatapi.com/images/5.jpg",
//   width: 500,
//   height: 375
// };

// data.js
async function fetchCatData() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await response.json();
  return data[0]; // Возвращаем первое изображение
}
