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
      .querySelector(".place-template")
      .content.querySelector(".place")
      .cloneNode(true);

    return placeElement;
  }

  generatePlace() {
    this._element = this._getTemplate();
    const thisImage = this._element.querySelector(".place__image");
    this._likeButton = this._element.querySelector(".place__like-btn");
    this._delButton = this._element.querySelector(".place__del-btn");
    thisImage.src = this._link;
    thisImage.alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    return this._element;
  }
}

export default Card;
