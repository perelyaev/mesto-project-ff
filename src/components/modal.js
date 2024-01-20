// @todo: Экспортируемые функции
export {openModal, closeModal};

// @todo: Функция открытия popup
function openModal(popup, callbackClose, callbackSubmit) {
  openPopup(popup,animationLoadCallback)
  popup.addEventListener('click', callbackClose);
  document.addEventListener('keydown', callbackClose);
  popup.addEventListener('submit',(evt) => {
    evt.preventDefault();
    callbackSubmit();
    callbackClose(evt);
  });
};

// @todo: Функция закрытия popup
function closeModal(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.target === popup || evt.target.className === 'popup__close' || evt.key === 'Escape' || evt.target.className === 'button popup__button') {
    closePopup(popup,animationIsLoadCallback);
  }
  document.removeEventListener('keydown', closeModal);
};

function animationLoadCallback (popup) {
  popup.classList.add('popup_is-opened');
};

function openPopup(popup,animationLoadCallback) {
  popup.classList.add('popup_is-animated');
  animationLoadCallback(popup)
};

function animationIsLoadCallback(popup) {
  popup.classList.remove('popup_is-animated');
};

function closePopup(popup,animationIsLoadCallback) {
  popup.classList.remove('popup_is-opened');
  animationIsLoadCallback(popup)
};
