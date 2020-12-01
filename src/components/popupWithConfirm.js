import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleSubmitYes }) {
    super(popupSelector);
    this._handleSubmitYes = handleSubmitYes;
  }

  changeBtnText() {
    this._submitBtn.textContent = `Удаление...`;
  }

  close() {
    super.close();
    this._submitBtn.textContent = `Да`;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener("click", () =>
      this._handleSubmitYes(this._cardId)
    );
  }
}
