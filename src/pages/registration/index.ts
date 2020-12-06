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
  content: 'Заполнены не все поля'
})

const className = 'auth__input form__input'
const inputsParams = [
  { className, name: 'email', type: 'email', placeholder: 'Электронная почта' },
  { className, name: 'login', type: 'text', placeholder: 'Логин' },
  { className, name: 'first_name', type: 'text', placeholder: 'Имя' },
  { className, name: 'second_name', type: 'text', placeholder: 'Фамилия' },
  { className, name: 'phone', type: 'text', placeholder: 'Телефон' },
  { className, name: 'password', type: 'password', placeholder: 'Пароль' },
  { className, name: 'password_confirm', type: 'password', placeholder: 'Подтверждение пароля' }
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
      value: 'Зарегистрировать'
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
  header: 'Регистрация',
  error_line: error_line,
  form: form,
  link: {
    href: '/auth.html',
    title: '← уже есть аккаунт'
  }
});

renderDOM('.root', auth, 'Регистрация')
