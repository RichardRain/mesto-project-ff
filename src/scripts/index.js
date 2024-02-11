import '../pages/index.css';
import {initialCards} from './cards.js';
import {makeCard, removeCard, handleLikeButton} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

const cardList = document.querySelector('.places__list');
let cardToAdd;
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEditType = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageType = document.querySelector('.popup_type_image');
const popupImageSource = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const placeLinkInput = formNewCard.elements.link;

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
    openPopup(popup);
  }
}

function handleImageClick(cardImage, cardTitle) {
  popupImageSource.src = cardImage;
  popupImageSource.alt = cardTitle;
  popupImageCaption.textContent = cardTitle;
  handlePopup(popupImageType);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  handlePopup(document.querySelector('.popup_is-opened'));
}

function handleNewCardForm(evt) {
  evt.preventDefault();
  const newCard = makeCard(placeLinkInput.value, placeNameInput.value, removeCard, handleLikeButton, handleImageClick);
  cardList.insertBefore(newCard, cardList.firstChild);
  handlePopup(document.querySelector('.popup_is-opened'));
}

formEdit.addEventListener('submit', handleEditFormSubmit); 
formNewCard.addEventListener('submit', handleNewCardForm); 

initialCards.forEach((item) => {
  cardToAdd = makeCard(item.link, item.name, removeCard, handleLikeButton, handleImageClick);
  cardList.append(cardToAdd);
});

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

export {handlePopup};