import {
  inputElement,
  inputSelector,
  submitButton,
  activeErrorClass,
  inputInvalidClass,
  inactiveButtonClass,
} from "../utils/constants.js";

export default class FormValidator {
  constructor(formSelector) {
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._inputElement = inputElement;
    this._inputSelector = inputSelector;
    this._submitButton = submitButton;
    this._activeErrorClass = activeErrorClass;
    this._inputInvalidClass = inputInvalidClass;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputArray = this._formElement.querySelectorAll(this._inputSelector);
    this._submitBtn = this._formElement.querySelector(this._submitButton);
  }
  // Функция обнуления и скрытия errorMessage при открытии popup
  resetErrorState() {
    this._inputArray.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._inactiveButton();
    });
  }

  // Функция показать ошибку ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activeErrorClass);
    inputElement.classList.add(this._inputInvalidClass);
  }

  // Функция скрыть ошибку ввода
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._activeErrorClass);
    inputElement.classList.remove(this._inputInvalidClass);
  }

  // Функция проверки инпутов на ошибки
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Функция изменения кнопки отправки
  _inactiveButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.setAttribute("disabled", true);
  }

  _activeButton() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.removeAttribute("disabled");
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._inactiveButton();
    } else {
      this._activeButton();
    }
  }

  // Функция проверки ввода на ошибку
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Функция установки обработчиков события
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    //const buttonElement = this._formElement.querySelector(this._submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
    this._toggleButtonState(inputList);
  }

  // Функция проверки валидации формы
  enableValidation() {
    this._formElement.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  }
}
