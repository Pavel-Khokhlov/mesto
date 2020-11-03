import { zoomImage, zoomCaption, popupZoom, popupOpened } from "../utils/constants.js";

class Card {
  constructor(item, selector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
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

  _handleZoomImage() {
    this._handleCardClick;
  }

  _setEventsListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._delButton.addEventListener("click", this._handleDelete);
    this._image.addEventListener("click", this._handleZoomImage);
  }

  generatePlace() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".place__like-btn");
    this._delButton = this._element.querySelector(".place__del-btn");
    this._image = this._element.querySelector(".place__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    this._setEventsListeners();
    return this._element;
  }
}

export default Card;
