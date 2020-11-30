import {
  nameInput,
  jobInput,
  avatarLinkInput,
  inputNamePlace,
  inputLinkPlace,
} from "../utils/constants.js";

const checkPromise = (res) => {
  if (!res.ok) {
    Promise.reject(`Error ${res.status}`);
  }
  return res.json();
};

export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getPlaces() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then(checkPromise)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  newPlace() {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: inputNamePlace.value,
        link: inputLinkPlace.value,
      }),
    })
      .then(checkPromise)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(checkPromise)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value,
      }),
    })
      .then(checkPromise)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchUserAvatar() {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLinkInput.value,
      }),
    })
      .then(checkPromise)
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(checkPromise)
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(checkPromise)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(checkPromise)
      .catch((err) => {
        console.log(err);
      });
  }
}
