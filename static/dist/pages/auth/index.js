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
var inputsParams = [
    {
        className: 'auth__input form__input',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
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
        className: 'auth__input form__input',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        validate: [
            {
                type: 'notEmpty',
                msg: 'Поле не должно быть пустым'
            }
        ]
    }
];
var inputs = inputsParams.map(function (props) { return new Input(props); });
var formcontent = __spreadArrays(inputs, [
    new Button({
        className: 'auth__button btn btn_primary btn_fullwidth',
        type: 'submit',
        content: 'Войти'
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
                    login: formdata.get('login'),
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
    header: 'Авотризация',
    error_line: error_line,
    form: form,
    link: {
        href: '/registration.html',
        title: 'создать аккаунт'
    }
});
renderDOM('.root', auth, 'Авторизация');
//# sourceMappingURL=index.js.map