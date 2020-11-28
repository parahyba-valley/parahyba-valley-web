import directives from '~/pv-parahyba/directives';
import { getValueFromScope } from '~/pv-parahyba/utils/index';

export default class PVParahybaCompiler {
  template: string = '';
  scope: Object;
  components: object;
  compiledElement: HTMLElement;
  compiledComponents: Array<any> = [];

  constructor(scope: Object, template: string = '', components: object = {}) {
    this.template = template;
    this.scope = scope;
    this.components = components;
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

  compileComponents(element: HTMLElement) {
    Object.keys(this.components).forEach((component) => {
      element.querySelectorAll(component).forEach((componentElement) => {
        const attributes = componentElement.getAttributeNames();
        let scopedProperties: object = {};

        attributes.forEach((attribute) => {
          const attributeValue = componentElement.getAttribute(attribute);
          
          if (attributeValue) {
            // @ts-expect-error
            scopedProperties[attribute] = getValueFromScope(attributeValue, this.scope);
          }
        });

        // @ts-expect-error
        const compiledComponent = new this.components[component](scopedProperties).render();
        element.replaceChild(compiledComponent, componentElement);
      });
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

  createElement(template: string): HTMLElement {
    let templateElement = document.createElement('template');
    templateElement.innerHTML += template;
    return templateElement.content.children[0] as HTMLElement;
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
    const fragment = this.createElement(this.template);
    this.runDirectives(fragment);
    this.compileAttributes(fragment);
    this.compileComponents(fragment);

    if (this.scope) {
      this.applyParamsToTemplate(fragment);
    }

    return fragment;
  }
}
