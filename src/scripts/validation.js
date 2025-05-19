const defaultConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;

function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.name}-error`) || form.querySelector(`#${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
    input.style.borderColor = '#FF0000';
  }
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.name}-error`) || form.querySelector(`#${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
    input.style.borderColor = '';
  }
}

function checkInputValidity(form, input, config) {
  if ((input.name === 'name' || input.name === 'place-name') && input.value) {
    if (!namePattern.test(input.value)) {
      const msg = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
      input.setAttribute('data-error', msg);
      showInputError(form, input, msg, config);
      return false;
    } else {
      input.removeAttribute('data-error');
    }
  }
  if (input.name === 'name' && (input.value.length < 2 || input.value.length > 40)) {
    showInputError(form, input, 'Имя должно быть от 2 до 40 символов', config);
    return false;
  }
  if (input.name === 'place-name' && (input.value.length < 2 || input.value.length > 30)) {
    showInputError(form, input, 'Название должно быть от 2 до 30 символов', config);
    return false;
  }
  if (input.name === 'description' && (input.value.length < 2 || input.value.length > 200)) {
    showInputError(form, input, 'О себе должно быть от 2 до 200 символов', config);
    return false;
  }
  if (input.required && !input.value) {
    showInputError(form, input, 'Это поле обязательно', config);
    return false;
  }
  if (input.name === 'link' && input.value) {
    try {
      new URL(input.value);
    } catch {
      showInputError(form, input, 'Введите корректный URL', config);
      return false;
    }
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
    return false;
  }
  hideInputError(form, input, config);
  return true;
}

function toggleButtonState(inputs, button, config) {
  const isFormValid = inputs.every((input) => checkInputValidity(button.closest('form'), input, config));
  if (!isFormValid) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
  toggleButtonState(inputs, button, config);
}

function enableValidation(config = defaultConfig) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function clearValidation(form, config = defaultConfig) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => hideInputError(form, input, config));
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

const editPopup = document.querySelector('.popup_type_edit');
if (editPopup) {
  editPopup.addEventListener('open', () => clearValidation(editProfileForm));
}

export { enableValidation, clearValidation, toggleButtonState };