import {
  popupElement,
  popupOpened,
  popupCloseBtn,
} from "../utils/constants.js";
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._overlayElement = null;
    this.handleEscClose = this.handleEscClose.bind(this);
  }

  open() {
    this._popup.closest(popupElement).classList.add(popupOpened);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", this.handleEscClose);
  }

  close() {
    this._popup.closest(popupElement).classList.remove(popupOpened);
    document.body.style.overflow = "visible";
    document.removeEventListener("keydown", this.handleEscClose);
  }

  handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(popupCloseBtn)
      .addEventListener("click", this.close);

    this._overlayElement = this._popup.closest(popupElement);
    this._overlayElement.addEventListener(
      "click",
      this._handleOverlayClose.bind(this)
    );
  }
}
