// GLOBAL AREA
const placesList = document.querySelector(".places");

// BUTTONs POPUP CONST
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonAddPlace = document.querySelector(".profile__add-btn");
const buttonClosePopup = document.querySelectorAll(".popup__close-btn");
const overlayClosePopup = document.querySelectorAll(".popup-close");

// POPUP PROFILE CONST
const popupEditProfile = document.querySelector(".popup_edit-profile");
const formProfile = popupEditProfile.querySelector(".popup__container");
const buttonSubmitProfile = popupEditProfile.querySelector(".popup__save-btn");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const nameInput = popupEditProfile.querySelector(".popup__input_name-profile");
const jobInput = popupEditProfile.querySelector(".popup__input_job-profile");

// POPUP PLACE CONST
const popupAddPlace = document.querySelector(".popup_add-place");
const formPlace = popupAddPlace.querySelector(".popup__container");
const placeNameInput = document.querySelector(".popup__input_name-place");
const placeLinkInput = document.querySelector(".popup__input_link-place");
const buttonSubmitPlace = popupAddPlace.querySelector(".popup__save-btn");

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
const formSubmitNewPlace = () => {
  const newPlace = createPlace(placeNameInput.value, placeLinkInput.value);
  placesList.prepend(newPlace);
};

// SUBMIT PROFILE
const formSubmitProfile = () => {
  const getName = nameInput.value;
  const getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
};

function handleLike(event) {
  event.target.classList.toggle("place__like-btn_active");
}

function handleDelete(event) {
  const deletePlace = event.target.closest(".place");
  deletePlace.remove();
}

function handleZoom(event) {
  zoomImage.src = event.target.src;
  zoomCaption.innerText = event.target.alt;
  popupOpen(popupZoom);
}

function readProfileData() {
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
}

const editProfile = () => {
  formProfile.reset();
  readProfileData();
  popupOpen(popupEditProfile);
};

const addPlace = () => {
  formPlace.reset();
  popupOpen(popupAddPlace);
};

// функция открытия popup
function popupOpen(popup) {
  popup.classList.add("popup_opened");
  // Слушаем клавишу ESC
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popupClose(popup);
    }
  });
  // Слушаем клик по overlay
  popup.addEventListener("click", function (evt) {
    if (
      !evt.target.closest(".popup__container") &&
      !evt.target.closest(".popup-zoom__container")
    ) {
      popupClose(popup);
    }
  });
}

// функция закрытия popup
function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

// установка слушателей на кнопки close popup
function closeButtonListener() {
  document.querySelectorAll(".popup__close-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const closeBtn = event.target.closest(".popup");
      popupClose(closeBtn);
    });
  });
}

closeButtonListener();

buttonEditProfile.addEventListener("click", editProfile);
buttonAddPlace.addEventListener("click", addPlace);

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  formSubmitProfile();
  popupClose(popupEditProfile);
});

formPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  formSubmitNewPlace();
  popupClose(popupAddPlace);
});

render();
