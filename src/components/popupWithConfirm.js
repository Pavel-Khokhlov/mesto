import { submitButton } from "../utils/constants.js";

import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleSubmitYes }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleSubmitYes = handleSubmitYes;
  }

  _handleSubmit() {
    this._handleSubmitYes(card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", () =>
      this._handleSubmit(this._cardId)
    );
  }

  open(placeId) {
    this._cardId = placeId;
    super.open();
  }
}
