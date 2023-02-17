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

const api = new Api(all.apiSetting),
      userInfo = new UserInfo(all.userInfoData),
      cardFormValidator = new FormValidator(all.formSetting, all.formAddCard),
      popupWithImage = new PopupWithImage(all.popupSelectors.imgPopup),
      profileFormValidator = new FormValidator(all.formSetting, all.formEditProfile);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [ userData, cardsArray ] = res;

    cardList.renderCards(cardsArray);
    userInfo.setUserInfo(userData)
  })
  .catch(err => console.log(err));




const cardList = new Section(
  (item) => {
    cardList.addItem(createCard(item, () => { handleCardClick(item) }))
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
    api.postNewCard(item)
      .then((res) => {
        cardList.addItem(createCard(res, () => { handleCardClick(res) }))
      })
      .catch((err) => {
        console.log(err);
      })
  }
);



function createCard(cardElement, handleCardClick) {
  const card = new Card(cardElement, all.cardSetting, handleCardClick );
  return card.generateCard();
}

function handleCardClick(cardElement) {
  popupWithImage.open(cardElement.link, cardElement.name);
}




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
