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
  let errorMessage = '';
  if (!input.validity.valid) {
    if (input.validity.valueMissing && input.dataset.errorRequired) {
      errorMessage = input.dataset.errorRequired;
    } else if (input.validity.patternMismatch && input.dataset.errorPattern) {
      errorMessage = input.dataset.errorPattern;
    } else {
      errorMessage = input.validationMessage;
    }
    showInputError(form, input, errorMessage, config);
    return false;
  }
  hideInputError(form, input, config);
  return true;
}

const disableSubmitButton = (button, config) => { 
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

const enableSubmitButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
}


function toggleButtonState(inputs, button, config) {
  const isFormValid = inputs.every((input) => checkInputValidity(button.closest('form'), input, config));
  if (!isFormValid) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
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

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => hideInputError(form, input, config));
  disableSubmitButton(button, config);
}

const editPopup = document.querySelector('.popup_type_edit');
if (editPopup) {
  editPopup.addEventListener('open', () => clearValidation(editProfileForm));
}

export { enableValidation, clearValidation, toggleButtonState };