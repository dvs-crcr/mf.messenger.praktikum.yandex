import { Custom } from './../../blocks/Custom/Custom.js';
import { default as linksData } from './index.data.js';
import { Page } from './../../utils/Page.js';

class IndexPage extends Page {
  navLinks: Custom;
  page: Custom;

  constructor() {
    super();
    this.navLinks = new Custom({
      tagName: 'nav',
      content: this.getNavLinkBlocks(),
    })
    this.page = new Custom({
      attr: { className: 'wrapper' },
      content: [this.navLinks]
    });
  }

  getNavLinkBlocks() {
    return linksData.map(link => {
      const { target, href, title, descr } = link
      return new Custom({
        tagName: 'li',
        _template: `
        <a target="{{target}}" href="{{href}}" onclick="window.router.go('{{href}}'); return false;">{{title}}</a>
        {{descr}}
        `,
        target, href, title, descr
      })
    })
  }

  render() {
    return this.page;
  }

}

export default IndexPage;