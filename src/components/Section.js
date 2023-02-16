'use strict';

export default
class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem = (cardElement) => {
    this._containerSelector.prepend(cardElement)
  }

  renderCards = (data) => {
    data.forEach(this._renderer)
  }
}
