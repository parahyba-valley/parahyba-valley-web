import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getValueFromState } from '~/pv-parahyba/utils';
import IPVObject from '~/pv-parahyba/interfaces/pv-object.interface';
import PVParahybaCompiler from '~/pv-parahyba/pv-parahyba-compiler.compiler';

export default class PVIf {
  state: any;

  element: any;

  elementTemplate: string;

  value: any | undefined;

  parentElement: HTMLElement;

  doubleElement: Comment;

  intialized: boolean;

  scope: any;

  compiledClass: any;

  constructor(directive: IPVDirective) {
    this.intialized = false;
    this.state = directive.state;
    this.element = directive.element;
    this.elementTemplate = directive.element.outerHTML;
    this.value = directive.value;
    this.parentElement = directive.element.parentElement as HTMLElement;
    this.doubleElement = document.createComment('');
    this.scope = directive.scope;

    this.init();
  }

  init() {
    this.checkElementCondition();
    this.intialized = true;
  }

  update(state: IPVObject) {
    const olderState = this.state;
    this.state = state;

    if (this.condition(olderState) !== this.condition(state)) {
      this.checkElementCondition();
    } else {
      this.updateCurrentClass(this.state);
    }
  }

  hasConditionSymbol(): boolean {
    return this.value.indexOf('!') > -1;
  }

  condition(state: IPVObject): Boolean {
    return this.value
      .split('||')
      .some((partial: string) => partial.split('&&')
        .every((condition: string) => PVIf.checkCondition(condition.trim(), state)));
  }

  static checkCondition(value: string, state:IPVObject): boolean {
    const isNot = value.startsWith('!');
    const stateKey = isNot ? value.slice(1) : value;
    const result = getValueFromState(stateKey.trim(), state);
    return isNot ? !result : result;
  }

  updateCurrentClass(state: IPVObject) {
    if (!this.compiledClass) return;

    this.compiledClass.updateCompiledElement(state);
  }

  checkElementCondition() {
    if (!this.condition(this.state)) {
      this.parentElement.replaceChild(this.doubleElement, this.element);
    } else {
      this.compiledClass = new PVParahybaCompiler(this.state, this.elementTemplate, undefined, this.scope);
      const { compiledElement } = this.compiledClass;

      if (this.intialized) {
        this.parentElement.replaceChild(
          compiledElement,
          this.doubleElement,
        );
      } else {
        this.parentElement.replaceChild(
          compiledElement,
          this.element,
        );
      }

      this.element = compiledElement;
    }
  }
}
