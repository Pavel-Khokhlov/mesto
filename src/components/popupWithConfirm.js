import { submitButton } from "../utils/constants.js";

import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleSubmitYes }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleSubmitYes = handleSubmitYes;
  }

  open(placeId) {
    this._cardId = placeId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector(submitButton).addEventListener("click", () =>
      this._handleSubmitYes(this._cardId)
    );
  }
}
