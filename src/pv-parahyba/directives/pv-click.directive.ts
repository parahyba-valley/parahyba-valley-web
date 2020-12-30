import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getValueFromState } from '~/pv-parahyba/utils/index';

export default class PVClick {
  state: any;

  element: any;

  value: any | undefined;

  scope: any;

  constructor(directive: IPVDirective) {
    this.state = directive.state;
    this.element = directive.element;
    this.value = directive.value;
    this.scope = directive.scope;

    this.init();
  }

  extractFunctionName(functionAttribute: string): string {
    return functionAttribute.substring(
      0,
      functionAttribute.indexOf('(') > -1 ? functionAttribute.indexOf('(') : undefined,
    );
  }

  extractFunctionArgs(functionAttribute: string): Array<string> | null {
    const functionArgs = functionAttribute.substring(
      functionAttribute.indexOf('(') + 1,
      functionAttribute.indexOf(')') || 0,
    );

    if (functionArgs) {
      return functionArgs.split(',');
    }

    return null;
  }

  init() {
    const functionAttribute = this.value;
    const functionName = this.extractFunctionName(functionAttribute);
    const functionArgs = this.extractFunctionArgs(functionAttribute);

    if (functionArgs) {
      const evaluatedFunctionArgs = functionArgs.map((arg) => {
        try {
          return Function(`return ${arg}`)();
        } catch(_) {
          return getValueFromState(arg, this.state);
        }
      });

      this.element.addEventListener('click', function () {
        // @ts-expect-error
        this[functionName](...evaluatedFunctionArgs);
      }.bind(this.scope), false);
    } else {
      this.element.addEventListener('click', this.scope[functionName].bind(this.scope));
    }

    this.element.removeAttribute('pvClick');
  }

  update(newState: { [key: string]: any }, scope: any) {}
}
