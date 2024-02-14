import { deleteLike } from "./api";

// @todo: Экспортируемые функции
export {createCard, deleteCard, likeCard};

// @todo: Функция создания карточки
function createCard(template, card, autor, callbackDelete, onLikeCard, callbackImage) {
  const cardItem = template.content.cloneNode(true);
  const cardElement = cardItem.querySelector('.card');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikeButton.textContent = card.likes.length;
  cardTitle.textContent = card.name;
  if (autor != card.owner._id) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.hidden = true;
  }
  const isLiked = card.likes.some((like) => {
    return autor === like._id;
  })
  if (isLiked) {
    // устанавливаем класс для кнопки
    cardLikeButton.classList.add('card__like-button_is-active');
  }  
  cardDeleteButton.addEventListener('click', () => callbackDelete(card._id, cardElement));
  cardLikeButton.addEventListener('click', () => onLikeCard(card._id, cardLikeButton))
  cardImage.addEventListener('click', () => callbackImage(card.link, card.name));
  return cardItem;
};

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
};

// @todo: Функция обрабатывающая событие лайка
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.remove('card__like-button_is-active');
  } else {
    evt.target.classList.add('card__like-button_is-active');
  };
};

