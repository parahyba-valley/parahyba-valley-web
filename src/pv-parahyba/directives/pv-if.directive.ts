import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getValueFromState, isEqual } from '~/pv-parahyba/utils';
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
    if (isEqual(this.state, state)) return;

    this.state = state;
    this.checkElementCondition();
  }

  hasConditionSymbol(): boolean {
    return this.value.indexOf('!') > -1;
  }

  checkElementCondition() {
    const lastIndexSymbolOccurence = this.value.lastIndexOf('!');
    const clearedParam = this.value.substring(lastIndexSymbolOccurence + 1);
    const conditionSymbol = this.value.substring(0, lastIndexSymbolOccurence + 1);
    const splittedConditionBySimbols = conditionSymbol.split('!');
    const value = getValueFromState(clearedParam, this.state);

    if (!splittedConditionBySimbols.reduce((condition: boolean) => !condition, !value)) {
      this.parentElement.replaceChild(this.doubleElement, this.element);
    } else if (this.intialized){
      this.element = new PVParahybaCompiler(this.state, this.elementTemplate, undefined, this.scope).compiledElement;

      this.parentElement.replaceChild(
        this.element, 
        this.doubleElement,
      );
    }
  }
}
