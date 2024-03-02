import { openPopup, closePopup } from './modal.js';
import { sendDeleteRequest, addLike, removeLike } from './api.js';
const cardTemplate = document.querySelector('#card-template').content;
const cardDeletePopup = document.querySelector('.popup_type_delete');
const deleteButton = cardDeletePopup.querySelector('.popup__button');
let cardToRemoveElement;
let cardToRemoveData;

function makeCard(cardData, handleRemove, handleLikeButton, handleImageClick, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.card__delete-button');
  const cardImageSource = cardElement.querySelector('.card__image');
  const cardTitleText = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeNumberElement = cardElement.querySelector('.card__like-number');

  cardImageSource.src = cardData.link;
  cardImageSource.alt = cardData.name;
  cardTitleText.textContent = cardData.name;
  likeNumberElement.textContent = cardData.likes.length;

  if (cardData.owner['_id'] === userId) {
    cardRemoveButton.addEventListener('click', () => handleRemove(cardElement, cardData));
  } else {
    cardRemoveButton.remove();
  }

  cardData.likes.forEach((like) => {
    if (like['_id'] === userId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  });

  cardLikeButton.addEventListener('click', (evt) => handleLikeButton(evt, cardData, likeNumberElement));
  cardImageSource.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

  return cardElement;
}

function removeCard(cardElement) {
  sendDeleteRequest(cardToRemoveData)
    .then((res) => {
      if (res.ok) {
        cardElement.remove();
      } else {
        return Promise.reject(`Не удалось удалить карточку: ${res.status}`);
      }
    })
    .catch((error) => {
      console.log(error)
    })

}

function handleRemove(cardElement, cardData) {
  cardToRemoveElement = cardElement;
  cardToRemoveData = cardData;
  openPopup(cardDeletePopup);
}

function updateLikesCount(cardData, likeNumberElement) {
  likeNumberElement.textContent = cardData.likes.length;
}

function handleLikeButton(evt, cardData, likeNumberElement) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    removeLike(cardData)
      .then((cardDataUpdated) => {
        updateLikesCount(cardDataUpdated, likeNumberElement);
        evt.target.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    addLike(cardData)
      .then((cardDataUpdated) => {
        updateLikesCount(cardDataUpdated, likeNumberElement);
        evt.target.classList.add('card__like-button_is-active');
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

deleteButton.addEventListener('click', () => {
  if (cardToRemoveElement) {
    removeCard(cardToRemoveElement);
    closePopup(cardDeletePopup);
  }
});

export { makeCard, handleRemove, handleLikeButton };