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
  content: 'Не все поля заполнены корректно'
})

const inputsParams = [
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
      const formEl = (event.target as HTMLFormElement);
      inputs.forEach(items => {
        items._validateBlock();
      })
      if (!formEl.checkValidity()) {
        error_line.getContent()?.classList.remove('hidden');
      } else {
        error_line.getContent()?.classList.add('hidden');
        let formdata = new FormData(formEl);
        let result = {
          login: formdata.get('login'),
          password: formdata.get('password')
        }
        console.log(result)
      }
    }
  }
});

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

renderDOM('.root', auth, 'Авторизация')
