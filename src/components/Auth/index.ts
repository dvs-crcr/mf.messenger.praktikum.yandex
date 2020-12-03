import { Auth } from './Auth.js'
import { renderDOM } from './../../utils/renderDOM.js'

(<any>window)['auth'] = new Auth({
  locale: {
    ru: {
      header: 'Авотризация',
      errors: {
        wrong_credentials: 'Неверный логин или пароль'
      },
      login: 'Логин',
      password: 'Пароль',
      create_account: 'создать аккаунт',
      enter: 'Войти'
    }
  },
  clickHandler: function() {

  },
  authSubmitFormHander: function(event: Event) {
    event.preventDefault();
    console.log(event.target);
  }
})

renderDOM('.root', (<any>window)['auth'])