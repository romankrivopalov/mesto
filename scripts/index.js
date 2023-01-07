'use strict';

import { initialCards, formSetting } from './constants.js';
import { openPopup, closePopup } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './Validate.js';


const popupList = document.querySelectorAll('.popup'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      profileEditBtn = document.querySelector('.profile__edit-btn'),
      profilePopup = document.querySelector('.popup[data-type="edit-popup"]'),
      formEditProfile = document.forms['profile-form'],
      inputName = formEditProfile.querySelector('.popup__input_type_name'),
      inputSignature = formEditProfile.querySelector('.popup__input_type_about'),
      cardsAddBtn = document.querySelector('.profile__add-btn'),
      cardsPopup = document.querySelector('.popup[data-type="add-popup"]'),
      formAddCard = document.forms['card-form'],
      inputCardName = formAddCard.querySelector('.popup__input_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__input_type_about'),
      cardsContainer = document.querySelector('.cards__list'),
      profileFormValidator = new FormValidator(formSetting, formEditProfile),
      cardFormValidator = new FormValidator(formSetting, formAddCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

function addDefaultCards(elements) {
  elements.forEach((cardElement) => {
    renderCard(createCard(cardElement));
  })
}

function handleCardFormSubmit(evt) {
  const cardElement = {
    name: inputCardName.value,
    link: inputCardLink.value
  }

  evt.target.reset();
  cardFormValidator.disableSubmitButton();

  renderCard(createCard(cardElement));
  closePopup(cardsPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSignature.value;

  closePopup(profilePopup);
}

function handleProfileForm(evt) {
  evt.preventDefault();

  inputName.value = profileTitle.textContent;
  inputSignature.value = profileSubtitle.textContent;

  profileFormValidator.checkInputValidityAfterOpen()
  openPopup(profilePopup);
}


function createCard(name, link) {
  const card = new Card(name, link);
  return card.generateCard();
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    } else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

profileEditBtn.addEventListener('click', handleProfileForm);

cardsAddBtn.addEventListener('click', () => {
  openPopup(cardsPopup);
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);

addDefaultCards(initialCards);
