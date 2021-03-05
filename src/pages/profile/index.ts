import { Profile } from './../../components/Profile/Profile.js';
import {ProfileApi } from './../../components/Profile/Profile.api.js';
import { default as profileInfoTemplate } from './../../components/Profile/Profile__info.html.js';
import { AuthApi } from './../../components/Auth/Auth.api.js';
import { Modal } from "../../blocks/Modal/Modal.js";
import { Form } from "../../blocks/Form/Form.js";

import { Button } from './../../blocks/Button/Button.js';
import { Custom } from '../../blocks/Custom/Custom.js';

import { Page } from './../../utils/Page.js';

class ProfilePage extends Page {
  _page: Profile;
  _auth_api: AuthApi;
  _profile_api: ProfileApi;
  _profileContent?: Custom;

  constructor() {
    super();
    this._auth_api = new AuthApi();
    this._profile_api = new ProfileApi();
    this.init();
    this._page = new Profile({
      attr: { className: 'profile' },
      uploadAvatarModalHandler: this.uploadAvatarModalHandler,
      goBackButton: new Button({
        className: 'button-round button-round_primary', type: 'button', _template: '<i class="fa fa-arrow-left"></i>'
      }),
      avatar: '/assets/img/avatar_profile_128x128.png',
      avatarHoverStyle: '',
      title: 'John Ivanov',
      profileContent: this._profileContent,
    });
    this._updateUserInfoProps();
  }

  init() {
    this._profileContent = new Custom({
      logoutProfileHandler: this.logoutProfileHandler,
      _template: profileInfoTemplate
    })
  }

  _updateUserInfoProps = async () => {
    const userInfo = await this._getUserData();
    const { phone, display_name, second_name, first_name, login, email, avatar } = userInfo;
    this._profileContent?.setProps({phone, display_name, second_name, first_name, login, email });
    let ava = (avatar ? `https://ya-praktikum.tech${avatar}` : '/assets/img/avatar_profile_128x128.png');
    this._page.setProps({ title: `${first_name} ${second_name}`, avatar: ava });
  }

  _getUserData = async () => {
    const userInfoResponse = await this._auth_api.getUserInfo();
    return JSON.parse(userInfoResponse.responseText);
  }

  uploadAvatarModalHandler = (event: Event, form: Form, modal: Modal) => {
    event.preventDefault();
    const formdata = new FormData((form._element as HTMLFormElement));
    const size = (formdata.get('avatar') as File).size;
    if (size === 0) {
      alert('Файл не выбран!')
    } else {
      this._changeAvatar(formdata);
      modal.hide();
    }
  };

  _changeAvatar = (request_data: FormData) => {
    this._profile_api.changeAvatar(request_data)
        .then(() => {
          alert('Аватар успешно изменен!');
          this._updateUserInfoProps();
        })
        .catch(() => {
          alert('Упс ;( Что-то пошло не так...');
        })
  }

  logoutProfileHandler = () => {
    this._auth_api.logout()
      .then(() => {
        (<any>window).router.go('/auth.html');
      });
  };

  render() {
    return this._page
  }
}

export default ProfilePage;