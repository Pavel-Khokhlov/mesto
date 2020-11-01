class FormValidator {
  constructor(formSelector, params) {
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._inputElement = params.inputElement;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._activeErrorClass = params.activeErrorClass;
    this._inputInvalidClass = params.inputInvalidClass;
    this._inactiveButtonClass = params.inactiveButtonClass;
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
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
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
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    this._toggleButtonState(inputList, buttonElement);
  }

  // Функция проверки валидации формы
  enableValidation = () => {
    const submitFormHandler = (event) => {
      event.preventDefault();
    };
    this._formElement.addEventListener("submit", submitFormHandler);
    this._setEventListeners();
  };
}

export default FormValidator;
