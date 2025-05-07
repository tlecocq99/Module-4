const cards = [
  {
    id: "",
    title: "",
    content: "",
  },
];
function addCard(card) {
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);
  template.querySelector(".card-title").innerText = card.title;
  template.querySelector(".card-text").innerText = card.content;
  template.querySelector("#image").src = card.image;
  template.querySelector("#image").alt = card.title;
  template.querySelector("#price").innerText = `Price: $ ${card.price}`;
  document.querySelector("#products-list").appendChild(template);
}

// Fetch products from the API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json()) // Parse JSON response
  .then((products) => {
    const productsList = document.querySelector("#products-list");

    // Loop through the products and add them as cards
    products.forEach((product) => {
      const card = {
        title: product.title,
        content: product.description,
        image: product.image,
        price: product.price,
      };
      addCard(card); // Use the addCard function to create and append cards
    });
  })
  .catch((error) => console.error("Error fetching products:", error));
