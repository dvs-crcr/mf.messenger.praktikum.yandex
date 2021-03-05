import { BaseAPI } from './../../utils/BaseAPI.js';
import { HTTPTransport } from './../../utils/HTTPTransport.js';

const _instanceUrl = '/user/';

export type ProfileUserRequestType = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
};

export type ProfileChangePasswordRequestType = {
    oldPassword: string,
    newPassword: string,
};

export type ProfileChangeAvatarRequestType = {
    avatar: File,
};

export class ProfileApi extends BaseAPI {
    _xhttp: HTTPTransport;

    constructor() {
        super();
        this._xhttp = new HTTPTransport(_instanceUrl);
    }

    getUserDataById(id: number) {
        return this._xhttp.get(`${id}`);
    }

    updateUserData(request_data: ProfileUserRequestType) {
        return this._xhttp.put('profile', {
            data: JSON.stringify(request_data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw response.status;
                } else {
                    return response;
                }
            })
    }

    changePassword(request_data: ProfileChangePasswordRequestType) {
        return this._xhttp.put('password', {
            data: JSON.stringify(request_data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw response.status;
                } else {
                    return response;
                }
            })
    }

    changeAvatar(request_data: FormData) {
        return this._xhttp.put('profile/avatar', {
            data: request_data,
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw response.status;
                } else {
                    return response;
                }
            })
    }
}