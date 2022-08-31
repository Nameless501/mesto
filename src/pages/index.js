// Импорт

import './index.css';

import { validationConfig, userInfoSelectors, profileButton, newCardButton, avatarButton, profilePopupSelector, newCardPopupSelector, imagePopupSelector, avatarPopupSelector, deletePopupSelector, nameInputElement, infoInputElement, myCohort, myToken, baseUrl} from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';

import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage.js';

import { PopupWithForm } from '../components/PopupWithForm.js';

import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

import { UserInfo } from '../components/UserInfo.js';

import { renderCard } from '../utils/utils.js';

import { Api } from '../components/Api.js';

// Создание экземпларов класса

const api = new Api(baseUrl, myCohort, myToken);

const getAllData = async () => {
    const allData = await Promise.all([api.getCardsData(), api.getUserData()]);
    return allData;
}

const popupWithImage = new PopupWithImage(imagePopupSelector);

const defaultCards = new Section(
    (cardData, userData) => {
        defaultCards.addItem(renderCard(cardData, userData, popupWithImage.openPopup, api.handleLike, deletePopup.openPopup));
    },
    '.elements__gallery');

defaultCards.renderItems(getAllData);

const userInfo = new UserInfo(userInfoSelectors);

const setDefaultInfo = async () => {
    const getData = await api.getUserData();
    const setData = await userInfo.setUserInfo(getData);
}

setDefaultInfo();

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    async (data) => {
        try {
            const fetchData = await api.setUserData(data);
            const response = await userInfo.setUserInfo(fetchData);
        } catch (err) {
            console.log(`Не удалось отправить данные. Ошибка: ${err}`);
        } finally {
            profilePopup.closePopup();
        }
});

const newCardPopup = new PopupWithForm(
    newCardPopupSelector,
    async (data) => {
        try {
            const postCard = await api.postCard(data);
            const refreshCards = await defaultCards.refreshCards(getAllData);
        } catch(err) {
            console.log(`Не удалось отправить данные. Ошибка: ${err}`);
        } finally {
            newCardPopup.closePopup();
        }
});

const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    async (data) => {
        try {
            const fetchData = await api.setAvatar(data);
            const response = await userInfo.setUserInfo(fetchData);
        } catch (err) {
            console.log(`Не удалось отправить данные. Ошибка: ${err}`);
        } finally {
            avatarPopup.closePopup();
        }
}); 

const deletePopup = new PopupWithSubmit(
    deletePopupSelector,
    async (cardId) => {
        try {
            const deleteCard = await api.deleteCard(cardId);
            const refreshCards = await defaultCards.refreshCards(getAllData);
        } catch (err) {
            console.log(`Не удалось удалить карточку. Ошибка: ${err}`);
        } finally {
            deletePopup.closePopup();
        }
}); 

profilePopup.setEventListeners();

newCardPopup.setEventListeners();

popupWithImage.setEventListeners();

avatarPopup.setEventListeners();

deletePopup.setEventListeners();

// Валидация форм

const profileValidator = new FormValidator(profilePopupSelector, validationConfig);
const newCardValidator = new FormValidator(newCardPopupSelector, validationConfig);
const avatarValidator = new FormValidator(avatarPopupSelector, validationConfig);

profileValidator.enableValidation();
newCardValidator.enableValidation();
avatarValidator.enableValidation();

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

avatarButton.addEventListener('click', () => {
    avatarValidator.clearValidation();
    avatarPopup.openPopup();
})