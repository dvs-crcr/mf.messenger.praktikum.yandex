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
    const formEl = event.target;
    inputs.forEach(items => items._validateBlock());
    if (formEl.checkValidity()) {
        let formdata = new FormData(formEl);
        let result = {
            email: formdata.get('email'),
            login: formdata.get('login'),
            first_name: formdata.get('first_name'),
            second_name: formdata.get('second_name'),
            display_name: formdata.get('display_name'),
            phone: formdata.get('phone')
        };
        console.log(result);
    }
}
const goBackButton = new Button({
    className: 'btn-round btn-round_primary',
    type: 'button',
    _template: '<i class="fa fa-arrow-left"></i>'
});
const className = 'profile__input';
const inputs = [
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
            },
            {
                type: 'isRussianAlpha',
                msg: 'Плиз, энтер рассиан леттерз'
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
            },
            {
                type: 'isRussianAlpha',
                msg: 'Плиз, энтер рассиан леттерз'
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
            keyup: function (event) {
                const title = event.target.value;
                pageTitle.setProps({ title });
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
].map((props) => new Input(props));
const profileListBlocks = inputs.map(inputItem => {
    return new Custom('li', {
        attr: { className: 'profile__list' },
        label: inputItem.props.label,
        input: [inputItem],
        _template: `
      <span class="profile__settings-label">{{label}}</span>
      <span class="profile__settings-value">{{input}}</span>
    `,
        content: [inputItem]
    });
});
const saveButton = new Button({
    className: 'btn btn_primary profile__btn-save',
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
        content: [saveButton]
    }),
];
const form = new Form({
    attr: { className: 'profile__form form', method: 'POST' },
    methods: { submit: submitProfileHandler },
    content: formContent
});
const pageTitle = new Custom('span', {
    _template: `{{title}}`,
    title: 'John Ivanov'
});
const profilePage = new Profile({
    attr: {
        className: 'profile'
    },
    goBackProfileHandler,
    uploadAvatarProfileHandler,
    goBackButton,
    avatar: '/assets/img/avatar_profile_128x128.png',
    title: [pageTitle],
    profileContent: form
});
renderDOM('.root', profilePage, 'Редактирование профиля');
//# sourceMappingURL=index.js.map