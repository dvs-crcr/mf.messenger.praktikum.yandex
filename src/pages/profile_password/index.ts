import { Profile } from './../../components/Profile/Profile.js';
import { ProfileApi, ProfileChangePasswordRequestType } from './../../components/Profile/Profile.api.js';
import { AuthApi } from "../../components/Auth/Auth.api.js";

import { Button } from './../../blocks/Button/Button.js';
import { Form } from './../../blocks/Form/Form.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Input, InputProps } from './../../blocks/Input/Input.js';

import { Page } from './../../utils/Page.js';

class ProfilePassword extends Page {
  _api: ProfileApi;
  _auth_api: AuthApi;
  _page: Profile;
  _goBackButton?: Button;
  _inputs?: Input[];
  _profileListBlocks?: Custom[];
  _formContent?: Custom[];
  _saveButton?: Button;
  _form?: Form;

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
      title: 'Смена пароля',
      profileContent: this._form
    });
    this._updateUserInfoProps();
  }

  init() {
    this._goBackButton = new Button({
      className: 'button-round button-round_primary',
      type: 'button',
      _template: '<i class="fa fa-arrow-left"></i>'
    });
    this._inputs = this.inputsParams.map((props) => new Input(props));
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
    this._saveButton = new Button({
      className: 'button button_primary profile__button-save',
      type: 'submit',
      content: 'Сохранить'
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
      content: this._formContent
    });
  }

  _updateUserInfoProps = async () => {
    const userInfo = await this._getUserData();
    const { avatar } = userInfo;
    let ava = (avatar ? `https://ya-praktikum.tech${avatar}` : '/assets/img/avatar_profile_128x128.png');
    this._page.setProps({ avatar: ava });
  }

  _getUserData = async () => {
    const userInfoResponse = await this._auth_api.getUserInfo();
    return JSON.parse(userInfoResponse.responseText);
  }

  uploadAvatarProfileHandler() {
    window.location.href = '/profile.html';
  }

  submitProfileHandler = (event: Event) => {
    event.preventDefault();
    const formEl = (event.target as HTMLFormElement);
    this._inputs?.forEach(items => items._validateBlock())
    if (formEl.checkValidity()) {
      let formdata = new FormData(formEl);
      let result = {
        newPassword: (formdata.get('newPassword') as string),
        oldPassword: (formdata.get('oldPassword') as string)
      }
      this._changePassword(result);
      console.log(result)
    }
  }

  _changePassword = (request_data: ProfileChangePasswordRequestType) => {
    this._api.changePassword(request_data)
        .then(() => {
          alert('Пароль успешно изменен!');
        })
        .catch(() => {
          alert('Упс ;( Что-то пошло не так...');
        })
  }

  get inputsParams(): InputProps[] {
    return [
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

  }

  render() {
    return this._page;
  }
}

export default ProfilePassword;