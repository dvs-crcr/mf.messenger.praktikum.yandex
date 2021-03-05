import { BaseAPI } from './../../utils/BaseAPI.js';
import { HTTPTransport } from './../../utils/HTTPTransport.js';

const _instanceUrl = '/auth/';

export type AuthApiSigninType = { login: string, password: string };
export type AuthApiSignupType = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

export class AuthApi extends BaseAPI {
    _xhttp: HTTPTransport;

    constructor() {
        super();
        this._xhttp = new HTTPTransport(_instanceUrl);
    }

    getUserInfo() {
        return this._xhttp.get('user');
    }

    signIn(request_data: AuthApiSigninType) {
        return this._xhttp.post('signin', {
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

    signUp(request_data: AuthApiSignupType) {
        return this._xhttp.post('signup', {
            data: JSON.stringify(request_data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if (response.status !== 200) {
                throw response.status;
            } else {
                const { responseText } = response;
                return JSON.parse(responseText);
            }
        })
    }

    logout() {
        return this._xhttp.post('logout');
    }
}