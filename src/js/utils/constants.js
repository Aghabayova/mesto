//массив карточек
export const initialCards = [
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

//Массив Профиля
export const formProfile = {
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileInputName: '.popup__field_name',
    profileInputJob: '.popup__field_job',
    profileEditBtn: '.profile__edit-button',
    profileCloseBtn: '.popup-close-edit',
    profileEdit: '#edit-popup',
};

//Массив Карточек
export const formCard = {
    cardAddBtn: '.add-button',
    cartdloseNew: '#popup-close-new-item',
    cardSection: '.cards',
    cardNewItem: '#new-item-popup',
    cardNew: '.popup__field_card',
    cardNewLink: '.popup__field_link',
    cardClose: '#close-view',
    cardTemplate: '#cards-template',
    cardImageView: '#view-image',
    cardInpuTitle: '#title-input',
    cardInputUrl: '#url-input'
};

//Массив Структуры Карточек
export const itemCard = {
    cardSection: '.card',
    cardImage: '.card__image',
    cardTitle: '.card__title',
    cardLikeBtn: '.card__like-btn',
    cardLikeBtnActive: 'card__like-btn_active',
    cardTrash: '.card__trash'
};

//Массив Структуры Popup
export const itemPopup = {
    popupForm: '.popup__form',
    popupSection: '.popup',
    popupOpened: 'popup_opened',
    popupClose: '.popup__close',
    popupImage: '.popup__image',
    popupImageCaption: '.popup__caption'
};

//Массив Форм
export const formSelectors = {
    popupContent: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-btn',
    inputErrorClass: 'popup__field_error',
    inputErrorField: '.popup__field_error',
    spanErrorClassId: '.popup__span-error',
    spanErrorClass: 'popup__span-error',
    spanErrorClassActive: 'popup__span-error_active',
    errorClass: 'popup__span-error_active'
};

//all forms
export const allForms = Array.from(document.querySelectorAll('.popup__content'));