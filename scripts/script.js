'use strict';

const profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      openModal = document.querySelector('.profile__edit-btn'),
      modal = document.querySelector('.popup'),
      modalContainer = document.querySelector('.popup__container'),
      closeModal = modal.querySelector('.popup__close'),
      formEditProfile = document.querySelector('.popup__form'),
      inputName = formEditProfile.querySelector('.popup__item_type_name'),
      inputSignature = formEditProfile.querySelector('.popup__item_type_about'),
      saveButton = formEditProfile.querySelector('.popup__btn'),
      cardsList = document.querySelector('.cards__list'),
      cardsTemplate = document.querySelector('#card').content,
      initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ];

addCards();

function addCards() {
  for (let i = 0; i < initialCards.length; i++) {
    let cardName = initialCards[i].name,
        cardLink = initialCards[i].link,
        cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__img').src = cardLink;

    cardsList.append(cardElement);
  }
}

function formSubmitHandler(e) {
  e.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSignature.value;

  hideModal();
}

function showModal() {
  inputName.value = profileTitle.textContent;
  inputSignature.value = profileSubtitle.textContent;

  modal.classList.add('popup_opened');
}

function hideModal() {
  modal.classList.remove('popup_opened');
}

openModal.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
formEditProfile.addEventListener('submit', formSubmitHandler);
modal.addEventListener('click', (e) => {
  if(e.target === e.currentTarget) {
    hideModal();
  }
})
