import directives from '~/pv-parahyba/directives';
import { getvalueFromState } from '~/pv-parahyba/utils/index';

export default class PVParahybaCompiler {
  template: string = '';
  state: { [key: string]: any };
  components:  { [key: string]: any };
  compiledElement: HTMLElement;
  compiledComponents: Array<any> = [];
  originClass: any;

  constructor(state: Object, template: string = '', components: object = {}, originClass?: any) {
    this.template = template;
    this.state = state;
    this.components = components;
    this.originClass = originClass;
    this.compiledElement = this.compile();
  }

  getvalueFromState(path: string): any {
    let finalValue = null;
    let currentState = this.state;
    const splittedPath = path.split('.');

    for(let i = 0; i < splittedPath.length; i++) {
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

  transpileParamToState(text: string | null): string {
    if (!text) return '';

    let textToReplace = text;
    const path = textToReplace.match(new RegExp('{{ (.*) }}'));

    if (path && path[1]) {
      const value = getvalueFromState(path[1], this.state);
      textToReplace = textToReplace.replace(new RegExp(path[0], 'g'), value);
      textToReplace = this.transpileParamToState(textToReplace);
    }

    return textToReplace;
  }

  elementHasDirective(element: HTMLElement): Boolean {
    let hasDirectiveAttribute = false;

    Array.from(element.attributes).forEach(attribute => {
      if (directives[attribute.localName]) {
        hasDirectiveAttribute = true;
      }
    });

    return hasDirectiveAttribute;
  }

  compileAttributes(element: HTMLElement) {
    Array.from(element.attributes).forEach(attribute => {
      const attributeName = attribute.name;
      const attributeValue = attribute.value;

      if (attributeName.indexOf(':') > -1)  {
        const value = getvalueFromState(attributeValue, this.state);

        element.removeAttribute(attributeName);
        element.setAttribute(attributeName.replace(':', ''), value);
      }
    });
  }

  compileComponent(componentElement: HTMLElement, componentName: string) {
    const attributes = componentElement.getAttributeNames();
    let stateToProperties: object = {};

    attributes.forEach((attribute) => {
      const attributeValue = componentElement.getAttribute(attribute);
      
      if (attributeValue) {
        // @ts-expect-error
        stateToProperties[attribute] = getvalueFromState(attributeValue, this.state);
      }
    });

    const compiledComponent = new this.components[componentName](stateToProperties).component.elementRef;
    componentElement.parentElement?.replaceChild(compiledComponent, componentElement);
  }

  createElement(template: string): HTMLElement {
    let templateElement = document.createElement('template');
    templateElement.innerHTML += template;
    return templateElement.content.children[0] as HTMLElement;
  }

  applyDirectiveToElement(element: HTMLElement, directiveName: string): typeof directives {
    const value = element.getAttribute(directiveName);
    element.removeAttribute(directiveName);
    return new directives[directiveName]({ state: this.state, element, value, originClass: this.originClass });
  }

  compileDirectives(element: HTMLElement): boolean {
    let selfCompile = false;
    
    element.getAttributeNames().forEach((attribute) => {
      if (directives[attribute] && !selfCompile) {
        const directive = this.applyDirectiveToElement(element, attribute);

        if (directive.selfCompile) {
          selfCompile = true;
        }
      }
    });

    return selfCompile;
  }

  compileElement(element: HTMLElement) {
    if (this.components[element.localName]) {
      this.compileComponent(element, element.localName);
      return;
    }
    
    if (this.elementHasDirective(element)) {
      const selfCompile = this.compileDirectives(element);
      if (selfCompile) return;
    }

    this.compileAttributes(element);

    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) this.compileElement(node as HTMLElement);
      else if (node.nodeType === Node.TEXT_NODE) node.nodeValue = this.transpileParamToState(node.nodeValue);
    });
  }

  compile(): HTMLElement {
    const fragment = this.createElement(this.template);

    this.compileElement(fragment);

    return fragment;
  }
}
