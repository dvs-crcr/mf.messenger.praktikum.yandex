import { Errors } from './../../components/Errors/Errors.js';
import { renderDOM } from './../../utils/renderDOM.js';
var errorPage = new Errors({
    attr: {
        class: 'error-page'
    },
    header: '500',
    p1: 'Что-то пошло не так :(',
    p2: 'Мы уже решаем проблему',
    errorsGoBackHander: function (event) {
        event.preventDefault();
        window.history.go(-1);
    }
});
renderDOM('.root', errorPage, '500 - Ошибка сервера');
//# sourceMappingURL=index.js.map