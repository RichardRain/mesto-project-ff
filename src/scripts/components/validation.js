function showInputError(errorElement, inputElement, errorMessage, validationConfig) {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(errorElement, inputElement, validationConfig) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

function findErrorElement(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.id}-error`);
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    if (!inputElement.validity.valid) {
      return true;
    }
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    const errorElement = findErrorElement(formElement, inputElement);
    hideInputError(errorElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}

function checkFormValidity(formElement, inputElement, inputList, buttonElement, validationConfig) {
  const errorElement = findErrorElement(formElement, inputElement);
  checkInputValidity(errorElement, inputElement, validationConfig);
  toggleButtonState(inputList, buttonElement, validationConfig);
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkFormValidity(formElement, inputElement, inputList, buttonElement, validationConfig);
    });
  });

  // Дополнительная проверка валидности формы при выходе из фокуса инпута
  // Предотвращает появление бага: инпут остается невалидным, если удалить невалидный символ через 'backspace'
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('focusout', function () {
      checkFormValidity(formElement, inputElement, inputList, buttonElement, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

export { enableValidation, clearValidation, showInputError, checkFormValidity };