export class Api {
    constructor(baseUrl, cohort, token) {
        this._baseUrl = baseUrl;
        this._cohort = cohort;
        this._token = token;
    }

    getCardsData = async () => {
        try {
            const getData = await fetch(`${this._baseUrl}/${this._cohort}/cards`, {
                headers: {
                  authorization: this._token
                }
            });
            const result = await getData.json();
            return result;
        } catch(err) {
            console.log(`Не удалось загрузить данные карточек. Ошибка: ${err}`);
        }
    }

    getUserData = async () => {
        try {
            const getData = await fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
                headers: {
                  authorization: this._token
                }
            });
            const result = await getData.json();
            return result;
        } catch(err) {
            console.log(`Не удалось загрузить данные польователя. Ошибка: ${err}`);
        }
    }

    setUserData = async (data) => {
        const patchData = await fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        });
        const response = await patchData.json();
        return response;
    }

    setAvatar = async (data) => {
        const patchData = await fetch(`${this._baseUrl}/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.link,
            })
        });
        const response = await patchData.json();
        return response;
    }

    postCard = async (data) => {
        const post = await fetch(`${this._baseUrl}/${this._cohort}/cards`, {
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
    }

    deleteCard = async (cardId) => {
        const deleteCard = await fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId} `, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        });
    }

    handleLike = async (cardId, method) => {
        const data = await fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}/likes`, {
            method: method,
            headers: {
                authorization: this._token,
            },
        });
        const response = await data.json();
        return response;
    }
}