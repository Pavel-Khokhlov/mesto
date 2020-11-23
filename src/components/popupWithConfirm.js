import { submitButton } from "../utils/constants.js";

import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleSubmitYes }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleSubmitYes = handleSubmitYes;
  }

  open() {
    super.open();
  }

  changeBtnText() {
    this._popupElement.querySelector(
      submitButton
    ).textContent = `Удаление...`;
  }

  close() {
    super.close();
    this._popupElement.querySelector(
      submitButton
    ).textContent = `Да`;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(submitButton)
      .addEventListener("click", () => this._handleSubmitYes(this._cardId));
  }
}
