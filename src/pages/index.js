// Импорт

import './index.css';

import { validationConfig, initialCards, profileButton, newCardButton, profilePopupSelector, newCardPopupSelector, imagePopupSelector } from '../utils/constants.js';

import { Card } from '../components/Card.js';

import { FormValidator } from '../components/FormValidator.js';

import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage.js';

import { PopupWithForm } from '../components/PopupWithForm.js';

import { UserInfo } from '../components/UserInfo.js';

// popup классы

const popupWithImage = new PopupWithImage(imagePopupSelector);

const openImagePopup = popupWithImage.openPopup.bind(this);

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    (data) => {
        const userInfo = new UserInfo(data);
        userInfo.setUserInfo();
    });

const newCardPopup = new PopupWithForm(
    newCardPopupSelector,
    (data) => {
        const newCards = new Section({
            items: [data],
            renderer: (element) => {
                const newCard = new Card(element, '.elements__card-template', openImagePopup);
                const newCardElement = newCard.createCard();
                newCards.addItem(newCardElement);
                },}, 
            '.elements__gallery');
        
        newCards.renderItems()
    });

profilePopup.setEventListeners();

newCardPopup.setEventListeners();

popupWithImage.setEventListeners();

// Добаслвение карточек

const defaultCards = new Section({
    items: initialCards,
    renderer: (element) => {
        const card = new Card(element, '.elements__card-template', openImagePopup);
        const cardElement = card.createCard();
        defaultCards.addItem(cardElement);
        },}, 
    '.elements__gallery')

defaultCards.renderItems();

// Валидация форм

const profileValidator = new FormValidator(profilePopupSelector, validationConfig);
const newCardValidator = new FormValidator(newCardPopupSelector, validationConfig);

profileValidator.enableValidation();
newCardValidator.enableValidation();

// обработчики событий

profileButton.addEventListener('click', () => {
    profileValidator.clearValidation();

    (function setCurrentInfo() {
        const currentUserInfo = new UserInfo({});
        const currentData = currentUserInfo.getUserInfo();
        profilePopupSelector.querySelector('.popup__input_type_name').value = currentData.name;
        profilePopupSelector.querySelector('.popup__input_type_job').value = currentData.info;
    })()

    profilePopup.openPopup(profilePopupSelector);
});

newCardButton.addEventListener('click', () => {
    newCardValidator.clearValidation();
    newCardPopup.openPopup(newCardPopupSelector);
});