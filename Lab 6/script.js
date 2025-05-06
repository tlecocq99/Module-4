const textarea = document.getElementById("newsContent");
const submitBtn = document.getElementById("submit-btn");
const titleInput = document.getElementById("newsTitle");
const cards = [
  {
    id: 1,
    title: "Election Results",
    content: "Newly elected minister...",
  },
  { id: 2, title: "Sporting Success", content: "World Cup winners..." },
  {
    id: 3,
    title: "Tornado Warning",
    content: "Residents should prepare...",
  },
];

submitBtn.addEventListener("click", () => {
  const title = titleInput.value;
  const content = textarea.value;
  const newCard = {
    id: cards.length + 1,
    title,
    content,
  };
  cards.unshift(newCard);
  console.log(cards);
});
function addCard2(card) {
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);
  template.querySelector(".card-title").innerText = card.title;
  template.querySelector(".card-text").innerText = card.content;
  document.querySelector("#news-list").appendChild(template);
}
if ("content" in document.createElement("template")) {
  cards.forEach((card) => {
    addCard2(card);
  });
}
const contentInput = document.getElementById("newsContent");
const addCard = () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    const newCard = {
      title,
      content,
    };
    cards.unshift(newCard);
    console.log(cards);
  }
};
