import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import PVParahybaCompiler from '~/pv-parahyba/pv-parahyba-compiler.compiler';
import IPVObject from '../interfaces/pv-object.interface';
import { getValueFromState, isEqual } from '~/pv-parahyba/utils/index';

export default class PVFor {
  state: any;

  element: any;

  parentElement: HTMLElement;

  originalTemplate: string;

  value: any | undefined;

  scope: any;

  compiledElements: Array<IPVObject>;

  constructor(directive: IPVDirective) {
    this.state = directive.state;
    this.element = directive.element;
    this.parentElement = directive.element.parentElement as HTMLElement;
    this.originalTemplate = this.element.outerHTML;
    this.value = directive.value;
    this.scope = directive.scope;
    this.compiledElements = [];
    this.init();
  }

  init() {
    this.compileElements();
    this.element.remove();
  }

  update(state: IPVObject) {
    if (isEqual(this.data(this.state), this.data(state))) return;

    this.state = state;
    this.compileElements();
  }

  data(state: IPVObject): IPVObject {
    const splittedValue = this.value.split(' in ');
    const dataKey = splittedValue[1];

    return getValueFromState(dataKey, state);
  }

  compileElements() {
    const parent = this.parentElement;
    const splittedValue = this.value.split(' in ');
    const dataBasePath = splittedValue[0];
    const data = this.data(this.state);
    const elementHtml = this.originalTemplate;

    data.forEach((item: object, index: number) => {
      if (this.compiledElements[index]) {
        this.compiledElements[index].updateCompiledElement({ ...this.state, [dataBasePath]: item, index });

        return false;
      }

      const elementClass = new PVParahybaCompiler(
        { ...this.state, [dataBasePath]: item, index },
        elementHtml,
        undefined,
        this.scope,
      );

      this.compiledElements.push(elementClass);
      parent.appendChild(elementClass.compiledElement);

      return false;
    });
  }
}
