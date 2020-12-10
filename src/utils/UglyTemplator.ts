import { getObjectValue } from './getObjectValue.js'

export class Templator {
  TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  TAG_TEMPLATE_REGEXP = /\>[\s]*(\{\{(.*?)\}\})[\s]*\</gi;
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
    tpls.forEach((tpl) => {
      let selector = tpl.getAttribute('selector');
      if (selector !== null) {
        const data = getObjectValue(ctx, selector);
        if (Array.isArray(data)) {
          let chunkFragment = document.createDocumentFragment();
          data.forEach((item) => {
            if (typeof item === 'object' && typeof item._element !== 'undefined') {
              chunkFragment.appendChild(item.getContent())
            }
          })
          tpl.replaceWith(chunkFragment);
        }
        if (typeof data === 'string') {
          let textnode = document.createTextNode(data);
          tpl.replaceWith(textnode);
        }
        if (typeof data === 'object' && typeof data._element !== 'undefined') {
          tpl.replaceWith(data.getContent());
        }
      }
    })
    return fragment
  }

  _prepareFragment(block: NodeList) {
    let fragment = document.createDocumentFragment();
    block.forEach((item) => {
      fragment.appendChild(item);
    })
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
    let templateText = this._parseText(templateTags, ctx);
    return templateText;
  }

  _parseText(template: string, ctx: {}) {
    let tmpl = template;
    let key = null;

    while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[1]) {
        const tmplValue: string = key[1].trim();
        const replacedValue: string = key[0].trim();
        const data = getObjectValue(ctx, tmplValue);
        
        tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
      }
    }
    return tmpl;
  }

  _parseProps(template: string, ctx: {}) {
    let tmpl = template;
    let key = null;

    while ((key = this.PROP_TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[2]) {
        const tmplValue: string = key[2].trim();
        const replacedValue: string = key[1].trim();
        const data = getObjectValue(ctx, tmplValue);

        if (typeof data === 'object' && typeof data._element !== 'undefined') {
          tmpl = tmpl.replace(
            new RegExp(replacedValue, 'gi'),
            data._element.outerHTML
          );
          continue;
        }

        if (typeof data === 'function') {
          (<any>window)[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(replacedValue, 'gi'),
            `window.${tmplValue}(event)`
          );
          continue;
        }
        tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
      }
    }
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
          `<tpl selector="${tmplValue}"></tpl>`
        );
      }
    }
    return tmpl;
  }


}