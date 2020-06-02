import {Card} from './card.js';
import FormValidator from './validate.js';


const initialCards = [ //массив карточек
    {
        name: 'Баку',
        link: 'https://images.unsplash.com/photo-1539707437856-00c96b325eab?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
        name: 'Прага',
        link: 'https://images.unsplash.com/photo-1503410781609-75b1d892dd28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
        name: 'Гамбург',
        link: 'https://i.ytimg.com/vi/guEG3AX4Uww/maxresdefault.jpg'
    },
    {
        name: 'Орландо',
        link: 'https://images.unsplash.com/photo-1567650450376-f8a68db2cabb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    {
        name: 'Гамбург',
        link: 'https://images.unsplash.com/photo-1547623641-82fbb83476e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    {
        name: 'Баку',
        link: 'https://i1.wp.com/eti.uk.com/wp-content/uploads/2016/09/baku.jpg?resize=800%2C400&ssl=1'
    },

];

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__field_name');
const inputJob = document.querySelector('.popup__field_job');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('#popup-close-edit');
//const formElement = document.querySelector('#edit-popup-form');
const addBtn = document.querySelector('.add-button');
const popupCloseNewItem = document.querySelector('#popup-close-new-item');
const cardsSection = document.querySelector('.cards');
const newCard = document.querySelector('.popup__field_card');
const newCardLink = document.querySelector('.popup__field_link');
//const formNewElement = document.querySelector('#new-item-form');
const viewCardClose = document.querySelector('#close-view');
export const imageValue = document.querySelector('.popup__image');
export const imageNameValue = document.querySelector('.popup__caption');
const formEdit = document.forms.edit;
const formNew = document.forms.new;

//выбираем необходимые попапы по ID
const editPopup = document.querySelector('#edit-popup');
const newItemPopup = document.querySelector('#new-item-popup');
export const viewImage = document.querySelector('#view-image');

//задаем массив для определения всех полей форм 
const formInput = Array.from(document.querySelectorAll('.popup__field'));
//задаем массив для определения всех ошибок
const spanError = Array.from(document.querySelectorAll('.popup__span-error'));

function clearError(elem) {
    console.log(elem);
    formInput.forEach((input) => {
        input.classList.remove('popup__field_error');
    })
    spanError.forEach((span) => {
        span.classList.remove('popup__error_active');
        span.textContent = '';
    });
};

function resetNewCardForm() { //очищаем инпуты в форме карточек
    newCard.value = ''; //обнуляем
    newCardLink.value = ''; //значения форм
};
//функция по нажатию на кнопку Escape
function handleEscapeKey(evt) {
    const popupOpen = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        openClosePopup(popupOpen);
        resetNewCardForm();
    };
};

//добавляем слушатель на клик по оверлею
function overlayClick(evt) {
    const popupOpen = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup')) {
        openClosePopup(popupOpen);
        resetNewCardForm();
    }
}


// функция закрытия/открытия - можно переиспользовать для разных попапов
export function openClosePopup(elem) {
    //проверяем открыт ли попап
    const isOpenPopup = elem.classList.contains('popup_opened');

    //Если данный попап editPopup добавляем input дефаулт значения и обнуляем ошибки
    if ((elem === editPopup) && (!isOpenPopup)) {
        inputName.value = name.textContent;
        inputJob.value = job.textContent;
        clearError(editPopup);
    }
    //Если данный попап newItemPopup обнуляем значения и ошибки
    if ((elem === newItemPopup) && (!isOpenPopup)) {
        resetNewCardForm();
        clearError(newItemPopup);
    }

    //Если попап открыт срабатывают функции добавления слушателей 
    //на кнопку Escape и на клик по оверлею

    if (!isOpenPopup) {
        document.addEventListener('keydown', handleEscapeKey);
        document.addEventListener('click', overlayClick);
    } //при закрытии попапа удаляем слушатель
    else {
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', overlayClick);
    }

    elem.classList.toggle('popup_opened');

}

//функция добавления карточек из массива
function addCards(initialCards){
initialCards.forEach((item) => {
    const card = new Card(item, '#cards-template');
    const cardElement = card.generateCard();

    //добавлыаем в DOM
    document.querySelector('.cards').append(cardElement);
});
}


// Обработчик «отправки» формы, пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    name.textContent = inputName.value;
    job.textContent = inputJob.value;

    openClosePopup(editPopup);
}


function formSubmitCard(evt) {
    evt.preventDefault(); //отменяет стандартную отправку формы.
    const newItem = {};
    newItem.link = newCardLink.value;
    newItem.name = newCard.value;
    const card = new Card (newItem, '#cards-template')
    //adding new image to the beginning of array
    cardsSection.prepend(card.generateCard());
    openClosePopup(newItemPopup);

    const buttonElement = newItemPopup.querySelector('.popup__save-btn');
    buttonElement.classList.add('popup__save-btn_disabled');
    buttonElement.setAttribute('disabled', 'true');
}

//функция валидации
function formValidation () {
    // Найдем все формы и сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    //Обойдем весь полученный массив и передаем ему обработчик с параметром form
    formList.forEach((form) => {
      //array of objects
    const validationObject = new FormValidator({
        inputSelector: '.popup__field',
        submitButtonSelector: '.popup__save-btn',
        inactiveButtonClass: 'popup__save-btn_disabled',
        inputErrorClass: 'popup__field_error',
        errorClass: 'popup__span-error_active'
    }, form);
    validationObject.enableValidation();
    });
  }
  
profileEditBtn.addEventListener('click', () =>
    openClosePopup(editPopup)); // открываем попап редактирования

popupClose.addEventListener('click', () =>
    openClosePopup(editPopup)); //закрываем

addBtn.addEventListener('click', () =>
    openClosePopup(newItemPopup)); // открываем попап добавления

popupCloseNewItem.addEventListener('click', () =>
    openClosePopup(newItemPopup)); //закрываем

viewCardClose.addEventListener('click', () =>
    openClosePopup(viewImage)); // закрываем попап просмотра

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler);

formNew.addEventListener('submit', formSubmitCard);
addCards(initialCards);
formValidation();

