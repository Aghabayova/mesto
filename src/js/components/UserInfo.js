export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
        this._userNameSelector = userNameSelector;
        this._userJobSelector = userJobSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userJob = document.querySelector(this._userJobSelector);
    }
  
    getUserInfo() {
        this._userData = {};
        this._userData.name = this._userName.textContent;
        this._userData.job = this._userJob.textContent;
        return this._userData;
    }
  
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.job;
    }
}  