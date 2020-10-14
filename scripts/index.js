import { initialPlaces } from "./data.js";
import { params } from "./params.js";
import Card from "./card.js";
import FormValidator from "./formValidator.js"

const prependPlace = (element) => {
  params.placesList.prepend(element);
};

/*
const openZoomPopup = (name, link) => {
  const zoomImage = document.querySelector(".popup-zoom__image");
  const zoomCaption = document.querySelector(".popup-zoom__caption");
  zoomImage.src = name;
  zoomCaption.textContent = link;
  openPopup(popupZoom);
};
*/

initialPlaces.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link, params.placeTemplate);
  // Создаём карточку и возвращаем наружу
  const placeElement = card.getPlace();
  // Добавляем в DOM
  params.placesList.append(placeElement);
  document
    .querySelector(".place__image")
    .addEventListener("click", () => handleZoom);
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

const readProfileData = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

const editProfile = () => {
  readProfileData();
  openPopup(popupEditProfile);
};

const addPlace = () => {
  openPopup(popupAddPlace);
};

// функция открытия popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.body.style.overflow = "hidden";
  // Добавляем слушатель на ESC
  document.addEventListener("keydown", closePopupEsc);
};

const zoomImage = document.querySelector(".popup-zoom__image");
const zoomCaption = document.querySelector(".popup-zoom__caption");

const handleZoom = (evt) => {
  zoomImage.src = evt.target.src;
  zoomCaption.textContent = evt.target.alt;
  openPopup(popupZoom);
};

// Функция обнуления и скрытия errorMessage при открытии popup
const resetErrorState = (form) => {
  const inputArea = form.querySelectorAll(".popup__input");
  inputArea.forEach((inputElement) => {
    inputElement.value = "";
    inputElement.classList.remove("popup__input_invalid");
  });
  const errorArea = form.querySelectorAll(".popup__input-error");
  errorArea.forEach((errorElement) => {
    errorElement.classList.remove("popup__input-error_active");
  });
};

// функция закрытия popup
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

// установка слушателей на кнопки close popup
const closeButtonListener = () => {
  document.querySelectorAll(".popup__close-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const closeBtn = event.target.closest(params.popup);
      closePopup(closeBtn);
    });
  });
};

const closePopupOverlay = () => {
  const overlayList = document.querySelectorAll(params.popup);
  overlayList.forEach((overlayElement) => {
    overlayElement.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__container") &&
        !evt.target.closest(".popup-zoom__container")
      ) {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
      }
    });
  });
};

closePopupOverlay();
closeButtonListener();

const placeNameInput = document.querySelector(".popup__input_name-place");
const placeLinkInput = document.querySelector(".popup__input_link-place");

// SUBMIT NEW PLACE
const submitNewPlaceForm = () => {
  const card = new Card(
    placeNameInput.value,
    placeLinkInput.value,
    params.placeTemplate,
    prependPlace
  );
  const placeElement = card.getPlace();
  prependPlace(placeElement);
};

// SUBMIT PROFILE
const submitProfileForm = () => {
  const getName = nameInput.value;
  const getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
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

const formEditProfileValidator = new FormValidator(params.formEditProfile, params);
formEditProfileValidator.enableValidation();

const fromAddPlaceValidator = new FormValidator(params.formAddPlace, params);
fromAddPlaceValidator.enableValidation();
