import Popup from "./popup.js";
import {zoomImage, zoomCaption} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open() {
    super.open();
    zoomImage.src = this._link;
    zoomCaption.textContent = this._name;
  }

  close(){
    super.close();
  }

  setEventListeners(){
    super.setEventListeners();
  }
}
