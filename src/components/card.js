// @todo: Экспортируемые функции
export {createCard, deleteCard, likeCard};

// @todo: Функция создания карточки
function createCard(template, card, autor, callbackDelete, callbackSetLike, callbackDeleteLike, callbackImage) {
  const cardItem = template.content.cloneNode(true);
  const cardSelector = cardItem.querySelector('.card');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardSelector.id = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikeButton.textContent = card.likes.length;
  cardTitle.textContent = card.name;
  if (autor != card.owner._id) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.hidden = true;
  }
  card.likes.forEach((like) => {
    if (autor === like._id) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  })
  cardDeleteButton.addEventListener('click', () => callbackDelete(cardSelector.id));
  cardLikeButton.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      callbackDeleteLike(evt, cardSelector.id);
    } else {
      callbackSetLike(evt, cardSelector.id);
    }
  });
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