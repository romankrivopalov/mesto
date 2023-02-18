'use strict';

export default
class Card {
  constructor(cardElement, cardSetting, handleCardClick, handleConfirmClick, likeCard, userId) {
    this._cardSetting = cardSetting;
    this._name = cardElement.name;
    this._link = cardElement.link;
    this._ownerId = cardElement.owner._id;
    this._cardId = cardElement._id;
    this._userId = userId;
    this._likeArray = cardElement.likes;
    this._likeCounter = cardElement.likes.length;
    this._ownerLike = false

    this._handleCardClick = handleCardClick;
    this._handleConfirmClick = handleConfirmClick;
    this._likeCard = likeCard;
  }

  _askUserBeforeDelete = () => {
    this._handleConfirmClick(this._cardId, this._card);
  }

  _toggleCardLike = () => {
    this._cardLikeBtn.classList.toggle(this._cardSetting.activeLikeBtnClass);
  }

  _checkOwnerLike = () => {
    for (let i = 0; i < this._likeArray.length;) {
      if (this._likeArray[i]._id === this._userId) {
        return this._ownerLike = true;
      } else {
        i++
      }
    }
  }

  setQuantityLike = (QuantityLike) => {
    this._cardLikeCounter.textContent = QuantityLike;
  }

  _setEventListeners = () => {
    this._cardLikeBtn = this._card.querySelector(this._cardSetting.cardLikeBtnSelector);

    if (this._checkOwnerLike()) {
      this._cardLikeBtn.classList.add(this._cardSetting.activeLikeBtnClass);
    }

    this._cardLikeBtn.addEventListener('click', () => {
      if (this._ownerLike) {
        this._likeCard('DELETE', this._cardId)
        this._cardLikeBtn.classList.remove(this._cardSetting.activeLikeBtnClass);
      } else {
        this._likeCard('PUT', this._cardId)
        this._cardLikeBtn.classList.add(this._cardSetting.activeLikeBtnClass);
      }
    })

    if (this._cardDeleteBtn) {
      this._cardDeleteBtn.addEventListener('click', () => {
        this._askUserBeforeDelete();
      })
    }

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

    if (this._userId !== this._ownerId) {
      this._cardDeleteBtn.remove();
    }

    this._cardLikeCounter = this._card.querySelector(this._cardSetting.cardLikeCounter);

    this.setQuantityLike(this._likeCounter);
    this._setEventListeners();

    return this._card;
  }
}
