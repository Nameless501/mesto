import { userInfo, userName } from "../utils/constants.js";

export class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._info = data.info;
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo = () => {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        }
    }

    setUserInfo = () => {
        this._userName.textContent = this._name;
        this._userInfo.textContent = this._info;
    }
}