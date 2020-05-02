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
const cardsSection =document.querySelector('.elements'); 
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
const cardsTemplate = document.querySelector('#elements-template').content;

// функция закрытия/открытия - можно переиспользовать для разных попапов
function openClosePopup(elem) {
    inputName.value = name.textContent;
    inputJob.value = job.textContent;
    elem.classList.toggle('popup_opened');
}

function openImage (imageName, imageLink) {//функция просмотра карточек 
    imageValue.src = imageLink;
    imageValue.alt = imageName;
    imageNameValue.textContent = imageName;
    openClosePopup(viewImage)

}
//card Like function
function cardLike (evt){
    evt.target.classList.toggle('element__like-btn_active');  
}
//card Delete function
function cardDelete (evt){
    evt.target.closest('.element').remove();
}
function createCard(name, link) {
    
    //cloning template content;
    const cardElement = cardsTemplate.cloneNode(true);
    cardElement.querySelector('.element__image').src = link;
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__image').alt = name;
    
    //Like btn listener
    cardElement.querySelector('.element__like-btn').addEventListener('click', cardLike);
    //card DELETE function
    cardElement.querySelector('.element__trash').addEventListener('click', cardDelete);
     
      //card VIEW function
    cardElement.querySelector('.element__image').addEventListener('click', function() { 
        openImage(name, link); //open card view
    });
    return cardElement; 
     //adding cards to the beginning of page
   // cardsSection.prepend(cardElement);
    }

    //функция добавления карточек из массива
    function addCards (initialCards) {
        initialCards.forEach(function (item){
         cardsSection.append(createCard(item.name,item.link));
        });
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

