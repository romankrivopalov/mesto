'use strict';

export default
class Card {
  constructor(cardElement, cardSetting, handleCardClick, handleConfirmClick, userId) {
    this._cardSetting = cardSetting;
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._currentId = userId;
    this._ownerId = cardElement.owner._id;
    this._likeCounter = cardElement.likes.length;

    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
    console.log(userId)
  }

  deleteCard = () => {
    this._card.remove();
    this._cardImg = null;
    this._card = null;
  }

  _askUserBeforeDelete = () => {
    this._handleConfirmClick();
  }

  _toggleCardLike = () => {
    this._cardLikeBtn.classList.toggle(this._cardSetting.activeLikeBtnClass);
  }

  _setEventListeners = () => {
    if (this._cardDeleteBtn) {
      this._cardDeleteBtn.addEventListener('click', () => {
        this._askUserBeforeDelete();
      })
    }

    this._cardLikeBtn = this._card.querySelector(this._cardSetting.cardLikeBtnSelector);

    this._cardLikeBtn.addEventListener('click', () => {
      this._toggleCardLike()
    })

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._cardSetting.cardTemplate)
      .content
      .querySelector(this._cardSetting.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard = () => {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector(this._cardSetting.cardImgSelector);

    this._cardImg.src = this._link;
    this._cardImg.alt = ` ${this._link}.`;
    this._card.querySelector(this._cardSetting.cardTitleSelector).textContent = this._name;

    this._cardDeleteBtn = this._card.querySelector(this._cardSetting.cardDeleteBtnSelector);

    if (this._currentId !== this._ownerId) {
      this._cardDeleteBtn.remove();
    }

    this._cardLikeCounter = this._card.querySelector(this._cardSetting.cardLikeCounter);
    this._cardLikeCounter.textContent = this._likeCounter;

    this._setEventListeners();

    return this._card;
  }
}
