const detailContainer = document.getElementById("product-detail")

async function loadProducts() {
    const urlparams =  new URLSearchParams(window.location.search)
    const productID = urlparams.get("id")

    if (!productID) {
        detailContainer.innerHTML ="<p>product ID not found in URL</p>"
        return
    }
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productID}`)
        const product = await res.json()

         detailContainer.innerHTML = `
      <div class="product-detail">
        <img src="${product.image}" alt="${product.title}" />
        <div>
        <h2>${product.title}</h2>
          <div id="size-options">
            <p><strong>Select Size:</strong></p>
            <button class="size-btn" data-size="S">S</button>
            <button class="size-btn" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
            <button class="size-btn" data-size="XL">XL</button>
          </div>
          <hr>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
      
        <button id="addToCartBtn">Add to Cart</button>
        </div>
      </div>
    `;

    handleSizeSelection();

 
    document.getElementById("addToCartBtn").addEventListener("click", () => {
      addToCart(product);
    });
     
  } catch (error) {
    console.error("Failed to load product", error);
    detailContainer.innerHTML = "<p>Error loading product.</p>";
  }
}
function handleSizeSelection() {
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
      sizeButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
}
function  addToCart(product) {
  const token = localStorage.getItem("token")
  if(!token){
    alert("please log in to add items to your cart")
     window.location.href = "login.html";
    return;
  }

  const selectedSizeBtn = document.querySelector(".size-btn.selected");
  const size = selectedSizeBtn ? selectedSizeBtn.dataset.size : null;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    size: size
  });
localStorage.setItem("cart", JSON.stringify(cart));

  VanillaToasts.create({
    title: 'Cart Updated',
    text: `${product.title} added to cart${size ? " (Size: " + size + ")" : ""}`,
    type: 'success',
    timeout: 2000
  });
  
}

loadProducts()