import { getObjectValue } from './getObjectValue.js';
var Templator = /** @class */ (function () {
    function Templator(_template) {
        this._template = _template;
        this.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        this.TAG_TEMPLATE_REGEXP = /(\{\{(.*?)\}\})/gi;
        this.PROP_TEMPLATE_REGEXP = /\"[\s]*(\{\{(.*?)\}\})[\s]*\"/gi;
    }
    Templator.prototype.compile = function (ctx) {
        if (typeof this._template === 'undefined') {
            return undefined;
        }
        var html = this.compose(this._template, ctx);
        var block = this._htmlToElement(html);
        var fragment = this._prepareFragment(block);
        var tpls = fragment.querySelectorAll('tpl');
        var _loop_1 = function (i) {
            var selector = tpls[i].textContent;
            if (selector !== null) {
                var data = getObjectValue(ctx, selector);
                if (Array.isArray(data)) {
                    var chunkFragment_1 = document.createDocumentFragment();
                    data.forEach(function (item) {
                        if (typeof item === 'object' && typeof item._element !== 'undefined') {
                            chunkFragment_1.appendChild(item.getContent());
                        }
                    });
                    tpls[i].replaceWith(chunkFragment_1);
                }
                if (typeof data === 'string') {
                    var textnode = document.createTextNode(data);
                    tpls[i].replaceWith(textnode);
                }
                if (typeof data === 'object' && typeof data._element !== 'undefined') {
                    tpls[i].replaceWith(data.getContent());
                }
            }
        };
        for (var i = 0; i < tpls.length; i++) {
            _loop_1(i);
        }
        return fragment;
    };
    Templator.prototype._prepareFragment = function (block) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < block.length; i++) {
            fragment.appendChild(block[i]);
        }
        return fragment;
    };
    Templator.prototype._htmlToElement = function (html) {
        var template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.childNodes;
    };
    Templator.prototype.compose = function (template, ctx) {
        var templateProps = this._parseProps(template, ctx);
        var templateTags = this._parseTags(templateProps);
        return templateTags;
    };
    Templator.prototype._parseProps = function (template, ctx) {
        var tmpl = template;
        var key = null;
        var parserArr = [];
        while ((key = this.PROP_TEMPLATE_REGEXP.exec(tmpl)) !== null) {
            if (key.index === this.PROP_TEMPLATE_REGEXP.lastIndex) {
                this.PROP_TEMPLATE_REGEXP.lastIndex++;
            }
            if (key[2]) {
                var tmplValue = key[2].trim();
                var replacedValue = key[1].trim();
                var data = getObjectValue(ctx, tmplValue);
                parserArr.push({ tmplValue: tmplValue, replacedValue: replacedValue, data: data });
            }
        }
        parserArr.forEach(function (_a) {
            var tmplValue = _a.tmplValue, replacedValue = _a.replacedValue, data = _a.data;
            if (typeof data === 'object' && typeof data._element !== 'undefined') {
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data._element.outerHTML);
            }
            if (typeof data === 'function') {
                window[tmplValue] = data;
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), "window." + tmplValue + "(event)");
            }
            tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
        });
        return tmpl;
    };
    Templator.prototype._parseTags = function (template) {
        var tmpl = template;
        var key = null;
        while ((key = this.TAG_TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[2]) {
                var tmplValue = key[2].trim();
                var replacedValue = key[1].trim();
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), "<tpl>" + tmplValue + "</tpl>");
            }
        }
        return tmpl;
    };
    return Templator;
}());
export { Templator };
//# sourceMappingURL=UglyTemplator.js.map