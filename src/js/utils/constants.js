//массив карточек
export const initialCards = [
];

//Api Token
export const apiData = {
    authorization: '34b93c83-0a5b-42af-bf4b-3169bf836bcd',
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12'
};

//Массив Профиля
export const formProfile = {
    popupEditProfile: '.popup__edit_profile',
    profileAvatarImg: '.profile__avatar',
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileInputName: '.popup__field_name',
    profileInputJob: '.popup__field_job',
    profileEditBtn: '.profile__edit-button',
    profileCloseBtn: '.popup-close-edit',
    profileEdit: '#edit-popup',
    profileAvatar: '#edit-avatar',
    popupFormAvatar: '.popup__avatar',
    popupEditAvatar: '.profile__pencil'
};

//Массив Карточек
export const formCard = {
    popupNewCard: '.popup__new_card',
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
    cardInputUrl: '#url-input',
    popupConfirm: '#delete-popup',
    popupFormDelete: '.popup__delete_card',
    cardTrash: '.card__trash'

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

//Массив Форм
export const formSelectors = {
    popupContent: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-btn',
    submitButtonDisabled: '.popup__save-btn_disabled',
    inputErrorClass: 'popup__field_error',
    inputErrorField: '.popup__field_error',
    spanErrorClassId: '.popup__span-error',
    spanErrorClass: 'popup__span-error',
    spanErrorClassActive: 'popup__span-error_active',
    errorClass: 'popup__span-error_active'
};

//all forms
export const allForms = Array.from(document.querySelectorAll('.popup__content'));