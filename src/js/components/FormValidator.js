export default class FormValidator {
  constructor(formElement, formSelectors) {
    this._formElement = document.querySelector(formElement);
    this._formSelectors = formSelectors;
    this._inputElements = Array.from(this._formElement.querySelectorAll(formSelectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(formSelectors.submitButtonSelector);
  }
  //Показываем ошибки и их текст
  _showInputError(inputElement, errorMessage = '') {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (errorMessage) {
      inputElement.classList.add(this._formSelectors.inputErrorClass);
      errorElement.classList.add(this._formSelectors.spanErrorClassActive);
    } else {
      inputElement.classList.remove(this._formSelectors.inputErrorClass);
      errorElement.classList.remove(this._formSelectors.spanErrorClassActive);
    }
    errorElement.textContent = errorMessage;
  }
  //переключает стили в зависимости от валидности
  _checkInputValidity(inputElement) {
    this._showInputError(inputElement, inputElement.validationMessage);
  }
  //возвращает если хотябы один не валиден
  _hasInvalidInput() {
    return this._inputElements.some((input) => {
      return !input.validity.valid;
    });
  }
  //переключает кнопку в зависимости от валидности
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.toggle(this._formSelectors.submitButtonDisabled, true);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.toggle(this._formSelectors.submitButtonDisabled, false);
      this._buttonElement.disabled = false;
    }
  }
  //ко всем инпутам/кнопкам добавляет слушателей на валидность
  _setEventListeners() {
    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      inputElement.setValue = (value) => {
        inputElement.value = value;
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      };

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._toggleButtonState(true);
    });
  }

  //валидация на все формы, инпуты и кнопки
  enableValidation() {
    this._setEventListeners();
  }

  errorDefaultState() {

    this._inputElements.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      
      inputElement.classList.remove(this._formSelectors.inputErrorClass);
      errorElement.classList.remove(this._formSelectors.spanErrorClassActive);

      errorElement.textContent = '';
      if (!inputElement.value) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    });

  }
}