export class UserInfo {
    constructor(selectors) {
        this._userNameElement = document.querySelector(selectors.name);
        this._userInfoElement = document.querySelector(selectors.info);
        this._userAvatarPicture = document.querySelector(selectors.avatar);
    }

    getUserInfo = () => {
        return {
            name: this._userNameElement.textContent,
            info: this._userInfoElement.textContent
        }
    }

    setUserInfo = (data) => {
            this._userNameElement.textContent = data.name;
            this._userInfoElement.textContent = data.about;
            this._userAvatarPicture.src = data.avatar;
    }
}