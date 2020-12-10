var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Auth } from './../../components/Auth/Auth.js';
import { renderDOM } from './../../utils/renderDOM.js';
import { Form } from './../../blocks/Form/Form.js';
import { Button } from './../../blocks/Button/Button.js';
import { Input } from './../../blocks/Input/Input.js';
import { Custom } from './../../blocks/Custom/Custom.js';
var error_line = new Custom('p', {
    attr: {
        className: 'auth__error hidden'
    },
    content: 'Не все поля заполнены корректно'
});
var className = 'auth__input form__input';
var inputsList = [
    {
        className: className,
        name: 'email', type: 'email', placeholder: 'Электронная почта', validate: [
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
        className: className,
        name: 'login', type: 'text', placeholder: 'Логин',
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
        className: className,
        name: 'first_name', type: 'text', placeholder: 'Имя',
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
        className: className,
        name: 'second_name', type: 'text', placeholder: 'Фамилия',
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
        className: className,
        name: 'phone', type: 'text', placeholder: 'Телефон',
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
        className: className,
        name: 'password', type: 'password', placeholder: 'Пароль',
        validate: [
            {
                type: 'notEmpty',
                msg: 'Поле не должно быть пустым'
            }
        ]
    },
    {
        className: className,
        name: 'password_confirm', type: 'password', placeholder: 'Подтверждение пароля',
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
];
var inputs = inputsList.map(function (props) { return new Input(props); });
var formcontent = __spreadArrays(inputs, [
    new Button({
        className: 'auth__button btn btn_primary btn_fullwidth',
        type: 'submit',
        content: 'Зарегистрировать'
    })
]);
var form = new Form({
    attr: {
        className: 'auth__form form',
        method: 'POST'
    },
    content: formcontent,
    methods: {
        submit: function (event) {
            event.preventDefault();
            var formEl = event.target;
            inputs.forEach(function (items) {
                items._validateBlock();
            });
            if (!formEl.checkValidity()) {
                error_line.show();
            }
            else {
                error_line.hide();
                var formdata = new FormData(formEl);
                var result = {
                    email: formdata.get('email'),
                    login: formdata.get('login'),
                    first_name: formdata.get('first_name'),
                    second_name: formdata.get('second_name'),
                    phone: formdata.get('phone'),
                    password: formdata.get('password')
                };
                console.log(result);
            }
        }
    }
});
var auth = new Auth({
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
renderDOM('.root', auth, 'Регистрация');
//# sourceMappingURL=index.js.map