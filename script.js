let myPopup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__container");
let editBtn = document.querySelector(".profile__edit-btn");
let closeBtn = document.querySelector(".popup__close-btn");
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");
let nameInput = document.querySelector(".popup__input-name");
let jobInput = document.querySelector(".popup__input-job");

function openPopup() {
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
  myPopup.classList.add("popup_opened");
}

function closePopup() {
  popupForm.reset();
  myPopup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

let formSubmit = document.querySelector(".popup__save-btn");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  let getName = nameInput.value;
  let getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
  closePopup();
}

formSubmit.addEventListener("click", formSubmitHandler);

/*

const initialPlaces = [
  {
      name: 'Штаб квартира',
      link: 'images/lmaranello.jpg'
  },
  {
      name: 'Феррари парк',
      link: 'images/ferrariworld.jpg'
  },
  {
      name: 'Ferrari 812',
      link: 'images/812superfast.jpg'
  },
  {
      name: 'Команда Formula-1',
      link: 'images/formula1.jpg'
  },
  {
      name: 'Михаэль Шумахер',
      link: 'images/schumacher.jpg'
  },
  {
      name: 'Museo Ferrari',
      link: 'images/museo.jpg'
  }
];

const placeTemplate = document.querySelector('.place-template').content;
const placesList = document.querySelector('.places');
const placeTitle = document.querySelector(".place__title");
const placeImage = document.querySelector(".place__image");

function render() {
  placesList.innerHTML = "";
	initialPlaces.forEach(renderPlace);
}

function renderPlace({name, link}) {
	const newPlace = placeTemplate.cloneNode(true);
  newPlace.querySelector('.place__title').innerText = name;
  newPlace.querySelector('.place__image').src = link;
	placesList.appendChild(newPlace);
}

render();*/
