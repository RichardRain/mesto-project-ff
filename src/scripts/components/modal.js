import {nameInput, jobInput, placeLinkInput, placeNameInput} from '../index.js'

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  clearPopups();
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closePopupOnOverlay(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
}

function clearPopups() {
  nameInput.value = '';
  jobInput.value = '';
  placeLinkInput.value = '';
  placeNameInput.value = '';
}

export {openPopup, closePopup, closePopupOnOverlay};