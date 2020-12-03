import { template } from "../components/Auth/Auth.html";

export interface Templator {

}

export class Templator implements Templator {
  static TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

  constructor(private _template: string) {}
  
  get(obj, path, defaultValue) {
    const keys = path.split('.');

    let result = obj;
    for (let key of keys) {
      result = result[key];

      if (result === undefined) {
        return defaultValue;        
      }
    }

    return result ?? defaultValue; // "??" — [оператор нуллевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифил)
} 

  compile(ctx) {
    return _compileTemplate(this._template, ctx);
  }

_compileTemplate(template: string, ctx) {
let tmpl = template;
let key = null;

// Важно делать exec именно через константу, иначе уйдете в бесконечный цикл
while ((key = Templator.TEMPLATE_REGEXP.exec(tmpl))) {
if (key[1]) {
const tmplValue = key[1].trim();
const data = window.get(ctx, tmplValue);

if (typeof data === "function") {
window[tmplValue] = data;
tmpl = tmpl.replace(
new RegExp(key[0], "gi"),
`window.${key[1].trim()}()`
);
continue;
}

tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
}
}

return tmpl;
}


}