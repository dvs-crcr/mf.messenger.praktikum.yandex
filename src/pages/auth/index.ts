import { Auth } from './../../components/Auth/Auth.js';
import { AuthApi, AuthApiSigninType } from './../../components/Auth/Auth.api.js';
import { Form } from './../../blocks/Form/Form.js';
import { Button } from './../../blocks/Button/Button.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Page } from './../../utils/Page.js';

class AuthPage extends Page {
  _api: AuthApi;
  _page: Auth;
  _errorLine?: Custom;
  _form?: Form;
  _button?: Button;
  _inputs?: Input[];

  constructor() {
    super();
    this._api = new AuthApi();
    this.init();
    this._page = new Auth({
      attr: { className: 'wrapper' },
      header: 'Авотризация',
      error_line: this.errorLine,
      form: this.form,
      link: {
        href: '/registration.html',
        title: 'создать аккаунт'
      }
    });
  }

  init = () => {
    this._errorLine = new Custom({
      tagName: 'p',
      attr: { className: 'auth__error hidden' },
      _template: `{{errorMsg}}`
    });
    this._button = new Button({
      className: 'auth__button button button_primary button_fullwidth',
      type: 'submit',
      content: 'Войти'
    });
    this._inputs = this.inputsParams.map((props) => new Input(props));
    this._form = new Form({
      attr: {
        className: 'auth__form form',
        method: 'POST'
      },
      content: [
        ...(this.inputs as Input[]),
        this._button
      ],
      methods: {
        submit: async (event: Event) => {
          event.preventDefault();
          const formEl = (event.target as HTMLFormElement);
          this.inputs?.forEach(items => {
            items._validateBlock();
          })
          if (!formEl.checkValidity()) {
            this.showError();
          } else {
            this.errorLine?.hide();
            const formdata = new FormData(formEl);
            const request_data = {
              login: (formdata.get('login') as string),
              password: (formdata.get('password') as string)
            }
            await this.signIn(request_data);
          }
        }
      }
    });
  }

  showError(code?: number) {
    let errorMsg;
    switch (code) {
      case 400:
        errorMsg = 'Ошибка в запросе!'
        break;
      case 401:
        errorMsg = 'Логин или пароль введены неправильно!';
        break;
      case 500:
        errorMsg = 'Ошибка на стороне сервера!';
        break;
      default:
        errorMsg = 'Не все поля заполнены корректно!'
    }
    this.errorLine?.setProps({ errorMsg })
    this.errorLine?.show();
  }

  signIn = (request_data: AuthApiSigninType) => {
    this._api.signIn(request_data)
      .then(() => {
        (<any>window).router.go('/chat.html');
      })
      .catch((errorCode) => {
        this.showError(errorCode);
      });
  }

  get errorLine() {
    return this._errorLine;
  }

  get form() {
    return this._form;
  }

  get inputs() {
    return this._inputs;
  }

  get inputsParams(): InputProps[] {
    return [
      { 
        className: 'auth__input form__input',
        name: 'login', 
        type: 'text', 
        placeholder: 'Логин', 
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isAlpha',
            msg: 'Поле должно состоять только из латинских букв'
          }
        ]
      },
      {
        className: 'auth__input form__input',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          }
        ]
      }
    ]
  }

  render() {
    return this._page
  }
}

export default AuthPage;