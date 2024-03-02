import {showInputError} from './validation';
import {setUserData, setCards, apiConfig} from '../index';

function checkLinkType(link, avatarErrorElement, editAvatarInput, validationConfig) {
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
  return fetch(apiConfig.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Не удалось получить данные: ${res.status}`);
}

function loadUserData() {
  return fetch(apiConfig.baseUrl + '/users/me', {
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

function writeUserData(userName, userDesctiption) {
  return fetch(apiConfig.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userName,
      about: userDesctiption
    })
  })
    .then(checkResponse);
}

function loadCardsData() {
  return fetch(apiConfig.baseUrl + '/cards', {
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

function writeNewCardData(cardTitle, cardLink) {
  return fetch(apiConfig.baseUrl + '/cards', {
    method: 'POST',
    headers: apiConfig.headers,
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
      setUserData(userData.name, userData.about, userData.avatar);
      setCards(cardsData, userData['_id']);
    })
    .catch((error) => console.log(error));
}

function sendDeleteRequest(cardToRemoveData) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardToRemoveData['_id']}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  });
}

function addLike(cardData) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardData['_id']}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

function removeLike(cardData) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardData['_id']}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then(checkResponse);
}

export {checkLinkType, setNewAvatar, checkResponse, writeUserData, writeNewCardData, loadData, sendDeleteRequest, addLike, removeLike};