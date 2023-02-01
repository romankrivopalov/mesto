'use strict';

import * as all from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';

all.profileFormValidator.enableValidation();
all.cardFormValidator.enableValidation();

const defaultCardList = new Section({
  data: all.initialCards,
  renderer: (item) => {
    const card = new Card(item, all.cardSetting);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement)
  }
}, all.cardsContainer);

defaultCardList.renderCards();

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
  const cardElement = {
    name: all.inputCardName.value,
    link: all.inputCardLink.value
  }

  evt.target.reset();
  all.cardFormValidator.disableSubmitButton();

  const userCard = new UserCard({
    data: [cardElement],
    renderer: (item) => {
      const card = new Card(item, all.cardSetting);
      const cardElement = card.generateCard();
      userCard.addItem(cardElement)
    }
  }, all.cardsContainer);

  userCard.renderCard();

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

// addDefaultCards(all.initialCards);

export { openPopup }
