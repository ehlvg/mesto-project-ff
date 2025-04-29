import { openPopup } from "./popups";

export const createCard = (
  data,
  template,
  callbackConfiguration = {
    deleteCallback: deleteCard,
    likeCallback: likeCard,
    clickCallback: openImageHandler
  }
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

export const openImageHandler = (evt) => {
  const card = evt.target.closest(".card");
  const imageSrc = card.querySelector(".card__image").src;
  const imageCaption = card.querySelector(".card__title").textContent;

  const imagePopup = document.querySelector(".popup_type_image");
  imagePopup.querySelector(".popup__image").src = imageSrc;
  imagePopup.querySelector(".popup__caption").textContent = imageCaption;
  openPopup(imagePopup);
};