// Импорт

import {Card} from './Card.js';

import {FormValidator} from './FormValidator.js';

// Переменные

const gallery = document.querySelector('.elements__gallery');

const profileButton = document.querySelector('.profile__edit-button');

const newCardButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_profile');

const newCardPopup = document.querySelector('.popup_type_add');

const imagePopup = document.querySelector('.popup_type_image');

const inputName = document.querySelector('.popup__input_type_name');

const inputInfo = document.querySelector('.popup__input_type_job');

const inputPlace = document.querySelector('.popup__input_type_place');

const inputLink = document.querySelector('.popup__input_type_link');

const userName = document.querySelector('.profile__name');

const userInfo = document.querySelector('.profile__job');

const popupImage = imagePopup.querySelector('.popup__image');

const popupCaption = imagePopup.querySelector('.popup__caption');

const formList = Array.from(document.querySelectorAll('.popup__form'));

// Объекты параметров

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-message_visible'
};

const initialCards = [
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

// Добавление карточек

initialCards.forEach((item) => {
    addCard(item, '.elements__card-template', openImagePopup);
})

function createCard(data, templateSelector, openImagePopup) {
    const card = new Card(data, templateSelector, openImagePopup);
    const cardElement = card.createCard();

    return cardElement;
}

function addCard(data, templateSelector, openImagePopup) {
    gallery.prepend(createCard(data, templateSelector, openImagePopup));
}

// Валидация форм

const profileValidator = new FormValidator(profilePopup, validationConfig);
const newCardValidator = new FormValidator(newCardPopup, validationConfig);

profileValidator.enableValidation();
newCardValidator.enableValidation();

// открытие popup

function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', escapeHandler);
}

function openProfilePopup() {
    openPopup(profilePopup);

    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
    
    profileValidator.clearValidation();
}

function openImagePopup(name, link) {
    popupImage.src = link
    popupImage.alt = name + ' фотография';
    popupCaption.textContent = name;

    openPopup(imagePopup);
}

// закрытие popup

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', escapeHandler);
}

function overlayHandler(evt, popup) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    } else if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
    }
}

function escapeHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        overlayHandler(evt, popup)});
})

// функции submit

function handleProfileFormSubmit(evt) {
        evt.preventDefault();
        userName.textContent = `${inputName.value}`;
        userInfo.textContent = `${inputInfo.value}`;
        closePopup(profilePopup);
}

function handleNewCardSubmit(evt) {
        evt.preventDefault();
        const data = {
            name: inputPlace.value,
            link: inputLink.value
        };

        addCard(data, '.elements__card-template', openImagePopup);

        closePopup(newCardPopup);
        evt.target.reset();
}

// обработчики событий

profileButton.addEventListener('click', () => {openProfilePopup(profilePopup)});

newCardButton.addEventListener('click', () => {
    newCardValidator.clearValidation();
    openPopup(newCardPopup);
});

profilePopup.addEventListener('submit', handleProfileFormSubmit);

newCardPopup.addEventListener('submit', handleNewCardSubmit);