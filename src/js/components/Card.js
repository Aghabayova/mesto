import {itemCard } from '../utils/constants.js';

export default class Card {
    constructor(data, { cardSelector, handleCardClick }) {//конструктор получает объект, селектор шаблона и управление кликом по карточке
      this._cardSelector = cardSelector;
      this._name = data.name;
      this._link = data.link;
      this._handleCardClick = handleCardClick;
    }
  
    //Клонируем card из шаблона
    _getCardTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector(itemCard.cardSection).cloneNode(true);
      this._cardItem = cardElement;
      return cardElement;
    }
  
    //Генерируем карточку
    generateCard() {
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._cardItem = this._getCardTemplate();
      this._setEventListeners();
      const cardPhoto = this._cardItem.querySelector(itemCard.cardImage);

      // Добавим данные
      cardPhoto.src = this._link;
      this._cardItem.querySelector(itemCard.cardTitle).textContent = this._name;
      cardPhoto.alt = this._name;

      // Вернём элемент наружу
      return this._cardItem;
    }
  
    //Ставим слушатели событий
    _setEventListeners() {
        this._cardItem.querySelector(itemCard.cardLikeBtn).addEventListener('click', () => {
            this._handleCardLike();
        });
        
        this._cardItem.querySelector(itemCard.cardTrash).addEventListener('click', (evt) => {
            this._handleCardDelete(evt);
        });
      
        this._cardItem.querySelector(itemCard.cardImage).addEventListener('click', (evt) => {
            this._handleCardClick(evt);
        });
    }
  
    //управление Кнопкой Лайк
    _handleCardLike() {
        this._cardItem.querySelector(itemCard.cardLikeBtn).classList.toggle(itemCard.cardLikeBtnActive);
    }
  
    //управление удаления карточки
    _handleCardDelete(evt) {
        const cardToDelete = evt.target.closest(itemCard.cardSection);
        this._cardItem.querySelector(itemCard.cardLikeBtn).removeEventListener('click', () => {
            this._handleCardLike();
        });
        
        this._cardItem.querySelector(itemCard.cardTrash).removeEventListener('click', (evt) => {
            this._handleCardDelete(evt);
        });
      
        this._cardItem.querySelector(itemCard.cardImage).removeEventListener('click', (evt) => {
            this._handleCardClick(evt);
        });
        
        cardToDelete.remove();
    }
}
  