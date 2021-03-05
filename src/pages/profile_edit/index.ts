import { Profile } from './../../components/Profile/Profile.js';
import { ProfileApi, ProfileUserRequestType } from './../../components/Profile/Profile.api.js';
import { AuthApi } from "../../components/Auth/Auth.api.js";
import { validator } from './../../utils/Validator.js';

import { Button } from './../../blocks/Button/Button.js';
import { Form } from './../../blocks/Form/Form.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';

import { Page } from './../../utils/Page.js';

type PlainObject<T = unknown> = {
  [k in string]: T;
};

class ProfileEdit extends Page {
  _api: ProfileApi;
  _auth_api: AuthApi;
  _page: Profile;
  _goBackButton?: Button;
  _pageTitle?: Custom;
  _form?: Form;
  _inputs?: Input[];
  _profileListBlocks?: Custom[];
  _formContent?: Custom[];
  _saveButton?: Button;

  constructor() {
    super();
    this._api = new ProfileApi();
    this._auth_api = new AuthApi();
    this.init();
    this._page = new Profile({
      attr: {
        className: 'profile'
      },
      uploadAvatarProfileHandler: this.uploadAvatarProfileHandler,
      goBackButton: this._goBackButton,
      avatar: '/assets/img/avatar_profile_128x128.png',
      avatarHoverStyle: 'display: none;',
      title: [ this._pageTitle! ],
      profileContent: this._form
    });
    this._updateUserInfoProps();
  }

  init() {
    this._pageTitle = new Custom({
      tagName: 'span',
      _template: `{{title}}`,
      title: 'John Ivanov'
    });
    this._inputs = this.inputsParams.map((props) => new Input(props));
    this._goBackButton = new Button({
      className: 'button-round button-round_primary',
      type: 'button',
      _template: '<i class="fa fa-arrow-left"></i>'
    });
    this._saveButton = new Button({
      className: 'button button_primary profile__button-save',
      type: 'submit',
      content: 'Сохранить'
    });
    this._profileListBlocks = this._inputs?.map(inputItem => {
      return new Custom({
        tagName: 'li',
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
    this._formContent = [
      new Custom({
        tagName: 'ul',
        attr: { className: 'profile__list' },
        content: this._profileListBlocks
      }),
      new Custom({
        attr: { className: 'profile__buttons form__group' },
        content: [ this._saveButton ]
      }),
    ];
    this._form = new Form({
      attr: { className: 'profile__form form', method: 'POST' },
      methods: { submit: this.submitProfileHandler },
      content: this._formContent,
    });
  }

  _updateUserInfoProps = async () => {
    const userInfo = await this._getUserData();
    const { phone, display_name, second_name, first_name, login, email, avatar } = userInfo;
    const omitedUserInfo: PlainObject = { phone, display_name, second_name, first_name, login, email, avatar };
    this._inputs?.forEach((input) => {
      const { name } = input.props;
      if (omitedUserInfo.hasOwnProperty(name)) {
        input.setProps({ attr: {value: omitedUserInfo[name]} });
      }
    });
    let ava = (avatar ? `https://ya-praktikum.tech${avatar}` : '/assets/img/avatar_profile_128x128.png');
    this._pageTitle?.setProps({ title: `${first_name} ${second_name}` });
    this._page?.setProps({ avatar: ava });
  }

  _getUserData = async () => {
    const userInfoResponse = await this._auth_api.getUserInfo();
    return JSON.parse(userInfoResponse.responseText);
  }

  uploadAvatarProfileHandler() {
    window.location.href = '/profile.html';
  }

  submitProfileHandler = async (event: Event) => {
    event.preventDefault();
    const formEl = (event.target as HTMLFormElement);
    this._inputs?.forEach(items => items._validateBlock())
    if (formEl.checkValidity()) {
      let formdata = new FormData(formEl);
      let result = {
        email: (formdata.get('email') as string),
        login: (formdata.get('login') as string),
        first_name: (formdata.get('first_name') as string),
        second_name: (formdata.get('second_name') as string),
        display_name: (formdata.get('display_name') as string),
        phone: (formdata.get('phone') as string),
      }
      this._updateUserData(result);
    }
  }

  _updateUserData = (request_data: ProfileUserRequestType) => {
    this._api.updateUserData(request_data)
        .then(() => {
          alert('Данные успешно изменены!');
        })
        .catch(() => {
          alert('Упс ;( Что-то пошло не так...');
        })
  }

  get inputsParams(): InputProps[] {
    const className = 'profile__input';
    return [
      {
        className, name: 'email', type: 'email',
        placeholder: 'johndoe@mail.rus',
        value: 'johndoe@mail.rus',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isEmail',
            msg: 'Поле должно содержать адрес электронной почты'
          }
        ],
        label: 'Электронная почта'
      },
      {
        className, name: 'login', type: 'text',
        placeholder: 'johndoe',
        value: 'johndoe',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isAlpha',
            msg: 'Поле должно состоять только из латинских букв'
          }
        ],
        label: 'Логин'
      },
      {
        className, name: 'first_name', type: 'text',
        placeholder: 'Иван',
        value: 'Иван',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          }
        ],
        label: 'Имя'
      },
      {
        className, name: 'second_name', type: 'text',
        placeholder: 'Петров',
        value: 'Petrov',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          }
        ],
        label: 'Фамилия'
      },
      {
        className, name: 'display_name', type: 'text',
        placeholder: 'John Ivanov',
        value: 'John Ivanov',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          }
        ],
        label: 'Имя в чате',
        methods: {
          keyup: (event: Event) => {
            const title = (event.target as HTMLInputElement).value;
            this._pageTitle?.setProps({ title: validator.escapeHtml(title) })
          }
        }
      },
      {
        className, name: 'phone', type: 'text',
        placeholder: '81234567890',
        value: '81234567890',
        validate: [
          {
            type: 'notEmpty',
            msg: 'Поле не должно быть пустым'
          },
          {
            type: 'isPhone',
            msg: 'Поле должно содержать номер телефона'
          }
        ],
        label: 'Телефон'
      }
    ];
  }

  render() {
    return this._page
  }
}

export default ProfileEdit;
