import './../pages/index.css';

import FormValidator from '../js/components/FormValidator.js';
import Card from '../js/components/Card.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';

import {
    initialCards,
    formProfile,
    formCard,
    formSelectors,
    allForms
} from '../js/utils/constants.js';



//Создаем Section для карточек
const cardList = new Section({
    data: initialCards.reverse(),
    renderer: (cardItem) => {
        const card = new Card(
            //data
            cardItem,
            {
                //cardSelector
                cardSelector: formCard.cardTemplate,

                //handleCardClick
                handleCardClick: () => {
                    popupWithImage.open(cardItem);
                },
            });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    },
}, formCard.cardSection);

//Создаем Popup для карточек
const popupWithImage = new PopupWithImage(formCard.cardImageView);

//Создаем Popup для новой карточки
const popupWithImageForm = new PopupWithForm(formCard.cardNewItem, {
    handleFormSubmit: (photoData) => {
        const newCard = new Card(photoData, {
            cardSelector: formCard.cardTemplate,
            handleCardClick: () => {
                popupWithImage.open(photoData);
            },
        });

        const newCardElement = newCard.generateCard();
        cardList.addItem(newCardElement);
        popupWithImageForm.close();
    }
});

//Функция Открытия Добaвления новой карточки
const openNewCard = function (formElement) {
    formValidation();
    popupWithImageForm.open(); 
}


//Создаем информацию о пользователе для Профиля
const userInfo = new UserInfo({
    userNameSelector: formProfile.profileName,
    userJobSelector: formProfile.profileDescription,
});

//Открываем Popup Редактирования профиля
const popupWithUserForm = new PopupWithForm(formProfile.profileEdit, {
    handleFormSubmit: (userData) => {
        userInfo.setUserInfo(userData);
        popupWithUserForm.close();
    }
});

//Функция Откытия редактирование профиля
const openUserForm = function (formElement) {
    formElement.querySelector(formProfile.profileInputName).value = userInfo.getUserInfo().name;
    formElement.querySelector(formProfile.profileInputJob).value = userInfo.getUserInfo().job;
    //При открытии попапа делаем валидацию всех инпутов и сбрасываем еrror state
    formValidation();
    popupWithUserForm.open();
}

//Слушаем Popup создания новой карточки
document.querySelector(formCard.cardAddBtn).addEventListener('click', () => {
    const formElement = document.querySelector(formCard.cardNewItem);
    openNewCard(formElement);
});

//Слушаем Popup Редактирования профиля
document.querySelector(formProfile.profileEditBtn).addEventListener('click', () => {
    const formElement = document.querySelector(formProfile.profileEdit);
    openUserForm(formElement);
});


//Генерация карточек из масива
cardList.renderItems();

//Функция валидации форм
function formValidation(){
    //Валидировать все формы
    allForms.forEach((formItem) => {
        const validator = new FormValidator(formSelectors, formItem);
        validator.enableValidation();
    });
}

//Запускаем первоначальную валидацию
formValidation();