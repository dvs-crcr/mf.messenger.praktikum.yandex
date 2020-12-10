import { Profile } from './../../components/Profile/Profile.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { Button } from './../../blocks/Button/Button.js';
import { Form } from './../../blocks/Form/Form.js';
import { Custom } from './../../blocks/Custom/Custom.js';
import { Input } from './../../blocks/Input/Input.js';
function uploadAvatarProfileHandler() {
    window.location.href = '/profile.html';
}
;
function goBackProfileHandler() {
    window.history.go(-1);
    return false;
}
;
function submitProfileHandler(event) {
    event.preventDefault();
    var formEl = event.target;
    inputs.forEach(function (items) { return items._validateBlock(); });
    if (formEl.checkValidity()) {
        var formdata = new FormData(formEl);
        var result = {
            newPassword: formdata.get('newPassword'),
            oldPassword: formdata.get('oldPassword')
        };
        console.log(result);
    }
}
var goBackButton = new Button({
    className: 'btn-round btn-round_primary',
    type: 'button',
    _template: '<i class="fa fa-arrow-left"></i>'
});
var inputsList = [
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
];
var inputs = inputsList.map(function (props) { return new Input(props); });
var profileListBlocks = inputs.map(function (inputItem) {
    return new Custom('li', {
        attr: { className: 'profile__list' },
        label: inputItem.props.label,
        input: [inputItem],
        _template: "\n      <span class=\"profile__settings-label\">{{label}}</span>\n      <span class=\"profile__settings-value\">{{input}}</span>\n    ",
        content: [inputItem]
    });
});
var saveButton = new Button({
    className: 'btn btn_primary profile__btn-save',
    type: 'submit',
    content: 'Сохранить'
});
var formContent = [
    new Custom('ul', {
        attr: { className: 'profile__list' },
        content: profileListBlocks
    }),
    new Custom('div', {
        attr: { className: 'profile__buttons form__group' },
        content: [saveButton]
    }),
];
var form = new Form({
    attr: { className: 'profile__form form', method: 'POST' },
    methods: { submit: submitProfileHandler },
    content: formContent
});
var profilePage = new Profile({
    attr: {
        className: 'profile'
    },
    goBackProfileHandler: goBackProfileHandler,
    uploadAvatarProfileHandler: uploadAvatarProfileHandler,
    goBackButton: goBackButton,
    avatar: '/assets/img/avatar_profile_128x128.png',
    title: 'Смена пароля',
    profileContent: form
});
renderDOM('.root', profilePage, 'Редактирование пароля');
//# sourceMappingURL=index.js.map