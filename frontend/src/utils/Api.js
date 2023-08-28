import { BASE_URL } from '../env';

class Api {
  constructor(options) {
    this.options = options;
    this.headers = options.headers;
    this.baseUrl = options.baseUrl;
    this.credentials = options.credentials;
  }

  _getJsonPromise = (result) =>
    result.ok ? result.json() : Promise.reject(`Impossible to get result.json(): ${result.status}`);

  _request = (endpoint, options) =>
    fetch(`${this.baseUrl}/${endpoint}`, { ...options, credentials: this.credentials }).then(
      this._getJsonPromise,
    );

  addCard = (name, link) =>
    this._request(`cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });

  deleteCard = (cardId) =>
    this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });

  likeCard = (cardId) =>
    this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    });

  dislikeCard = (cardId) =>
    this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    });

  changeLikeCardStatus = (cardId, shouldLike) => {
    if (shouldLike) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  };

  updateAvatar = (link) =>
    this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });

  updateUserInfo = (name, about) =>
    this._request(`users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });

  getUserInfo = () =>
    this._request(`users/me `, {
      headers: this.headers,
    });

  getInitialCards = () =>
    this._request(`cards`, {
      headers: this.headers,
    });

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
