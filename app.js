async function loadProducts() {
    const productList = document.getElementById("product-list")
    try {
        const res = await fetch("https://fakestoreapi.com/products")
        const products = await res.json()

        productList.innerHTML = products.map(product => `
          <div class="product-card">
            <img src="${product.image}" alt="${product.title}" />
            <div class="product">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <a href="product.html?id=${product.id}">View Details</a>
            </div>
          </div>
        `).join("");
    } catch (error) {
        productList.innerHTML= "<p> failed to load products.</p>"
        console.error("Error fetching product:",  error);
        
    }
}
loadProducts()

const productList = document.getElementById("product-list");
const categorySelect = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");

let allProducts = [];

async function loadProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
    renderProducts(products);
    populateCategories(products);
  } catch (error) {
    productList.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error fetching products:", error);
  }
}
function renderProducts(products) {
  productList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.title}" />
      <div class="product">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <a href="product.html?id=${product.id}">View Details</a>
      </div>
    </div>
  `).join("");
}

function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];
  categorySelect.innerHTML = `
    <option value="all">All Categories</option>
    ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join("")}
  `;
}

categorySelect.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

function filterProducts() {
  const category = categorySelect.value;
  const keyword = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(product => {
    const matchCategory = category === "all" || product.category === category;
    const matchSearch = product.title.toLowerCase().includes(keyword);
    return matchCategory && matchSearch;
  });

  renderProducts(filtered);
}

loadProducts().then(observeScrollAnimations);
