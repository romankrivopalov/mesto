'use strict';

import * as all from './constants.js';
import Card from './Card.js';

all.profileFormValidator.enableValidation();
all.cardFormValidator.enableValidation();

function addDefaultCards(elements) {
  elements.forEach((cardElement) => {
    renderCard(createCard(cardElement, all.cardSetting));
  })
}

function renderCard(card) {
  all.cardsContainer.prepend(card);
}

function createCard(name, link) {
  const card = new Card(name, link);
  return card.generateCard();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape)
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function handleCardFormSubmit(evt) {
  const cardData = {
    name: all.inputCardName.value,
    link: all.inputCardLink.value
  }

  evt.target.reset();
  all.cardFormValidator.disableSubmitButton();

  renderCard(createCard(cardData, all.cardSetting));
  closePopup(all.cardsPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  all.profileTitle.textContent = all.inputName.value;
  all.profileSubtitle.textContent = all.inputSignature.value;

  closePopup(all.profilePopup);
}

function openProfileEditPopup(evt) {
  evt.preventDefault();

  all.inputName.value = all.profileTitle.textContent;
  all.inputSignature.value = all.profileSubtitle.textContent;

  all.profileFormValidator.checkInputValidity();
  openPopup(all.profilePopup);
}

all.popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    } else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

all.profileEditBtn.addEventListener('click', openProfileEditPopup);

all.cardsAddBtn.addEventListener('click', () => {
  openPopup(all.cardsPopup);
});

all.formEditProfile.addEventListener('submit', handleProfileFormSubmit);
all.formAddCard.addEventListener('submit', handleCardFormSubmit);

addDefaultCards(all.initialCards);

export { openPopup }
