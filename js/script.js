
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__field_name');
let inputJob = document.querySelector('.popup__field_job');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');

//Функции открытия/закрытия попапа
function openClosePopup(){
        if(popup.classList.contains('popup_opened')) {
            popup.classList.remove('popup_opened');
            
        }
        else {
            popup.classList.add('popup_opened');
            inputName.value = name.textContent;
            inputJob.value = job.textContent;
        }
        

}
profileEditBtn.addEventListener('click', openClosePopup);    
popupClose.addEventListener('click', openClosePopup);
    
    

// Обработчик «отправки» формы, хотя пока
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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



