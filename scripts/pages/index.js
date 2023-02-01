'use strict';

import * as all from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';

all.profileFormValidator.enableValidation();
all.cardFormValidator.enableValidation();

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

all.profileEditBtn.addEventListener('click', openProfileEditPopup);

all.cardsAddBtn.addEventListener('click', () => {
  openPopup(all.cardsPopup);
});

all.formEditProfile.addEventListener('submit', handleProfileFormSubmit);
all.formAddCard.addEventListener('submit', handleCardFormSubmit);

const popupWithImage = new PopupWithImage(all.popupSelectors.imgPopup);
popupWithImage.setEventListeners();

defaultCardList.renderCards();
