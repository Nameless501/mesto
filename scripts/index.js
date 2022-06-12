// Переменные

const editOpen = document.querySelector('.profile__edit-button');

const inputName = document.querySelector('.popup__name-input');

const inputInfo = document.querySelector('.popup__job-input');

const userName = document.querySelector('.profile__name');

const userInfo = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');

const form = document.querySelector('.popup__container');

// функции открытия и закрытия модального окна
// и закрытия окна при клике за его пределами

function openClose(evt) {
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.toggle('popup_opened');
        inputName.setAttribute('value', `${userName.textContent}`);
        inputInfo.setAttribute('value', `${userInfo.textContent}`);
    } else {
        popup.classList.toggle('popup_opened');
    }
}

function clickOutside(evt) {
    if (evt.target === evt.currentTarget) {
        openClose();
    }
}

// Проверка, что пользователь не пытается сохранить пустую строку
// и сохранение данных при событии submit

function submit(evt) {
    if (!inputName.value || !inputInfo.value) {
        evt.preventDefault();
    } else {
        evt.preventDefault();
        userName.textContent = `${inputName.value}`;
        userInfo.textContent = `${inputInfo.value}`;
        openClose();
    }
}

// Обработчики событий

editOpen.addEventListener('click', openClose);

form.addEventListener('reset', openClose);

form.addEventListener('submit', submit);

popup.addEventListener('click', clickOutside);