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

  templatedReplacedWithScopeParams(text: string): string {
    if (!text) return '';
    
    let textToReplace = text;
    const path = textToReplace.match(new RegExp('{{ (.*) }}'));

    if (path && path[1]) {
      const value = getValueFromScope(path[1], this.scope);
      textToReplace = textToReplace.replace(new RegExp(path[0], 'g'), value);
      textToReplace = this.templatedReplacedWithScopeParams(textToReplace);
    }

    return textToReplace;
  }

  compileAttributes(element: HTMLElement) {
    const AttributesToCompile = ['pvClick'];

    AttributesToCompile.forEach((attribute) => {
      if (element.hasAttribute(attribute)) {
        const attributeValue =  element.getAttribute(attribute);

        // is a function
        if (attributeValue && attributeValue.indexOf('(') > -1 && attributeValue.indexOf(')') > -1) {
          let params = attributeValue.substring(attributeValue.indexOf('(') + 1, attributeValue.indexOf(')'));
          let paramsSplitted: Array<any> = params.split(',');

          paramsSplitted.forEach((param, index) => {
            const clearedParam = param.trim();
            const valueFromScope = getValueFromScope(clearedParam, this.scope);
            paramsSplitted[index] = valueFromScope !== undefined ? valueFromScope : clearedParam;
          });

          element.setAttribute(
            attribute, `${attributeValue.slice(0, attributeValue.indexOf('('))}(${paramsSplitted.join(', ')})`
          );
        }
      }
    });
  }

  applyParamsToTemplate(element: HTMLElement) {
    const childrens = element.children;
    for (let i = 0; i < childrens.length; i ++ ) {
      const element = childrens[i] as HTMLElement;
      this.compileAttributes(element);
      
      element.childNodes.forEach((node) => {
        if (node.nodeType !== 3 && (node as HTMLElement).hasAttribute('pvFor')) {
          return;
        }
        if (node.nodeType === 3) {
          const elementText = node.nodeValue;
          if (elementText) {
            node.nodeValue = this.templatedReplacedWithScopeParams(elementText);
          }
        } else {
          this.applyParamsToTemplate(node as HTMLElement);
        }
      });
    }
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
    const fragment = <HTMLElement><any>this.createElement(this.template).children[0];
    this.runDirectives(fragment);
    this.compileAttributes(fragment);

    if (this.scope) {
      this.applyParamsToTemplate(fragment);
    }

    return fragment;
  }
}
