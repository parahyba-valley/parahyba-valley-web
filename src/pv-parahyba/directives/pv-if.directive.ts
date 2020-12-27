import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getValueFromState, isEqual } from '~/pv-parahyba/utils';
import IPVObject from '~/pv-parahyba/interfaces/pv-object.interface';

export default class PVIf {
  state: any;
  element: any;
  value: any | undefined;
  parentElement: HTMLElement;
  stuntmanElement: Comment;
  intialized: boolean;

  constructor(directive: IPVDirective) {
    this.intialized = false;
    this.state = directive.state;
    this.element = directive.element;
    this.value = directive.value;
    this.parentElement = directive.element.parentElement as HTMLElement;
    this.stuntmanElement = document.createComment('');

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
      this.parentElement.replaceChild(this.stuntmanElement, this.element);
    } else if (this.intialized){
      this.parentElement.replaceChild(this.element, this.stuntmanElement);
    }
  }
}
