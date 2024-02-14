import '../pages/index.css';
import {createCard, likeCard} from './card.js';
import {openModal, closeModal, handleCloseByClick, handleCloseByEsc, setCloseModalOnClickListeners} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getInitialCards, getUser, setUser, setCard, deleteCardRequest, setLike, deleteLike, setAvatar} from './api.js';

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
const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup')
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// const formAdd = document.querySelector('.new-place');
// const inputNameFormAdd = formAdd.querySelector('popup__input_type_card-name');
// const inputLinkFormAdd = formAdd.querySelector('popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formAdd = document.forms.namedItem('new-place');
const formEdit = document.forms.namedItem('edit-profile');
const formEditAvatar = document.forms.namedItem('edit-avatar');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

let userId;

formEdit.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const buttonSubmit = formEdit.querySelector('.popup__button');
  buttonSubmit.textContent = 'Сохранение...';
  setUser(formEdit.elements.name, formEdit.elements.description)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
      buttonSubmit.textContent = 'Сохранить';
    });
});

formAdd.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const buttonSubmit = formAdd.querySelector('.popup__button');
  buttonSubmit.textContent = 'Сохранение...';
  setCard(formAdd.elements['place-name'].value, formAdd.elements.link.value)
    .then(card => {
      renderCard(card,userId)
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
      buttonSubmit.textContent = 'Сохранить';
      formAdd.reset();
      clearValidation(formAdd, validationConfig);
    });
    
})

formEditAvatar.addEventListener('submit',(evt) => {
  evt.preventDefault();
  const buttonSubmit = formEditAvatar.querySelector('.popup__button');
  buttonSubmit.textContent = 'Сохранение...';
  setAvatar(formEditAvatar.elements.link.value)
    .then((user) => {
      profileImage.style.cssText = 'background-image: url(' + user.avatar + ')';
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
      buttonSubmit.textContent = 'Сохранить';
      formEditAvatar.reset();
      clearValidation(formEditAvatar, validationConfig);
    });
})

// @todo: Функция обрабатывающая событие клика по изображению
function openImagePopup(link, name) {
  openModal(popupTypeImage)
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
};

function handleOnLike (cardId, buttonLikeElement) {
  if (buttonLikeElement.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((result) => {
        buttonLikeElement.classList.remove('card__like-button_is-active');
        buttonLikeElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    setLike(cardId)
      .then((result) => {
        buttonLikeElement.classList.add('card__like-button_is-active');
        buttonLikeElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

function deleteCard (cardId, cardElement) {
  deleteCardRequest(cardId);
  cardElement.remove();
} 

// @todo: Создать карточку
function renderCard(card, autor) {
  const cardId = createCard(cardTemplate, card, autor, deleteCard, handleOnLike, openImagePopup);
  cardsContainer.prepend(cardId);
}

profileImage.addEventListener('click', () => {
  openModal(popupTypeEditAvatar);
})

// @todo: Открыть форму редактирования
buttonEdit.addEventListener('click',() => {
  openModal(popupTypeEdit);
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
});

// @todo: Открыть форму добавления
buttonAdd.addEventListener('click',() => {
  openModal(popupTypeNewCard);
});

enableValidation(validationConfig);

Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.cssText = 'background-image: url(' + user.avatar + ')';
    cards.forEach((card) => {
      renderCard(card, userId);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

setCloseModalOnClickListeners(popups);