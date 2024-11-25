async function loadFeaturedItems() {
  const response = await fetch('product.json');
  const products = await response.json();
  const itemsContainer = document.querySelector('.items-container');

  products.forEach(product => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Цена: $${product.price}</p>
          <button>Купить</button>
          <button>Add to Cart</button>
      `;

    itemsContainer.appendChild(itemDiv);
  });
}
window.onload = loadFeaturedItems;
