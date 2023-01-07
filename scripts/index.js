'use strict';

import { Card, cardSetting, initialCards } from './card.js';
import { FormValidator, formSetting } from './validate.js';

const formList = Array.from(document.querySelectorAll('.popup__form')),
      popupList = document.querySelectorAll('.popup'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      editProfileBtn = document.querySelector('.profile__edit-btn'),
      profilePopup = document.querySelector('.popup[data-type="edit-popup"]'),
      formEditProfile = document.forms['profile-form'],
      inputName = formEditProfile.querySelector('.popup__input_type_name'),
      inputSignature = formEditProfile.querySelector('.popup__input_type_about'),
      addCardsBtn = document.querySelector('.profile__add-btn'),
      cardsPopup = document.querySelector('.popup[data-type="add-popup"]'),
      formAddCard = document.forms['card-form'],
      inputCardName = formAddCard.querySelector('.popup__input_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__input_type_about'),
      cardsList = document.querySelector('.cards__list'),
      imgPopup = document.querySelector('.popup[data-type="img-popup"]'),
      imgPopupImage = imgPopup.querySelector('.popup__img'),
      imgPopupTitle = imgPopup.querySelector('.popup__title');

function addDefaultCards(elements) {
  elements.forEach(({name, link,}) => {
    renderCard(name, link);
  })
}

function submitFormAddCard(evt) {
  const name = inputCardName.value,
        link = inputCardLink.value;

  evt.target.reset();

  renderCard(name, link);
  closePopup(cardsPopup);
}

function submitFormEditProfile() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSignature.value;

  closePopup(profilePopup);
}


function renderCard(name, link) {
  const card = new Card(name, link, cardSetting);
  cardsList.prepend(card.generateCard());
}

function showPopupImgCard(img, title) {
  openPopup(imgPopup);

  imgPopupImage.src = img.src;
  imgPopupImage.alt = `${title}.`;
  imgPopupTitle.textContent = title;
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {

    popupList.forEach(popup => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    })
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape)
}

formList.forEach((formElement) => {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  const form = new FormValidator(formSetting, formElement)
  form.enableValidation(formSetting);
})

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileTitle.textContent;
  inputSignature.value = profileSubtitle.textContent;

  openPopup(profilePopup);
});

addCardsBtn.addEventListener('click', () => {
  openPopup(cardsPopup);
});

formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);

addDefaultCards(initialCards);

export { showPopupImgCard }
