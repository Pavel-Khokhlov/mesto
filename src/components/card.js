import {
  nameProfile,
  placeLikeBtn,
  placeLikeCount,
  placeDelBtn,
  placeImage,
  placeTitle,
  placeLikeActive,
  disableDeleteBtn,
} from "../utils/constants.js";

export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleLikeClick,
    handleDelClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = nameProfile.id;
    this._owner = data.owner._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelClick = handleDelClick;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);

    return placeElement;
  }

  _isLiked() {
    return this._likes.find(({ _id }) => _id === this._userId);
  }

  //_handleLikeClick(e) {
  //  e.target.classList.toggle(placeLikeActive);
  //}

  _handleZoomImage(name, link) {
    this._handleCardClick(name, link);
  }

  _setEventsListeners() {
    this._likeButton.addEventListener(
      "click",
      this._handleLikeClick(this._cardId)
    );
    this._delButton.addEventListener("click", this._handleDelClick);
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
    this._likeSum = this._element.querySelector(placeLikeCount);
    this._likeSum.textContent = this._likes.length;
    // SET DELETE BTN TO MY CARD
    if (this._owner === this._userId) {
      this._delButton.classList.remove(disableDeleteBtn);
    } else {
      this._delButton.classList.add(disableDeleteBtn);
    }
    // SET ACTIVE LIKE TO MY LIKES
    if (this._isLiked) {
      this._likeButton.classList.remove(placeLikeActive);
    } else {
      this._likeButton.classList.add(placeLikeActive);
    }
    this._setEventsListeners();
    return this._element;
  }
}
