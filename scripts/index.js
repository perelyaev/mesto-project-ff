// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(link, name, callback) {
  const cardItem = cardTemplate.content.cloneNode(true);
  const card = cardItem.querySelector('.card');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__title').textContent = name;
  cardDeleteButton.addEventListener('click', () => callback(card));
  return cardItem
};

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}; 

function renderCard(link, name) {
  const card = createCard(link, name, deleteCard);
  cardList.prepend(card);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  renderCard(card.link, card.name)
});