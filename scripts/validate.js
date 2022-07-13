const parameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_visible'
};

function enableValidation(configurations) {
    const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = configurations;

    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((currentForm) => {
        setEventListener(currentForm, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass);
    });
}

function isValid(currentForm, currentInput, inputErrorClass, errorClass) {
if(!currentInput.validity.valid) {
        showInputError(currentForm, currentInput, currentInput.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(currentForm, currentInput, inputErrorClass, errorClass);
    }
}

function showInputError(currentForm, currentInput, errorMessage, inputErrorClass, errorClass) {
    const inputError = currentForm.querySelector(`.${currentInput.id}-error`);
    currentInput.classList.add(inputErrorClass);
    inputError.classList.add(errorClass);
    inputError.textContent = errorMessage;
}

function hideInputError(currentForm, currentInput, inputErrorClass, errorClass) {
    const inputError = currentForm.querySelector(`.${currentInput.id}-error`);
    currentInput.classList.remove(inputErrorClass);
    inputError.classList.remove(errorClass);
    inputError.textContent = '';
}

function setEventListener(currentForm, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) {
    const inputList = Array.from(currentForm.querySelectorAll(inputSelector));
    const submitButton = currentForm.querySelector(submitButtonSelector);

    toggleSubmitState(inputList, submitButton, inactiveButtonClass);

    inputList.forEach((currentInput) => {
        currentInput.addEventListener('input', () => {
            isValid(currentForm, currentInput, inputErrorClass, errorClass);
            toggleSubmitState(inputList, submitButton, inactiveButtonClass);
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

function toggleSubmitState(inputList, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(submitButton, inactiveButtonClass);
    } else {
        activateSubmitButton(submitButton, inactiveButtonClass);
    }
}

enableValidation(parameters);