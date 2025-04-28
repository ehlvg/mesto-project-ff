const popupCloseButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const popupButtons = [".profile__add-button", ".profile__edit-button"];

export const closePopup = (evt) => {
  popups.forEach((item) => {
    item.classList.remove("popup_is-opened");
  });
};

export const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
};

const escapeKeyHandler = (evt) => {
  if (evt.key === "Escape") {
    closePopup(evt);
  }
};

export const popupOpenHandler = (evt) => {
  if (evt.target.classList.contains("profile__add-button")) {
    const popup = document.querySelector(".popup_type_new-card");
    openPopup(popup);
  }
  if (evt.target.classList.contains("profile__edit-button")) {
    const popup = document.querySelector(".popup_type_edit");
    openPopup(popup);
  }
};

export const popupOverlayClickHandler = (evt) => {
  if (!evt.target.closest(".popup__content")) {
    closePopup(evt);
  }
};

popupButtons.forEach((item) => {
  const button = document.querySelector(item);
  button.addEventListener("click", popupOpenHandler);
});

popupCloseButtons.forEach((item) => {
  item.addEventListener("click", closePopup);
});

document.addEventListener("keyup", escapeKeyHandler);
popups.forEach((item) => {
  item.addEventListener("click", popupOverlayClickHandler);
});
