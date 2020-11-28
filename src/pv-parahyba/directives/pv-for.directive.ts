import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import PVParahybaCompiler from '~/pv-parahyba/pv-parahyba-compiler.compiler';

export default class PVFor {
  state: any;
  element: any;
  value: any | undefined;

  constructor(directive: IPVDirective) {
    this.state = directive.state;
    this.element = directive.element;
    this.value = directive.value;
    this.init();
  }

  init() {
    const parent = this.element.parentElement;
    const splittedValue = this.value.split(' in ');
    const dataKey = splittedValue[1];
    const dataBasePath = splittedValue[0];
    const data = this.state[dataKey];
    const elementHtml = this.element.outerHTML;

    data.forEach((item: Object, index: Number) => {
      const compiledElement = new PVParahybaCompiler({ ...this.state, [dataBasePath]: item, index }, elementHtml).compiledElement;
      parent.appendChild(compiledElement);
    });

    this.element.remove();
  }
}