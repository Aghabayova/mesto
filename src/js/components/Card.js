
export default class Card {
    constructor(data, { cardSelector, handleCardClick, handleCardLike, handleCardDelete }, userID) {//конструктор получает объект, селектор шаблона, управление кликом по карточке, лайку, кнопке удаления, а также ID пользователя. 
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._author = data.owner;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = userID;
        this._owner = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
        this._clickLike = () => {
            this._handleCardLike({
                id: this._id,
                like: this._cardItem.querySelector('.card__like-btn').classList.contains('card__like-btn_active'),
                likeSum: this._cardItem.querySelector('.card__like-counter')
            });
        };
    }

    //Клонируем card из шаблона
    _getCardTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        this._cardItem = cardElement;
        return cardElement;
    }

    //Likes
    _generateLikes() {
        this._cardItem.querySelector('.card__like-counter').textContent = `${this._likes.length}`;
        if (this._likes.find((like) => like._userId === this._userId)) {
            this._cardItem.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
        }
    }

    //Генерируем карточку
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._cardItem = this._getCardTemplate();
        this._setEventListeners();
        const cardPhoto = this._cardItem.querySelector('.card__image');

        if (this._author._id !== this._userId) {
            this._cardItem.querySelector('.card__trash').style.display = 'none';
        }

        this._generateLikes();

        //Активируем фунцию проверки лайков
        this._likeCardOwner(this._id);

        //убираем со страницы нулевые лайки
        if (this._likes.length === 0) {
            this._cardItem.querySelector('.card__like-counter').style.display = 'none';
        }

        // Добавим данные
        cardPhoto.src = this._link;
        this._cardItem.querySelector('.card__title').textContent = this._name;
        cardPhoto.alt = this._name;

        // Вернём элемент наружу
        return this._cardItem;
    }

    //Функция Автора карточки
    _likeCardOwner(_id) {
        if (this._likes.some((user) =>
            (user._id === this._userId))) {
            this._cardItem.querySelector('.card__like-btn').classList.add('card__like-btn_active');
        }
    }

    //Ставим Лайк
    cardLike(sum) { //функция лайков
        this._cardItem.querySelector(".card__like-btn").classList.toggle("card__like-btn_active");
       
            this._cardItem.querySelector('.card__like-counter').style.display = 'block';
            this._cardItem.querySelector('.card__like-counter').textContent = sum;
        
    }

    cardDelete() {
        this._cardItem.remove();
        this._cardItem = null;
    }

    //Ставим слушатели событий
    _setEventListeners() {

        this._cardItem.querySelector(".card__like-btn").addEventListener("click", () => {
            this._clickLike();
        });

        this._cardItem.querySelector(".card__trash").addEventListener("click", () => {
            this._handleCardDelete();
        });

        this._cardItem.querySelector('.card__image').addEventListener('click', (evt) => {
            this._handleCardClick();
        });
    }

    //управление Кнопкой Лайк
    //handleCardLike(amount) {
    //     this._cardItem.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
    //     this._cardItem.querySelector('.card__like-counter').textContent = amount;
    // }

}
