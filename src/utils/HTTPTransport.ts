import { default as queryString, StringIndexed } from './queryString.js';
import { default as OPT } from '../options.js';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

type RequestOptions = {
	data?: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined,
	query?: StringIndexed, 
	headers?: {
		[index: string]: any
	},
	method?: keyof typeof METHODS,
	timeout?: number
}

export class HTTPTransport {

	constructor(public instanceUrl: string = '') { }

	get = (url: string, options?: RequestOptions) => {
		let qs = '';
		if (typeof options !== 'undefined' && typeof options.query !== 'undefined') {
			qs = queryString(options.query)
		}
		return this.request(`${url}${qs}`, {...options, method: METHODS.GET});
	};

	put = (url: string, options?: RequestOptions) => {
		return this.request(url, {...options, method: METHODS.PUT});
	};

	post = (url: string, options?: RequestOptions) => {
		return this.request(url, {...options, method: METHODS.POST});
	};

	delete = (url: string, options?: RequestOptions) => {
		return this.request(url, {...options, method: METHODS.DELETE});
	};

	request = (url: string, options: RequestOptions) => {
		if (typeof url === 'undefined') {
			throw new Error('NO URL');
		}
		const { data, headers, method = METHODS.GET, timeout = 5000 } = options;
		return new Promise((resolve) => {
			const xhr = new XMLHttpRequest();
			xhr.timeout = timeout;
			if (typeof headers === 'object') {
				for (let key in headers) {
					if (typeof key === 'string' && typeof headers[key] === 'string') {
						xhr.setRequestHeader(key, headers[key]);
					}
				}
			}
			xhr.open(method, `${OPT.baseAPIUrl}${this.instanceUrl}${url}`);
			
			xhr.onload = function() {
				resolve(xhr);
			};

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}