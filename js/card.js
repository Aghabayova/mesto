import {viewImage, openClosePopup, imageValue, imageNameValue} from './index.js';

export class Card {
    constructor(data, cardSelector) { //конструктор получает объект и селектор шаблона
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector; //записали селектор в приватное поле
    }
    _getTemplate() {
        //calling template for cards
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

        return cardElement;
    }
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners(); // добавим обработчики
        const cardImage = this._element.querySelector('.card__image');

        // Добавим данные
        cardImage.src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;
        cardImage.alt = this._name;

        // Вернём элемент наружу
        return this._element;
    }

  //card Like function
    _cardLike(evt) {
        evt.target.classList.toggle('card__like-btn_active');
    }

    //функция просмотра карточек 
    _openImage(evt){
        imageValue.src = this._link;
        imageValue.alt = this._name;
        imageNameValue.textContent = this._name;
        openClosePopup(viewImage) 
    }

    //card Delete function
    _cardDelete(evt){
        //before deleting card removing eventListeners for like btn, delete btn and image viewing 
        const removeCard = evt.target.closest('.card');

        const buttonLike = removeCard.querySelector('.card__like-btn');
        buttonLike.removeEventListener('click', this._cardLike);

        const buttonTrash = removeCard.querySelector('.card__trash');
        buttonTrash.removeEventListener('click', this._cardDelete);

        const imageView = removeCard.querySelector('.card__image');
        imageView.removeEventListener('click', this._openImage);

        //deleting card
        removeCard.remove();

    }

    // eventListeners for buttons Like, Delete, ImageView
    _setEventListeners() {
        this._element.querySelector('.card__like-btn').addEventListener('click', (evt) => {
            this._cardLike(evt);
        });
        this._element.querySelector('.card__trash').addEventListener('click', (evt) => {
            this._cardDelete(evt);
        });
        this._element.querySelector('.card__image').addEventListener('click', (evt) => {
            this._openImage(evt);
        });
    }

}