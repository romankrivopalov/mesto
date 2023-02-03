'use strict';

export default
class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem = (cardElement) => {
    this._containerSelector.prepend(cardElement)
  }

  renderCards = () => {
    this._data.forEach(cardElement => {
      this._renderer(cardElement);
    })
  }
}
