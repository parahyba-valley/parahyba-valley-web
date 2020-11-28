import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getvalueFromState } from '~/pv-parahyba/utils';

export default class PVIf {
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
    const value = getvalueFromState(this.value, this.state);
    if (!value) {
      this.element.remove();
    }
  }
}