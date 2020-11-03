import { initialPlaces } from "../utils/data.js";
import {
  popupForm,
  placeTemplateSelector,
  placesListSelector,
  nameProfile,
  jobProfile,
  popupZoomSelector,
  popupProfileSelector,
  popupPlaceSelector,
  formSelector,
  popupInput,
  submitButtonSelector,
  buttonEditProfile,
  buttonAddPlace,
  inputNamePlace,
  inputLinkPlace,
} from "../utils/constants.js";
import Card from "../components/card.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
import UserInfo from "../../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
//import FormValidator from "../components/formValidator.js";

//let resetErrorState;

/*
const zoomImagePopup = new PopupWithImage(params.popupZoom);
zoomImagePopup.setEventListeners();


const handleZoom = (e) => {
  params.zoomImage.src = e.target.src;
  params.zoomCaption.textContent = e.target.alt;
  openPopup(params.popupZoom);
};

// Функция создания новой карточки
function getNewPlace(name, link, selector) {
  const card = new Card(name, link, selector);
  // Создаём карточку и возвращаем наружу
  const placeElement = card.generatePlace();
  return placeElement;
}

*/
//const handleZoom = (e) => {
//  constants.zoomImage.src = e.target.src;
//  constants.zoomCaption.textContent = e.target.alt;
//  popupZoom.open();
//};

const popup = new Popup(popupForm);
popup.setEventListeners();

const zoomPopup = new PopupWithImage(popupZoomSelector);
zoomPopup.setEventListeners();

const defaultPlaceList = new Section(
  {
    items: initialPlaces,
    renderer: (item) => {
      const card = new Card(item, placeTemplateSelector, zoomPopup.open);
      const placeElement = card.generatePlace();
      defaultPlaceList.addItem(placeElement);
    },
  },
  placesListSelector
);

defaultPlaceList.renderPlaces();

/* Функция обнуления и скрытия errorMessage при открытии popup
resetErrorState = (form) => {
  const inputArea = form.querySelectorAll(".popup__input");
  inputArea.forEach((inputElement) => {
    inputElement.value = "";
    inputElement.classList.remove(params.inputInvalidClass);
  });
  const errorArea = form.querySelectorAll(".popup__input-error");
  errorArea.forEach((errorElement) => {
    errorElement.classList.remove(params.activeErrorClass);
  });
};
*/

/* Установка слушателя закрытия popup по overlay
const setOverlayListener = () => {
  const overlayList = document.querySelectorAll(params.popup);
  overlayList.forEach((overlayElement) => {
    overlayElement.addEventListener("click", (evt) => {
      if (evt.target === overlayElement) {
        const popupOpened = evt.target;
        closePopup(popupOpened);
      }
    });
  });
};

setOverlayListener();

*/

/*
const formEditProfileValidator = new FormValidator(
  params.formEditProfile,
  params
);
formEditProfileValidator.enableValidation();

const fromAddPlaceValidator = new FormValidator(params.formAddPlace, params);
fromAddPlaceValidator.enableValidation();
*/

/*

//const buttonZoomImage = new PopupWithImage();
//buttonZoomImage.addEventListeners();
*/

const userProfile = new UserInfo({
  nameUser: nameProfile,
  infoUser: jobProfile,
});

//const popupZoom = new PopupWithImage(popupZoomSelector);
//popupZoom.setEventListeners();

// Добавление нового места
const newPlaceForm = new PopupWithForm({
  popupSelector: popupPlaceSelector,
  handleFormSubmit: (formData) => {
    const card = new Card(formData, placeTemplateSelector, zoomPopup);
    const placeElement = card.generatePlace();

    document.querySelector(placesListSelector).prepend(placeElement);
  },
});
newPlaceForm.setEventListeners();

buttonAddPlace.addEventListener("click", () => {
  newPlaceForm.open();
});

// Редактирование профайла
const editProfileForm = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: () => {
    userProfile.setUserInfo();
  }
})
editProfileForm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  userProfile.getUserInfo();
  editProfileForm.open();
});
