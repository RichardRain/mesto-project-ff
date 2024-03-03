import { addLike, removeLike } from './api.js';
const cardTemplate = document.querySelector('#card-template').content;

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

  if (cardData.likes.some(like => like['_id'] === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener('click', (evt) => handleLikeButton(evt, cardData, likeNumberElement));
  cardImageSource.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

  return cardElement;
}

function updateLikesCount(cardData, likeNumberElement) {
  likeNumberElement.textContent = cardData.likes.length;
}

function handleLikeButton(evt, cardData, likeNumberElement) {
  const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? removeLike : addLike;
  likeMethod(cardData) 
    .then((cardDataUpdated) => { 
      updateLikesCount(cardDataUpdated, likeNumberElement); 
      evt.target.classList.toggle('card__like-button_is-active'); 
    }) 
    .catch((error) => { 
      console.log(error) 
    });
}

export { makeCard, handleLikeButton };