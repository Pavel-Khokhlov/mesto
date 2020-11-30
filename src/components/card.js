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
    res,
    selector,
    handleCardClick,
    handleLikeClick,
    handleDelClick
  ) {
    this._name = res.name;
    this._link = res.link;
    this._likes = res.likes;
    this._cardId = res._id;
    this._userId = nameProfile.id;
    this._owner = res.owner._id;
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

  _handleLiked() {
    this._handleLikeClick(this);
  }

  toggleLike(res) {
    this._likeButton.classList.toggle(placeLikeActive);
    this._likeCount.textContent = res.likes.length;
    this._likes = res.likes;
  }

  _handleZoomImage(name, link) {
    this._handleCardClick(name, link);
  }

  _handleDelete(element, card) {
    this._handleDelClick(element, card);
  }

  _setEventsListeners() {
    this._likeButton.addEventListener("click", () => this._handleLiked());
    this._delButton.addEventListener("click", () => this._handleDelete(this._element, this._cardId));
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
    this._likeCount = this._element.querySelector(placeLikeCount);
    this._likeCount.textContent = this._likes.length;

    // SET DELETE BTN TO MY CARD
    if (this._owner === this._userId) {
      this._delButton.classList.remove(disableDeleteBtn);
    } else {
      this._delButton.classList.add(disableDeleteBtn);
    }

    // SET ACTIVE TO MY LIKES
    if (!!this._likes.find(({ _id }) => _id === nameProfile.id)) {
      this._likeButton.classList.add(placeLikeActive);
    } else {
      this._likeButton.classList.remove(placeLikeActive);
    }

    this._setEventsListeners();
    return this._element;
  }
}
