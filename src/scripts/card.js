export const createCard = (
  data,
  template,
  callbackConfiguration,
  userId
) => {
  const cardElement = template.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector('.card__like-count');
  if (likeCount) likeCount.textContent = data.likes.length;
  if (data.likes.some(user => user._id === userId)) {
    cardLike.classList.add('card__like-button_is-active');
  }
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  if (data.owner && data.owner._id !== userId) {
    deleteBtn.style.display = 'none';
  }
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Фотография места: ${data.name}`;
  likeCount.textContent = data.likes ? data.likes.length : 0;
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