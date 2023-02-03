'use strict';

export default
class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem = (cardElement) => {
    this._containerSelector.prepend(cardElement)
  }

  renderCards = () => {
    this._data.forEach(this._renderer)
  }
}
