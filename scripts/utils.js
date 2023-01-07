const imgPopup = document.querySelector('.popup[data-type="img-popup"]'),
      imgPopupImage = imgPopup.querySelector('.popup__img'),
      imgPopupTitle = imgPopup.querySelector('.popup__title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape)
}

function showPopupImgCard(img, title) {
  openPopup(imgPopup);

  imgPopupImage.src = img;
  imgPopupImage.alt = `${title}.`;
  imgPopupTitle.textContent = title;
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

export { openPopup, closePopup, showPopupImgCard }
