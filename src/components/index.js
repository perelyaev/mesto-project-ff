import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal, handleCloseByClick, handleCloseByEsc} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getInitialCards, getUser, setUser, setCard, delCard, setLike, deleteLike, setAvatar} from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formEdit = document.forms.namedItem('edit-profile');
const formAdd = document.forms.namedItem('new-place');
const formEditAvatar = document.forms.namedItem('edit-avatar');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  setUser(formEdit.elements.name, formEdit.elements.description, profileTitle, profileDescription)
});

formAdd.addEventListener('submit',(evt) => {
  evt.preventDefault();
  setCard(formAdd.elements.namedItem('place-name').value, formAdd.elements.link.value);
  // renderCard(formAdd.elements.link.value, formAdd.elements.namedItem('place-name').value)
  formAdd.reset();
  clearValidation(formAdd, validationConfig);
})

formEditAvatar.addEventListener('submit',(evt) => {
  evt.preventDefault();
  setAvatar(formEditAvatar.elements.link.value, profileImage)
})

// @todo: Функция обрабатывающая событие клика по изображению
function renderPopupImage(link, name) {
  openModal(popupTypeImage,handleCloseByClick,handleCloseByEsc)
  popupImage.src = link;
  popupCaption.textContent = name;
};

// @todo: Создать карточку
function renderCard(card, autor) {
  const cardId = createCard(cardTemplate, card, autor, delCard, setLike, deleteLike, renderPopupImage);
  cardList.prepend(cardId);
}

profileImage.addEventListener('click', () => {
  openModal(popupTypeEditAvatar, handleCloseByClick, handleCloseByEsc);
})

// @todo: Открыть форму редактирования
buttonEdit.addEventListener('click',() => {
  openModal(popupTypeEdit, handleCloseByClick, handleCloseByEsc);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
});

// @todo: Открыть форму добавления
buttonAdd.addEventListener('click',() => {
  openModal(popupTypeNewCard, handleCloseByClick, handleCloseByEsc);
});

enableValidation(validationConfig);

getUser(profileTitle, profileDescription, profileImage);

getInitialCards(renderCard)