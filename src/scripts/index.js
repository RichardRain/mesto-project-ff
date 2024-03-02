import '../pages/index.css';
import { initialCards } from './cards.js';
import { makeCard, handleRemove, handleLikeButton } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation, showInputError } from './components/validation.js';

const cardList = document.querySelector('.places__list');
let cardToAdd;
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarEditButton = document.querySelector('.profile__image-edit-button');
const popups = document.querySelectorAll('.popup');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEditType = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageType = document.querySelector('.popup_type_image');
const popupImageSource = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const formEditAvatar = document.forms['edit-avatar'];
const editAvatarInput = formEditAvatar.elements.link;
const avatarErrorElement = document.querySelector('.avatar-link-input-error');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const placeLinkInput = formNewCard.elements.link;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const baseUrl = 'https://mesto.nomoreparties.co.';
const cohortId = 'wff-cohort-7'
const cohortUrl = baseUrl + '/v1/' + cohortId;
const token = '1f63c2d3-d524-4b9d-bfad-0d7f89779a3c';

function handlePopup(popup, textFiledName, textFieldDescription) {
  if (popup.classList.contains('popup_is-opened')) {
    closePopup(popup);
    if (popup.querySelector('.popup__form')) {
      popup.querySelector('.popup__form').reset();
    }
  } else {
    if (popup.classList.contains('popup_type_edit')) {
      textFiledName.value = profileName.textContent;
      textFieldDescription.value = profileDescription.textContent;
    }
    if (popup.querySelector('.popup__form')) {
      const formElement = popup.querySelector('.popup__form');
      clearValidation(formElement, validationConfig);
    }
    openPopup(popup);
  }
}

function handleImageClick(cardImage, cardTitle) {
  popupImageSource.src = cardImage;
  popupImageSource.alt = cardTitle;
  popupImageCaption.textContent = cardTitle;
  handlePopup(popupImageType);
}

function handleButtonLoading(buttonElement) {
  if (buttonElement.classList.contains('popup__button_loading')) {
    buttonElement.classList.remove('popup__button_loading');
    buttonElement.textContent = 'Сохранить';
  } else {
    buttonElement.classList.add('popup__button_loading');
    buttonElement.textContent = 'Сохранить...';
  }
}

function checkLinkType(link) {
  return fetch(link, {
    method: 'HEAD'
  })
    .then((res) => {
      if (res.ok) {
        if (res.headers.has('Content-Type')) {
          const contentType = res.headers.get('Content-Type');
          if (contentType.includes('image')) {
            return true;
          } else {
            showInputError(avatarErrorElement, editAvatarInput, 'Ссылка не ведет на изображение.', validationConfig);
          }
        } else {
          showInputError(avatarErrorElement, editAvatarInput, 'Не удалось определить тип контента.', validationConfig);
        }
      }
      showInputError(avatarErrorElement, editAvatarInput, 'Не удалось получить данные.', validationConfig);
      return false;
    })
}

function setNewAvatar(link) {
  return fetch(cohortUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(checkResponse);
}

function handleEditAvatarForm(evt) {
  evt.preventDefault();
  const link = editAvatarInput.value;
  handleButtonLoading(evt.target.querySelector('.popup__button'));
  checkLinkType(link)
    .then((res) => {
      if (res) {
        return setNewAvatar(link);
      }
      return Promise.reject(`Не удалось получить данные: ${res.status}`);
    })
    .then((userData) => {
      setUserData(userData.name, userData.about, userData.avatar);
    })
    .catch((error) => {
      console.log(error);
    });
  handleButtonLoading(evt.target.querySelector('.popup__button'));
  handlePopup(document.querySelector('.popup_is-opened'));
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  handleButtonLoading(evt.target.querySelector('.popup__button'));
  writeUserData(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
    })
    .catch((error) => console.log(error));
  handleButtonLoading(evt.target.querySelector('.popup__button'));
  handlePopup(document.querySelector('.popup_is-opened'));
}

function handleNewCardForm(evt) {
  evt.preventDefault();
  handleButtonLoading(evt.target.querySelector('.popup__button'));
  writeNewCardData(placeNameInput.value, placeLinkInput.value)
    .then((cardData) => {
      const newCard = makeCard(cardData, handleRemove, handleLikeButton, handleImageClick, cardData.owner['_id']);
      cardList.insertBefore(newCard, cardList.firstChild);
    })
    .catch((error) => console.log(error));
  handleButtonLoading(evt.target.querySelector('.popup__button'));
  handlePopup(document.querySelector('.popup_is-opened'));
}

function setUserData(userName, userDesctiption, userAvatar) {
  profileName.textContent = userName;
  profileDescription.textContent = userDesctiption;
  profileImage.style = `background-image: url(${userAvatar})`;
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Не удалось получить данные: ${res.status}`);
}

function loadUserData() {
  return fetch(cohortUrl + '/users/me', {
    headers: {
      authorization: token
    }
  })
    .then(checkResponse);
}

function writeUserData(userName, userDesctiption) {
  return fetch(cohortUrl + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: userDesctiption
    })
  })
    .then(checkResponse);
}

function loadCardsData() {
  return fetch(cohortUrl + '/cards', {
    headers: {
      authorization: token
    }
  })
    .then(checkResponse);
}

function setCards(cardsData, userId) {
  cardsData.forEach((cardData) => {
    cardToAdd = makeCard(cardData, handleRemove, handleLikeButton, handleImageClick, userId);
    cardList.append(cardToAdd);
  });
};

function writeNewCardData(cardTitle, cardLink) {
  return fetch(cohortUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardTitle,
      link: cardLink
    })
  })
    .then(checkResponse);
}

function loadData() {
  Promise.all([loadUserData(), loadCardsData()])
    .then(([userData, cardsData]) => {
      console.log(userData);
      console.log(cardsData);
      setUserData(userData.name, userData.about, userData.avatar);
      setCards(cardsData, userData['_id']);
    })
    .catch((error) => console.log(error));
}

formEditAvatar.addEventListener('submit', handleEditAvatarForm)
formEdit.addEventListener('submit', handleEditFormSubmit);
formNewCard.addEventListener('submit', handleNewCardForm);

profileAvatarEditButton.addEventListener('click', () => handlePopup(popupEditAvatar));
profileEditButton.addEventListener('click', () => handlePopup(popupEditType, nameInput, jobInput));
profileAddButton.addEventListener('click', () => handlePopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      handlePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      handlePopup(popup);
    }
  })
});

enableValidation(validationConfig);
loadData();

export { handlePopup, cohortUrl, token, checkResponse };