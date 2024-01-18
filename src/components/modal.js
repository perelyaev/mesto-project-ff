// @todo: Экспортируемые функции
export {openModal, closeModal};

// @todo: Функция открытия модального окна
function openModal(popup) {
  popup.classList.add('popup_is-animated')
  setTimeout(() => {popup.classList.add('popup_is-opened')}, 600);
  return popup;
};

// @todo: Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {popup.classList.remove('popup_is-animated')}, 600);
};