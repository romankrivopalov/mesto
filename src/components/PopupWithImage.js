'use strict';

import Popup from './Popup.js'

export default
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupBigImage = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open(img, title) {
    super.open();

    this._popupBigImage.src = img;
    this._popupBigImage.alt = `${title}.`;
    this._popupTitle.textContent = title;
  }
}
