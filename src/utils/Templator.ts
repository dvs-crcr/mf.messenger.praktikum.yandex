type TemplatorType = {
  [index: string]: any
}

export class Templator {
  TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

  constructor(private _template: string) {}
  
  get(obj: {}, path: string, defaultValue: string = ''): any {
    const keys = path.split('.');
    let result: TemplatorType = obj;
    for (let key of keys) {
      result = result[key];
      if (result === undefined) {
        return defaultValue;        
      }
    }
    return result ?? defaultValue;
  } 

  compile(ctx: {}) {
    return this._compileTemplate(this._template, ctx);
  }

  _compileTemplate(template: string, ctx: {}) {
    let tmpl = template;
    let key = null;

    while ((key = this.TEMPLATE_REGEXP.exec(tmpl))) {
      if (key[1]) {
        const tmplValue: string = key[1].trim();
        const data = this.get(ctx, tmplValue);

        console.log(data)

        if (typeof data === 'function') {
          (<any>window)[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(key[0], 'gi'),
            `window.${key[1].trim()}(event)`
          );
          continue;
        }
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
      }
    }
    return tmpl;
  }


}