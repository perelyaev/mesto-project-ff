// @todo: Экспортируемые функции
export {openModal, closeModal};

// @todo: Функция открытия popup
function openModal(popup, callbackClose) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', callbackClose);
  document.addEventListener('keydown', callbackClose);
};

// @todo: Функция закрытия popup
function closeModal(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.target === popup || evt.target.className === 'popup__close' || evt.key === 'Escape' || evt.target.className === 'button popup__button') {
    popup.classList.remove('popup_is-opened');
  };
  document.removeEventListener('keydown', closeModal);
};