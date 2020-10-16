import { initialPlaces } from "./data.js";
import { params } from "./params.js";
import Card from "./card.js";
import FormValidator from "./formValidator.js";

// Функция вывода нового места
const prependPlace = (element) => {
  params.placesList.prepend(element);
};

//
const handleZoom = (e) => {
  params.zoomImage.src = e.target.src;
  params.zoomCaption.textContent = e.target.alt;
  openPopup(params.popupZoom);
};

// Функция Like
const handleLike = (e) => {
  e.target.classList.toggle("place__like-btn_active");
};

// Функция удаления карточки
const handleDelete = (e) => {
  e.target.closest(".place").remove();
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
  placeElement
    .querySelector(".place__like-btn")
    .addEventListener("click", handleLike);
  placeElement
    .querySelector(".place__del-btn")
    .addEventListener("click", handleDelete);
  return placeElement;
}

// Функция вывода предустановленных мест из массива
initialPlaces.forEach((item) => {
  const name = item.name;
  const link = item.link;
  const selector = params.placeTemplate;
  params.placesList.append(getNewPlace(name, link, selector));
});

const popupEditProfile = document.querySelector(".popup_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const formProfile = popupEditProfile.querySelector(".popup__container");

const popupAddPlace = document.querySelector(".popup_add-place");
const buttonAddPlace = document.querySelector(".profile__add-btn");
const formPlace = popupAddPlace.querySelector(".popup__container");

const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const nameInput = popupEditProfile.querySelector(".popup__input_name-profile");
const jobInput = popupEditProfile.querySelector(".popup__input_job-profile");

// функция открытия popup
const openPopup = (popup) => {
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
const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

// Функция обновления данных профайла
const updateProfileData = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

const editProfile = () => {
  updateProfileData();
  openPopup(popupEditProfile);
};

const addPlace = () => {
  openPopup(popupAddPlace);
};

// Функция обнуления и скрытия errorMessage при открытии popup
const resetErrorState = (form) => {
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

// Установка слушателей на кнопки close popup
const setCloseButtonListener = () => {
  document.querySelectorAll(".popup__close-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const closeBtn = event.target.closest(params.popup);
      closePopup(closeBtn);
    });
  });
};

// Установка слушателя закрытия popup по overlay
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

// SUBMIT NEW PLACE
const submitNewPlaceForm = () => {
  const name = params.placeNameInput.value;
  const link = params.placeLinkInput.value;
  const selector = params.placeTemplate;
  prependPlace(getNewPlace(name, link, selector));
};

// SUBMIT PROFILE
const submitProfileForm = () => {
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;
};

formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  submitProfileForm();
  closePopup(popupEditProfile);
});

formPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  submitNewPlaceForm();
  closePopup(popupAddPlace);
});

buttonEditProfile.addEventListener("click", editProfile);
buttonAddPlace.addEventListener("click", addPlace);

const formEditProfileValidator = new FormValidator(
  params.formEditProfile,
  params
);
formEditProfileValidator.enableValidation();

const fromAddPlaceValidator = new FormValidator(params.formAddPlace, params);
fromAddPlaceValidator.enableValidation();
