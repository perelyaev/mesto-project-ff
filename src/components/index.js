import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal, handleCloseByClick, handleCloseByEsc} from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEdit = document.forms.namedItem('edit-profile');
const formAdd = document.forms.namedItem('new-place');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  profileTitle.textContent = formEdit.elements.name.value;
  profileDescription.textContent = formEdit.elements.description.value;
});

formAdd.addEventListener('submit',(evt) => {
  evt.preventDefault();
  renderCard(formAdd.elements.link.value, formAdd.elements.namedItem('place-name').value)
  formAdd.reset();
})

// @todo: Функция обрабатывающая событие клика по изображению
function renderPopupImage(link, name) {
  openModal(popupTypeImage,handleCloseByClick,handleCloseByEsc)
  popupImage.src = link;
  popupCaption.textContent = name;
};

// @todo: Создать карточку
function renderCard(link, name) {
  const card = createCard(cardTemplate, link, name, deleteCard, likeCard, renderPopupImage);
  cardList.prepend(card);
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  renderCard(card.link, card.name)
});

// @todo: Открыть форму редактирования
buttonEdit.addEventListener('click',() => {
  openModal(popupTypeEdit, handleCloseByClick, handleCloseByEsc);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
});

// @todo: Открыть форму добавления
buttonAdd.addEventListener('click',() => {
  openModal(popupTypeNewCard, handleCloseByClick, handleCloseByEsc);
});