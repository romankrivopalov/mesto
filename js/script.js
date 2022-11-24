'use strict';

let openModal = document.querySelector('.profile__edit-btn'),
    modal = document.querySelector('.popup'),
    closeModal = modal.querySelector('.popup__close'),
    form = document.querySelector('.popup__container'),
    inputName = form.querySelector('.popup__item_type_name'),
    inputSignature = form.querySelector('.popup__item_type_about'),
    saveButton = form.querySelector('.popup__btn'),
    profileTitle = document.querySelector('.profile__title'),
    profileSubtitle = document.querySelector('.profile__subtitle');

inputName.value = profileTitle.textContent;
inputSignature.value = profileSubtitle.textContent;

openModal.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSignature.value;

  hideModal();
}

function showModal() {
  modal.classList.add('popup_opened');
}

function hideModal() {
  modal.classList.remove('popup_opened');
}

showModal();
hideModal();
