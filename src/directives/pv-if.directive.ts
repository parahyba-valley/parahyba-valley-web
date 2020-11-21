import Directive from '~/interfaces/directive.interface';
import ParahybaCompiler from '~/v-parahyba/parahyba-compiler.compiler';
import { getValueFromScope } from '~/utils/index';

export default class PVIf {
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
    const value = getValueFromScope(this.value, this.scope);
    if (!value) {
      this.element.remove();
    }
  }
}