export default
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupBigImage = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners = () => {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      } else if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose.bind(this))
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
}
