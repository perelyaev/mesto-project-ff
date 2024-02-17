import '../pages/index.css';
import {createCard, toggleLike} from './card.js';
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
const buttonSubmit = formEdit.querySelector('.popup__button');

let userId;

function editUser(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  setUser(formEdit.elements.name.value, formEdit.elements.description.value)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
      buttonSubmit.textContent = 'Сохранить';
    });
}

formEdit.addEventListener('submit',(evt) => editUser(evt));

function addCard(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  setCard(formAdd.elements['place-name'].value, formAdd.elements.link.value)
    .then(card => {
      renderCard(card,userId);
      formAdd.reset();
      clearValidation(formAdd, validationConfig);
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
      buttonSubmit.textContent = 'Сохранить';
    });
}

formAdd.addEventListener('submit',(evt) => addCard(evt));

function editAvatar(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  setAvatar(formEditAvatar.elements.link.value)
    .then((user) => {
      profileImage.style.backgroundImage = 'url(' + user.avatar + ')';
      formEditAvatar.reset();
      clearValidation(formEditAvatar, validationConfig);
      closeModal(popupTypeEditAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(()=> {
      buttonSubmit.textContent = 'Сохранить';
    });
}

formEditAvatar.addEventListener('submit',(evt) => editAvatar(evt));

// @todo: Функция обрабатывающая событие клика по изображению
function openImagePopup(link, name) {
  openModal(popupTypeImage)
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
};

function handleOnLike (cardId, buttonLikeElement, isLiked) {
  if (isLiked) {
    deleteLike(cardId)
      .then((result) => {
        toggleLike(buttonLikeElement, isLiked, result.likes.length)
        return false;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    setLike(cardId)
      .then((result) => {
        toggleLike(buttonLikeElement, isLiked, result.likes.length)
        return true
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

function deleteCard (cardId, cardElement) {
  deleteCardRequest(cardId)
    .then((result) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
} 

// @todo: Создать карточку
function renderCard(card, autor) {
  const cardId = createCard(cardTemplate, card, autor, deleteCard, handleOnLike, openImagePopup);
  cardsContainer.append(cardId);
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
    profileImage.style.backgroundImage = 'url(' + user.avatar + ')';
    cards.forEach((card) => {
      renderCard(card, userId);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

setCloseModalOnClickListeners(popups);