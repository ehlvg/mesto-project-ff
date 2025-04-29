import "../styles/index.css";
import { closePopup, openPopup, popupOverlayClickHandler } from "./popups.js";
import { createCard } from "./card.js";

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

const placesList = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

initialCards.forEach((data) => {
  const cardElement = createCard(data, template);
  placesList.append(cardElement);
});

/* Формы */

const editProfileFormElement = document.forms["edit-profile"];
const profileNameInput = editProfileFormElement.elements["name"];
const jobInput = editProfileFormElement.elements["description"];

const newPlaceFormElement = document.forms["new-place"];
const placeNameInput = newPlaceFormElement.elements["place-name"];
const linkInput = newPlaceFormElement.elements["link"];

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = profileNameInput.value;
  const jobValue = jobInput.value;

  const nameDisplay = document.querySelector(".profile__title");
  const jobDisplay = document.querySelector(".profile__description");

  nameDisplay.textContent = nameValue;
  jobDisplay.textContent = jobValue;
  editProfileFormElement.reset();
  closePopup(evt);
}

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();

  const cardElement = createCard(
    {
      name: placeNameInput.value,
      link: linkInput.value,
    },
    template
  );

  placesList.prepend(cardElement);
  newPlaceFormElement.reset();
  closePopup(evt);
};

const handleNewCardPopup = (evt) => {
  const popup = document.querySelector(".popup_type_new-card");
  openPopup(popup);
};

const handleEditProfilePopup = (evt) => {
  const popup = document.querySelector(".popup_type_edit");
  openPopup(popup);
  document.forms["edit-profile"].elements["name"].value = document.querySelector(".profile__title").textContent;
  document.forms["edit-profile"].elements["description"].value = document.querySelector(".profile__description").textContent;
};

/* Инициализация слушателей */

popupCloseButtons.forEach((item) => {
  item.addEventListener("click", closePopup);
});

popups.forEach((item) => {
  item.addEventListener("click", popupOverlayClickHandler);
});

editProfileButton.addEventListener("click", handleEditProfilePopup);
newCardButton.addEventListener("click", handleNewCardPopup);
newPlaceFormElement.addEventListener("submit", handlePlaceFormSubmit);
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

