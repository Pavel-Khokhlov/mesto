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

render();