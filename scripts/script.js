'use strict';

let openModal = document.querySelector('.profile__edit-btn'),
    modal = document.querySelector('.popup'),
    modalContainer = document.querySelector('.popup__container'),
    closeModal = modal.querySelector('.popup__close'),
    formEditProfile = document.querySelector('.popup__form'),
    inputName = formEditProfile.querySelector('.popup__item_type_name'),
    inputSignature = formEditProfile.querySelector('.popup__item_type_about'),
    saveButton = formEditProfile.querySelector('.popup__btn'),
    profileTitle = document.querySelector('.profile__title'),
    profileSubtitle = document.querySelector('.profile__subtitle');

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
