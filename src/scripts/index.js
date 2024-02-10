import '../pages/index.css';
import {initialCards} from './cards.js';
import {makeCard, removeCard, handleLikeButton} from './components/card.js';
import {openPopup, closePopup, closePopupOnOverlay} from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
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
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const placeLinkInput = formNewCard.elements.link;

function handleImageClick(cardImage, cardTitle) {
  popupImageSource.src = cardImage;
  popupImageSource.alt = cardTitle;
  popupImageCaption.textContent = cardTitle;
  openPopup(popupImageType);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(document.querySelector('.popup_is-opened'));
}

function handleNewCardForm(evt) {
  evt.preventDefault();
  const newCard = makeCard(placeLinkInput.value, placeNameInput.value, removeCard, handleLikeButton, handleImageClick);
  cardList.insertBefore(newCard, cardList.firstChild);
  closePopup(document.querySelector('.popup_is-opened'));
}


formEdit.addEventListener('submit', handleEditFormSubmit); 
formNewCard.addEventListener('submit', handleNewCardForm); 

initialCards.forEach((item) => {
  cardToAdd = makeCard(item.link, item.name, removeCard, handleLikeButton, handleImageClick);
  cardList.append(cardToAdd);
});

profileEditButton.addEventListener('click', () => openPopup(popupEditType));

profileAddButton.addEventListener('click', () => openPopup(popupNewCard));

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup_is-opened'));
  })
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    closePopupOnOverlay(evt, popup);
  })
});

export {cardTemplate, nameInput, jobInput, placeLinkInput, placeNameInput};