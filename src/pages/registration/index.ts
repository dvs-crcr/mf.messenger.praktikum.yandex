import { Auth } from './../../components/Auth/Auth.js';
import { Form } from './../../blocks/Form/Form.js';
import { Button } from './../../blocks/Button/Button.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Page } from './../../utils/Page.js';

class RegistrationPage extends Page {
  page: Auth;

  constructor() {
    super();
    this.page = new Auth({
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

  get errorLine() {
    return new Custom({
      tagName: 'p',
      attr: { className: 'auth__error hidden' },
      content: 'Не все поля заполнены корректно'
    })
  }

  get form() {
    return new Form({
      attr: {
        className: 'auth__form form',
        method: 'POST'
      },
      content: [
        ...this.inputs,
        new Button({
          className: 'auth__button button button_primary button_fullwidth',
          type: 'submit',
          content: 'Зарегистрировать'
        })
      ],
      methods: {
        submit: (event: Event) => {
          event.preventDefault();
          const formEl = (event.target as HTMLFormElement);
          this.inputs.forEach(items => {
            items._validateBlock();
          })
          if (!formEl.checkValidity()) {
            this.errorLine.show();
          } else {
            this.errorLine.hide();
            let formdata = new FormData(formEl);
            let result = {
              email: formdata.get('email'),
              login: formdata.get('login'),
              first_name: formdata.get('first_name'),
              second_name: formdata.get('second_name'),
              phone: formdata.get('phone'),
              password: formdata.get('password')
            }
            console.log(result)
          }
        }
      }
    })
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
          {
            type: 'isRussianAlpha',
            msg: 'Плиз, энтер рассиан леттерз'
          }
        ]
      },
      { 
        className, name: 'second_name', type: 'text', placeholder: 'Фамилия',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isRussianAlpha',
            msg: 'Плиз, энтер рассиан леттерз'
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
    return this.inputsParams.map((props) => new Input(props));
  }

  render() {
    return this.page
  }

}

export default RegistrationPage;