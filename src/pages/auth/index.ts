import { Auth } from './../../components/Auth/Auth.js';
import { Form } from './../../blocks/Form/Form.js';
import { Button } from './../../blocks/Button/Button.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Page } from './../../utils/Page.js';

class AuthPage extends Page {
  page: Auth;

  constructor() {
    super();
    this.page = new Auth({
      attr: { className: 'wrapper' },
      header: 'Авотризация',
      error_line: this.errorLine,
      form: this.form,
      link: {
        href: '/registration.html',
        title: 'создать аккаунт'
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
          content: 'Войти'
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
              login: formdata.get('login'),
              password: formdata.get('password')
            }
            console.log(result)
          }
        }
      }
    })
  }

  get inputs() {
    return this.inputsParams.map((props) => new Input(props));
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
    return this.page
  }

}

export default AuthPage;