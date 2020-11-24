import Component from '~/interfaces/component';
import ParahybaCompiler from '~/v-parahyba/parahyba-compiler.compiler';

export default abstract class CustomComponent {
  public component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  get componentTemplate() {
    return require(`../components/${this.component.name}/index.html`);
  }

  importComponentStyle() {
    try {
      require(`../components/${this.component.name}/index.scss`);
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

  render(container: HTMLElement) {
    this.importComponentStyle();
    const fragment = new ParahybaCompiler(this.component.templateParams, this.componentTemplate).compiledElement;
    this.bindListeners(fragment);
    this.compileRefs(fragment);
    this.component.elementRef = <HTMLElement>fragment;
    container.appendChild(this.component.elementRef);
  }
}
