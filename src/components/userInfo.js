import { nameInput, jobInput, userAvatar } from "../utils/constants.js";

export default class UserInfo {
  constructor({ nameUser, aboutUser }) {
    this._name = nameUser;
    this._about = aboutUser;
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._about.textContent;
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
  }

  setUserAvatar(res) {
    this._avatar.src = res.avatar;
    this._avatar.alt = res.name;
  }
}
