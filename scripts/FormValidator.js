'use strict';

export default
class FormValidator {
  constructor(formSetting, form) {
    this._formSetting = formSetting;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._formSetting.inputSelector));
    this._buttonElement = this._form.querySelector(this._formSetting.submitButtonSelector);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._formSetting.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._formSetting.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formSetting.inputErrorClass);
    errorElement.classList.remove(this._formSetting.errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formSetting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formSetting.errorClass);
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    this._setEventListeners();
  }

  disableSubmitButton() {
    this._toggleButtonState()
  }

  checkInputValidity() {
    this._inputList.forEach(inputElement => {
      this._checkInputValidity(inputElement);
    })
  }
}
