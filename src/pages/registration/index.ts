import { Auth } from './../../components/Auth/Auth.js';
import { AuthApi, AuthApiSignupType } from './../../components/Auth/Auth.api.js';
import { Form } from './../../blocks/Form/Form.js';
import { Button } from './../../blocks/Button/Button.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Page } from './../../utils/Page.js';

class RegistrationPage extends Page {
  _api: AuthApi;
  _page: Auth;
  _inputs?: Input[];
  _button?: Button;
  _errorLine?: Custom;
  _form?: Form;

  constructor() {
    super();
    this._api = new AuthApi();
    this.init();
    this._page = new Auth({
      attr: { className: 'wrapper' },
      header: 'Регистрация',
      error_line: this.errorLine,
      form: this.form,
      link: {
        href: '/auth.html',
        title: '← уже есть аккаунт'
      }
    })
  }

  init() {
    this._errorLine = new Custom({
      tagName: 'p',
      attr: { className: 'auth__error hidden' },
      _template: `{{errorMsg}}`
    });
    this._inputs = this.inputsParams.map((props) => new Input(props));
    this._button = new Button({
      className: 'auth__button button button_primary button_fullwidth',
      type: 'submit',
      content: 'Зарегистрировать'
    });
    this._form = new Form({
      attr: {
        className: 'auth__form form',
        method: 'POST'
      },
      content: [
        ...(this.inputs as Input[]),
        this._button,
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
            let formdata = new FormData(formEl);
            let request_data = {
              email: formdata.get('email'),
              login: formdata.get('login'),
              first_name: formdata.get('first_name'),
              second_name: formdata.get('second_name'),
              phone: formdata.get('phone'),
              password: formdata.get('password')
            }
            await this.signUp((request_data as AuthApiSignupType));
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
      case 409:
        errorMsg = 'Логин уже существует!';
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

  signUp = (request_data: AuthApiSignupType) => {
    this._api.signUp(request_data)
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

  get inputsParams(): InputProps[] {
    const className = 'auth__input form__input'
    return [
      {
        className, name: 'email', type: 'email', placeholder: 'Электронная почта',validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isEmail',
            msg: 'Поле должно содержать адрес электронной почты'
          }
        ]
      },
      { 
        className, name: 'login', type: 'text', placeholder: 'Логин',
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
        className, name: 'first_name', type: 'text', placeholder: 'Имя',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
        ]
      },
      { 
        className, name: 'second_name', type: 'text', placeholder: 'Фамилия',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          }
        ]
      },
      { 
        className, name: 'phone', type: 'text', placeholder: 'Телефон',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isPhone',
            msg: 'Поле должно содержать номер телефона'
          }
        ]
      },
      { 
        attr: {
          id: 'password'
        },
        className, name: 'password', type: 'password', placeholder: 'Пароль',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          }
        ]
      },
      { 
        className, name: 'password_confirm', type: 'password', placeholder: 'Подтверждение пароля',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isInputValueEqual',
            msg: 'Пароли не совпадают',
            options: {
              selector: '#password'
            }
          }
        ]
      }
    ]
  }

  get inputs() {
    return this._inputs;
  }

  render() {
    return this._page
  }
}

export default RegistrationPage;