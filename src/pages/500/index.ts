import { Errors, ErrorsProps } from './../../components/Errors/Errors.js';
import { Page } from './../../utils/Page.js';

class ErrorPage extends Page {
  _page: Errors;
  state: ErrorsProps = {};

  constructor() {
    super();
    this._page = new Errors({
      attr: { className: 'wrapper' },
      header: '500',
      p1: 'Что-то пошло не так :(',
      p2: 'Мы уже решаем проблему'
    });
  }

  render() {
    return this._page
  }

}

export default ErrorPage;