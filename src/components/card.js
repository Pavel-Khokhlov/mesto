import {
  placeLikeBtn,
  placeDelBtn,
  placeImage,
  placeTitle,
  placeLikeActive,
} from "../utils/constants.js";

export default class Card {
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
    e.target.classList.toggle(placeLikeActive);
  }

  _handleDelete(e) {
    e.target.closest(".place").remove();
  }

  _handleZoomImage(name, link) {
    this._handleCardClick(name, link);
  }

  _setEventsListeners() {
    this._likeButton.addEventListener("click", this._handleLike);
    this._delButton.addEventListener("click", this._handleDelete);
    this._image.addEventListener("click", () =>
      this._handleZoomImage(this._name, this._link)
    );
  }

  generatePlace() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(placeLikeBtn);
    this._delButton = this._element.querySelector(placeDelBtn);
    this._image = this._element.querySelector(placeImage);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(placeTitle).textContent = this._name;
    this._setEventsListeners();
    return this._element;
  }
}
