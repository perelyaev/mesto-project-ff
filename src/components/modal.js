// @todo: Экспортируемые функции
export {openModal, closeModal, handleCloseByClick, handleCloseByEsc};

let popupOpen;

// @todo: Функция открытия popup
function openModal(popup, callbackCloseByClick, callbackCloseByEsc) {
  popup.classList.add('popup_is-opened');
  popupOpen = popup;
  popup.addEventListener('click', callbackCloseByClick);
  document.addEventListener('keydown', callbackCloseByEsc);
};

// @todo: Функция закрытия popup
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', handleCloseByClick);
    document.removeEventListener('keydown', handleCloseByEsc);
};

function handleCloseByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(popupOpen);
  }
};

function handleCloseByClick(evt) {
  if (evt.target === popupOpen || evt.target.className === 'popup__close' || evt.target.className === 'button popup__button') {
    closeModal(popupOpen);
  };
}