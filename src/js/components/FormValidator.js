export default class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = this._formElement.querySelectorAll( '.popup__field');
  }

  // Функция, которая добавляет класс с ошибкой
  _returnErrorElement(inputElement) {
    // Выбираем элемент ошибки на основе id
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  //Показать ошибку в поле ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._returnErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    //подставляем текст с ошибкой параметром errorMessage
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._returnErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Функция, которая проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  //Функция ищет невалидное поле (принимает массив полей)
  _hasInvalidInput(inputList) {
     // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
     // Если поле не валидно, колбэк вернёт true
     // Обход массива прекратится и вся фунцкция
     // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  //Установить состояние кнопки
  _setButtonState(buttonElement, flag) {
    if (flag === true) {
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.disabled = false;
    }
  }

  //Переключить состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    this._setButtonState(buttonElement, this._hasInvalidInput(inputList));
  }

 

  //функция установки слушателей
  _setEventListeners() {
    // Найдем все поля формы и сделаем из них массив методом Array.from
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    // Найдем в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    // Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку 
        this._toggleButtonState(inputList, buttonElement);
         // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму, проверяемый элемент и объект
        this._checkInputValidity(inputElement);
      });
    });
  }

  _setDefaultErrorState() {
    this._inputList.forEach((inputElement) => {
        if (inputElement.matches( '.popup__field_error' )) {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove( 'popup__field_error' );
            errorElement.classList.remove( 'popup__span-error_active' );
            errorElement.textContent = '';
        }
    });
}


  //Объявить функицю валидации
  enableValidation() {

    this._setDefaultErrorState();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
