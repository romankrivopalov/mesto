'use strict';

import Popup from "./Popup.js";

export default
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, btnFormSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._btnForm = this._form.querySelector(btnFormSelector)
  }

  _getInputValues = () => {
    const inputFormValues = {};

    this._inputList.forEach(inputItem => {
      inputFormValues[inputItem.name] = inputItem.value;
    })

    return inputFormValues;
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues(), this._btnForm);

      this.close();
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
