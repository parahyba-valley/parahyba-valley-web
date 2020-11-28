import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getValueFromScope } from '~/pv-parahyba/utils';

export default class PVIf {
  scope: any;
  element: any;
  value: any | undefined;

  constructor(directive: IPVDirective) {
    this.scope = directive.scope;
    this.element = directive.element;
    this.value = directive.value;
    this.init();
  }

  init() {
    const value = getValueFromScope(this.value, this.scope);
    if (!value) {
      this.element.remove();
    }
  }
}