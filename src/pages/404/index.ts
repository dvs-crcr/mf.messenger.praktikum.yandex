import { Errors, ErrorsProps } from './../../components/Errors/Errors.js';
import { Page } from './../../utils/Page.js';
class ErrorPage extends Page {
  page: Errors;
  state: ErrorsProps = {};

  constructor() {
    super();
    this.page = new Errors({
      attr: { className: 'wrapper' },
      header: '404',
      p1: 'Страница не найдена',
      p2: 'Возможно вы заблудились?'
    });
  }

  getData(): Promise<ErrorsProps> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({
          attr: { className: 'wrapper' },
          header: '404',
          p1: 'Страница не найдена',
          p2: 'Возможно вы заблудились?'
        })
      }, 3000)
    })
  }

  render() {
    return this.page
  }

}

export default ErrorPage;