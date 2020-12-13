import { getObjectValue } from './getObjectValue.js'

export class Templator {
  TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  TAG_TEMPLATE_REGEXP = /(\{\{(.*?)\}\})/gi;
  PROP_TEMPLATE_REGEXP = /\"[\s]*(\{\{(.*?)\}\})[\s]*\"/gi;

  constructor(private _template: string | undefined) {}
  
  compile(ctx: {}) {
    if (typeof this._template === 'undefined') {
      return undefined
    }
    let html = this.compose(this._template, ctx);
    let block = this._htmlToElement(html);
    let fragment = this._prepareFragment(block);
    let tpls = fragment.querySelectorAll('tpl');
    for (let i = 0; i < tpls.length; i++) {
      let selector = tpls[i].textContent;
      if (selector !== null) {
        const data = getObjectValue(ctx, selector);
        if (Array.isArray(data)) {
          let chunkFragment = document.createDocumentFragment();
          data.forEach((item) => {
            if (typeof item === 'object' && typeof item._element !== 'undefined') {
              chunkFragment.appendChild(item.getContent())
            }
          })
          tpls[i].replaceWith(chunkFragment);
        }
        if (typeof data === 'string') {
          let textnode = document.createTextNode(data);
          tpls[i].replaceWith(textnode);
        }
        if (typeof data === 'object' && typeof data._element !== 'undefined') {
          tpls[i].replaceWith(data.getContent());
        }
      }
    }
    return fragment;
  }

  _prepareFragment(block: NodeList) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < block.length; i++) {
      fragment.appendChild(block[i]);
    }
    return fragment;
  }

  _htmlToElement(html: string): NodeList {
    let template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.childNodes;
  }

  compose(template: string, ctx: {}) {
    let templateProps = this._parseProps(template, ctx);
    let templateTags = this._parseTags(templateProps);
    return templateTags;
  }

  _parseProps(template: string, ctx: {}) {
    let tmpl = template;
    let key = null;
    let parserArr = [];
    while ((key = this.PROP_TEMPLATE_REGEXP.exec(tmpl)) !== null) {
      if (key.index === this.PROP_TEMPLATE_REGEXP.lastIndex) {
        this.PROP_TEMPLATE_REGEXP.lastIndex++;
      }
      if (key[2]) {
        const tmplValue: string = key[2].trim();
        const replacedValue: string = key[1].trim();
        const data = getObjectValue(ctx, tmplValue);
        parserArr.push({ tmplValue, replacedValue, data })
      }
    }
    parserArr.forEach(({ tmplValue, replacedValue, data }) => {
      if (typeof data === 'object' && typeof data._element !== 'undefined') {
        tmpl = tmpl.replace(
          new RegExp(replacedValue, 'gi'),
          data._element.outerHTML
        );
      } 
      if (typeof data === 'function') {
        (<any>window)[tmplValue] = data;
        tmpl = tmpl.replace(
          new RegExp(replacedValue, 'gi'),
          `window.${tmplValue}(event)`
        );
      }
      tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
    });
    return tmpl;
  }

  _parseTags(template: string) {
    let tmpl = template;
    let key = null;
    while ((key = this.TAG_TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[2]) {
        const tmplValue: string = key[2].trim();
        const replacedValue: string = key[1].trim();
        tmpl = tmpl.replace(
          new RegExp(replacedValue, 'gi'), 
          `<tpl>${tmplValue}</tpl>`
        );
      }
    }
    return tmpl;
  }

}