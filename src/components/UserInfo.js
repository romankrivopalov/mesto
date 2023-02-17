'use strict';

export default
class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._userTitle = document.querySelector(profileTitleSelector);
    this._userSubtitle = document.querySelector(profileSubtitleSelector);
  }

  fillData = (id) => {
    this.currentId = id
  }

  getUserInfo = () => {
    return {
      userTitle: this._userTitle.textContent,
      userSubtitle: this._userSubtitle.textContent
    };
  }

  setUserInfo = (formData) => {
    this._userTitle.textContent = formData.name;
    this._userSubtitle.textContent = formData.about;
  }
}
