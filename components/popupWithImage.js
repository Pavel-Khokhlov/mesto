import Popup from "./popup.js";
import { zoomImage, zoomCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomPopupElement = document.querySelector(popupSelector);
    this._zoomImage = this._zoomPopupElement.querySelector(zoomImage);
    this._zoomCapture = this._zoomPopupElement.querySelector(zoomCaption);
  }

  open(name, link) {
    this._zoomImage.src = link;
    this._zoomImage.alt = name;
    this._zoomCapture.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
