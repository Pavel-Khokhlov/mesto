import { initialPlaces } from "../utils/data.js";
import { constants, selectors } from "../utils/constants.js";
import Card from "../components/card.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
//import PopupWithImage from "../../components/popupWithImage.js";
import UserInfo from "../../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
//import PopupWithForm from "../components/popupWithForm.js";
//import FormValidator from "../components/formValidator.js";

//let openPopup;
//let closePopupEsc;
//let resetErrorState;

/* Функция вывода нового места
const prependPlace = (element) => {
  params.placesList.prepend(element);
};

const zoomImagePopup = new PopupWithImage(params.popupZoom);
zoomImagePopup.setEventListeners();
*/
/*
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
  // Установка слушателей при создании карточки
  placeElement
    .querySelector(".place__image")
    .addEventListener("click", handleZoom);
  return placeElement;
}

// Функция вывода предустановленных мест из массива
initialPlaces.forEach((item) => {
  const name = item.name;
  const link = item.link;
  const selector = params.placeTemplate;
  params.placesList.append(getNewPlace(name, link, selector));
});
*/
const handleZoom = (e) => {
  constants.zoomImage.src = e.target.src;
  constants.zoomCaption.textContent = e.target.alt;
  popupWithImage.open();
};

const defaultPlaceList = new Section(
  {
    items: initialPlaces,
    renderer: (item) => {
      const card = new Card(item.name, item.link, constants.placeTemplate);
      console.log(card);
      const placeElement = card.generatePlace();
      placeElement
      .querySelector(".place__image")
      .addEventListener("click", handleZoom);
      defaultPlaceList.addItem(placeElement);
    },
  },
  constants.placesList
);

defaultPlaceList.renderPlaces();

const popupEditProfile = document.querySelector(".popup_edit-profile");
const formProfile = popupEditProfile.querySelector(".popup__container");
const popupAddPlace = document.querySelector(".popup_add-place");
const formPlace = popupAddPlace.querySelector(".popup__container");


/* функция открытия popup
openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.body.style.overflow = "hidden";
  // Добавляем слушатель на ESC
  document.addEventListener("keydown", closePopupEsc);
};

// Функция закрытия popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  resetErrorState(popup);
  document.body.style.overflow = "visible";
  // Убираем слушатель на ESC
  document.removeEventListener("keydown", closePopupEsc);
};

// Функция закрытия popup по ESC
closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};*/

/*
const addPlace = () => {
  openPopup(popupAddPlace);
};*/

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

/* Установка слушателей на кнопки close popup
const setCloseButtonListener = () => {
  document.querySelectorAll(".popup__close-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const closeBtn = event.target.closest(params.popup);
      closePopup(closeBtn);
    });
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
setCloseButtonListener();
*/
/* SUBMIT NEW PLACE
const submitNewPlaceForm = () => {
  const name = params.placeNameInput.value;
  const link = params.placeLinkInput.value;
  const selector = params.placeTemplate;
  prependPlace(getNewPlace(name, link, selector));
};
*/

// Функция обновления данных профайла
//const updateProfileData = () => {
//  nameInput.value = nameProfile.textContent;
//  jobInput.value = jobProfile.textContent;
//};

//const editProfile = () => {
//  userProfile.getUserInfo();
//  Popup.open(params.formEditProfile);
//};

// SUBMIT PROFILE
//const submitProfileForm = () => {
//  const nameValue = nameInput.value;
//  const jobValue = jobInput.value;
//  nameProfile.textContent = nameValue;
//  jobProfile.textContent = jobValue;
//};


/*
formPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  submitNewPlaceForm();
  closePopup(popupAddPlace);
});
*/
//buttonEditProfile.addEventListener("click", editProfile);
//buttonAddPlace.addEventListener("click", addPlace);
/*
const formEditProfileValidator = new FormValidator(
  params.formEditProfile,
  params
);
formEditProfileValidator.enableValidation();

const fromAddPlaceValidator = new FormValidator(params.formAddPlace, params);
fromAddPlaceValidator.enableValidation();
*/

//const buttonEditProfile = new UserInfo();
/*buttonEditProfile.setEventListeners();

const buttonAddPlace = new PopupWithForm({
  popupSelector: params.formAddPlace,
  submitPlaceForm: (item) => {
    const name = params.placeNameInput.value;
    const link = params.placeLinkInput.value;
    const selector = params.placeTemplate;
      const card = new Card(name, link, selector);
      const placeElement = card.generatePlace();
      cardsList.setItem(placeElement);
      PopupWithForm.close()
  }
});
buttonAddPlace.setEventListeners();

//const buttonZoomImage = new PopupWithImage();
//buttonZoomImage.addEventListeners();
*/

const userInfo = new UserInfo({
  nameUser: constants.nameProfile,
  infoUser: constants.jobProfile,
});

const popup = new Popup(selectors.formEditProfile);
popup.setEventListeners();

const popupWithImage = new PopupWithImage(selectors.popupZoom);
popupWithImage.setEventListeners();

formProfile.addEventListener("submit", (e) => {
  e.preventDefault();
  userInfo.setUserInfo();
  popup.close();
});

constants.buttonEditProfile.addEventListener("click", () => {
  userInfo.getUserInfo();
  popup.open();
});
