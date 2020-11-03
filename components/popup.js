import {popupOpened, popupCloseBtn} from "../utils/constants.js"
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._overlayElement = null;
  }

  open() {
    this._popup.classList.add(popupOpened);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove(popupOpened);
    document.body.style.overflow = "visible";
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

 // _handleOverlayClose(e) {
 //   if (e.target === e.currentTarget) {
 //     this.close();
 //   }
 // }

  setEventListeners() {
    this._popup
      .querySelector(popupCloseBtn)
      .addEventListener("click", this.close);

    //this._overlayElement = this._popup.querySelector(".popup__container");
    //this._overlayElement.addEventListener(
    //  "click",
    //  this._handleOverlayClose.bind(this)
    //);
  }
}
