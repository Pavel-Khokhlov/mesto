import { initialPlaces } from "../utils/data.js";
import {
  popupElement,
  placeTemplateSelector,
  placesList,
  nameProfile,
  jobProfile,
  popupZoomImg,
  formProfile,
  formPlace,
  buttonEditProfile,
  buttonAddPlace,
} from "../utils/constants.js";
import Card from "../components/card.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
import UserInfo from "../../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import FormValidator from "../components/formValidator.js";

const popup = new Popup(popupElement);
popup.setEventListeners();

const zoomPopup = new PopupWithImage(popupZoomImg);
zoomPopup.setEventListeners();

const openZoomPopup = (name, link) => {
  zoomPopup.open(name, link);
};

const defaultPlaceList = new Section(
  {
    items: initialPlaces,
    renderer: (item) => {
      const card = new Card(item, placeTemplateSelector, openZoomPopup);
      const placeElement = card.generatePlace();
      defaultPlaceList.addItem(placeElement);
    },
  },
  placesList
);

defaultPlaceList.renderPlaces();

const formEditProfileValidator = new FormValidator(formProfile);
formEditProfileValidator.enableValidation();

const fromAddPlaceValidator = new FormValidator(formPlace);
fromAddPlaceValidator.enableValidation();

const userProfile = new UserInfo({
  nameUser: nameProfile,
  infoUser: jobProfile,
});

// Добавление нового места
const newPlaceForm = new PopupWithForm({
  popupSelector: formPlace,
  handleFormSubmit: (formData) => {
    const card = new Card(formData, placeTemplateSelector, openZoomPopup);
    const placeElement = card.generatePlace();

    document.querySelector(placesList).prepend(placeElement);
  },
});
newPlaceForm.setEventListeners();

buttonAddPlace.addEventListener("click", () => {
  newPlaceForm.open();
});

// Редактирование профайла
const editProfileForm = new PopupWithForm({
  popupSelector: formProfile,
  handleFormSubmit: () => {
    userProfile.setUserInfo();
  },
});
editProfileForm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  userProfile.getUserInfo();
  editProfileForm.open();
});
