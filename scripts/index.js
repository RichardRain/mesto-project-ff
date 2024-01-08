const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
let cardToAdd;

function makeCard(cardImage, cardTitle, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.card__delete-button');
  const cardImageSource = cardElement.querySelector('.card__image').src;
  const cardImageDescription = cardElement.querySelector('.card__image').alt;
  const cardTitleText = cardElement.querySelector('.card__title').textContent;

  cardImageSource = cardImage;
  cardImageDescription = cardTitle;
  cardTitleText = cardTitle;

  cardRemoveButton.addEventListener('click', () => removeCard(cardElement));

  return cardElement;
}

function removeCard(cardToDelete) {
  cardToDelete.remove();
}

initialCards.forEach((item) => {
  cardToAdd = makeCard(item.link, item.name, removeCard);
  cardList.append(cardToAdd);
});