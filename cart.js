document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const clearCartBtn = document.getElementById("clear-cart");
  const userGreeting = document.getElementById("user-greeting");
  const logoutBtn = document.getElementById("logout-btn");

  const username = localStorage.getItem("username");
  if (username) {
    userGreeting.textContent = `Welcome, ${username}`;
    
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
  });

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "0.00";
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="50" height="50">
      <span>${item.title} - $${item.price.toFixed(2)}</span>
      <button data-index="${index}" class="remove-btn">Remove</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  totalPriceEl.textContent = total.toFixed(2);

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  });

  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });
});
