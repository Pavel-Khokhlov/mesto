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
const deleteBtn = document.querySelector(".place__del-btn");
const likeBtn = document.querySelector(".place__like-btn");

function render() {
  placesList.innerHTML = "";
  initialPlaces.forEach(renderPlace);

  btnListener();
}

function renderPlace({name, link}, index) {
	const newPlace = placeTemplate.cloneNode(true);
  newPlace.querySelector('.place__title').innerText = name;
  newPlace.querySelector('.place__image').src = link;
  newPlace.querySelector('.place__image').alt = name;
  newPlace.querySelector('.place').setAttribute('id', index);
  placesList.appendChild(newPlace);
}

function handleDelete(event) {
  const index = event.target.parentNode.getAttribute('id');
  initialPlaces.splice(index, 1);
  render();
}

function handleLike(event) {
  event.target.classList.toggle('place__like-btn_active');
}

function btnListener() {
  document.querySelectorAll('.place__del-btn').forEach((btn) => {
  btn.addEventListener('click', handleDelete)
  });
  document.querySelectorAll('.place__like-btn').forEach((btn) => {
  btn.addEventListener('click', handleLike)
  });
}

render();
