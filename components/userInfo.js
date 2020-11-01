import { constants } from "../utils/constants.js";

export default class UserInfo {
  constructor({ nameUser, infoUser }) {
    this._name = nameUser;
    this._info = infoUser;
    this._nameInput = constants.nameInput;
    this._jobInput = constants.jobInput;
  }

  getUserInfo() {
    this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._info.textContent;
    return (this._nameInput.value, this._jobInput.value);
  }

  setUserInfo() {
    this._name.textContent = this._nameInput.value;
    this._info.textContent = this._jobInput.value;
    return (this._name.textContent, this._info.textContent);
  }
}
