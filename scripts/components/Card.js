'use strict';

import { showPopupImgCard } from '../utils/utils.js'

export default
class Card {
  constructor(cardElement, cardSetting) {
    this._cardSetting = cardSetting;
    this._name = cardElement.name;
    this._link = cardElement.link;
  }

  _deleteCard() {
    this._card.remove()
    this._card = null;
  }

  _toggleCardLike() {
    this._cardLikeBtn.classList.toggle(this._cardSetting.activeLikeBtnClass);
  }

  _setEventListeners() {
    const cardDeleteBtn = this._card.querySelector(this._cardSetting.cardDeleteBtnSelector),
          cardImg = this._card.querySelector(this._cardSetting.cardImgSelector);

    this._cardLikeBtn = this._card.querySelector(this._cardSetting.cardLikeBtnSelector);

    cardDeleteBtn.addEventListener('click', () => {
      this._deleteCard()
    })

    this._cardLikeBtn.addEventListener('click', () => {
      this._toggleCardLike()
    })

    cardImg.addEventListener('click', () => {
      showPopupImgCard(this._link, this._name);
    })
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSetting.cardTemplate)
      .content
      .querySelector(this._cardSetting.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector(this._cardSetting.cardImgSelector);

    this._cardImg.src = this._link;
    this._cardImg.alt = ` ${this._link}.`;
    this._card.querySelector(this._cardSetting.cardTitleSelector).textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
