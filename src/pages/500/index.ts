import { Errors, ErrorsProps } from './../../components/Errors/Errors.js';
import { Page } from './../../utils/Page.js';

class ErrorPage extends Page {
  page: Errors;
  state: ErrorsProps = {};

  constructor() {
    super();
    this.page = new Errors({
      attr: { className: 'wrapper' },
      header: '500',
      p1: 'Что-то пошло не так :(',
      p2: 'Мы уже решаем проблему'
    });
  }

  render() {
    return this.page
  }

}

export default ErrorPage;