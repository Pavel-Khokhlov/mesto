export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedPlaces = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderPlaces() {
    this._renderedPlaces.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }
}
