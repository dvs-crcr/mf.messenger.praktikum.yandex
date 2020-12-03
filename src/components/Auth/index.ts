import { Auth } from './Auth.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { Button } from './../Button/Button.js';

// <button class="auth__button btn btn_primary btn_fullwidth" type="submit">{{enter}}</button>
const btn = new Button({
  className: ['auth__button', 'btn', 'btn_primary', 'btn_fullwidth'],
  text: 'Войти'
}, true);

(<any>window)['btn'] = btn;

(<any>window)['auth'] = new Auth({
  className: 'auth',
  header: 'Авотризация',
  wrong_credentials: 'Неверный логин или пароль',
  login: 'Логин',
  password: 'Пароль',
  create_account: 'создать аккаунт',
  'btn:enter': btn,
  authSubmitFormHander: (event: Event) => {
    event.preventDefault();
    console.log(event.target);
  }
}, true);

renderDOM('.root', (<any>window)['auth'])