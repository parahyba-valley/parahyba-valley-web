import directives from '~/directives';
import { getValueFromScope } from '~/utils/index';

export default class ParahybaCompiler {
  template: string = '';
  scope: Object;
  compiledElement: HTMLElement;
  
  constructor(scope: Object, template: string = '') {
    this.template = template;
    this.scope = scope;
    this.compiledElement = this.compile();
  }

  populateTemplate(path: any, object: any, template: any, key: any) {
    if (!(typeof object === 'object' && object !== null)) {
      return template.replace(new RegExp(`{{ ${path} }}`, 'g'), object);
    }
    Object.keys(object).forEach((key) => {
      const new_path = path === "" ? path + `${key}` : path + `.${key}`
      template = this.populateTemplate(new_path, object[key], template, key);
    });

    return template;
  }

  getValueFromScope(path: string): any {
    let finalValue = null;
    let currentScope = this.scope;
    const splittedPath = path.split('.');

    for(let i = 0; i < splittedPath.length; i++) {
      // @ts-expect-error
      currentScope = currentScope[splittedPath[i]];

      if (currentScope) {
        finalValue = currentScope;
      } else {
        finalValue = '';
        break;
      }
    }

    return finalValue;
  }

  applyParamsToTemplate(template: string): any {
    const path = template.match(new RegExp('{{ (.*) }}'));

    if (path && path[1]) {
      const value = getValueFromScope(path[1], this.scope);
      template = template.replace(new RegExp(path[0], 'g'), value);
      return this.applyParamsToTemplate(template);
    }

    return template;
  }

  createElement(template: string) {
    let templateElement = document.createElement('template');
    templateElement.innerHTML += template;
    return templateElement.content;
  }

  applyDirectiveToElement(element: HTMLElement, directiveName: string, directive: typeof directives): any {
    const directiveElement = element.querySelector(`[${directiveName}]`);

    if (directiveElement) {
      const value = directiveElement.getAttribute(directiveName);
      directiveElement.removeAttribute(directiveName);
      const directiveClass = Object.create(directive);
      directiveClass.constructor.apply(directive, new Array({ scope: this.scope, element: directiveElement, value }));
      this.applyDirectiveToElement(element, directiveName, directive);
    }
  }

  runDirectives(element: HTMLElement) {
    Object.keys(directives).forEach((directiveName) => {
      // @ts-expect-error
      this.applyDirectiveToElement(element, directiveName, directives[directiveName].prototype);
    });
  }

  compile(): HTMLElement {
    let fragment = <HTMLElement><any>this.createElement(this.template).children[0];
    this.runDirectives(fragment);

    if (this.scope) {
      fragment = <HTMLElement><any>this.createElement(this.applyParamsToTemplate(fragment.outerHTML)).children[0];
    }

    return fragment;
  }
}
