import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption');
    }

    openPopup(data) {
        super.openPopup();

        this._image.src = data.link
        this._image.alt = data.name + ' фотография';
        this._caption.textContent = data.name;
    }
}