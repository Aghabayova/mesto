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
const imageValue = document.querySelector('.popup__image');
const imageNameValue = document.querySelector('.popup__caption');
const formEdit = document.forms.edit;
const formNew = document.forms.new;

//выбираем необходимые попапы по ID
const editPopup = document.querySelector('#edit-popup');
const newItemPopup = document.querySelector('#new-item-popup');
const viewImage = document.querySelector('#view-image');

//задаем массив для определения всех полей форм 
const formInput = Array.from(document.querySelectorAll('.popup__field'));
//задаем массив для определения всех ошибок
const spanError = Array.from(document.querySelectorAll('.popup__span-error'));

//calling template for cards
const cardsTemplate = document.querySelector('#cards-template').content;



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
function resetNewCardForm() {//очищаем инпуты в форме карточек
    newCard.value = ''; //обнуляем
    newCardLink.value = ''; //значения форм
};
//функция по нажатию на кнопку Escape
function handleEscapeKey(elem){
    document.addEventListener('keydown', function(evt){
        if (evt.key === 'Escape') {
            openClosePopup(elem);
        }
    });
}

//добавляем слушатель на клик по оверлею
function overlayClick (elem){
    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            resetNewCardForm();
            openClosePopup(elem);
        }
    });
}


// функция закрытия/открытия - можно переиспользовать для разных попапов
function openClosePopup(elem) {
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
    if(isOpenPopup) {
        overlayClick(elem);
        handleEscapeKey(elem);
    }//при закрытии попапа удаляем слушатель
    else {
        elem.removeEventListener('keydown', handleEscapeKey(elem));
    }
    
    elem.classList.toggle('popup_opened');
    
}


//функция просмотра карточек 
function openImage(evt) {
    imageValue.src = evt.target.src;
    imageValue.alt = evt.target.alt;
    imageNameValue.textContent = evt.target.alt;
    openClosePopup(viewImage)
}

//card Like function
function cardLike(evt) {
    evt.target.classList.toggle('card__like-btn_active');
}

//card Delete function
function cardDelete(evt) {
    //before deleting card removing eventListeners for like btn, delete btn and image viewing 

    const removeCard = evt.target.closest('.card');

    const buttonLike = removeCard.querySelector('.card__like-btn');
    buttonLike.removeEventListener('click', cardLike);

    const buttonTrash = removeCard.querySelector('.card__trash');
    buttonTrash.removeEventListener('click', cardDelete);

    const imageView = removeCard.querySelector('.card__image');
    imageView.removeEventListener('click', openImage);

    //deleting card
    removeCard.remove();

}


function createCard(name, link) {
    //cloning template content;

    const cardElement = cardsTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardImage.alt = name;

    // Like and Delete buttons
    const buttonLike = cardElement.querySelector('.card__like-btn');
    const buttonTrash = cardElement.querySelector('.card__trash');
    const imageView = cardImage;

    // eventListeners for buttons
    buttonLike.addEventListener('click', cardLike);
    buttonTrash.addEventListener('click', cardDelete);
    imageView.addEventListener('click', openImage);

    return cardElement;
}


//функция добавления карточек из массива
function addCards(initialCards) {
    initialCards.forEach(function (item) {
        cardsSection.append(createCard(item.name, item.link));
    }); //adding cards from array
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

    //adding new image to the beginning of array
    cardsSection.prepend(createCard(newCard.value, newCardLink.value));
    openClosePopup(newItemPopup);
    
    const buttonElement = newItemPopup.querySelector('.popup__save-btn');
    buttonElement.classList.add('popup__save-btn_disabled');
    buttonElement.setAttribute('disabled', 'true');

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

