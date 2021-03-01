import { Profile } from './../../components/Profile/Profile.js';
import { default as profileInfoTemplate } from './../../components/Profile/Profile__info.html.js';

import { Button } from './../../blocks/Button/Button.js';
import { Custom } from '../../blocks/Custom/Custom.js';

function uploadAvatarProfileHandler() {
  console.log('show modal')
};

const profileContent = new Custom({
  _template: profileInfoTemplate
})

const profilePage = new Profile({
  attr: { className: 'profile' },
  uploadAvatarProfileHandler,
  goBackButton: new Button({
    className: 'button-round button-round_primary', type: 'button', _template: '<i class="fa fa-arrow-left"></i>'
  }),
  avatar: '/assets/img/avatar_profile_128x128.png',
  title: 'John Ivanov',
  profileContent
})

export default profilePage;