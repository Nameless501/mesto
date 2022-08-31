// Объекты параметров

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_visible'
};

export const userInfoSelectors = {
  name: '.profile__name',
  info: '.profile__job',
  avatar: '.profile__avatar'
}

// Константы

export const profileButton = document.querySelector('.profile__edit-button');

export const newCardButton = document.querySelector('.profile__add-button');

export const avatarButton = document.querySelector('.profile__avatar-cover');

export const profilePopupSelector = document.querySelector('.popup_type_profile');

export const newCardPopupSelector = document.querySelector('.popup_type_add');

export const imagePopupSelector = document.querySelector('.popup_type_image');

export const avatarPopupSelector = document.querySelector('.popup_type_avatar');

export const deletePopupSelector = document.querySelector('.popup_type_delete');

export const nameInputElement = profilePopupSelector.querySelector('.popup__input_type_name');

export const infoInputElement = profilePopupSelector.querySelector('.popup__input_type_job');

export const myCohort = 'cohort-49';

export const baseUrl = 'https://mesto.nomoreparties.co/v1';

export const myToken = 'b9d286a6-31bd-41da-8959-b9d5c50596c4';