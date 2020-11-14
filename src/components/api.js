import {
  nameInput,
  jobInput,
  avatarLinkInput,
  inputNamePlace,
  inputLinkPlace,
} from "../utils/constants.js";

export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getPlaces() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          Promise.reject(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
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
      .then((res) => {
        if (!res.ok) {
          Promise.reject(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          Promise.reject(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
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
      .then((res) => {
        if (!res.ok) {
          Promise.reject(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
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
      .then((res) => {
        if (!res.ok) {
          Promise.reject(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  }
}
