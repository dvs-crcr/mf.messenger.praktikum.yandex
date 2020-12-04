import { Auth } from './Auth.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { Button } from './../Button/Button.js';

(<any>window)['btn'] = new Button({
  attr: {
    class: ['auth__button', 'btn', 'btn_primary', 'btn_fullwidth'].join(' '),
    type: 'submit'
  },
  text: 'Войти'
});

(<any>window)['auth'] = new Auth({
  attr: {
    class: 'auth'
  },
  header: 'Авотризация',
  wrong_credentials: 'Неверный логин или пароль',
  label: {
    login: 'Логин',
    password: 'Пароль',
    create_account: 'создать аккаунт'
  },
  buttons: (<any>window)['btn'],
  authSubmitFormHander: (event: Event) => {
    event.preventDefault();
    console.log(event.target);
  }
});

renderDOM('.root', (<any>window)['auth'])
