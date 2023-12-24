// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(link, name, evt) {
  const cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__title').textContent = name;
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', evt => deleteCard(evt));
  return cardItem
};

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}; 

function renderCard(link, name) {
  const card = createCard(link, name);
  cardList.prepend(card);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  renderCard(card.link, card.name)
});