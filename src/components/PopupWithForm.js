import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._handleSubmit = handleSubmit;
    }

    _getInputValues(evt) {
        this._formData = Object.fromEntries(new FormData(evt.target));;

        return this._formData;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._initialButtonText = this._submitButton.textContent;

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._handleSubmit(this._getInputValues(evt));
        });
    }

    closePopup() {
        super.closePopup();
        this._popup.querySelector('.popup__form').reset();
        this.renderLoading(false);
    }

    renderLoading = (isLoading) => {
        if(isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._initialButtonText;
        }
    }
}