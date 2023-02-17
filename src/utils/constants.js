'use strict';

export
const formSetting = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__submit-btn',
      inactiveButtonClass: 'popup__submit-btn_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
};

export
const cardSetting = {
      cardTemplate: '#card',
      cardSelector: '.card',
      cardImgSelector: '.card__img',
      cardTitleSelector: '.card__title',
      cardDeleteBtnSelector: '.card__delete',
      cardLikeBtnSelector: '.card__like-icon',
      activeLikeBtnClass: 'card__like-icon_active',
      cardLikeCounter: '.card__like-counter'
};

export
const userInfoData = {
      profileTitleSelector: '.profile__title',
      profileSubtitleSelector: '.profile__subtitle'
};

export
const popupSelectors = {
      profilePopup: '.popup[data-type="edit-popup"]',
      cardsPopup: '.popup[data-type="add-popup"]',
      imgPopup: '.popup[data-type="img-popup"]',
      confirmPopup: '.popup[data-type="confirm-popup"]'
}

export
const popupList = document.querySelectorAll('.popup'),
      profileEditBtn = document.querySelector('.profile__edit-btn'),
      formEditProfile = document.forms['profile-form'],
      inputTitle = formEditProfile.querySelector('.popup__input_type_name'),
      inputSubtitle = formEditProfile.querySelector('.popup__input_type_about'),
      cardsAddBtn = document.querySelector('.profile__add-btn'),
      formAddCard = document.forms['card-form'],
      inputCardName = formAddCard.querySelector('.popup__input_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__input_type_about'),
      cardsContainerSelector = '.cards__list';
