export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", (evt) => {this.handleEscClose(evt)});
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.body.style.overflow = "visible";
    document.removeEventListener("keydown", this.handleEscClose.bind(this));
  }
  handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popup
      .querySelector(".popup__close-btn")
      .addEventListener("click", this.close);
  }
}
