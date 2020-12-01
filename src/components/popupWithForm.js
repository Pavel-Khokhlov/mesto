import Popup from "./popup.js";
import { inputSelector, nameInput, jobInput } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(inputSelector);
    this._nameInput = nameInput;
    this._jobInput = jobInput;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setInputValues({ name, about }) {
    this._nameInput.value = name;
    this._jobInput.value = about;
  }

  changeBtnText() {
    this._submitBtn.textContent = `Сохранение...`;
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._submitBtn.textContent = `Сохранить`;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
