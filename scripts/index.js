const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
let cardToAdd;

function addCard(cardImage, cardTitle, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardRemoveButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = cardTitle;
  cardElement.querySelector('.card__title').textContent = cardTitle;

  cardRemoveButton.addEventListener('click', () => removeCard(cardElement));

  return cardElement;
}

function removeCard(cardToDelete) {
  cardToDelete.remove();
}

initialCards.forEach((item) => {
  cardToAdd = addCard(item.link, item.name, removeCard);
  cardList.append(cardToAdd);
});