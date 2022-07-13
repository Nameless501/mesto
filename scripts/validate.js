const parameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_visible'
};

function enableValidation({ formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((currentForm) => {
        setEventListener(currentForm, rest);
    });
}

function isValid(currentForm, currentInput, rest) {
if(!currentInput.validity.valid) {
        showInputError(currentForm, currentInput, currentInput.validationMessage, rest);
    } else {
        hideInputError(currentForm, currentInput, rest);
    }
}

function showInputError(currentForm, currentInput, errorMessage, { inputErrorClass, errorClass } ) {
    const inputError = currentForm.querySelector(`.${currentInput.id}-error`);
    currentInput.classList.add(inputErrorClass);
    inputError.classList.add(errorClass);
    inputError.textContent = errorMessage;
}

function hideInputError(currentForm, currentInput, { inputErrorClass, errorClass }) {
    const inputError = currentForm.querySelector(`.${currentInput.id}-error`);
    currentInput.classList.remove(inputErrorClass);
    inputError.classList.remove(errorClass);
    inputError.textContent = '';
}

function setEventListener(currentForm, { inputSelector, submitButtonSelector, ...rest }) {
    const inputList = Array.from(currentForm.querySelectorAll(inputSelector));
    const submitButton = currentForm.querySelector(submitButtonSelector);

    toggleSubmitState(inputList, submitButton, rest);

    inputList.forEach((currentInput) => {
        currentInput.addEventListener('input', () => {
            isValid(currentForm, currentInput, rest);
            toggleSubmitState(inputList, submitButton, rest);
        });
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function disableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
}

function activateSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
}

function toggleSubmitState(inputList, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(submitButton, inactiveButtonClass);
    } else {
        activateSubmitButton(submitButton, inactiveButtonClass);
    }
}

enableValidation(parameters);