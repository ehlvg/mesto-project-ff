export const closePopup = (evt) => {
  const popup = evt.target.closest(".popup") || document.querySelector(".popup_is-opened");
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', escapeKeyHandler);
  }
};

export const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', escapeKeyHandler);
};

export const escapeKeyHandler = (evt) => {
  if (evt.key === "Escape") {
    closePopup(evt);
  }
};

export const popupOverlayClickHandler = (evt) => {
  if (!evt.target.closest(".popup__content")) {
    closePopup(evt);
  }
};