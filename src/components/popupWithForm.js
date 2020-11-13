import Popup from "./popup.js";
import { inputSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = document.querySelector(popupSelector);
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(inputSelector);
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._popupElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
