export class Templator {
    constructor(_template) {
        this._template = _template;
        this.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        this.TAG_TEMPLATE_REGEXP = /\>[\s]*(\{\{(.*?)\}\})[\s]*\</gi;
        this.PROP_TEMPLATE_REGEXP = /\"[\s]*(\{\{(.*?)\}\})[\s]*\"/gi;
    }
    get(obj, path, defaultValue = '') {
        const keys = path.split('.');
        let result = obj;
        for (let key of keys) {
            result = result[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        return result !== null && result !== void 0 ? result : defaultValue;
    }
    compile(ctx) {
        if (typeof this._template === 'undefined') {
            return undefined;
        }
        let html = this._parseTemplate(this._template, ctx);
        let block = this._htmlToElement(html);
        let fragment = this._prepareFragment(block);
        let tpls = fragment.querySelectorAll('tpl');
        tpls.forEach((tpl) => {
            let selector = tpl.getAttribute('selector');
            if (selector !== null) {
                const data = this.get(ctx, selector);
                if (Array.isArray(data)) {
                    let chunkFragment = document.createDocumentFragment();
                    data.forEach((item) => {
                        if (typeof item === 'object' && typeof item._element !== 'undefined') {
                            chunkFragment.appendChild(item.getContent());
                        }
                    });
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
        });
        return fragment;
    }
    _prepareFragment(block) {
        let fragment = document.createDocumentFragment();
        block.forEach((item) => {
            fragment.appendChild(item);
        });
        return fragment;
    }
    _htmlToElement(html) {
        let template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.childNodes;
    }
    _parseTemplate(template, ctx) {
        let parsedProps = this._parseProps(template, ctx);
        let parsedTags = this._parseTags(parsedProps);
        let parsedText = this._parseText(parsedTags, ctx);
        return parsedText;
    }
    _parseText(template, ctx) {
        let tmpl = template;
        let key = null;
        while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const replacedValue = key[0].trim();
                const data = this.get(ctx, tmplValue);
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
            }
        }
        return tmpl;
    }
    _parseProps(template, ctx) {
        let tmpl = template;
        let key = null;
        while ((key = this.PROP_TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[2]) {
                const tmplValue = key[2].trim();
                const replacedValue = key[1].trim();
                const data = this.get(ctx, tmplValue);
                if (typeof data === 'object' && typeof data._element !== 'undefined') {
                    tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data._element.outerHTML);
                    continue;
                }
                if (typeof data === 'function') {
                    window[tmplValue] = data;
                    tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), `window.${tmplValue}(event)`);
                    continue;
                }
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
            }
        }
        return tmpl;
    }
    _parseTags(template) {
        let tmpl = template;
        let key = null;
        while ((key = this.TAG_TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[2]) {
                const tmplValue = key[2].trim();
                const replacedValue = key[1].trim();
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), `<tpl selector="${tmplValue}"></tpl>`);
            }
        }
        return tmpl;
    }
}
//# sourceMappingURL=UglyTemplator.js.map