export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._escCloseHandler = (evt) => this._handleEscClose(evt);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._escCloseHandler);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.matches('.popup__close') || evt.target.matches('.popup')) {
                this.close();
            }
        });
        document.addEventListener('keyup', this._escCloseHandler);
    }
}
