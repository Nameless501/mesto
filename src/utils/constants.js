// Объекты параметров

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_visible'
};

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const userInfoSelectors = {
  name: '.profile__name',
  info: '.profile__job'
}

// Константы

export const profileButton = document.querySelector('.profile__edit-button');

export const newCardButton = document.querySelector('.profile__add-button');

export const profilePopupSelector = document.querySelector('.popup_type_profile');

export const newCardPopupSelector = document.querySelector('.popup_type_add');

export const imagePopupSelector = document.querySelector('.popup_type_image');

export const nameInputElement = profilePopupSelector.querySelector('.popup__input_type_name');

export const infoInputElement = profilePopupSelector.querySelector('.popup__input_type_job');