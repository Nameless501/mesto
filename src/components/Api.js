export class Api {
    constructor(baseUrl, cohort, token) {
        this._baseUrl = baseUrl;
        this._cohort = cohort;
        this._token = token;
    }

    getCardsData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            headers: {
              authorization: this._token
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => console.log(`Не удалось загрузить данные карточек. Ошибка: ${err}`));
    }

    getUserData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            headers: {
              authorization: this._token
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(err => console.log(`Не удалось загрузить данные польователя. Ошибка: ${err}`));
    }

    setUserData = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            });
    }

    setAvatar = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            });
    }

    postCard = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            });
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => {
                if(!res.ok) {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            });
    }

    handleLike = (cardId, method) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}/likes`, {
            method: method,
            headers: {
                authorization: this._token,
            },
        })
            .then(res => {
               if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            });
    }
}