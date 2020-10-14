class Card {
  constructor(name, link, selector, prependPlace) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._prependPlace = prependPlace;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(".place-template")
      .content.querySelector(".place")
      .cloneNode(true);

    return placeElement;
  }

  _deleteHandler() {
    this._element.remove();
  }

  _likeHandler() {
    this._element
      .querySelector(".place__like-btn")
      .classList.toggle("place__like-btn_active");
  }

  _setListeners() {
    this._element
      .querySelector(".place__del-btn")
      .addEventListener("click", () => this._deleteHandler());
    this._element
      .querySelector(".place__like-btn")
      .addEventListener("click", () => this._likeHandler());
  }

  getPlace() {
    this._element = this._getTemplate();
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    this._setListeners();
    return this._element;
  }
}

export default Card;
