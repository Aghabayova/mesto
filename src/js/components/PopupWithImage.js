import Popup from './Popup.js';
import { itemPopup } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(evt) {
        super.open();
        const popupImageBig = this._popup.querySelector(itemPopup.popupImage);
        const popupImageBigCaption = this._popup.querySelector(itemPopup.popupImageCaption);
        const popupImageZoom = evt.target;
        popupImageBig.src = popupImageZoom.src;
        popupImageBig.alt = popupImageZoom.alt;
        popupImageBigCaption.textContent = popupImageZoom.alt;
  }
}
