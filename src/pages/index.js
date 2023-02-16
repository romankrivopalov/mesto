'use strict';

import './index.css';

import * as all from '../utils/constants.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo(all.userInfoData),
      cardFormValidator = new FormValidator(all.formSetting, all.formAddCard),
      popupWithImage = new PopupWithImage(all.popupSelectors.imgPopup),
      profileFormValidator = new FormValidator(all.formSetting, all.formEditProfile);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'bdecdc76-75a5-40e2-94d6-35ac4e7b5bcc',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [ formData, cardsArray ] = res;

    cardList.renderCards(cardsArray);
    userInfo.setUserInfo(formData)
  })
  .catch(err => console.log(err));

const cardList = new Section(
    (item) => {
      const card = new Card(
        item,
        all.cardSetting,
        () => { popupWithImage.open(item.link, item.name) }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement)
    }, all.cardsContainerSelector);

const profilePopup = new PopupWithForm(
    all.popupSelectors.profilePopup,

    (formData) => {
      api.setUserInfo(formData)
      userInfo.setUserInfo(formData)
    }
  );

const cardsPopup = new PopupWithForm(
  all.popupSelectors.cardsPopup,
  (item) => {
    const card = new Card(
      item,
      all.cardSetting,
      () => { popupWithImage.open(item.link, item.name) }
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
);

all.profileEditBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  const {userTitle, userSubtitle} = userInfo.getUserInfo();
  all.inputTitle.value = userTitle;
  all.inputSubtitle.value = userSubtitle;

  profileFormValidator.checkInputValidity();

  profilePopup.open();
});

all.cardsAddBtn.addEventListener('click', () => {
  cardsPopup.open();
});

profilePopup.setEventListeners();
cardsPopup.setEventListeners();
popupWithImage.setEventListeners();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
