
// Profile__edit-button
function editProfile() {
    popupOpened = document.querySelector('.popup');
    popupOpened.classList.remove('popup_opened');

    let ProfileName = document.querySelector('.profile__name');
    let ProfileDescription = document.querySelector('.profile__description');

    let placeholderInput = document.querySelector('.popup__name-field');
    let placeholderJobInput = document.querySelector('.popup__description-field');

    placeholderInput.placeholder = ProfileName.textContent;
    placeholderJobInput.placeholder = ProfileDescription.textContent;
}

/* Add-button
function addPhoto()
*/

// Close button
function closeButton () {
    popupClosed = document.querySelector('.popup');
    popupClosed.classList.add('popup_opened');
}



// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Воспользуйтесь методом querySelector()


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    
    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__name-field');
    // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector('.popup__description-field');
    // Воспользуйтесь инструментом .querySelector()
    
    // Получите значение полей из свойства value
    var Name = nameInput.value;
    var Job = jobInput.value;


    popupClosed = document.querySelector('.popup');
    popupClosed.classList.add('popup_opened');

    
    // Выберите элементы, куда должны быть вставлены значения полей
    let ProfileName = document.querySelector('.profile__name');
    let ProfileDescription = document.querySelector('.profile__description');
   
    // Вставьте новые значения с помощью textContent
    
    if (Name != '') {
        ProfileName.textContent= Name;
        }
        else {
            ProfileName.textContent= ProfileName.textContent;
        } 
    
    if (Job != '') {
        ProfileDescription.textContent = Job;
        }
        else {
            ProfileDescription.textContent = ProfileDescription.textContent;
        }
        
}    

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

