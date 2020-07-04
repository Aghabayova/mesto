import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__field');
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

    open() {
        super.open();
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}
