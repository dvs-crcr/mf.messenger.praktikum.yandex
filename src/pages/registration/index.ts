import { Auth } from './../../components/Auth/Auth.js';
import { renderDOM } from './../../utils/renderDOM.js';

import { Form } from './../../blocks/Form/Form.js' 
import { Button } from './../../blocks/Button/Button.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js'

const error_line = new Custom('p', {
  attr: {
    className: 'auth__error hidden'
  },
  content: 'Не все поля заполнены корректно'
});

const className = 'auth__input form__input'
const inputsList: InputProps[] = [
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

const inputs = inputsList.map((props) => new Input(props))

const formcontent = [
  ...inputs,
  new Button({
    className: 'auth__button btn btn_primary btn_fullwidth',
    type: 'submit',
    content: 'Зарегистрировать'
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
        error_line.show();
      } else {
        error_line.hide();
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
});

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
