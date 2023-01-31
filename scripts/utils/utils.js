import { openPopup } from '../pages/index.js';

const imgPopup = document.querySelector('.popup[data-type="img-popup"]'),
      imgPopupImage = imgPopup.querySelector('.popup__img'),
      imgPopupTitle = imgPopup.querySelector('.popup__title');

function showPopupImgCard(img, title) {
  openPopup(imgPopup);

  imgPopupImage.src = img;
  imgPopupImage.alt = `${title}.`;
  imgPopupTitle.textContent = title;
}

export { showPopupImgCard }
