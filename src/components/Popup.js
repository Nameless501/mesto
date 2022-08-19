export class Popup {
    constructor(popup) {
        this._popup = popup;
        this.openPopup = this.openPopup.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            this._handleClose(evt);
        })
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _handleClose(evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            this.closePopup();
        }
    }

    openPopup() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
    }
}