class FormValidator {
    constructor(currentForm, config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._currentForm = currentForm;
    }

    enableValidation() {
        this._inputList = Array.from(this._currentForm.querySelectorAll(this._inputSelector));
        this._submitButton = this._currentForm.querySelector(this._submitButtonSelector);

        this._toggleSubmitState();

        this._inputList.forEach((currentInput) => {
            currentInput.addEventListener('input', () => {
                this._isValid(currentInput);
                this._toggleSubmitState();
            })
        })
    }

    _isValid(currentInput) {
        if(!currentInput.validity.valid) {
            this._showInputError(currentInput, currentInput.validationMessage);
        } else {
            this._hideInputError(currentInput);
        }
    }

    _showInputError(currentInput, errorMessage) {
        const inputError = this._currentForm.querySelector(`.${currentInput.id}-error`);

        currentInput.classList.add(this._inputErrorClass);
        inputError.classList.add(this._errorClass);
        inputError.textContent = errorMessage;
    }

     _hideInputError(currentInput) {
        const inputError = this._currentForm.querySelector(`.${currentInput.id}-error`);

        currentInput.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = '';
    }

    _toggleSubmitState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableSubmitButton();
        } else {
            this._activateSubmitButton();
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true);
    }

    _activateSubmitButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
    }

    clearValidation() {
        this._disableSubmitButton();

        this._inputList.forEach((currentInput) => {
            this._hideInputError(currentInput);
        })
    }
}

export {FormValidator};