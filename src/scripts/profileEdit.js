import { closePopup } from "./popups.js";

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements["name"];
const jobInput = formElement.elements["description"];

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameDisplay = document.querySelector(".profile__title");
  const jobDisplay = document.querySelector(".profile__description");

  nameDisplay.textContent = nameValue;
  jobDisplay.textContent = jobValue;
  formElement.reset();
  closePopup(evt);
}

formElement.addEventListener("submit", handleFormSubmit);
