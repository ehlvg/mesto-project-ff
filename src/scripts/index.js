import "../styles/index.css";
import { closePopup, escapeKeyHandler, openPopup, popupOverlayClickHandler } from "./popups.js";
import { createCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard as apiAddCard,
  deleteCard as apiDeleteCard,
  likeCard as apiLikeCard,
  unlikeCard as apiUnlikeCard,
  updateUserAvatar as apiUserAvatar
} from "./api.js";

let currentUserId = null;

const placesList = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const editProfileButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");

const openImageHandler = (evt) => {
  const card = evt.target.closest(".card");
  const imageSrc = card.querySelector(".card__image").src;
  const imageCaption = card.querySelector(".card__title").textContent;

  const imagePopup = document.querySelector(".popup_type_image");
  imagePopup.querySelector(".popup__image").src = imageSrc;
  imagePopup.querySelector(".popup__caption").textContent = imageCaption;
  openPopup(imagePopup);
};

function renderCard(data) {
  const cardElement = createCard(data, template, {
    deleteCallback: (evt) => handleDeleteCard(evt, data),
    likeCallback: (evt) => handleLikeCard(evt, data),
    clickCallback: openImageHandler
  });
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  if (likeCount) likeCount.textContent = data.likes.length;
  if (data.likes.some(user => user._id === currentUserId)) {
    likeBtn.classList.add('card__like-button_is-active');
  }
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  if (data.owner && data.owner._id !== currentUserId) {
    deleteBtn.style.display = 'none';
  }
  return cardElement;
}

function renderCards(cards) {
  placesList.innerHTML = '';
  cards.forEach(card => {
    const cardElement = renderCard(card);
    placesList.append(cardElement);
  });
}

/* Формы */

const editProfileFormElement = document.forms["edit-profile"];
const profileNameInput = editProfileFormElement.elements["name"];
const jobInput = editProfileFormElement.elements["description"];

const newPlaceFormElement = document.forms["new-place"];
const placeNameInput = newPlaceFormElement.elements["place-name"];
const linkInput = newPlaceFormElement.elements["link"];

const avatarFormElement = document.forms["avatar-form"];
const avatarInput = avatarFormElement.elements["avatar"];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = editProfileFormElement.querySelector(validationConfig.submitButtonSelector);
  const oldText = button.textContent;
  button.textContent = 'Сохранение...';
  updateUserInfo(profileNameInput.value, jobInput.value)
    .then((data) => {
      document.querySelector(".profile__title").textContent = data.name;
      document.querySelector(".profile__description").textContent = data.about;
      closePopup(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = oldText;
    });
}

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const button = newPlaceFormElement.querySelector(validationConfig.submitButtonSelector);
  const oldText = button.textContent;
  button.textContent = 'Сохранение...';
  apiAddCard(placeNameInput.value, linkInput.value)
    .then(card => {
      const cardElement = renderCard(card);
      placesList.prepend(cardElement);
      closePopup(evt);
      newPlaceFormElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = oldText;
    });
};

const handleNewCardPopup = (evt) => {
  const popup = document.querySelector(".popup_type_new-card");
  openPopup(popup);
  document.forms["new-place"].reset();
  clearValidation(document.forms["new-place"], validationConfig);
};

const handleAvatarPopup = (evt) => {
  const popup = document.querySelector(".popup_type_avatar");
  openPopup(popup);
  document.forms["avatar-form"].reset();
  clearValidation(document.forms["avatar-form"], validationConfig);
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const button = avatarFormElement.querySelector(validationConfig.submitButtonSelector);
  const oldText = button.textContent;
  button.textContent = 'Сохранение...';
  apiUserAvatar(avatarInput.value)
    .then((data) => {
      document.querySelector(".profile__image").style.backgroundImage = `url(${data.avatar})`;
      closePopup(evt);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = oldText;
    });
};

const avatarPopup = document.querySelector('.popup_type_avatar');
if (avatarPopup) {
  avatarPopup.addEventListener('transitionend', (evt) => {
    if (!avatarPopup.classList.contains('popup_is-opened')) {
      clearValidation(document.forms["avatar-form"], validationConfig);
    }
  });
}

profileImage.addEventListener("click", handleAvatarPopup);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);


const handleEditProfilePopup = (evt) => {
  const popup = document.querySelector(".popup_type_edit");
  openPopup(popup);
  document.forms["edit-profile"].elements["name"].value = document.querySelector(".profile__title").textContent;
  document.forms["edit-profile"].elements["description"].value = document.querySelector(".profile__description").textContent;
  clearValidation(document.forms["edit-profile"], validationConfig);
};

const editPopup = document.querySelector('.popup_type_edit');
if (editPopup) {
  editPopup.addEventListener('transitionend', (evt) => {
    if (!editPopup.classList.contains('popup_is-opened')) {
      clearValidation(document.forms["edit-profile"], validationConfig);
    }
  });
}

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

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;
    document.querySelector(".profile__title").textContent = user.name;
    document.querySelector(".profile__description").textContent = user.about;
    document.querySelector(".profile__image").style.backgroundImage = `url(${user.avatar})`;
    renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function handleDeleteCard(evt, data) {
  if (confirm('Удалить карточку?')) {
    apiDeleteCard(data._id)
      .then(() => {
        evt.target.closest('.card').remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleLikeCard(evt, data) {
  const likeBtn = evt.target;
  const cardElement = likeBtn.closest('.card');
  const likeCount = cardElement.querySelector('.card__like-count');
  const isLiked = likeBtn.classList.contains('card__like-button_is-active');
  const apiMethod = isLiked ? apiUnlikeCard : apiLikeCard;
  apiMethod(data._id)
    .then((updatedCard) => {
      likeBtn.classList.toggle('card__like-button_is-active');
      if (likeCount) likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}