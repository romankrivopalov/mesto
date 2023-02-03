import Popup from "./Popup.js";

export default
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputFormValues = {};
  }

  _getInputValues = () => {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputList.forEach(inputItem => {
      this._inputFormValues[inputItem.name] = inputItem.value;
    })

    return this._inputFormValues;
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset()
  }
}
