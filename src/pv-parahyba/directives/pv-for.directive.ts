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

  selfCompile: boolean = true;

  scope: any;

  compiledElements: Array<any>;

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
    if (isEqual(this.state, state)) return;

    this.state = state;
    this.compileElements();
  }

  clearCompiledElements() {
    this.compiledElements.forEach((element: HTMLElement) => {
      element.remove();
    });

    this.compiledElements = [];
  }

  compileElements() {
    const parent = this.parentElement;
    this.clearCompiledElements();
    const splittedValue = this.value.split(' in ');
    const dataKey = splittedValue[1];
    const dataBasePath = splittedValue[0];
    const data = getValueFromState(dataKey, this.state);
    const elementHtml = this.originalTemplate;

    data.forEach((item: Object, index: Number) => {
      const { compiledElement } = new PVParahybaCompiler(
        { ...this.state, [dataBasePath]: item, index },
        elementHtml,
        undefined,
        this.scope,
      );
      this.compiledElements.push(compiledElement);
      parent.appendChild(compiledElement);
    });
  }
}
