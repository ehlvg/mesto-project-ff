export const createCard = (
  data,
  template,
  callbackConfiguration
) => {
  const cardElement = template.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Фотография места: ${data.name}`;
  deleteButton.addEventListener("click", callbackConfiguration.deleteCallback);
  cardLike.addEventListener("click", callbackConfiguration.likeCallback);
  cardImage.addEventListener("click", callbackConfiguration.clickCallback);

  return cardElement;
};

export const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

export const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};