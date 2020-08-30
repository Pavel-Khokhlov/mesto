let myPopup = document.querySelector(".popup");
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
  document.myForm.reset();
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
