import directives from '~/pv-parahyba/directives';
import { getvalueFromState } from '~/pv-parahyba/utils/index';

export default class PVParahybaCompiler {
  template: string = '';
  state: object;
  components: object;
  compiledElement: HTMLElement;
  compiledComponents: Array<any> = [];
  _self: any;

  constructor(state: Object, template: string = '', components: object = {}, _self?: any) {
    this.template = template;
    this.state = state;
    this.components = components;
    this._self = _self;
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

  getvalueFromState(path: string): any {
    let finalValue = null;
    let currentState = this.state;
    const splittedPath = path.split('.');

    for(let i = 0; i < splittedPath.length; i++) {
      // @ts-expect-error
      currentState = currentState[splittedPath[i]];

      if (currentState) {
        finalValue = currentState;
      } else {
        finalValue = '';
        break;
      }
    }

    return finalValue;
  }

  templatedReplacedWithStateParams(text: string): string {
    if (!text) return '';
    
    let textToReplace = text;
    const path = textToReplace.match(new RegExp('{{ (.*) }}'));

    if (path && path[1]) {
      const value = getvalueFromState(path[1], this.state);
      textToReplace = textToReplace.replace(new RegExp(path[0], 'g'), value);
      textToReplace = this.templatedReplacedWithStateParams(textToReplace);
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
            const valueFromState = getvalueFromState(clearedParam, this.state);
            paramsSplitted[index] = valueFromState !== undefined ? valueFromState : clearedParam;
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
        let stateToProperties: object = {};

        attributes.forEach((attribute) => {
          const attributeValue = componentElement.getAttribute(attribute);
          
          if (attributeValue) {
            // @ts-expect-error
            stateToProperties[attribute] = getvalueFromState(attributeValue, this.state);
          }
        });

        // @ts-expect-error
        const compiledComponent = new this.components[component](stateToProperties).render();
        componentElement.parentElement?.replaceChild(compiledComponent, componentElement);
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
            node.nodeValue = this.templatedReplacedWithStateParams(elementText);
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
      directiveClass.constructor.apply(directive, new Array({ state: this.state, element: directiveElement, value }));
      this.applyDirectiveToElement(element, directiveName, directive);
    }
  }

  runDirectives(element: HTMLElement) {
    Object.keys(directives).forEach((directiveName) => {
      // @ts-expect-error
      this.applyDirectiveToElement(element, directiveName, directives[directiveName].prototype);
    });
  }

  bindListeners(element: HTMLElement) {
    const clickListeners = element.querySelectorAll('[pvClick]');

    clickListeners.forEach((elementToBind) => {
      const functionAttribute = elementToBind.getAttribute('pvClick');
      if (functionAttribute) {
        const functionName = functionAttribute.substring(0, functionAttribute.indexOf('(') > -1 ? functionAttribute.indexOf('(') : undefined );

        if (functionName) {
          const functionArgs = functionAttribute.substring(functionAttribute.indexOf('(') + 1, functionAttribute.indexOf(')') || 0);

          if (functionArgs) {
            const functionArgsSplitted = functionArgs.split(',').map((arg) => Function(`return ${arg}`)());
            elementToBind.addEventListener('click', function() {
              // @ts-expect-error
              this[functionName](...functionArgsSplitted)
            }.bind(this._self), false);
          } else {
            elementToBind.addEventListener('click', this._self[functionName].bind(this._self))
          }
  
          elementToBind.removeAttribute('pvClick');
        }
      }
    });
  }

  compile(): HTMLElement {
    const fragment = this.createElement(this.template);
    this.runDirectives(fragment);
    this.compileAttributes(fragment);

    if (this._self) {
      this.bindListeners(fragment);
    }

    if (this.state) {
      this.applyParamsToTemplate(fragment);
    }

    this.compileComponents(fragment);

    return fragment;
  }
}
