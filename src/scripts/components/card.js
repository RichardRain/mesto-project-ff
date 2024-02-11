const cardTemplate = document.querySelector('#card-template').content;

function makeCard(cardImage, cardTitle, removeCard, handleLikeButton, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.card__delete-button');
  const cardImageSource = cardElement.querySelector('.card__image');
  const cardTitleText = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImageSource.src = cardImage;
  cardImageSource.alt = cardTitle;
  cardTitleText.textContent = cardTitle;

  cardRemoveButton.addEventListener('click', () => removeCard(cardElement));
  cardLikeButton.addEventListener('click', (evt) => handleLikeButton(evt));
  cardImageSource.addEventListener('click', () => handleImageClick(cardImage, cardTitle));

  return cardElement;
}

function removeCard(cardToDelete) {
  cardToDelete.remove();
}

function handleLikeButton(evt) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.remove('card__like-button_is-active');
  } else {
    evt.target.classList.add('card__like-button_is-active');
  }
}

export {makeCard, removeCard, handleLikeButton};