// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");
// DOM elements
const productList = document.getElementById("product-list");


function loadCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });


  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(parseInt(button.dataset.id));
    });
  });
}
// Render cart list
function renderCart() {
	const cart = loadCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-cart-id="${item.cartId}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners to remove buttons
 document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    removeFromCart(parseInt(button.dataset.cartId));
  });
});
}

// Add item to cart
function addToCart(productId) {
  const cart = loadCart();
  const product = products.find((p) => p.id === productId);
  if (product) {
    const uniqueCartItem = { ...product, cartId: Date.now() }; 
    cart.push(uniqueCartItem);
    saveCart(cart);
    renderCart();
  }
}

function removeFromCart(cartId) {
  let cart = loadCart();
  cart = cart.filter((item) => item.cartId !== cartId);
  saveCart(cart);
  renderCart();
}


function clearCart() {
	sessionStorage.removeItem("cart");
  renderCart();   
}
clearCartBtn.addEventListener("click", clearCart);
// Initial render
renderProducts();
renderCart();
