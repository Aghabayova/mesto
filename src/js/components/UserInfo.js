export default class UserInfo {
    constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
        this._userNameSelector = userNameSelector;
        this._userJobSelector = userJobSelector;
        this._userAvatarSelector = userAvatarSelector;

        this._userName = document.querySelector(this._userNameSelector);
        this._userJob = document.querySelector(this._userJobSelector);
        this._userAvatar = document.querySelector(this._userAvatarSelector);
    }
  
    getUserInfo() {
        this._userData = {};
        this._userData.name = this._userName.textContent;
        this._userData.about = this._userJob.textContent;
        return this._userData;
    }

    getUserId() {
        return this._userName.dataset.id;
    }

    setAvatarLink(data) {
        this._userAvatar.src = data.avatar;
    }

    setUserInfo(data) {
        this._userName.dataset.id       = data._id;
        this._userName.textContent      = data.name;
        this._userJob.textContent       = data.about;
        this._userAvatar.src            = data.avatar;
    }
}  