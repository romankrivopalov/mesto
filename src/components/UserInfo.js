'use strict';

export default
class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
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
    this._userTitle.textContent = userData.name;
    this._userSubtitle.textContent = userData.about;
    this._userId = userData._id
  }
}
