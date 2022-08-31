import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._handleSubmit = handleSubmit;
    }

    openPopup(cardId) {
        super.openPopup();
        this._cardId = cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._cardId);
        });
    }

    closePopup() {
        super.closePopup();
        this._popup.querySelector('.popup__form').reset();
    }
}