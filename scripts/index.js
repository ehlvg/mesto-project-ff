const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const createCard = (data, deleteCallback) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  deleteButton.addEventListener("click", deleteCallback);

  return cardElement;
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

const renderCard = (data) => {
  const cardElement = createCard(data);
  placesList.prepend(cardElement);
};

initialCards.forEach((data) => {
  const cardElement = createCard(data, deleteCard);
  placesList.append(cardElement);
});
