import "../styles/index.css";
import "./profileEdit.js";
import "./cardAdd.js";
import { openPopup } from "./popups.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

export const createCard = (
  data,
  deleteCallback,
  likeCallback,
  clickCallback,
) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Фотография места: ${data.name}`;
  deleteButton.addEventListener("click", deleteCallback);
  cardLike.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", clickCallback);

  return cardElement;
};

export const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

export const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const openImage = (imageSrc, imageCaption) => {
  const imagePopup = document.querySelector(".popup_type_image");
  imagePopup.querySelector(".popup__image").src = imageSrc;
  imagePopup.querySelector(".popup__caption").textContent = imageCaption;
  openPopup(imagePopup);
};

export const openImageHandler = (evt) => {
  const card = evt.target.closest(".card");
  const cardImage = card.querySelector(".card__image").src;
  const cardTitle = card.querySelector(".card__title").textContent;
  openImage(cardImage, cardTitle);
};

initialCards.forEach((data) => {
  const cardElement = createCard(data, deleteCard, likeCard, openImageHandler);
  placesList.append(cardElement);
});
