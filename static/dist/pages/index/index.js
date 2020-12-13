import { renderDOM } from './../../utils/renderDOM.js';
import { Custom } from './../../blocks/Custom/Custom.js';
var linksTemplate = "\n<a target=\"{{target}}\" href=\"{{href}}\">{{title}}</a>\n{{descr}}\n";
var links = [
    { target: 'blank', href: '/auth.html', title: 'Авторизация', descr: ' - макет страницы авторизации' },
    { target: '_blank', href: '/registration.html', title: 'Регистрация', descr: ' - макет страницы регистрации' },
    { target: '_blank', href: '/chat-list.html', title: 'Список чатов', descr: ' - макет страницы со списком чатов' },
    { target: '_blank', href: '/chat.html', title: 'Чат', descr: ' - макет страницы c лентой переписки' },
    { href: '/profile.html', title: 'Профиль', descr: ' - макет страницы c профилем пользователя' },
    { href: '/profile_edit.html', title: 'Редактирование профиля', descr: ' - макет страницы с настройкой пользователя' },
    { href: '/profile_password.html', title: 'Пароль профиля', descr: ' - макет страницы для смены пароля профиля' },
    { href: '/404.html', title: 'Ошибка 404', descr: ' - макет страницы c ошибкой 404' },
    { href: '/500.html', title: 'Ошибка 500', descr: ' - макет страницы c ошибкой 5**' }
];
var indexList = new Custom('nav', {
    content: links.map(function (link) {
        var target = link.target, href = link.href, title = link.title, descr = link.descr;
        return new Custom('li', {
            _template: linksTemplate,
            target: target, href: href, title: title, descr: descr
        });
    }),
});
renderDOM('.indexList', indexList, 'INDEX');
//# sourceMappingURL=index.js.map