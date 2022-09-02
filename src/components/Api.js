export class Api {
    constructor(baseUrl, cohort, token) {
        this._baseUrl = baseUrl;
        this._cohort = cohort;
        this._token = token;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status);
    }

    getCardsData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            headers: {
              authorization: this._token
            }
        })
            .then(res => this._checkResponse(res));
    }

    getUserData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            headers: {
              authorization: this._token
            }
        })
            .then(res => this._checkResponse(res));
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
            .then(res => this._checkResponse(res));
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
            .then(res => this._checkResponse(res));
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
            .then(res => this._checkResponse(res));
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => this._checkResponse(res));
    }

    handleLike = (cardId, method) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}/likes`, {
            method: method,
            headers: {
                authorization: this._token,
            },
        })
            .then(res => this._checkResponse(res));
    }
}