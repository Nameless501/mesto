// Переменные

const editOpen = document.querySelector('.profile__edit-button');

const addOpen = document.querySelector('.profile__add-button');

const inputName = document.querySelector('.popup__input_type_name');

const inputInfo = document.querySelector('.popup__input_type_job');

const inputPlace = document.querySelector('.popup__input_type_place');

const inputLink = document.querySelector('.popup__input_type_link');

const userName = document.querySelector('.profile__name');

const userInfo = document.querySelector('.profile__job');

const profilePopup = document.querySelector('.popup_type_profile');

const addPopup = document.querySelector('.popup_type_add');

const form = document.querySelectorAll('.popup__container');

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

// Добавление карточек в галлерею

function addCards(nameValue, linkValue) {
    const gallery = document.querySelector('.elements__gallery')
    const cardTemplate = document.querySelector('.elements__card-template').content;
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);

    card.querySelector('.elements__image').src = linkValue;
    card.querySelector('.elements__caption').textContent = nameValue;

    card.querySelector('.elements__like-button').addEventListener('click', like);
    card.querySelector('.elements__delete-button').addEventListener('click', deleteCard);

    gallery.prepend(card);
}

initialCards.forEach(function(item){
    const linkValue = item.link;
    const nameValue = item.name;

    addCards(nameValue, linkValue);
});

// функция обработчик кнопки like

function like(event) {
    event.target.classList.toggle('elements__like-button__active');
}

// функция обработчик кнопки delete
function deleteCard(event) {
    let parent = event.target.closest('.elements__card');
    parent.remove();
}

// функця открытия модального окна

function openPopup(event) {
    if (event.currentTarget === editOpen) {
            profilePopup.classList.add('popup_opened');
            inputName.setAttribute('value', `${userName.textContent}`);
            inputInfo.setAttribute('value', `${userInfo.textContent}`);
    } else if (event.currentTarget === addOpen) {
        addPopup.classList.add('popup_opened');
    }
}

// функции закрытия и submit

for (i = 0; i < form.length; i++) {
    const formItem = form[i];
    const parent = formItem.closest('.popup__item');

    function closePopup() {
        parent.classList.remove('popup_opened');
    }

    function clickOutside(evt) {
        if (evt.target === evt.currentTarget) {
            closePopup();
        }
    }

    function submit(evt) {
        if (formItem === form[0]) {
            if (!inputName.value || !inputInfo.value) {
                evt.preventDefault();
            } else {
                evt.preventDefault();
                userName.textContent = `${inputName.value}`;
                userInfo.textContent = `${inputInfo.value}`;
                closePopup();
            }
        } else if (formItem === form[1]) {
            if (!inputPlace.value || !inputLink.value) {
                evt.preventDefault();
            } else {
                evt.preventDefault();
                addCards(`${inputPlace.value}`, `${inputLink.value}`);
                initialCards.push({
                    name: `${inputPlace.value}`,
                    link: `${inputLink.value}`
                })
                closePopup();
                inputPlace.value = '';
                inputLink.value = '';
            }
        }
    }

    formItem.addEventListener('reset', closePopup);
    parent.addEventListener('click', clickOutside);
    formItem.addEventListener('submit', submit)
}

// Обработчики событий

editOpen.addEventListener('click', openPopup);

addOpen.addEventListener('click', openPopup);