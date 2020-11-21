import Directive from '~/interfaces/directive.interface';
import ParahybaCompiler from '~/v-parahyba/parahyba-compiler.compiler';

export default class PVFor {
  scope: any;
  element: any;
  value: any | undefined;

  constructor(directive: Directive) {
    this.scope = directive.scope;
    this.element = directive.element;
    this.value = directive.value;
    this.init();
  }

  init() {
    const parent = this.element.parentElement;
    const splittedValue = this.value.split(' in ');
    const dataKey = splittedValue[1];
    const dataBasePath = splittedValue[0];
    const data = this.scope[dataKey];
    const elementHtml = this.element.outerHTML;

    data.forEach((item: Object, index: Number) => {
      const compiledElement = new ParahybaCompiler({ ...this.scope, [dataBasePath]: item, index }, elementHtml).compiledElement;
      parent.appendChild(compiledElement);
    });

    this.element.remove();
  }
}