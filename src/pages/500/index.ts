import { Errors } from './../../components/Errors/Errors.js';
import { renderDOM } from './../../utils/renderDOM.js';

const errorPage = new Errors({
  attr: {
    class: 'error-page'
  },
  header: '500',
  p1: 'Что-то пошло не так :(',
  p2: 'Мы уже решаем проблему',
  errorsGoBackHandler: (event: Event) => {
    event.preventDefault();
    window.history.go(-1);
  }
});

renderDOM('.root', errorPage, '500 - Ошибка сервера')