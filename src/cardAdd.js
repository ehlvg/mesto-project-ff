/* Сделайте так, чтобы при клике на «Сохранить» новая карточка попадала в начало контейнера с ними. А диалоговое окно после добавления автоматически закрывалось и очищалась форма.
Чтобы создавать новые карточки, добавьте обработчик событий submit, как в пункте 4, когда вы настраивали редактирование информации о пользователе.
*/
import { closePopup } from "./popups.js";
import { deleteCard, likeCard, createCard } from "./index.js";
import { openImageHandler } from "./index.js";

const formElement = document.forms["new-place"];

const nameInput = formElement.elements["place-name"];
const linkInput = formElement.elements["link"];

const placesList = document.querySelector(".places__list");

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const cardElement = createCard(
    {
      name: nameInput.value,
      link: linkInput.value,
    },
    deleteCard,
    likeCard,
    openImageHandler
  );

  placesList.prepend(cardElement);
  formElement.reset();
  closePopup(evt);
};

formElement.addEventListener("submit", handleFormSubmit);
