const initialCards = [ //массив карточек
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__field_name');
const inputJob = document.querySelector('.popup__field_job');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('#popup-close-edit');
const formElement = document.querySelector('#edit-popup-form');
const addBtn = document.querySelector('.add-button');
const popupCloseNewItem = document.querySelector('#popup-close-new-item');
const cardsSection =document.querySelector('.cards'); 
const newCard = document.querySelector('.popup__field_card');
const newCardLink = document.querySelector('.popup__field_link');
const formNewElement = document.querySelector('#new-item-form');
const viewCardClose = document.querySelector('#close-view');
const imageValue = document.querySelector('.popup__image');
const imageNameValue = document.querySelector('.popup__caption');

//выбираем необходимые попапы по ID
const editPopup = document.querySelector('#edit-popup');
const newItemPopup = document.querySelector('#new-item-popup');
const viewImage = document.querySelector('#view-image');
 
//calling template for cards
const cardsTemplate = document.querySelector('#cards-template').content;

//remove of eventListeners


// функция закрытия/открытия - можно переиспользовать для разных попапов
function openClosePopup(elem) {
    
    //Если данный попап editPopup добовляем input дефаулт значения
    if( (elem === editPopup) && (!elem.classList.contains('popup_opened')) ) {
        inputName.value = name.textContent;
        inputJob.value = job.textContent;
    }
    elem.classList.toggle('popup_opened');
}

//функция просмотра карточек 
function openImage (evt) {
    imageValue.src = evt.target.src;
    imageValue.alt = evt.target.alt;
    imageNameValue.textContent = evt.target.alt;
    openClosePopup(viewImage)
}

//card Like function
function cardLike (evt){
    evt.target.classList.toggle('card__like-btn_active');  
}
//card Delete function
function cardDelete (evt){
    //before deleting card removing eventListeners for like btn, delete btn and image viewing 
    
    const removeCard = evt.target.closest('.card');

    const buttonLike = removeCard.querySelector('.card__like-btn'); 
    buttonLike.removeEventListener('click',cardLike); 

    const buttonTrash = removeCard.querySelector('.card__trash');
    buttonTrash.removeEventListener('click',cardDelete);

    const imageView = removeCard.querySelector('.card__image');
    imageView.removeEventListener('click',openImage);

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
function addCards (initialCards) {
    initialCards.forEach(function (item){
    cardsSection.append(createCard(item.name,item.link));
    }); //adding cards from array
}
     
   

// Обработчик «отправки» формы, пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    if( (inputName.value !== "") && (inputJob.value !== '') )   {
        name.textContent = inputName.value;
        job.textContent = inputJob.value;
    }

    openClosePopup(editPopup);
}


function formSubmitCard (evt){
    evt.preventDefault(); //отменяет стандартную отправку формы.

    //adding new image to the beginning of array
    cardsSection.prepend(createCard(newCard.value, newCardLink.value));
    newCard.value = ''; //обнуляем
    newCardLink.value = ''; //значения форм

    openClosePopup(newItemPopup);
}


profileEditBtn.addEventListener('click', () => 
    openClosePopup(editPopup)); // открываем попап редактирования

popupClose.addEventListener('click',() =>
    openClosePopup(editPopup)); //закрываем

addBtn.addEventListener('click', () =>
    openClosePopup(newItemPopup)); // открываем попап добавления

popupCloseNewItem.addEventListener('click',() =>
    openClosePopup(newItemPopup)); //закрываем
  
viewCardClose.addEventListener('click', () => 
    openClosePopup(viewImage)); // закрываем попап просмотра



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

formNewElement.addEventListener('submit', formSubmitCard);
addCards (initialCards);

