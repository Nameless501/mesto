export class Card {
    constructor(cardData, userData, templateSelector, handleCardClick, handleLikeButton, handleDeleteButton) {
        this._data = cardData
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._cardOwnerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeButton  = handleLikeButton;
        this._myId = userData._id;
        this._handleDeleteButton = handleDeleteButton;
    }

    // Создание карточки

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);
        return cardTemplate;
    }

    createCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__image');
        this._likeCount = this._element.querySelector('.elements__like-counter');
        this._imageCaption = this._element.querySelector('.elements__caption');
        this._deleteButton = this._element.querySelector('.elements__delete-button');
        this._likeButton = this._element.querySelector('.elements__like-button');
        
        this._checkCardOwner();
        this._checkLikes();
        this._likeCounter(this._likes);

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name + ' фотография';
        this._imageCaption.textContent = this._name;

        return this._element;
    }

    // Навешивание обработчиков событий

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._isLiked ? this._handleDislike() : this._handleLike();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })
    }

    // Счетчик лайков и обработка активных лайков

    _likeCounter = (likes) => {
        this._likeCount.textContent = likes.length;
    }

    _checkLikes() {
        this._likes.length > 0 ? this._checkMyLikes() : this._isLiked = false;
    }

    _checkMyLikes() {
        this._likes.find(item => item._id === this._myId) ? this._enableLike() : this._disableLike();
    }

    // Обработчики лайка и дизлайка

    _handleLike() {
        this._handleLikeButton(this._cardId, 'PUT')
            .then(data => this._likeCounter(data.likes))
            .then(() => this._enableLike())
            .catch(err => console.log(`Не удалось отправить данные. Ошибка: ${err}`));
    }

    _handleDislike() {
        this._handleLikeButton(this._cardId, 'DELETE')
            .then(data => this._likeCounter(data.likes))
            .then(() => this._disableLike())
            .catch(err => console.log(`Не удалось отправить данные. Ошибка: ${err}`));
    }

    _checkCardOwner() {
        if(this._cardOwnerId === this._myId) {
            this._enableDeleteButton();
        }
    }

    // Состояния кнопок

    _enableDeleteButton() {
        this._deleteButton.classList.add('elements__delete-button_visible');
        this._deleteButton.removeAttribute('disabled');

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteButton(this._cardId);
        })
    }

    _enableLike() {
        this._likeButton.classList.add('elements__like-button__active');
        this._isLiked = true;
    }

    _disableLike = () => {
        this._likeButton.classList.remove('elements__like-button__active');
        this._isLiked = false;
    }
}