const initialPlaces = [
  {
    name: "Штаб квартира",
    link: "images/lmaranello.jpg",
  },
  {
    name: "Феррари парк",
    link: "images/ferrariworld.jpg",
  },
  {
    name: "Ferrari 812",
    link: "images/812superfast.jpg",
  },
  {
    name: "Команда Formula-1",
    link: "images/formula1.jpg",
  },
  {
    name: "Михаэль Шумахер",
    link: "images/schumacher.jpg",
  },
  {
    name: "Museo Ferrari",
    link: "images/museo.jpg",
  },
];

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

function renderPlace({ name, link }, index) {
  const newPlace = placeTemplate.cloneNode(true);
  newPlace.querySelector(".place__title").innerText = name;
  newPlace.querySelector(".place__image").src = link;
  newPlace.querySelector(".place__image").alt = name;
  newPlace.querySelector(".place").setAttribute("id", index);
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
}

/* Обработчик кнопки Новое место */

function openAddPlace() {
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
  newPlace.classList.add("popup_opened");
}

function closeAddPopup() {
  newPlaceForm.reset();
  newPlace.classList.remove("popup_opened");
}

addBtn.addEventListener("click", openAddPlace);
closeBtnAdd.addEventListener("click", closeAddPopup);
formAddSubmit.addEventListener("click", formSubmitPlace);
render();