const productContainer = document.querySelector("#products-list");
const categoryMenu = document.getElementById("category-buttons");

function addCard(card) {
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);
  template.querySelector(".card-title").innerText = card.title;
  template.querySelector(".card-text").innerText = card.content;
  template.querySelector("#image").src = card.image;
  template.querySelector("#image").alt = card.title;
  template.querySelector("#price").innerText = `Price: $ ${card.price}`;
  productContainer.appendChild(template);
}

function renderCards(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const card = {
      title: product.title,
      content: product.description,
      image: product.image,
      price: product.price,
    };
    addCard(card);
  });
}

function renderCategoryButtons(categories, allProducts) {
  categories.forEach((category) => {
    const li = document.createElement("li");
    const button = document.createElement("a");
    button.classList.add("dropdown-item");
    button.href = "#";
    button.innerText = category;
    button.addEventListener("click", () => {
      const filtered = allProducts.filter((p) => p.category === category);
      renderCards(filtered);
    });
    li.appendChild(button);
    categoryMenu.appendChild(li);
  });

  // Add "All" button
  const li = document.createElement("li");
  const allBtn = document.createElement("a");
  allBtn.classList.add("dropdown-item");
  allBtn.href = "#";
  allBtn.innerText = "All";
  allBtn.addEventListener("click", () => renderCards(allProducts));
  li.appendChild(allBtn);
  categoryMenu.insertBefore(li, categoryMenu.firstChild);
}

// Fetch and initialize
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    renderCards(products);

    const categories = [...new Set(products.map((p) => p.category))];
    renderCategoryButtons(categories, products);
  })
  .catch((err) => console.error("Error fetching products:", err));
