import { Profile } from './../../components/Profile/Profile.js';
import { renderDOM } from './../../utils/renderDOM.js';

import { Button } from './../../blocks/Button/Button.js';
import { Form } from './../../blocks/Form/Form.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';


function uploadAvatarProfileHandler() {
  window.location.href = '/profile.html';
};


function goBackProfileHandler() {
  window.history.go(-1);
  return false;
};

function submitProfileHandler(event: Event) {
  event.preventDefault();
  const formEl = (event.target as HTMLFormElement);
  inputs.forEach(items => items._validateBlock())
  if (formEl.checkValidity()) {
    let formdata = new FormData(formEl);
    let result = {
      newPassword: formdata.get('newPassword'),
      oldPassword: formdata.get('oldPassword')
    }
    console.log(result)
  }
}

const goBackButton = new Button({
  className: 'button-round button-round_primary',
  type: 'button',
  _template: '<i class="fa fa-arrow-left"></i>'
});

const inputsList: InputProps[] = [
  { 
    className: 'profile__input', name: 'oldPassword', type: 'password', placeholder: '•••••••••••••••••',
    validate: [
      { type: 'notEmpty', msg: 'Поле не должно быть пустым' },
    ],
    label: 'Старый пароль'
  },
  { 
    className: 'profile__input', name: 'newPassword', type: 'password', placeholder: '•••••••••••••••••',
    validate: [
      { type: 'notEmpty', msg: 'Поле не должно быть пустым' }
    ],
    label: 'Новый пароль'
  },
  { 
    className: 'profile__input', name: 'newPasswordConfirm', type: 'password', placeholder: '•••••••••••••••••',
    validate: [
      { type: 'notEmpty', msg: 'Поле не должно быть пустым' },
      { 
        type: 'isInputValueEqual', msg: 'Пароли не совпадают',
        options: { selector: '.profile__input[name="newPassword"]' }
      }
    ],
    label: 'Подтверждение пароля'
  }
]

const inputs = inputsList.map((props) => new Input(props));

const profileListBlocks = inputs.map(inputItem => {
  return new Custom('li', { 
    attr: { className: 'profile__list' },
    label: inputItem.props.label,
    input: [ inputItem ],
    _template: `
      <span class="profile__settings-label">{{label}}</span>
      <span class="profile__settings-value">{{input}}</span>
    `,
    content: [ inputItem ]
  })
});

const saveButton = new Button({
  className: 'button button_primary profile__button-save',
  type: 'submit',
  content: 'Сохранить'
});

const formContent = [
  new Custom('ul', { 
    attr: { className: 'profile__list' },
    content: profileListBlocks
  }),
  new Custom('div', { 
    attr: { className: 'profile__buttons form__group' },
    content: [ saveButton ]
  }),

]

const form = new Form({
  attr: { className: 'profile__form form', method: 'POST' },
  methods: { submit: submitProfileHandler },
  content: formContent
});

const profilePage = new Profile({
  attr: {
    className: 'profile'
  },
  goBackProfileHandler,
  uploadAvatarProfileHandler,
  goBackButton,
  avatar: '/assets/img/avatar_profile_128x128.png',
  title: 'Смена пароля',
  profileContent: form
})

renderDOM('.root', profilePage, 'Редактирование пароля');