import Popup from './Popup.js';
import { formSelectors } from '../utils/constants.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit, setInputValues }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._setInputValues = setInputValues;
        this._formElement = this._popup.querySelector( formSelectors.popupContent );
        this._inputList = this._formElement.querySelectorAll( formSelectors.inputSelector);
    }

    open() {
        super.open();
        this._setInputValues();
        //this._setInitialButtonState(isDisabled);
        this._setDefaultErrorState();
    }

    _setInitialButtonState(isDisabled) {
        const buttonSubmit = this._formElement.querySelector( formSelectors.submitButtonSelector);
        buttonSubmit.disabled = isDisabled;
    }

    _setDefaultErrorState() {
        this._inputList.forEach((inputElement) => {
            if (inputElement.matches( formSelectors.inputErrorField )) {
                const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
                inputElement.classList.remove( formSelectors.inputErrorClass);
                errorElement.classList.remove( formSelectors.spanErrorClassActive );
                errorElement.textContent = '';
            }
        });
    }

    _setEventListeners() {
        super._setEventListeners();
        const submitHandler = (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._formElement.removeEventListener('submit', submitHandler);
        }; 
        this._formElement.addEventListener('submit', submitHandler);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(
            (inputElement) => {
                this._formValues[inputElement.name] = inputElement.value;
            });

        return this._formValues;
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}
