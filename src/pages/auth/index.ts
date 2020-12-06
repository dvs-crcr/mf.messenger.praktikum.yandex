import { Auth } from './../../components/Auth/Auth.js';
import { renderDOM } from './../../utils/renderDOM.js';

import { Form } from './../../blocks/Form/Form.js' 
import { Button } from './../../blocks/Button/Button.js';
import { Input } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js'

const error_line = new Custom('p', {
  attr: {
    className: 'auth__error hidden'
  },
  content: 'Неверный логин или пароль'
})

const inputsParams = [
  { className: 'auth__input form__input', name: 'login', type: 'text', placeholder: 'Логин' },
  { className: 'auth__input form__input', name: 'password', type: 'password', placeholder: 'Пароль' }
]

const inputs = inputsParams.map((props) => {
  return new Input(props)
})

const formcontent = [
  ...inputs,
  new Button({
    attr: {
      className: 'auth__button btn btn_primary btn_fullwidth',
      type: 'submit',
      value: 'Войти'
    }
  })
];

const form = new Form({
  attr: {
    className: 'auth__form form',
    method: 'POST'
  },
  content: formcontent,
  methods: {
    submit: (event: Event) => {
      event.preventDefault();
      let formdata = new FormData((event.target as HTMLFormElement));
      let result = {
        login: formdata.get('login'),
        password: formdata.get('password')
      }
      console.log(result)
      showError();
    }
  }
});

function showError() {
  error_line.getContent()?.classList.remove('hidden');
  inputs.forEach((input) => {
    input.getContent()?.classList.add('form__input_error');
  })
}

const auth = new Auth({
  attr: {
    className: 'auth'
  },
  header: 'Авотризация',
  error_line: error_line,
  form: form,
  link: {
    href: '/registration.html',
    title: 'создать аккаунт'
  }
});

(<any>window)['inputs'] = inputs[0];

renderDOM('.root', auth, 'Авторизация')
