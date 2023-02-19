'use strict';

export default
class UserInfo {
  constructor({ profileAvatarSelector, profileTitleSelector, profileSubtitleSelector }) {
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._userTitle = document.querySelector(profileTitleSelector);
    this._userSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo = () => {
    return {
      userTitle: this._userTitle.textContent,
      userSubtitle: this._userSubtitle.textContent
    };
  }

  getUserId = () => {
    return this._userId
  }

  setUserInfo = (userData) => {
    this._profileAvatar.src = userData.avatar;
    this._profileAvatar.alt = userData.name;
    this._userTitle.textContent = userData.name;
    this._userSubtitle.textContent = userData.about;
    this._userId = userData._id
  }
}
