// Импорт

import {Card} from './card.js';

import {FormValidator} from './validate.js';

// Переменные

const gallery = document.querySelector('.elements__gallery');

const profileButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_profile');

const addPopup = document.querySelector('.popup_type_add');

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

function addCard(data, templateSelector, openImagePopup) {
    const card = new Card(data, templateSelector, openImagePopup);
    const cardElement = card.createCard();

    gallery.prepend(cardElement);
}

// Валидация форм

formList.forEach((item) => {
    const formValidator = new FormValidator(item, validationConfig);

    formValidator.enableValidation();
})

// открытие popup

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function addListenerAndOpen(popup) {
    document.addEventListener('keydown', escapeHandler);
    if (popup.classList.contains('popup_type_profile')) {
        openProfilePopup();
    } else {
        openPopup(popup);
    }
}

function openProfilePopup() {
    openPopup(profilePopup);
    inputName.setAttribute('value', `${userName.textContent}`);
    inputInfo.setAttribute('value', `${userInfo.textContent}`);
}

function openImagePopup(name, link) {
    popupImage.src = link
    popupImage.alt = name + ' фотография';
    popupCaption.textContent = name;

    addListenerAndOpen(imagePopup);
}

// закрытие popup

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function cleanPopupAndClose(popup) {
    if (!popup.classList.contains('popup_type_image')) {
        const currentForm = popup.querySelector('.popup__form');

        currentForm.reset();
        closePopup(popup);
    }

    closePopup(popup);
}

function deleteListenerAndClose(popup) {
    document.removeEventListener('keydown', escapeHandler);
    cleanPopupAndClose(popup);
}

function overlayHandler(evt, popup) {
    if (evt.target.classList.contains('popup_opened')) {
        deleteListenerAndClose(popup);
    } else if (evt.target.classList.contains('popup__close-button')) {
        deleteListenerAndClose(popup);
    }
}

function escapeHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        deleteListenerAndClose(openedPopup);
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        overlayHandler(evt, popup)});
})

// функции submit

function handleProfileFormSubmit(evt) {
    if (!inputName.value || !inputInfo.value) {
        evt.preventDefault();
    } else {
        evt.preventDefault();
        userName.textContent = `${inputName.value}`;
        userInfo.textContent = `${inputInfo.value}`;
        deleteListenerAndClose(profilePopup);
    }
}

function handleCardFormSubmit(evt) {
    if (!inputPlace.value || !inputLink.value) {
        evt.preventDefault();
    } else {
        evt.preventDefault();
        const data = {
            name: inputPlace.value,
            link: inputLink.value
        };

        addCard(data, '.elements__card-template');

        deleteListenerAndClose(addPopup);
        evt.target.reset();
    }
}

// обработчики событий

profileButton.addEventListener('click', () => {addListenerAndOpen(profilePopup)});

addButton.addEventListener('click', () => {addListenerAndOpen(addPopup)});

profilePopup.addEventListener('submit', handleProfileFormSubmit);

addPopup.addEventListener('submit', handleCardFormSubmit);