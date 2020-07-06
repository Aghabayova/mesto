import './../pages/index.css';

import Api from '../js/components/Api.js';
import FormValidator from '../js/components/FormValidator.js';
import Card from '../js/components/Card.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';

import {
    formProfile,
    formCard,
    initialCards,
    formSelectors,
    apiData,
} from '../js/utils/constants.js';


//создаем экземпляр класса Api
const api = new Api({
    baseUrl: apiData.baseUrl,
    headers: {
        authorization: apiData.authorization,
        'Content-Type': 'application/json'
    }
});

//Функция валидации форм
const popupProfileValidation = new FormValidator(formProfile.popupEditProfile, formSelectors);
popupProfileValidation.enableValidation();

const popupImgValidation = new FormValidator(formCard.popupNewCard, formSelectors);
popupImgValidation.enableValidation();

const popupAvatarValidation = new FormValidator(formProfile.popupFormAvatar, formSelectors);
popupAvatarValidation.enableValidation();

//Функция UX Загрузка данных
const showLoading = (loadingStatus, form, defaultBtnText, loadingText) => {  
    const currentForm = document.querySelector(form);
    const selectedBtn = currentForm.querySelector(formSelectors.submitButtonSelector);
  
    if(loadingStatus) {
        selectedBtn.textContent = loadingText;
    } else {
        selectedBtn.textContent = defaultBtnText;
    }
}

//Сохраняем все карточки в обьекты
const cardsObject = (object, className) => {
    itemsCard = {
        object: object,
        class: className
    };
};

//карточка
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
                handleCardLike: (cardObject) => {
                    if (cardObject.like) {
                        deleteLike(cardItem);
                    } else {
                        addLike(cardItem);
                    }
                    cardsObject(cardItem, card);
                },
                handleCardDelete: () => {
                  deleteCardConfirm.open();
                  cardsObject(cardItem, card);
                }
                
            },
            userInfo.getUserId()
            
            );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    },
}, formCard.cardSection);


//Генерация карточек из масива
api.getInitialCards()
.then((data) => {
    cardList.renderItems(data);
})
.catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`));

//Фукция постановки лайков
let itemsCard;
const addLike = (data) => {
    api.addLike(data)
    .then((result) => {
        itemsCard.class.cardLike(result.likes.length);
    })
    .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`));
};
//Фукция удаления лайков
const deleteLike = (data) => {
    api.deleteLike(data)
    .then((result) => {
        itemsCard.class.cardLike(result.likes.length);
    })
    .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`));
} 

//Создаем Popup подтверждения удаления
const deleteCardConfirm = new PopupWithForm(formCard.popupСonfirm, {
    handleFormSubmit: () => {
        api.deleteCard(itemsCard.object)
        .then((result) => {
            itemsCard.class.cardDelete();
            deleteCardConfirm.close();
        })
        .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`));
    }
});



//Создаем Popup для просмотра карточек
const popupWithImage = new PopupWithImage(formCard.cardImageView);

//Создаем Popup для создания новой карточки
const popupWithImageForm = new PopupWithForm(formCard.cardNewItem, {
    handleFormSubmit: (photoData) => {
        
        showLoading(true, formCard.cardNewItem,'Создать', 'Создание...');
        
        api.addNewCard(photoData)
                .then((photoData) => { 

                    const newCard = new Card(
                        photoData, 
                        {
                            cardSelector: formCard.cardTemplate,
                            handleCardClick: () => {
                                popupWithImage.open(photoData);
                            },
                            handleCardLike: (cardObject) => {
                                if (cardObject.like) {
                                    deleteLike(photoData);
                                } else {
                                    addLike(photoData);
                                }
                                cardsObject(photoData, newCard);
                            },
                            handleCardDelete: () => {
                              deleteCardConfirm.open();
                              cardsObject(photoData, newCard);
                            }
                            
                        },
                        userInfo.getUserId()
                    );

                    const newCardElement = newCard.generateCard();
                    cardList.addItem(newCardElement);
                    popupWithImageForm.close();

                })
                .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`))
                .finally(() => {
                    showLoading(false, formCard.cardNewItem,'Создать', 'Создание...');
                });
    }
});

//Функция открытия Popup для создания новой карточки
const openNewCard = function (formElement) {
    popupImgValidation.errorDefaultState();
    popupWithImageForm.open(); 
}

//Создаем Popup для редактирования Аватара
const popupAvatarForm = new PopupWithForm(formProfile.profileAvatar, {
    handleFormSubmit: (userData) => {
        //Активируем Лоадинг
        showLoading(true, formProfile.profileAvatar,'Сохранить', 'Сохранение...');

        api.editUserAvatar(userData)
        .then((userData) => {
            userInfo.setAvatarLink(userData);
        })
        .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`))
        .finally(() => {
            //Активируем Лоадинг
            //Проверка работы UX Лоадинга
            setTimeout(() => {  
                showLoading(false, formProfile.profileAvatar,'Сохранить', 'Сохранение...');
                popupAvatarForm.close();
            }, 5000);
        });
        
    },
});

//Функция открытия Popup для изменения Аватара
const openEditAvatar = function (formElement) {
    popupAvatarValidation.errorDefaultState();
    popupAvatarForm.open(); 
}


//Создаем информацию о пользователе для Профиля
const userInfo = new UserInfo({
    userNameSelector: formProfile.profileName,
    userJobSelector: formProfile.profileDescription,
    userAvatarSelector: formProfile.profileAvatarImg
});

//Получаем удаленыйе данные профиля с сервера
api.getUserInfo()
    .then(userData => userInfo.setUserInfo(userData))
    .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`));


//Создаем Popup для редактирования профиля
const popupWithUserForm = new PopupWithForm(formProfile.profileEdit, {
    handleFormSubmit: (userData) => {
        showLoading(true, formProfile.profileEdit,'Сохранить', 'Сохранение...');
        api.editUserInfo(userData)
        .then((userData) => {
            userInfo.setUserInfo(userData);
        })
        .catch((err) => console.log(`Ошибка, попробуйте еще: ${err}`))
        .finally(() => {
            popupWithUserForm.close();
            showLoading(false, formProfile.profileEdit,'Сохранить', 'Сохранение...');
        });
    },
});

//Функция открытия редактирования профиля
const openUserForm = function (formElement) {
    formElement.querySelector(formProfile.profileInputName).value = userInfo.getUserInfo().name;
    formElement.querySelector(formProfile.profileInputJob).value = userInfo.getUserInfo().about;
    //При открытии попапа делаем валидацию всех инпутов и сбрасываем еrror state
    popupProfileValidation.errorDefaultState();
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

//Слушаем Popup Редактирования Аватара
document.querySelector(formProfile.popupEditAvatar).addEventListener('click', () => {
    const formElement = document.querySelector(formProfile.profileAvatar);
    openEditAvatar(formElement);
});





