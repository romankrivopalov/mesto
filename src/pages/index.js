'use strict';

import './index.css';

import * as all from '../utils/constants.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import FormValidator from '../components/FormValidator.js';

const api = new Api(all.apiSetting),
      userInfo = new UserInfo(all.userInfoData),
      popupWithImage = new PopupWithImage(all.popupSelectors.imgPopup),
      avatarFormValidator = new FormValidator(all.formSetting, all.formEditAvatar),
      cardFormValidator = new FormValidator(all.formSetting, all.formAddCard),
      profileFormValidator = new FormValidator(all.formSetting, all.formEditProfile);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(res => {
    const [ userData, cardsArray ] = res;
    userInfo.setUserInfo(userData);
    return cardsArray
  })
  .then(cardsArray => {
    cardList.renderCards(cardsArray);
  })
  .catch(err => console.log(err));

const avatarEditPopup = new PopupWithForm(
  all.popupSelectors.avatarEditPopup,
  (newAvatarLink) => {
    api.updateAvatar(newAvatarLink.link)
      .then((newUserData) => {
        userInfo.setUserInfo(newUserData)
      })
      .catch((err) => {
        console.log(err);
      })
  })

const popupWithConfirm = new PopupWithConfirm(
  all.popupSelectors.confirmPopup,
  (cardId, cardElemment) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElemment.remove();
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
})

const cardList = new Section(
  (item) => {
    cardList.addItem(createCard(
      item,
      () => { handleCardClick(item) }
    ))
  },
all.cardsContainerSelector);


const profilePopup = new PopupWithForm(
  all.popupSelectors.profilePopup,
  (userData) => {
    api.setUserInfo(userData)
      .then((newUserData) => {
        userInfo.setUserInfo(newUserData)
      })
      .catch((err) => {
        console.log(err);
      })
  }
);

const cardsPopup = new PopupWithForm(
  all.popupSelectors.cardsPopup,
  (item) => {
    api.postNewCard(item)
      .then((res) => {
        cardList.addItem(createCard(
          res,
          () => { handleCardClick(res) }
        ))
      })
      .catch((err) => {
        console.log(err);
      })
  }
);

function createCard(cardElement, handleCardClick ) {
  const card = new Card(
    cardElement,
    all.cardSetting,
    handleCardClick,
    handleConfirmClick,
    (request, cardId) => {
      api.likeCard(request, cardId)
      .then((res) => {
        card.setQuantityLike(res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    userInfo.getUserId());
  return card.generateCard();
}

function handleCardClick(cardElement) {
  popupWithImage.open(cardElement.link, cardElement.name);
}

function handleConfirmClick(cardId, cardElemment) {
  popupWithConfirm.open(cardId, cardElemment);
}

all.avatarEditBtn.addEventListener('click', () => {
  avatarEditPopup.open();
})

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

avatarEditPopup.setEventListeners();
profilePopup.setEventListeners();
cardsPopup.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirm.setEventListeners();

avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
