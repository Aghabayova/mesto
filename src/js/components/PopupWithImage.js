import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(cardItem) {
        const popupImageBig = this._popup.querySelector('.popup__image');
        const popupImageBigCaption = this._popup.querySelector('.popup__caption');
        popupImageBig.src = cardItem.link;
        popupImageBig.alt = cardItem.name;
        popupImageBigCaption.textContent = cardItem.name;
        super.open();
    }


}
