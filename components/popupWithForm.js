import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitPlaceForm) {
    super(popupSelector);
    this._submitPlaceForm = submitPlaceForm;
    this._form = popupSelector.querySelector(".popup__container");
  }

  _getInputValues() {
    this._inputList = this.popupSelector.document.querySelectorAll(
      ".popup__input"
    );
    this._inputValues = "";
    this._inputList.forEach((item) => {
      this._inputValues(item.name) = item.value;
    });
    console.log(this._inputValues);
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitPlaceForm(this._getInputValues);
    });
  }

  closePopupAddPlace() {
    super.closePopup();
  }
}
