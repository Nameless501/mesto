export class UserInfo {
    constructor(data) {
        this._userNameElement = document.querySelector(data.name);
        this._userInfoElement = document.querySelector(data.info);
    }

    getUserInfo = () => {
        return {
            name: this._userNameElement.textContent,
            info: this._userInfoElement.textContent
        }
    }

    setUserInfo = (data) => {
        this._userNameElement.textContent = data.name;
        this._userInfoElement.textContent = data.info;
    }
}