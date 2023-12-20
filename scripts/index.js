// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(link, name) {
  const cardItem = cardTemplate.content.cloneNode(true);
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__title').textContent = name;
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', event => {
    deleteCard(event);
  });
  cardList.append(cardItem);
};
// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest(':not(button)');
  listItem.remove();
}; 

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  addCard(card.link, card.name)
});