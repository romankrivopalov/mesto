export default
class UserInfo {
  constructor({ profileTitle, profileSubtitle }) {
    this._userTitle = document.querySelector(profileTitle);
    this._userSubtitle = document.querySelector(profileSubtitle);
  }

  getUserInfo = () => {
    return {
      userTitle: this._userTitle.textContent,
      userSubtitle: this._userSubtitle.textContent
    };
  }

  setUserInfo = (inputTitle, inputSubtitle) => {
    this._userTitle.textContent = inputTitle.value;
    this._userSubtitle.textContent = inputSubtitle.value;
  }
}
