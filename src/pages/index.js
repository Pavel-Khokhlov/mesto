import "./index.css";

import {
  popupElement,
  placeTemplate,
  placesList,
  nameProfile,
  jobProfile,
  userAvatar,
  popupZoomImg,
  formProfile,
  formAvatar,
  formPlace,
  formConfirmDelPlace,
  buttonEditProfile,
  buttonAddPlace,
  buttonAvatar,
  placeLikeBtn,
  placeLikeActive,
  elementFormProfile,
  elementFormAvatar,
  submitButton,
  placeLikeCount,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import Popup from "../components/popup.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithConfirm from "../components/popupWithConfirm.js";
import FormValidator from "../components/formValidator.js";
import Api from "../components/api.js";

// POPUPS
const popup = new Popup(popupElement);
popup.setEventListeners();

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
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    "Content-Type": "application/json",
    authorization: "b69708fe-a60d-46f6-85e8-36b6dcb4edd6",
  },
});

// LIKES
const handleLikeClick = (card) => {
  const placeId = card._cardId;
  if (card._likes.find((item) => item._id === nameProfile.id)) {
    api.removeLike(placeId).then((res) => {
      card.toggleLike(res);
    });
  } else {
    api.addLike(placeId).then((res) => {
      card.toggleLike(res);
    });
  }
};

// GET USER INFO FROM SERVER
api.getUserInfo().then((data) => {
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.about;
  userAvatar.alt = data.name;
  userAvatar.src = data.avatar;
  nameProfile.id = data._id;
});

// GET PLACES FROM SERVER
api.getPlaces().then((data) => {
  const initialPlaces = data;
  const serverPlaceList = new Section(
    {
      items: initialPlaces,
      renderer: (item) => {
        const card = new Card(
          item,
          placeTemplate,
          openZoomPopup,
          handleLikeClick,
          handleDelClick
        );
        const placeElement = card.generatePlace();
        serverPlaceList.addItem(placeElement);
      },
    },
    placesList
  );
  serverPlaceList.renderPlaces();
});

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
        document.querySelector(placesList).prepend(placeElement);
      })
      .then(() => {
        newPlaceForm.close();
      });
  },
});
newPlaceForm.setEventListeners();

buttonAddPlace.addEventListener("click", () => {
  formPlaceValidator.resetErrorState();
  newPlaceForm.open();
});

// DELETE PLACE
const handleDelClick = (element, card) => {
  const placeElement = element;
  const cardId = card;
  const confirmDelPlace = new PopupWithConfirm({
    popupSelector: formConfirmDelPlace,
    handleSubmitYes: () => {
      confirmDelPlace.changeBtnText();
      api.deleteCard(cardId).then((res) => {
        console.log(res);
      }).then(() => {
        placeElement.remove();
      }).then(() => {
        confirmDelPlace.close();
      })
    },
  });
  confirmDelPlace.open();
  confirmDelPlace.setEventListeners();
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
      });
  },
});
editProfileForm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  formProfileValidator.resetErrorState();
  userProfile.getUserInfo();
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
      });
  },
});
updateAvatar.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  formAvatarValidator.resetErrorState();
  updateAvatar.open();
});
