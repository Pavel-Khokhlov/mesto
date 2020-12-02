import "./index.css";

import {
  placeTemplate,
  placesList,
  nameProfile,
  jobProfile,
  popupZoomImg,
  formProfile,
  formAvatar,
  formPlace,
  formConfirmDelPlace,
  buttonEditProfile,
  buttonAddPlace,
  buttonAvatar,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithConfirm from "../components/popupWithConfirm.js";
import FormValidator from "../components/formValidator.js";
import Api from "../components/api.js";

const catchErr = (res) => {
  alert(`Всё идёт не по плану. ${res.status}`);
};

// POPUPS
const zoomPopup = new PopupWithImage(popupZoomImg);
zoomPopup.setEventListeners();

const openZoomPopup = (name, link) => {
  zoomPopup.open(name, link);
};

// VALIDATION
const formProfileValidator = new FormValidator(formProfile);
formProfileValidator.enableValidation();

const formAvatarValidator = new FormValidator(formAvatar);
formAvatarValidator.enableValidation();

const formPlaceValidator = new FormValidator(formPlace);
formPlaceValidator.enableValidation();

// API
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18",
  headers: {
    "Content-Type": "application/json",
    authorization: "87b27e82-ce10-439c-bbe6-2acce8f72cdc",
  },
});

// LIKES
const handleLikeClick = (card) => {
  const cardId = card._cardId;
  if (card.isLiked()) {
    api
      .removeLike(cardId)
      .then((res) => {
        card.toggleLike(res);
      })
      .catch(catchErr);
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        card.toggleLike(res);
      })
      .catch(catchErr);
  }
};

Promise.all([api.getUserInfo(), api.getPlaces()])
  .then(([userRes, cardRes]) => {
    userProfile.setUserInfo(userRes);
    userProfile.setUserAvatar(userRes);
    nameProfile.id = userRes._id;
    const cardsArr = cardRes.map(({ name, link, owner, _id, likes }) => ({
      name,
      link,
      owner,
      _id,
      likes,
    }));
    serverPlaceList.renderPlaces(cardsArr);
  })
  .catch(catchErr);

const createCard = (card) => {
  const newCard = new Card(
    card,
    placeTemplate,
    openZoomPopup,
    handleLikeClick,
    handleDelClick
  );
  const placeElement = newCard.generatePlace();
  serverPlaceList.addItem(placeElement);
};

const serverPlaceList = new Section(
  {
    renderer: (card) => {
      createCard(card);
    },
  },
  placesList
);

// ADD NEW PLACE
const newPlaceForm = new PopupWithForm({
  popupSelector: formPlace,
  handleFormSubmit: () => {
    newPlaceForm.changeBtnText();
    api
      .newPlace()
      .then((res) => {
        const card = new Card(
          res,
          placeTemplate,
          openZoomPopup,
          handleLikeClick,
          handleDelClick
        );
        const placeElement = card.generatePlace();
        serverPlaceList.newItem(placeElement);
      })
      .then(() => {
        newPlaceForm.close();
      })
      .catch(catchErr);
  },
});
newPlaceForm.setEventListeners();

buttonAddPlace.addEventListener("click", () => {
  formPlaceValidator.resetErrorState();
  newPlaceForm.open();
});

// DELETE PLACE
const confirmDelPlace = new PopupWithConfirm(formConfirmDelPlace);
confirmDelPlace.setEventListeners();

const handleDelClick = (element, card) => {
  const placeElement = element;
  const cardId = card;
  confirmDelPlace.open();
  confirmDelPlace.changeConfirmHandler(() => {
    confirmDelPlace.changeBtnText();
    api
      .deleteCard(cardId)
      .then((res) => {
        return res;
      })
      .then(() => {
        placeElement.remove();
      })
      .then(() => {
        confirmDelPlace.close();
      })
      .catch(catchErr);
  });
};

// EDIT USER INFO
const userProfile = new UserInfo({
  nameUser: nameProfile,
  aboutUser: jobProfile,
});

const editProfileForm = new PopupWithForm({
  popupSelector: formProfile,
  handleFormSubmit: () => {
    editProfileForm.changeBtnText();
    api
      .patchUserInfo()
      .then((res) => {
        userProfile.setUserInfo(res);
      })
      .then(() => {
        editProfileForm.close();
      })
      .catch(catchErr);
  },
});
editProfileForm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  formProfileValidator.resetErrorState();
  editProfileForm.setInputValues(userProfile.getUserInfo());
  editProfileForm.open();
});

// UPDATE AVATAR
const updateAvatar = new PopupWithForm({
  popupSelector: formAvatar,
  handleFormSubmit: () => {
    updateAvatar.changeBtnText();
    api
      .patchUserAvatar()
      .then((res) => {
        userProfile.setUserAvatar(res);
      })
      .then(() => {
        updateAvatar.close();
      })
      .catch(catchErr);
  },
});
updateAvatar.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  formAvatarValidator.resetErrorState();
  updateAvatar.open();
});
