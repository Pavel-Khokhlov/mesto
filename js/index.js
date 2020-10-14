// GLOBAL AREA
const placesList = document.querySelector(".places");

// BUTTONs POPUP CONST
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonAddPlace = document.querySelector(".profile__add-btn");

// POPUP PROFILE CONST
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formProfile = popupEditProfile.querySelector(".popup__container");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const nameInput = popupEditProfile.querySelector(".popup__input_name-profile");
const jobInput = popupEditProfile.querySelector(".popup__input_job-profile");

// POPUP PLACE CONST
const popupAddPlace = document.querySelector(".popup_add-place");
const formPlace = popupAddPlace.querySelector(".popup__container");
const placeNameInput = document.querySelector(".popup__input_name-place");
const placeLinkInput = document.querySelector(".popup__input_link-place");

// POPUP ZOOM CONST
const popupZoom = document.querySelector(".popup-zoom");
const zoomImage = document.querySelector(".popup-zoom__image");
const zoomCaption = document.querySelector(".popup-zoom__caption");

// TEMPLATE CONST
const placeTemplate = document.querySelector(".place-template").content;

// LOAD INITIAL CARDs
function render() {
  initialPlaces.forEach(renderPlace);
}

function renderPlace({ name, link }) {
  const addInitialPlace = createPlace(name, link);
  placesList.appendChild(addInitialPlace);
}

const createPlace = (name, link) => {
  const newPlace = placeTemplate.cloneNode(true);
  const newTitle = newPlace.querySelector(".place__title");
  const newImage = newPlace.querySelector(".place__image");
  newTitle.innerText = name;
  newImage.alt = name;
  newImage.src = link;
  newPlace
    .querySelector(".place__like-btn")
    .addEventListener("click", handleLike);
  newPlace
    .querySelector(".place__del-btn")
    .addEventListener("click", handleDelete);
  newImage.addEventListener("click", handleZoom);
  return newPlace;
};

// SUBMIT NEW PLACE
const submitNewPlaceForm = () => {
  const newPlace = createPlace(placeNameInput.value, placeLinkInput.value);
  placesList.prepend(newPlace);
};

// SUBMIT PROFILE
const submitProfileForm = () => {
  const getName = nameInput.value;
  const getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
};

function handleLike(event) {
  event.target.classList.toggle("place__like-btn_active");
}

function handleDelete(event) {
  event.target.closest(".place").remove();
}

function handleZoom(event) {
  zoomImage.src = event.target.src;
  zoomCaption.textContent = event.target.alt;
  openPopup(popupZoom);
}

function readProfileData() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

const editProfile = () => {
  readProfileData();
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
    inputElement.classList.remove("popup__input_invalid");
  });
  const errorArea = form.querySelectorAll(".popup__input-error");
  errorArea.forEach((errorElement) => {
    errorElement.classList.remove("popup__input-error_active");
  });
};

// функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  // Добавляем слушатель на ESC
  document.addEventListener("keydown", closePopupEsc);
}

// функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  resetErrorState(popup);
  // Убираем слушатель на ESC
  document.removeEventListener("keydown", closePopupEsc);
}

// Функция закрытия popup по ESC
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// установка слушателей на кнопки close popup
function closeButtonListener() {
  document.querySelectorAll(".popup__close-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const closeBtn = event.target.closest(".popup");
      closePopup(closeBtn);
    });
  });
}

closeButtonListener();

buttonEditProfile.addEventListener("click", editProfile);
buttonAddPlace.addEventListener("click", addPlace);

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  submitProfileForm();
  closePopup(popupEditProfile);
});

formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  submitNewPlaceForm();
  closePopup(popupAddPlace);
});

const closePopupOverlay = () => {
  const overlayList = document.querySelectorAll(".popup");
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

render();
