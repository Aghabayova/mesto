import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector( '.popup__form' );
        this._inputList = this._formElement.querySelectorAll( '.popup__field');
    }

    open() {
        super.open();
        //this._setDefaultErrorState();
    }
    /*
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
    */

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
