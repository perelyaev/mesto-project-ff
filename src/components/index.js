import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard, imageCard} from './card.js';
import {openModal, closeModal} from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEdit = document.forms.namedItem('edit-profile');
const formAdd = document.forms.namedItem('new-place');

// @todo: Переменные
let modal = '';

// @todo: Создать карточку
function renderCard(link, name) {
  const card = createCard(cardTemplate, link, name, deleteCard, likeCard, imageCard);
  cardList.prepend(card);
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  renderCard(card.link, card.name)
});

// @todo: Обрабатывать событие click
document.addEventListener('click', (evt) => { 
  switch(evt.target.className) {
    case 'profile__edit-button':
      modal = openModal(popupEdit);
      formEdit.elements.name.value = profileTitle.textContent;
      formEdit.elements.description.value = profileDescription.textContent;
      modal.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileTitle.textContent = formEdit.elements.name.value;
        profileDescription.textContent = formEdit.elements.description.value;
        closeModal(modal);
      });
      break;
    case 'profile__add-button':
      modal = openModal(popupNewCard);
      modal.addEventListener('submit', (evt) => {
        evt.preventDefault();
        renderCard(formAdd.elements.link.value, formAdd.elements.namedItem('place-name').value)
        formAdd.reset();
        closeModal(modal);
      });
      break;
    case 'card__image':
      modal = openModal(popupImage);
      break;
    case 'popup__close':
      closeModal(modal);
      break;
    case modal.className:
      closeModal(modal);
      break;
  };
});

// @todo: Обрабатывать событие keydown
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal(modal);
  }
});