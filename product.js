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

    document.getElementById("addToCartBtn").addEventListener("click",() => addToCart(product))
    } catch (error) {
        console.log("failed to load product", error);
        detailContainer.innerHTML ="<p>Error loading product.<p/>"
        
    }
}
loadProducts()