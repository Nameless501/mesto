export class Popup {
    constructor(popup) {
        this._popup = popup;
        this.openPopup = this.openPopup.bind(this);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            this._handleClose(evt);
        })
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _handleClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup();
        } else if (evt.target.classList.contains('popup__close-button')) {
            this.closePopup();
        }
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose)
    }
}