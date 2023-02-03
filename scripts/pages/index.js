'use strict';

import * as all from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profileFormValidator = new FormValidator(all.formSetting, all.formEditProfile),
      cardFormValidator = new FormValidator(all.formSetting, all.formAddCard),
      userInfo = new UserInfo(all.userInfoData),
      popupWithImage = new PopupWithImage(all.popupSelectors.imgPopup);

const defaultCardList = new Section({
    data: all.initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        all.cardSetting,
        () => { popupWithImage.open(item.link, item.name) }
      );
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement)
    }
  }, all.cardsContainer);

const profilePopup = new PopupWithForm(
    all.popupSelectors.profilePopup,
    () => {
      userInfo.setUserInfo(all.inputTitle, all.inputSubtitle)

      profilePopup.close()
  });

const cardsPopup = new PopupWithForm(
    all.popupSelectors.cardsPopup,
    (inputFormValues) => {
      const userCard = new Section({
        data: [inputFormValues],
        renderer: (item) => {
          const card = new Card(
            item,
            all.cardSetting,
            () => { popupWithImage.open(item.link, item.name) }
          );
          const cardElement = card.generateCard();
          userCard.addItem(cardElement)
        }
      }, all.cardsContainer);

      userCard.renderCards();

      cardsPopup.close();
    }
  );

all.profileEditBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  all.inputTitle.value = userInfo.getUserInfo().userTitle;
  all.inputSubtitle.value = userInfo.getUserInfo().userSubtitle;

  profileFormValidator.checkInputValidity();

  profilePopup.open();
});

all.cardsAddBtn.addEventListener('click', () => {
  cardsPopup.open();
});


profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

profilePopup.setEventListeners();
cardsPopup.setEventListeners();
popupWithImage.setEventListeners();

defaultCardList.renderCards();
