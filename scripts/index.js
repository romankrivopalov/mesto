'use strict';

const profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      editProfileBtn = document.querySelector('.profile__edit-btn'),
      modalCloseButtons = document.querySelectorAll('.popup__close'),
      profileModal = document.querySelector('.popup[data-type="edit-popup"]'),
      formEditProfile = profileModal.querySelector('.popup__form'),
      inputName = formEditProfile.querySelector('.popup__item_type_name'),
      inputSignature = formEditProfile.querySelector('.popup__item_type_about'),
      addCardsBtn = document.querySelector('.profile__add-btn'),
      cardsModal = document.querySelector('.popup[data-type="add-popup"]'),
      formAddCard = cardsModal.querySelector('.popup__form'),
      inputCardName = formAddCard.querySelector('.popup__item_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__item_type_about'),
      cardsList = document.querySelector('.cards__list'),
      cardsTemplate = document.querySelector('#card').content.querySelector('.card'),
      imgModal = document.querySelector('.popup[data-type="img-popup"]'),
      imgModalImage = imgModal.querySelector('.popup__img'),
      imgModalTitle = imgModal.querySelector('.popup__title');

function createCard(name, link) {
  const cardElement = cardsTemplate.cloneNode(true),
        cardImg = cardElement.querySelector('.card__img'),
        cardDelete = cardElement.querySelector('.card__delete'),
        cardLike = cardElement.querySelector('.card__like');

  cardElement.querySelector('.card__title').textContent = name;
  cardImg.src = link;
  cardImg.alt = `${name}.`;

  cardDelete.addEventListener('click', () => deleteCard(cardDelete));
  cardLike.addEventListener('click', () => toggleCardLike(cardLike));
  cardImg.addEventListener('click', () => showModalImgCard(cardImg, name));

  cardsList.prepend(cardElement);
}

function addDefaultCards(elements) {
  elements.forEach(({name, link}) => {
    createCard(name, link);
  })
}

function submitFormAddCard(e) {
  e.preventDefault();

  const name = inputCardName.value,
        link = inputCardLink.value;

  createCard(name, link);
  closePopup(cardsModal);
}

function submitFormEditProfile(e) {
  e.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSignature.value;

  closePopup(profileModal);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function deleteCard(card) {
  card.closest('.card').remove();
}

function toggleCardLike(like) {
  like.classList.toggle('card__like_active');
}

function showModalImgCard(img, title) {
  openPopup(imgModal);

  imgModalImage.src = img.src;
  imgModalImage.alt = `${title}.`;
  imgModalTitle.textContent = title;
}

function initClosePopupByOverlayClick(modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closePopup(modal);
    }
  })
}

modalCloseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    closePopup(e.currentTarget.closest('.popup'));
  })
})

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileTitle.textContent;
  inputSignature.value = profileSubtitle.textContent;

  openPopup(profileModal);
});

addCardsBtn.addEventListener('click', () => {
  formAddCard.reset();

  openPopup(cardsModal);
});

formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddCard.addEventListener('submit', submitFormAddCard);

addDefaultCards(initialCards);
initClosePopupByOverlayClick(profileModal);
initClosePopupByOverlayClick(cardsModal);
initClosePopupByOverlayClick(imgModal);
