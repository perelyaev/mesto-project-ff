// @todo: Экспортируемые функции
export {createCard, deleteCard, likeCard, imageCard};

// @todo: Функция создания карточки
function createCard(template, link, name, callbackDelete, callbackLike, callbackImage) {
  const cardItem = template.content.cloneNode(true);
  const card = cardItem.querySelector('.card');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__image').alt = name;
  cardItem.querySelector('.card__title').textContent = name;
  cardDeleteButton.addEventListener('click', () => callbackDelete(card));
  cardLikeButton.addEventListener('click', (evt) => callbackLike(evt));
  cardImage.addEventListener('click', (evt) => callbackImage(evt));
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

// @todo: Функция обрабатывающая событие клика по изображению
function imageCard(evt) {
  const img = document.querySelector('.popup__image');
  const caption = document.querySelector('.popup__caption');
  img.src = evt.target.src;
  caption.textContent = evt.target.alt;
};

