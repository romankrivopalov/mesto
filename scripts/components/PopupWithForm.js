import Popup from "./Popup.js";

export default
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues = () => {
    this._inputFormValues = {
      name: this._form.querySelector('.popup__input_type_name').value,
      link: this._form.querySelector('.popup__input_type_about').value
    };

    console.log(this._inputFormValues)
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
