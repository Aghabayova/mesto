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

let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__field_name');
let inputJob = document.querySelector('.popup__field_job');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close_edit');
let formElement = document.querySelector('#edit-popup-form');
const addBtn = document.querySelector('.add-button');
const popupCloseNewItem = document.querySelector('.popup__close_new-item');
const cardsSection =document.querySelector('.elements'); 
const newCard = document.querySelector('.popup__field_card');
const newCardLink = document.querySelector('popup__field_link');
let formNewElement = document.querySelector('#new-item-form');
const viewCardClose = document.querySelector('.popup-view__close');
const imageValue = document.querySelector('.popup-view__image');
const imageNameValue = document.querySelector('.popup-view__caption');
const createBtn = document.querySelector('#popup-create-btn');
const editSaveBtn = document.querySelector('#popup-save-btn');
//выбираем необходимые попапы по ID
let editPopup = document.querySelector('#edit-popup');
let newItemPopup = document.querySelector('#new-item-popup');
const viewImage = document.querySelector('#view-image');



 



// функция закрытия/открытия - можно переиспользовать для разных попапов
function openClosePopup(elem) {
    
    if(elem.classList.contains('popup_opened')) {
        elem.classList.remove('popup_opened'); 
    }
    else {
        elem.classList.add('popup_opened');
        
        inputName.value = name.textContent;
        inputJob.value = job.textContent;
    } 
}

function openImage (imageName, imageLink) {//функция просмотра карточек 
    imageValue.src = imageLink;
    imageValue.alt = imageName;
    imageNameValue.textContent = imageName;
    viewImage.classList.add('popup_opened');
}

function createCard(name, link) {
    //calling template for cards
    const cardsTemplate = document.querySelector('#elements-template').content;
    //cloning template content;
    const cardElement = cardsTemplate.cloneNode(true);
    cardElement.querySelector('.elements__image').src = link;
    cardElement.querySelector('.elements__title').textContent = name;
    cardElement.querySelector('.elements__image').alt = name;
    
    //card LIKE function
    cardElement.querySelector('.elements__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-btn_active');  
      })
    //card DELETE function
    cardElement.querySelector('.elements__trash').addEventListener('click', function(evt){
      evt.target.parentElement.classList.add('elements_image-delete');
    })
      //card VIEW function
    cardElement.querySelector('.elements__image').addEventListener('click', function() { 
        openImage(name, link);
    });
     //adding cards to the end of array 
    cardsSection.append(cardElement);
    }
   
    initialCards.forEach(function (item){
        createCard(item.name,item.link)
     });
    


// Обработчик «отправки» формы, пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    popup.classList.remove('popup_opened');
 
    if (inputName.value != '') {
        name.textContent= inputName.value;
        }
        else {
            name.textContent= name.textContent;
        } 
    
    if (inputJob.value != '') {
        job.textContent = inputJob.value;
        }
        else {
            job.textContent = job.textContent;
        }

}


function formSubmitCard (evt){
    evt.preventDefault(); //отменяет стандартную отправку формы.

    cardsSection.prepend(createCard(newCard.value, newCardLink.value));// adding new image to the beginning of array

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

editSaveBtn.addEventListener('click', () => 
openClosePopup(editPopup)); // закрываем при нажатии кнопки "сохранить"

createBtn.addEventListener('click', () => 
openClosePopup(newItemPopup)); // закрываем попап при нажатии кнопки "создать"


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

formNewElement.addEventListener('submit', formSubmitCard);

