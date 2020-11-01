export const constants = {
  popup: ".popup",
  placeTemplate: ".place-template",
  placesList: document.querySelector(".places"),
  zoomImage: document.querySelector(".popup-zoom__image"),
  zoomCaption: document.querySelector(".popup-zoom__caption"),
  placeNameInput: document.querySelector(".popup__input_name-place"),
  placeLinkInput: document.querySelector(".popup__input_link-place"),
  inactiveButtonClass: "popup__save-btn_inactive",
  activeErrorClass: "popup__input-error_active",
  inputInvalidClass: "popup__input_invalid",
  popupEditSelector: ".popup_edit-profile",
  buttonEditProfile: document.querySelector(".profile__edit-btn"),
  nameProfile: document.querySelector(".profile__name"),
  jobProfile: document.querySelector(".profile__job"),
  nameInput: document.querySelector(".popup__input_name-profile"),
  jobInput: document.querySelector(".popup__input_job-profile"),
  buttonAddPlace: document.querySelector(".profile__add-btn"),
};

export const selectors = {
  popupZoom: ".popup-zoom",
  formEditProfile: ".popup_edit-profile",
  formAddPlace: ".popup_add-place",
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
};
