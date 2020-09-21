const editProfile = document.querySelector(".popup_edit-profile");
const editProfileForm = editProfile.querySelector('.popup__container');
const editBtn = document.querySelector(".profile__edit-btn");
const closeBtnEdit = editProfile.querySelector(".popup__close-btn");
const formEditSubmit = editProfile.querySelector(".popup__save-btn");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const nameInput = editProfile.querySelector(".popup__input_name-profile");
const jobInput = editProfile.querySelector(".popup__input_job-profile");

function openEditPopup() {
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
  editProfile.classList.add("popup_opened");
}

function closeEditPopup() {
  editProfileForm.reset();
  editProfile.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openEditPopup);
closeBtnEdit.addEventListener("click", closeEditPopup);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitProfile(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  let getName = nameInput.value;
  let getJob = jobInput.value;
  nameProfile.textContent = getName;
  jobProfile.textContent = getJob;
  closeEditPopup();
}

formEditSubmit.addEventListener("click", formSubmitProfile);
