import IPVDirective from '~/pv-parahyba/interfaces/pv-directive.interface';
import { getvalueFromState } from '~/pv-parahyba/utils/index';

export default class PVClick {
  state: any;
  element: any;
  value: any | undefined;
  originClass: any;

  constructor(directive: IPVDirective) {
    this.state = directive.state;
    this.element = directive.element;
    this.value = directive.value;
    this.originClass = directive.originClass;

    this.init();
  }

  extractFunctionName(functionAttribute: string): string {
    return functionAttribute.substring(
      0, 
      functionAttribute.indexOf('(') > -1 ? functionAttribute.indexOf('(') : undefined 
    );
  }

  extractFunctionArgs(functionAttribute: string): Array<string> | null {
    const functionArgs = functionAttribute.substring(
      functionAttribute.indexOf('(') + 1, 
      functionAttribute.indexOf(')') || 0
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
          return getvalueFromState(arg, this.state);
        }
      });

      this.element.addEventListener('click', function() {
        // @ts-expect-error
        this[functionName](...evaluatedFunctionArgs)
      }.bind(this.originClass), false);
    } else {
      this.element.addEventListener('click', this.originClass[functionName].bind(this.originClass))
    }

    this.element.removeAttribute('pvClick');
  }
}