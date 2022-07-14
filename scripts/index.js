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

const cardTemplate = document.querySelector('.elements__card-template').content;

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

function createCard(nameValue, linkValue) {
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const image = card.querySelector('.elements__image');
    const likeButton = card.querySelector('.elements__like-button');
    const deleteButton = card.querySelector('.elements__delete-button');

    image.src = linkValue;
    image.alt = nameValue + ' фотография'
    card.querySelector('.elements__caption').textContent = nameValue;

    image.addEventListener('click', (evt) => {openImagePopup(nameValue, linkValue, evt)})
    likeButton.addEventListener('click', toggleLike);
    deleteButton.addEventListener('click', deleteCard);

    return card;
}

function addCard(nameValue, linkValue) {
    const card = createCard(nameValue, linkValue)
    gallery.prepend(card);
}

initialCards.forEach((item) => {
        createCard(item.name, item.link);
        addCard(item.name, item.link);
    })

// открытие popup

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function addListenerAndOpen(popup, evt) {
    document.addEventListener('keydown', escapeHandler);
    if (evt.target === profileButton) {
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

function openImagePopup(nameValue, linkValue, evt) {
    popupImage.src = linkValue;
    popupImage.alt = nameValue + ' фотография';
    popupCaption.textContent = nameValue;

    addListenerAndOpen(imagePopup, evt);
}

// закрытие popup

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function cleanPopupAndClose(popup) {
    if (!popup.classList.contains('popup_type_image')) {
        const currentForm = popup.querySelector('.popup__form');
        const inputs = Array.from(currentForm.querySelectorAll('.popup__input'));
        const submitButton = popup.querySelector('.popup__submit-button');
    
        inputs.forEach((currentInput) => {
            hideInputError(currentForm, currentInput, {inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error-message_visible'});
            disableSubmitButton(submitButton, 'popup__submit-button_disabled');
        });
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

        addCard(`${inputPlace.value}`, `${inputLink.value}`);

        deleteListenerAndClose(addPopup);
        evt.target.reset();
    }
}

// функция обработчик кнопки like

function toggleLike(event) {
    event.target.classList.toggle('elements__like-button__active');
}

// функция удаления карточки

function deleteCard(event) {
    const parent = event.target.closest('.elements__card');
    parent.remove();
}

// обработчики событий

profileButton.addEventListener('click', (evt) => {addListenerAndOpen(profilePopup, evt)});

addButton.addEventListener('click', (evt) => {addListenerAndOpen(addPopup, evt)});

profilePopup.addEventListener('submit', handleProfileFormSubmit);

addPopup.addEventListener('submit', handleCardFormSubmit);