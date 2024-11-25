let cartItems = [];

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
                    <button class="add-to-cart">Add to Cart</button>
                `;

    itemsContainer.appendChild(itemDiv);

    const addToCartButton = itemDiv.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => addToCart(product));
  });
}

function addToCart(product) {
  cartItems.push(product);
  updateCart();
}

function updateCart() {
  const cart = document.getElementById('cart');
  const cartItemsContainer = document.querySelector('.cart-items-container');
  cartItemsContainer.innerHTML = '';

  if (cartItems.length > 0) {
    cart.style.display = 'block';
    cartItems.forEach((item, index) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
                        <span>${item.name} - $${item.price}</span>
                        <span class="remove-item" data-index="${index}">✖</span>
                    `;
      cartItemsContainer.appendChild(cartItemDiv);
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (event) => removeFromCart(event.target.dataset.index));
    });
  } else {
    cart.style.display = 'none';
  }
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

window.onload = loadFeaturedItems;