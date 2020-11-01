import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = popupSelector.querySelector(".popup-zoom__container");
  }
  setEventListeners() {
    super.setEventListeners();
  }
  openPopupZoom() {
    super.openPopup();
  }
  closePopupZoom() {
    super.closePopup();
  }
}
