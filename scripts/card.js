class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);
        return cardTemplate;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__caption').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._likeHandler();
        })
        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._deleteHandler();
        })
        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _likeHandler() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button__active');
    }

    _deleteHandler() {
        const parent = this._element.closest('.elements__card');

        parent.remove();
    }
}

export {Card};