import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._handleSubmit = handleSubmit;
    }

    _getInputValues() {
        this._formData = {};

        this._inputList.forEach(input => this._formData[input.name] = input.value);

        return this._formData;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton = this._popup.querySelector('.popup__submit-button');

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            const initialButtonText = this._submitButton.textContent;
            this._submitButton.textContent = 'Сохранение...';

            this._handleSubmit(this._getInputValues())
                .then(() => this.closePopup())
                .catch(err => console.log(`Не удалось отправить данные. Ошибка: ${err}`))
                .finally(() => {
                    this._submitButton.textContent = initialButtonText;
                });
        });
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    setInputValue = (data) => {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        })
    }
}