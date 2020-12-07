import { Errors } from './../../components/Errors/Errors.js';
import { renderDOM } from './../../utils/renderDOM.js';
var errorPage = new Errors({
    attr: {
        class: 'error-page'
    },
    header: '404',
    p1: 'Страница не найдена',
    p2: 'Возможно вы заблудились?',
    errorsGoBackHander: function (event) {
        event.preventDefault();
        window.history.go(-1);
    }
});
renderDOM('.root', errorPage, '404 - Страница не найдена');
//# sourceMappingURL=index.js.map