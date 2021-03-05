import { BaseAPI } from './../../utils/BaseAPI.js';
import { HTTPTransport } from './../../utils/HTTPTransport.js';

const _instanceUrl = '/chats/';

export type CreateChatRequestType  = {
    title: string,
};

export type AddUsersToChatRequestType  = {
    users: number[],
    chatId: number,
};

export type DeleteUsersFromChatRequestType  = {
    users: number[],
    chatId: number,
};

export class ChatApi extends BaseAPI {
    _xhttp: HTTPTransport;

    constructor() {
        super();
        this._xhttp = new HTTPTransport(_instanceUrl);
    }

    getChats() {
        return this._xhttp.get('')
            .then((response) => JSON.parse(response.responseText));
    }

    createChat(request_data: CreateChatRequestType) {
        return this._xhttp.post('', {
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

    addUsersToChat(request_data: AddUsersToChatRequestType) {
        return this._xhttp.put('users', {
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

    deleteUsersFromChat(request_data: DeleteUsersFromChatRequestType) {
        return this._xhttp.delete('users', {
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
}