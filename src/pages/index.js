// Импорт

import './index.css';

import { validationConfig, userInfoSelectors, profileButton, newCardButton, avatarButton, profilePopupSelector, newCardPopupSelector, imagePopupSelector, avatarPopupSelector, deletePopupSelector, galleryClassSelector, myCohort, myToken, baseUrl} from '../utils/constants.js';

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

const popupWithImage = new PopupWithImage(imagePopupSelector);

const defaultCards = new Section(
    (cardData, userData) => {
        defaultCards.addItem(renderCard(cardData, userData, popupWithImage.openPopup, api.handleLike, deletePopup.openPopup));
    },
    galleryClassSelector);

const userInfo = new UserInfo(userInfoSelectors);

function getAllData() {
    Promise.all([api.getCardsData(), api.getUserData()])
        .then(allData => {
            const [cardsData, userData] = allData;
            return [cardsData, userData]
        })
        .then(([cardsData, userData]) => {
            defaultCards.renderItems(cardsData, userData);
            userInfo.setUserInfo(userData)
        })
        .catch(err => console.log(`Не удалость загрузить данные. Ошибка: ${err}`));
}

getAllData();

const profilePopup = new PopupWithForm(
    profilePopupSelector,
    (data) => {
        return api.setUserData(data)
            .then(data => userInfo.setUserInfo(data))
    }
);

const newCardPopup = new PopupWithForm(
    newCardPopupSelector,
    (data) => {
        return Promise.all([api.postCard(data), api.getUserData()])
            .then(allData => {
                const [newCardData, userData] = allData;
                return [newCardData, userData];
            })
            .then(([newCardData, userData]) => {
                defaultCards.addItem(
                    renderCard(newCardData, userData, popupWithImage.openPopup, api.handleLike, deletePopup.openPopup),
                    false);
            })
    }
);

const avatarPopup = new PopupWithForm(
    avatarPopupSelector,
    (data) => {
        return api.setAvatar(data)
            .then(data => userInfo.setUserInfo(data))
    }
);

const deletePopup = new PopupWithSubmit(
    deletePopupSelector,
    (cardId) => {
        return api.deleteCard(cardId)
            .then(() => Promise.all([api.getCardsData(), api.getUserData()]))
            .then(allData => {
                const [cardsData, userData] = allData;
                return [cardsData, userData]
            })
            .then(([cardsData, userData]) => defaultCards.refreshCards(cardsData, userData))    
    }
); 

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
    profilePopup.setInputValue(userInfo.getUserInfo());
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