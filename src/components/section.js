export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderPlaces(cardsArr) {
    cardsArr.forEach((card) => this._renderer(card));
  }

  addItem(element) {
    this._container.append(element);
  }

  newItem(element) {
    this._container.prepend(element);
  }
}
