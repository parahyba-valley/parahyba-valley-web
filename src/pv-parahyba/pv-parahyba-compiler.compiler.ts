import directives from '~/pv-parahyba/directives';
import { getValueFromState } from '~/pv-parahyba/utils/index';
import IPVObject from '~/pv-parahyba/interfaces/pv-object.interface';
import HTMLElement, { PVElement } from './interfaces/pv-html-element.interface';

export default class PVParahybaCompiler {
  template: string = '';
  state: { [key: string]: any };
  components:  { [key: string]: any };
  compiledElement: HTMLElement;
  compiledComponents: Array<any> = [];
  scope: any;
  directives: Array<IPVObject> = [];
  uid: number;

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
    const path = textToReplace.match(new RegExp('{{ (.*) }}'));

    if (path && path[1]) {
      const value = getValueFromState(path[1], this.state);
      textToReplace = textToReplace.replace(new RegExp(path[0], 'g'), value);
      textToReplace = this.transpileParamToState(textToReplace);
    }

    return textToReplace;
  }

  elementHasDirective(element: HTMLElement): boolean {
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
        const value = getValueFromState(attributeValue, this.state);

        element.removeAttribute(attributeName);
        element.setAttribute(attributeName.replace(':', ''), value);
      }
    });
  }

  compileComponent(componentElement: HTMLElement, componentName: string) {
    const attributes = componentElement.attributes;
    let stateToProperties: IPVObject = {};

    Object.keys(attributes).forEach((_key, index) => {
      const attributeName = attributes[index].name;
      const attributeValue = attributes[index].value;

      if (!attributeValue) return;

      if (attributeName.indexOf(':') > -1)  stateToProperties[attributeName] = getValueFromState(attributeValue, this.state);
      else stateToProperties[attributeName] = attributeValue;
    });

    const compiledComponent = new this.components[componentName](stateToProperties).component.elementRef;
    compiledComponent.scope = attributes;
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
    return new directives[directiveName]({ state: this.state, element, value, scope: this.scope });
  }

  compileDirectives(element: HTMLElement): boolean {
    let selfCompile = false;

    element.getAttributeNames().forEach((attribute) => {
      if (directives[attribute]) {
        const directive = this.applyDirectiveToElement(element, attribute);
        this.directives.push(directive);

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

  updateDirectives() {
    this.directives.forEach((directive) => {
      directive.update(this.state);
    });
  }
  
  updateComponents() {

  }

  updateCompiledElement(state: any, scope: any) {
    this.state = state;
    this.scope = scope;

    this.updateDirectives();
    this.updateComponents();
  }

  addElementPVProperties(element: HTMLElement) {
    let __pv__ : PVElement = {};
    __pv__.isPVComponent = true;
    __pv__.compiled = true;
    __pv__.pvUID = this.uid;

    element.__pv__ = __pv__;
  }

  compile(): HTMLElement {
    const fragment = this.createElement(this.template);

    this.compileElement(fragment);

    this.addElementPVProperties(fragment);
    return fragment;
  }
}
