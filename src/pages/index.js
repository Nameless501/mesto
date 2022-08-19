// Импорт

import './index.css';

import { validationConfig, initialCards, userInfoSelectors, profileButton, newCardButton, profilePopupSelector, newCardPopupSelector, imagePopupSelector, nameInputElement, infoInputElement } from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';

import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage.js';

import { PopupWithForm } from '../components/PopupWithForm.js';

import { UserInfo } from '../components/UserInfo.js';

import { renderCard } from '../utils/utils.js';

// Создание экземпларов класса

const popupWithImage = new PopupWithImage(imagePopupSelector);

const defaultCards = new Section({
    items: initialCards,
    renderer: (data) => {
        defaultCards.addItem(renderCard(data, popupWithImage.openPopup));
        },}, 
    '.elements__gallery')

defaultCards.renderItems();

const userInfo = new UserInfo(userInfoSelectors);

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    (data) => {
        userInfo.setUserInfo(data);
        profilePopup.closePopup();
    });

const newCardPopup = new PopupWithForm(
    newCardPopupSelector,
    (data) => {
        defaultCards.addItem(renderCard(data, popupWithImage.openPopup));
        newCardPopup.closePopup();
    });

profilePopup.setEventListeners();

newCardPopup.setEventListeners();

popupWithImage.setEventListeners();

// Валидация форм

const profileValidator = new FormValidator(profilePopupSelector, validationConfig);
const newCardValidator = new FormValidator(newCardPopupSelector, validationConfig);

profileValidator.enableValidation();
newCardValidator.enableValidation();

// обработчики событий

profileButton.addEventListener('click', () => {
    profileValidator.clearValidation();

    const currentUserData = userInfo.getUserInfo();

    nameInputElement.value = currentUserData.name;
    infoInputElement.value = currentUserData.info;

    profilePopup.openPopup();
});

newCardButton.addEventListener('click', () => {
    newCardValidator.clearValidation();
    newCardPopup.openPopup();
});