// @todo: Экспортируемые функции
export {createCard, deleteCard, likeCard};

// @todo: Функция создания карточки
function createCard(template, link, name, callbackDelete, callbackLike, callbackImage) {
  const cardItem = template.content.cloneNode(true);
  const card = cardItem.querySelector('.card');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardDeleteButton.addEventListener('click', () => callbackDelete(card));
  cardLikeButton.addEventListener('click', (evt) => callbackLike(evt));
  cardImage.addEventListener('click', () => callbackImage(link, name));
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