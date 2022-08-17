import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    openPopup(name, link) {
        super.openPopup();

        this._image = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption');

        this._image.src = link
        this._image.alt = name + ' фотография';
        this._caption.textContent = name;
    }
}