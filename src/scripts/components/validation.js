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
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    const errorElement = findErrorElement(formElement, inputElement);
    checkInputValidity(errorElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}

  // TODO: Исправить баг: не удаляется класс ошибки инпута когда удаляешь из поля запрещенный в паттерне символ
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      const errorElement = findErrorElement(formElement, inputElement);
      checkInputValidity(errorElement, inputElement, validationConfig); // !inputElement.validity.valid = true
      toggleButtonState(inputList, buttonElement, validationConfig); // !inputElement.validity.valid = false
    });
  });

  // Временное решение - проверка валидности формы при выходе из фокуса инпута:
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('focusout', function () {
      const errorElement = findErrorElement(formElement, inputElement);
      checkInputValidity(errorElement, inputElement, validationConfig); // !inputElement.validity.valid = false
      toggleButtonState(inputList, buttonElement, validationConfig); // !inputElement.validity.valid = false
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

export {enableValidation, clearValidation, showInputError};