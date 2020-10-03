// Функция показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.activeErrorClass);
};

// Функция скрыть ошибку ввода
const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(params.activeErrorClass);
};

// Функция изменения кнопки отправки
const toggleButtonState = (inputList, buttonElement, params) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// Функция проверки ввода на ошибку
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

// Функция установки обработчиков события
const setEventListeners = (formElement, params) => {
  const inputList =
  Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement =
  formElement.querySelector(params.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
  toggleButtonState(inputList, buttonElement, params);
};

// Функция проверки валидации всех форм
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, params);
  });
};

enableValidation(params);
