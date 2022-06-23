// Переменные

const gallery = document.querySelector('.elements__gallery');

const profileButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close-button');

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
    const cardTemplate = document.querySelector('.elements__card-template').content;
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const image = card.querySelector('.elements__image');
    const likeButton = card.querySelector('.elements__like-button');
    const deleteButton = card.querySelector('.elements__delete-button');

    image.src = linkValue;
    image.alt = nameValue + ' фотография'
    card.querySelector('.elements__caption').textContent = nameValue;

    image.addEventListener('click', () => {imagePopupOpen(nameValue, linkValue)})
    likeButton.addEventListener('click', likeToggle);
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

function profilePopupOpen() {
    openPopup(profilePopup);
    inputName.setAttribute('value', `${userName.textContent}`);
    inputInfo.setAttribute('value', `${userInfo.textContent}`);
}

function imagePopupOpen(nameValue, linkValue) {
    popupImage.src = linkValue;
    popupImage.alt = nameValue + ' фотография';
    popupCaption.textContent = nameValue;

    openPopup(imagePopup);
}

// закрытие popup по клику на крестик и вне модального окна

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closeButtons.forEach((item) => {
    const closestPopup = item.closest('.popup');
    item.addEventListener('click', () => {closePopup(closestPopup)});
});

popups.forEach((item) => {
    item.addEventListener('click', () => {clickOutside(item)});
});

function clickOutside(item) {
    if (event.target === event.currentTarget) {
        closePopup(item);
    }
}

// функции submit

function profileSubmit(evt) {
    if (!inputName.value || !inputInfo.value) {
        evt.preventDefault();
    } else {
        evt.preventDefault();
        userName.textContent = `${inputName.value}`;
        userInfo.textContent = `${inputInfo.value}`;
        closePopup(profilePopup);
    }
}

function addSubmit(evt) {
    if (!inputPlace.value || !inputLink.value) {
        evt.preventDefault();
    } else {
        evt.preventDefault();

        createCard(`${inputPlace.value}`, `${inputLink.value}`);
        addCard(`${inputPlace.value}`, `${inputLink.value}`);

        closePopup(addPopup);
        evt.target.reset()
}
}

// функция обработчик кнопки like

function likeToggle(event) {
    event.target.classList.toggle('elements__like-button__active');
}

// функция удаления карточки

function deleteCard(event) {
    const parent = event.target.closest('.elements__card');
    parent.remove();
}

// обработчики событий

profileButton.addEventListener('click', profilePopupOpen);

addButton.addEventListener('click', () => {openPopup(addPopup)});

profilePopup.addEventListener('submit', profileSubmit);

addPopup.addEventListener('submit', addSubmit);