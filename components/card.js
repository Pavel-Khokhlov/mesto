import PopupWithImage from "./popupWithImage.js";

class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._likeButton = null;
    this._delButton = null;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);

    return placeElement;
  }

  _handleLike(e) {
    e.target.classList.toggle("place__like-btn_active");
  }

  _handleDelete(e) {
    e.target.closest(".place").remove();
  }

  _setEventsListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._delButton.addEventListener("click", this._handleDelete);
  }

  generatePlace() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".place__like-btn");
    this._delButton = this._element.querySelector(".place__del-btn");
    this._cardImage = this._element.querySelector(".place__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    this._setEventsListeners();
    return this._element;
  }
}

export default Card;