const placesList = document.querySelector(".places");
const buttonClosePopup = document.querySelectorAll(".popup__close-btn");

function render() {
  placesList.innerHTML = "";
  initialPlaces.forEach(renderPlace);
  buttonListener();
}

// Загрузка первых 6 мест

const placeTemplate = document.querySelector(".place-template").content;

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
  return newPlace;
};

const placeNameInput = document.querySelector(".popup__input_name-place");
const placeLinkInput = document.querySelector(".popup__input_link-place");

function handleLike(event) {
  event.target.classList.toggle("place__like-btn_active");
}

function handleDelete(event) {
  const deletePlace = event.target.closest(".place");
  deletePlace.remove();
}

function handleZoom(event) {
  document.querySelector(".popup-zoom__image").src = event.target.src;
  document.querySelector(".popup-zoom__caption").innerText = event.target.alt;
  popupOpen(popupZoom);
}

// функция слушатель кнопок delete & like & zoom

function buttonListener() {
  document.querySelectorAll(".place__del-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
  document.querySelectorAll(".place__like-btn").forEach((btn) => {
    btn.addEventListener("click", handleLike);
  });
  document.querySelectorAll(".place__image").forEach((btn) => {
    btn.addEventListener("click", handleZoom);
  });
}

function closeListener() {
  document.querySelectorAll(".popup__close-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const closeBtn = event.target.closest(".popup");
      popupClose(closeBtn);
    });
  });
}

const popupEditProfile = document.querySelector(".popup_edit-profile");
const formProfile = popupEditProfile.querySelector(".popup__container");
const buttonSubmitProfile = popupEditProfile.querySelector(".popup__save-btn");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const nameInput = popupEditProfile.querySelector(".popup__input_name-profile");
const jobInput = popupEditProfile.querySelector(".popup__input_job-profile");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonAddPlace = document.querySelector(".profile__add-btn");

const popupAddPlace = document.querySelector(".popup_add-place");
const formPlace = popupAddPlace.querySelector(".popup__container");
const buttonSubmitPlace = popupAddPlace.querySelector(".popup__save-btn");
const popupZoom = document.querySelector(".popup-zoom");

function readProfileData() {
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
}

const editProfile = () => {
  readProfileData();
  popupOpen(popupEditProfile);
};

const addPlace = () => {
  popupOpen(popupAddPlace);
};

// функция редактирования профиля
const formSubmitProfile = (event) => {
  event.preventDefault();
  const getName = nameInput.value;
  const getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
  popupClose(popupEditProfile);
  formProfile.reset();
};

// функция добавления нового места
const formSubmitPlace = (event) => {
  event.preventDefault();
  formSubmitNewPlace();
};

function formSubmitNewPlace(name, link) {
  const addNewPlace = createPlace(name, link);
  const addTitle = addNewPlace.querySelector(".place__title");
  const addImage = addNewPlace.querySelector(".place__image");
  addTitle.innerText = placeNameInput.value;
  addImage.alt = placeNameInput.value;
  addImage.src = placeLinkInput.value;
  addNewPlace
    .querySelector(".place__like-btn")
    .addEventListener("click", handleLike);
  addNewPlace
    .querySelector(".place__del-btn")
    .addEventListener("click", handleDelete);
  addNewPlace
    .querySelector(".place__image")
    .addEventListener("click", handleZoom);
  placesList.prepend(addNewPlace);
  popupClose(popupAddPlace);
  formPlace.reset();
}

// функция открытия popup
function popupOpen(popup) {
  popup.classList.add("popup_opened");
  closeListener();
}

// функция закрытия popup
function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

buttonEditProfile.addEventListener("click", editProfile);
buttonAddPlace.addEventListener("click", addPlace);
buttonSubmitProfile.addEventListener("click", formSubmitProfile);
buttonSubmitPlace.addEventListener("click", formSubmitPlace);
render();
