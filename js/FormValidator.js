export default class FormValidator {
  constructor(data, formItem){
  this._inputSelector = data.inputSelector; //'.popup__field',
  this._submitButtonSelector = data.submitButtonSelector //'.popup__save-btn',
  this._inactiveButtonClass = data.inactiveButtonClass; //'popup__save-btn_disabled',
  this._inputErrorClass = data.inputErrorClass; //'popup__field_error',
  this._errorClass = data.errorClass; //'popup__span-error_active'
  this._formItem = formItem; //'.popup__form'
};


// Функция, которая добавляет класс с ошибкой
_showError (formInput, errorMessage) {
  // Выбираем элемент ошибки на основе id
  const errorElement = this._formItem.querySelector(`#${formInput.id}-error`);
  //добавлыаем класс с ошибкой
  formInput.classList.add(this._inputErrorClass);
  //подставляем текст с ошибкой параметром errorMessage
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
}


// Функция, которая удаляет класс с ошибкой
_hideError (formInput) {
  const errorElement = this._formItem.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
}


// Функция, которая проверяет валидность поля
_checkInputValidity (formInput) {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    this._showError(formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    this._hideError(formInput);
  }
}


// Функция принимает массив полей
_hasInvalidInput (inputList) {
   // проходим по этому массиву методом some
  return inputList.some((formInput) => {
     // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !formInput.validity.valid;
  });
}


// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
_toggleButtonState (inputList, buttonElement) {
  
    // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
      // иначе сделай кнопку активной
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

//функция установки слушателей
_setEventListeners () {
  // Найдем все поля формы и сделаем из них массив методом Array.from
 const inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
  // Найдем в текущей форме кнопку отправки
 const buttonElement = this._formItem.querySelector(this._submitButtonSelector);
 
 // Обойдем все элементы полученной коллекции
 inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
   formInput.addEventListener('input', () => {
     // Вызовем toggleButtonState и передадим ей массив полей, кнопку и объект
     this._toggleButtonState(inputList, buttonElement);
     // Внутри колбэка вызовем checkInputValidity,
     // передав ей форму, проверяемый элемент и объект
     this._checkInputValidity(formInput);
   });
 });
};

enableValidation() { // функция запускающая процесс валидации
  this._setEventListeners(); // вызываем метод на форму
}
}

