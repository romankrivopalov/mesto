const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardSetting = {
  cardTemplate: '#card',
  cardSelector: '.card',
  cardImgSelector: '.card__img',
  cardTitleSelector: '.card__title',
  cardDeleteBtnSelector: '.card__delete',
  cardLikeBtnSelector: '.card__like',
  activeLikeBtnClass: 'card__like_active'
}

class Card {
  constructor(title, link, cardSetting) {
    this._title = title;
    this._link = link;
    this._cardSetting = cardSetting
  }

  _setEventListeners() {
    const cardDeleteBtn = this._element.querySelector(this._cardSetting.cardDeleteBtnSelector),
          cardLikeBtn = this._element.querySelector(this._cardSetting.cardLikeBtnSelector);

    cardDeleteBtn.addEventListener('click', () => {
      cardDeleteBtn.closest(this._cardSetting.cardSelector).remove()
    })

    cardLikeBtn.addEventListener('click', () => {
      cardLikeBtn.classList.toggle(this._cardSetting.activeLikeBtnClass)
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

    this._element.querySelector(this._cardSetting.cardImgSelector).src = this._link;
    this._element.querySelector(this._cardSetting.cardImgSelector).alt = ` ${this._link}.`;
    this._element.querySelector(this._cardSetting.cardTitleSelector).textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}

export { Card, cardSetting, initialCards }
