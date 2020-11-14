import "./index.css";

import {
  popupElement,
  placeTemplate,
  placesList,
  nameProfile,
  jobProfile,
  userAvatar,
  popupZoomImg,
  formProfile,
  formAvatar,
  formPlace,
  buttonEditProfile,
  buttonAddPlace,
  buttonAvatar,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import FormValidator from "../components/formValidator.js";
import Api from "../components/api.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    "Content-Type": "application/json",
    authorization: "b69708fe-a60d-46f6-85e8-36b6dcb4edd6",
  },
});

api.getUserInfo().then((data) => {
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.about;
  userAvatar.alt = data.name;
  userAvatar.src = data.avatar;
});

const popup = new Popup(popupElement);
popup.setEventListeners();

const zoomPopup = new PopupWithImage(popupZoomImg);
zoomPopup.setEventListeners();

const openZoomPopup = (name, link) => {
  zoomPopup.open(name, link);
};

api.getPlaces().then((data) => {
  const initialPlaces = data;
  const serverPlaceList = new Section(
    {
      items: initialPlaces,
      renderer: (item) => {
        const card = new Card(item, placeTemplate, openZoomPopup);
        const placeElement = card.generatePlace();
        serverPlaceList.addItem(placeElement);
      },
    },
    placesList
  );
  serverPlaceList.renderPlaces();
});

const formProfileValidator = new FormValidator(formProfile);
formProfileValidator.enableValidation();

const formAvatarValidator = new FormValidator(formAvatar);
formAvatarValidator.enableValidation();

const formPlaceValidator = new FormValidator(formPlace);
formPlaceValidator.enableValidation();

// Добавление нового места
const newPlaceForm = new PopupWithForm({
  popupSelector: formPlace,
  handleFormSubmit: (formData) => {
    const card = new Card(formData, placeTemplate, openZoomPopup);
    const placeElement = card.generatePlace();
    api.newPlace().then((result) => {
      if (result.ok) {
        document.querySelector(placesList).prepend(placeElement);
      }
      return;
    });
  },
});
newPlaceForm.setEventListeners();

buttonAddPlace.addEventListener("click", () => {
  formPlaceValidator.resetErrorState();
  newPlaceForm.open();
});

// Редактирование профайла
const userProfile = new UserInfo({
  nameUser: nameProfile,
  aboutUser: jobProfile,
});

const editProfileForm = new PopupWithForm({
  popupSelector: formProfile,
  handleFormSubmit: () => {
    api.patchUserInfo().then((res) => {
      userProfile.setUserInfo(res);
    });
  },
});
editProfileForm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  formProfileValidator.resetErrorState();
  userProfile.getUserInfo();
  editProfileForm.open();
});

// Обновление Аватарки
const updateAvatar = new PopupWithForm({
  popupSelector: formAvatar,
  handleFormSubmit: () => {
    api.patchUserAvatar().then((res) => {
      userProfile.setUserAvatar(res);
    });
  },
});
updateAvatar.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  formAvatarValidator.resetErrorState();
  updateAvatar.open();
});
