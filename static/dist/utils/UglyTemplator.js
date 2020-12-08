var Templator = /** @class */ (function () {
    function Templator(_template) {
        this._template = _template;
        this.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
        this.TAG_TEMPLATE_REGEXP = /\>[\s]*(\{\{(.*?)\}\})[\s]*\</gi;
        this.PROP_TEMPLATE_REGEXP = /\"[\s]*(\{\{(.*?)\}\})[\s]*\"/gi;
    }
    Templator.prototype.get = function (obj, path, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ''; }
        var keys = path.split('.');
        var result = obj;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            result = result[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        return result !== null && result !== void 0 ? result : defaultValue;
    };
    Templator.prototype.compile = function (ctx) {
        var _this = this;
        if (typeof this._template === 'undefined') {
            return undefined;
        }
        var html = this._parseTemplate(this._template, ctx);
        var block = this._htmlToElement(html);
        var fragment = this._prepareFragment(block);
        var tpls = fragment.querySelectorAll('tpl');
        tpls.forEach(function (tpl) {
            var selector = tpl.getAttribute('selector');
            if (selector !== null) {
                var data = _this.get(ctx, selector);
                if (Array.isArray(data)) {
                    var chunkFragment_1 = document.createDocumentFragment();
                    data.forEach(function (item) {
                        if (typeof item === 'object' && typeof item._element !== 'undefined') {
                            chunkFragment_1.appendChild(item.getContent());
                        }
                    });
                    tpl.replaceWith(chunkFragment_1);
                }
                if (typeof data === 'string') {
                    var textnode = document.createTextNode(data);
                    tpl.replaceWith(textnode);
                }
                if (typeof data === 'object' && typeof data._element !== 'undefined') {
                    tpl.replaceWith(data.getContent());
                }
            }
        });
        return fragment;
    };
    Templator.prototype._prepareFragment = function (block) {
        var fragment = document.createDocumentFragment();
        block.forEach(function (item) {
            fragment.appendChild(item);
        });
        return fragment;
    };
    Templator.prototype._htmlToElement = function (html) {
        var template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.childNodes;
    };
    Templator.prototype._parseTemplate = function (template, ctx) {
        var parsedProps = this._parseProps(template, ctx);
        var parsedTags = this._parseTags(parsedProps);
        var parsedText = this._parseText(parsedTags, ctx);
        return parsedText;
    };
    Templator.prototype._parseText = function (template, ctx) {
        var tmpl = template;
        var key = null;
        while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[1]) {
                var tmplValue = key[1].trim();
                var replacedValue = key[0].trim();
                var data = this.get(ctx, tmplValue);
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
            }
        }
        return tmpl;
    };
    Templator.prototype._parseProps = function (template, ctx) {
        var tmpl = template;
        var key = null;
        while ((key = this.PROP_TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[2]) {
                var tmplValue = key[2].trim();
                var replacedValue = key[1].trim();
                var data = this.get(ctx, tmplValue);
                if (typeof data === 'object' && typeof data._element !== 'undefined') {
                    tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data._element.outerHTML);
                    continue;
                }
                if (typeof data === 'function') {
                    window[tmplValue] = data;
                    tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), "window." + tmplValue + "(event)");
                    continue;
                }
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), data);
            }
        }
        return tmpl;
    };
    Templator.prototype._parseTags = function (template) {
        var tmpl = template;
        var key = null;
        while ((key = this.TAG_TEMPLATE_REGEXP.exec(tmpl))) {
            if (key[2]) {
                var tmplValue = key[2].trim();
                var replacedValue = key[1].trim();
                tmpl = tmpl.replace(new RegExp(replacedValue, 'gi'), "<tpl selector=\"" + tmplValue + "\"></tpl>");
            }
        }
        return tmpl;
    };
    return Templator;
}());
export { Templator };
//# sourceMappingURL=UglyTemplator.js.map