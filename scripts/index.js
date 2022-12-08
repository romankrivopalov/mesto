'use strict';

const profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      editProfileBtn = document.querySelector('.profile__edit-btn'),
      profileModal = document.querySelector('.popup[data-type="edit-popup"]'),
      modalCloseButtons = document.querySelectorAll('.popup__close'),
      modalContainer = profileModal.querySelector('.popup__container'),
      formEditProfile = profileModal.querySelector('.popup__form'),
      inputName = formEditProfile.querySelector('.popup__item_type_name'),
      inputSignature = formEditProfile.querySelector('.popup__item_type_about'),
      addCardsBtn = document.querySelector('.profile__add-btn'),
      cardsModal = document.querySelector('.popup[data-type="add-popup"]'),
      formAddCard = cardsModal.querySelector('.popup__form'),
      inputCardName = formAddCard.querySelector('.popup__item_type_name'),
      inputCardLink = formAddCard.querySelector('.popup__item_type_about'),
      cardsList = document.querySelector('.cards__list'),
      cardsTemplate = document.querySelector('#card').content,
      imgModal = document.querySelector('.popup[data-type="img-popup"]'),
      imgModalImage = imgModal.querySelector('.popup__img'),
      imgModalTitle = imgModal.querySelector('.popup__title');

function addDefaultCards(elements) {
  elements.forEach(addCard)
}

function addCard({name, link}) {
  cardsList.prepend(createCard(name, link));
}

function createCard(name, link) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true),
        cardImg = cardElement.querySelector('.card__img'),
        cardDelete = cardElement.querySelector('.card__delete'),
        cardLike = cardElement.querySelector('.card__like');

  cardElement.querySelector('.card__title').textContent = name;
  cardImg.src = link;
  cardImg.alt = ` ${name}.`;

  deleteCard(cardDelete);
  toggleLike(cardLike);
  showModalImgCard(cardImg, name);

  return cardElement;
}

function submitFormAddCard(e) {
  e.preventDefault();

  const card = {
    name: inputCardName.value,
    link: inputCardLink.value
  }

  addCard(card);
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



function hideModalProfile() {
  profileModal.classList.remove('popup_opened');
}

function hideModalAddCard() {
  cardsModal.classList.remove('popup_opened');
}

function deleteCard(item) {
  item.addEventListener('click', () => {
    item.closest('.card').remove();
  })
}

function toggleLike(item) {
  item.addEventListener('click', () => {
    item.classList.toggle('card__like_active');
  })
}

function showModalImgCard(img, title) {
  img.addEventListener('click', () => {
    imgModal.classList.add('popup_opened');

    imgModalImage.src = img.src;
    imgModalImage.alt = ` ${title}.`;
    imgModalTitle.textContent = title;
  })
}

function hiddenModalImgCard() {
  imgModal.classList.remove('popup_opened');
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

formEditProfile.addEventListener('submit', submitFormEditProfile);

profileModal.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    hideModalProfile();
  }
});

addCardsBtn.addEventListener('click', () => {
  inputCardName.value = '';
  inputCardLink.value = '';

  openPopup(cardsModal);
});

formAddCard.addEventListener('submit', submitFormAddCard);

cardsModal.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    hideModalAddCard();
  }
});

imgModal.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    hiddenModalImgCard();
  }
});

addDefaultCards(initialCards);
