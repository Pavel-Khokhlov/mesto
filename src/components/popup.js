import {
  root,
  scrollOff,
  popupElement,
  popupOpened,
  popupCloseBtn,
} from "../utils/constants.js";
export default class Popup {
  constructor(popupSelector) {
    this._root = document.querySelector(root);
    this._popupForm = document.querySelector(popupSelector);
    this._popup = this._popupForm.closest(popupElement);
    this.close = this.close.bind(this);
    this._overlayElement = null;
    this.handleEscClose = this.handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(popupOpened);
    this._root.classList.add(scrollOff);
    document.addEventListener("keydown", this.handleEscClose);
  }

  close() {
    this._popup.classList.remove(popupOpened);
    this._root.classList.remove(scrollOff);
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

    this._overlayElement = this._popup;
    this._overlayElement.addEventListener(
      "click",
      this._handleOverlayClose.bind(this)
    );
  }
}
