'use strict';

export
const apiSetting = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'bdecdc76-75a5-40e2-94d6-35ac4e7b5bcc',
    'Content-Type': 'application/json'
  }
}

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
      profileAvatarSelector: '.profile__avatar',
      profileTitleSelector: '.profile__title',
      profileSubtitleSelector: '.profile__subtitle'
};

export
const popupSelectors = {
      avatarEditPopup: '.popup[data-type="avatar-popup"]',
      profilePopup: '.popup[data-type="edit-popup"]',
      cardsPopup: '.popup[data-type="add-popup"]',
      imgPopup: '.popup[data-type="img-popup"]',
      confirmPopup: '.popup[data-type="confirm-popup"]'
}

export
const popupList = document.querySelectorAll('.popup'),
      avatarEditBtn = document.querySelector('.profile__btn-edit-avatar'),
      profileEditBtn = document.querySelector('.profile__edit-btn'),
      formEditProfile = document.forms['profile-form'],
      inputTitle = formEditProfile.querySelector('.popup__input_type_name'),
      inputSubtitle = formEditProfile.querySelector('.popup__input_type_about'),
      cardsAddBtn = document.querySelector('.profile__add-btn'),
      formAddCard = document.forms['card-form'],
      inputCardName = formAddCard.querySelector('.popup__input_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__input_type_about'),
      cardsContainerSelector = '.cards__list';
