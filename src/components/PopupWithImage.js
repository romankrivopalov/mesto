'use strict';

import Popup from './Popup.js'

export default
class PopupWithImage extends Popup {
  open(img, title) {
    super.open();

    this._popupBigImage.src = img;
    this._popupBigImage.alt = `${title}.`;
    this._popupTitle.textContent = title;
  }
}
