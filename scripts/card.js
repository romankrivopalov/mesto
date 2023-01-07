'use strict';

import { showPopupImgCard } from './utils.js'

class Card {
  constructor(cardElement) {
    this._cardSetting = {
      cardTemplate: '#card',
      cardSelector: '.card',
      cardImgSelector: '.card__img',
      cardTitleSelector: '.card__title',
      cardDeleteBtnSelector: '.card__delete',
      cardLikeBtnSelector: '.card__like',
      activeLikeBtnClass: 'card__like_active'
    };
    this._name = cardElement.name;
    this._link = cardElement.link;
  }

  _deleteCard() {
    this._element.remove()
    this._element = null;
  }

  _toggleCardLike() {
    this._cardLikeBtn = this._element.querySelector(this._cardSetting.cardLikeBtnSelector);

    this._cardLikeBtn.classList.toggle(this._cardSetting.activeLikeBtnClass);
  }

  _setEventListeners() {
    const cardDeleteBtn = this._element.querySelector(this._cardSetting.cardDeleteBtnSelector),
          cardLikeBtn = this._element.querySelector(this._cardSetting.cardLikeBtnSelector),
          cardImg = this._element.querySelector(this._cardSetting.cardImgSelector);

    cardDeleteBtn.addEventListener('click', () => {
      this._deleteCard()
    })

    cardLikeBtn.addEventListener('click', () => {
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
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector(this._cardSetting.cardImgSelector);

    this._cardImg.src = this._link;
    this._cardImg.alt = ` ${this._link}.`;
    this._element.querySelector(this._cardSetting.cardTitleSelector).textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export { Card }
