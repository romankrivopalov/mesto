'use strict';

const popupList = document.querySelectorAll('.popup'),
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      editProfileBtn = document.querySelector('.profile__edit-btn'),
      profilePopup = document.querySelector('.popup[data-type="edit-popup"]'),
      formEditProfile = document.forms['profile-form'],
      inputEditFormList = Array.from(formEditProfile.querySelectorAll('.popup__input')),
      inputName = formEditProfile.querySelector('.popup__input_type_name'),
      inputSignature = formEditProfile.querySelector('.popup__input_type_about'),
      addCardsBtn = document.querySelector('.profile__add-btn'),
      cardsPopup = document.querySelector('.popup[data-type="add-popup"]'),
      formAddCard = document.forms['card-form'],
      inputCardFormList = Array.from(formAddCard.querySelectorAll('.popup__input')),
      btnSubmitCardForm = formAddCard.querySelector(formSetting.submitButtonSelector),
      inputCardName = formAddCard.querySelector('.popup__input_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__input_type_about'),
      cardsList = document.querySelector('.cards__list'),
      cardsTemplate = document.querySelector('#card').content.querySelector('.card'),
      imgPopup = document.querySelector('.popup[data-type="img-popup"]'),
      imgPopupImage = imgPopup.querySelector('.popup__img'),
      imgPopupTitle = imgPopup.querySelector('.popup__title');

function addDefaultCards(elements) {
  elements.forEach(({name, link}) => {
    createCard(name, link);
  })
}

function createCard(name, link) {
  const cardElement = getCard(name, link);
  cardsList.prepend(cardElement);
}

function getCard(name, link) {
  const cardElement = cardsTemplate.cloneNode(true),
        cardImg = cardElement.querySelector('.card__img'),
        cardDelete = cardElement.querySelector('.card__delete'),
        cardLike = cardElement.querySelector('.card__like');

  cardElement.querySelector('.card__title').textContent = name;
  cardImg.src = link;
  cardImg.alt = `${name}.`;

  cardDelete.addEventListener('click', () => deleteCard(cardDelete));
  cardLike.addEventListener('click', () => toggleCardLike(cardLike));
  cardImg.addEventListener('click', () => showPopupImgCard(cardImg, name));

  return cardElement
}

function submitFormAddCard(evt) {
  const name = inputCardName.value,
        link = inputCardLink.value;

  evt.target.reset()
  toggleButtonState(inputEditFormList, btnSubmitCardForm, formSetting.inactiveButtonClass);

  createCard(name, link);
  closePopup(cardsPopup);
}

function submitFormEditProfile() {
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSignature.value;

  closePopup(profilePopup);
}

function deleteCard(card) {
  card.closest('.card').remove();
}

function toggleCardLike(like) {
  like.classList.toggle('card__like_active');
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
  toggleButtonState(inputCardFormList, btnSubmitCardForm, formSetting.inactiveButtonClass);

  openPopup(cardsPopup);
});

formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);

addDefaultCards(initialCards);
enableValidation(formSetting);
