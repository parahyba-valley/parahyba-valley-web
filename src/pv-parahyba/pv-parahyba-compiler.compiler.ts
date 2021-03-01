import directives from '~/pv-parahyba/directives';
import { getValueFromState, elementWasCompiledByHimself, elementHasDirective } from '~/pv-parahyba/utils/index';
import IPVObject from '~/pv-parahyba/interfaces/pv-object.interface';
import HTMLElement, { PVElement } from './interfaces/pv-html-element.interface';

export default class PVParahybaCompiler {
  template: string = '';

  state: { [key: string]: any };

  components: { [key: string]: any };

  compiledElement: HTMLElement;

  compiledComponents: Array<any> = [];

  scope: any;

  directives: Array<IPVObject> = [];

  uid: number;

  componentElementsWithAttributes: Array<IPVObject> = [];

  constructor(state: Object, template: string = '', components: object = {}, scope?: any) {
    this.template = template;
    this.state = state;
    this.components = components;
    this.scope = scope;
    this.compiledElement = this.compile();
    this.uid = Date.now();
  }

  transpileParamToState(text: string | null): string {
    if (!text) return '';

    let textToReplace = text;
    const path = textToReplace.match(/{{ (.*) }}/);

    if (path && path[1]) {
      const value = getValueFromState(path[1], this.state);
      textToReplace = textToReplace.replace(path[0], value);
    }

    return textToReplace;
  }

  updateElementAttributeWithState(element: HTMLElement, attributeName: string, attributeValue: string) {
    const value = getValueFromState(attributeValue, this.state);
    element.setAttribute(attributeName.replace(':', ''), value);
  }

  compileAttributes(element: HTMLElement) {
    const elementAttributes: IPVObject = {};

    Array.from(element.attributes).forEach((attribute) => {
      const { name, value } = attribute;

      if (name.indexOf(':') > -1) {
        const attributeName = name.replace(':', '');
        element.removeAttribute(attributeName);
        elementAttributes[attributeName] = value;
        this.updateElementAttributeWithState(element, attributeName, value);
      }
    });

    if (Object.keys(elementAttributes).length) {
      this.componentElementsWithAttributes.push({
        $attrs: elementAttributes,
        element,
      });
    }
  }

  compileComponent(componentElement: HTMLElement, componentName: string) {
    const { attributes } = componentElement;
    const componentAttributes: IPVObject = {};

    Object.keys(attributes).forEach((_key, index) => {
      const { name, value } = attributes[index];

      if (name.indexOf(':') > -1) {
        const attributeName = name.replace(':', '');
        componentAttributes[attributeName] = getValueFromState(value, this.state);
      } else {
        componentAttributes[name] = value;
      }
    });

    const compiledComponent = new this.components[componentName](componentAttributes);
    componentElement.parentElement?.replaceChild(compiledComponent.component.elementRef, componentElement);
    this.compiledComponents.push(compiledComponent);
  }

  createElement(template: string): HTMLElement {
    const templateElement = document.createElement('template');
    templateElement.innerHTML += template;
    return templateElement.content.children[0] as HTMLElement;
  }

  applyDirectiveToElement(element: HTMLElement, directiveName: string): typeof directives {
    const value = element.getAttribute(directiveName);
    element.removeAttribute(directiveName);
    return new directives[directiveName]({
      state: this.state, element, value, scope: this.scope,
    });
  }

  compileDirectives(element: HTMLElement) {
    element.getAttributeNames().forEach((attribute) => {
      if (directives[attribute]) {
        const directive = this.applyDirectiveToElement(element, attribute);
        this.directives.push(directive);
      }
    });
  }

  compileElement(element: HTMLElement) {
    if (this.components[element.localName]) {
      this.compileComponent(element, element.localName);
      return;
    }

    if (elementHasDirective(element)) {
      this.compileDirectives(element);
    }

    if (!elementWasCompiledByHimself(element)) {
      this.compileAttributes(element);

      element.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) this.compileElement(node as HTMLElement);
        else if (node.nodeType === Node.TEXT_NODE) node.nodeValue = this.transpileParamToState(node.nodeValue);
      });
    }
  }

  updateElementsAttributes() {
    this.componentElementsWithAttributes.forEach(({ $attrs, element }) => {
      Object.keys($attrs).forEach((key) => {
        this.updateElementAttributeWithState(element, key, $attrs[key]);
      });
    });
  }

  updateDirectives() {
    this.directives.forEach((directive) => {
      directive.update(this.state);
    });
  }

  updateCompiledElement(state: any, scope: any) {
    this.state = state;
    this.scope = scope;

    this.updateDirectives();
    this.updateElementsAttributes();
  }

  addElementPVProperties(element: HTMLElement) {
    const pv : PVElement = {};
    pv.isPVComponent = true;
    pv.compiled = true;
    pv.pvUID = this.uid;

    element.pv = pv;
  }

  compile(): HTMLElement {
    const fragment = this.createElement(this.template);

    this.compileElement(fragment);

    this.addElementPVProperties(fragment);
    return fragment;
  }
}
