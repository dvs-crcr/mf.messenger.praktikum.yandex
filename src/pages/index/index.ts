import { renderDOM } from './../../utils/renderDOM.js';

import { Custom } from './../../blocks/Custom/Custom.js'

const linksTemplate = `
<a target="{{target}}" href="{{href}}">{{title}}</a>
{{descr}}
`;

const links = [
  { target:'blank', href: '/auth.html', title: 'Авторизация', descr: ' - макет страницы авторизации' },
  { target:'_blank', href: '/registration.html', title: 'Регистрация', descr: ' - макет страницы регистрации' },
  { target:'_blank', href: '/chat-list.html', title: 'Список чатов', descr: ' - макет страницы со списком чатов' },
  { target:'_blank', href: '/chat.html', title: 'Чат', descr: ' - макет страницы c лентой переписки' },
  { href: '/profile.html', title: 'Профиль', descr: ' - макет страницы c профилем пользователя' },
  { href: '/profile_edit.html', title: 'Редактирование профиля', descr: ' - макет страницы с настройкой пользователя' },
  { href: '/profile_password.html', title: 'Пароль профиля', descr: ' - макет страницы для смены пароля профиля' },
  { href: '/404.html', title: 'Ошибка 404', descr: ' - макет страницы c ошибкой 404' },
  { href: '/500.html', title: 'Ошибка 500', descr: ' - макет страницы c ошибкой 5**' }
];

const indexList = new Custom('nav', {
  content: links.map(link => {
    const { target, href, title, descr } = link
    return new Custom('li', {
      _template: linksTemplate,
      target, href, title, descr
    })
  }),
});

renderDOM('.indexList', indexList, 'INDEX');