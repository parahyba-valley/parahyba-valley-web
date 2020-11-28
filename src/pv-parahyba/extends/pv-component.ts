import IPVComponent from '~/pv-parahyba/interfaces/pv-component.interface';
import PVParahybaCompiler from '~/pv-parahyba/pv-parahyba-compiler.compiler';

export default abstract class PVComponent {
  public component: IPVComponent;

  constructor(component: IPVComponent) {
    this.component = component;
  }

  get componentTemplate() {
    if (this.component.componentPath) {
      return require(`~/app/${this.component.componentPath}/index.html`);
    }

    return require(`~/app/index.html`);
  }

  set templateParams(params: any) {
    this.component.templateParams = params;
  }

  importComponentStyle() {
    try {
      if (this.component.componentPath) {
        return require(`~/app/${this.component.componentPath}/index.scss`);
      }

      return require(`~/app/index.scss`);
    } catch(_) {
      return null;
    }
  }

  compileRefs(element: HTMLElement) {
    const elementsToCompile = element.querySelectorAll('[ref]');

    elementsToCompile.forEach((elementToRef) => {
      const ref = elementToRef.getAttribute('ref');
      if (!ref) {
        throw new Error("elements can't have an empty ref attribute");
      }

      // @ts-expect-error
      this[ref] = elementToRef;
    });
  }

  bindListeners(element: HTMLElement) {
    const clickListeners = element.querySelectorAll('[pvClick]');

    clickListeners.forEach((elementToBind) => {
      const functionAttribute = elementToBind.getAttribute('pvClick');
      if (functionAttribute) {
        const functionName = functionAttribute.substring(0, functionAttribute.indexOf('(') > -1 ? functionAttribute.indexOf('(') : undefined );

        if (functionName) {
          const functionArgs = functionAttribute.substring(functionAttribute.indexOf('(') + 1, functionAttribute.indexOf(')') || 0);

          if (functionArgs) {
            const functionArgsSplitted = functionArgs.split(',').map((arg) => Function(`return ${arg}`)());
            elementToBind.addEventListener('click', () => {
              // @ts-expect-error
              this[functionName](...functionArgsSplitted)
            }, false);
          } else {
            // @ts-expect-error
            elementToBind.addEventListener('click', this[functionName].bind(this))
          }
  
          elementToBind.removeAttribute('pvClick');
        }
      }
    });
  }

  render(container?: HTMLElement): HTMLElement {
    this.importComponentStyle();
    const fragment = new PVParahybaCompiler(
      this.component.templateParams, this.componentTemplate, this.component?.components
    ).compiledElement;

    this.bindListeners(fragment);
    this.compileRefs(fragment);
    this.component.elementRef = <HTMLElement>fragment;

    if (container) {
      container.appendChild(this.component.elementRef);
    }

    return this.component.elementRef;
  }
}
