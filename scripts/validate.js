'use strict';

const formSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function enableValidation(formSetting) {
  const formList = Array.from(document.querySelectorAll(formSetting.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    setEventListeners(formElement);
  })
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${formSetting.inputSelector}`));
  const buttonElement = formElement.querySelector(`${formSetting.submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${formSetting.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${formSetting.errorClass}`);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${formSetting.inputErrorClass}`);
  errorElement.classList.remove(`${formSetting.errorClass}`);
  errorElement.textContent = '';
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${formSetting.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${formSetting.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
