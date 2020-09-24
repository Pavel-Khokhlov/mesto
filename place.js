const placeTemplate = document.querySelector(".place-template").content;
const placesList = document.querySelector(".places");
const likeBtn = document.querySelector(".place__like-btn");
const addBtn = document.querySelector(".profile__add-btn");
const newPlace = document.querySelector(".popup_add-place");
const newPlaceForm = newPlace.querySelector(".popup__container");
const closeBtnAdd = newPlace.querySelector(".popup__close-btn");
const formAddSubmit = newPlace.querySelector(".popup__save-btn");

function render() {
  placesList.innerHTML = "";
  initialPlaces.forEach(renderPlace);
  btnListener();
}

function renderPlace({ name, link }) {
  const newPlace = placeTemplate.cloneNode(true);
  newPlace.querySelector(".place__title").innerText = name;
  newPlace.querySelector(".place__image").src = link;
  newPlace.querySelector(".place__image").alt = name;
  placesList.appendChild(newPlace);
}

const placeNameInput = document.querySelector(".popup__input_name-place");
const placeLinkInput = document.querySelector(".popup__input_link-place");

function formSubmitPlace() {
  const addPlace = placeTemplate.cloneNode(true);
  addPlace.querySelector(".place__title").innerText = placeNameInput.value;
  addPlace.querySelector(".place__image").alt = placeNameInput.value;
  addPlace.querySelector(".place__image").src = placeLinkInput.value;

  placesList.prepend(addPlace);
  closeAddPopup();
  btnListener();
}

function handleLike(event) {
  event.target.classList.toggle("place__like-btn_active");
}

// функция слушатель кнопок delete & like

function btnListener() {
  document.querySelectorAll(".place__del-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const delPlace = btn.closest(".place");
      delPlace.remove();
    });
  });
  document.querySelectorAll(".place__like-btn").forEach((btn) => {
    btn.addEventListener("click", handleLike);
  });
  document.querySelectorAll(".place__image").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".popup-zoom__image").src = btn.src;
      document.querySelector(".popup-zoom__caption").innerText = btn.alt;
      openZoomPopup();
    });
  });
}

// Обработчик кнопки Новое место

function openAddPlace() {
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
  newPlace.classList.add("popup_opened");
}

// Функция закрытия ADD PLACE POPUP

function closeAddPopup() {
  newPlaceForm.reset();
  newPlace.classList.remove("popup_opened");
}

// Функция открытия и закрытия ZOOM POPUP
zoomImage = document.querySelector(".popup-zoom");
closeBtnZoom = zoomImage.querySelector(".popup__close-btn");

function openZoomPopup() {
  zoomImage.classList.add("popup_opened");
}

function closeZoomPopup() {
  zoomImage.classList.remove("popup_opened");
}

addBtn.addEventListener("click", openAddPlace);
closeBtnAdd.addEventListener("click", closeAddPopup);
closeBtnZoom.addEventListener("click", closeZoomPopup);
formAddSubmit.addEventListener("click", formSubmitPlace);
render();
