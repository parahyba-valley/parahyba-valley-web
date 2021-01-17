import IPVComponent from '~/pv-parahyba/interfaces/pv-component.interface';
import PVParahybaCompiler from '~/pv-parahyba/pv-parahyba-compiler.compiler';
import IPVObject from '../interfaces/pv-object.interface';

export default abstract class PVComponent {
  public component: IPVComponent;

  public compiledClass!: PVParahybaCompiler;

  public state: { [key: string]: any } = {};

  constructor(component: IPVComponent) {
    this.component = component;
  }

  get componentTemplate() {
    if (this.component.componentPath) {
      return require(`~/app/${this.component.componentPath}/index.html`);
    }

    return require('~/app/index.html');
  }

  set State(state: any) {
    this.state = state;

    if (this.compiledClass) {
      this.compiledClass.updateCompiledElement(this.state, this);
    }
  }

  get State() {
    return this.state;
  }

  setState(obj: IPVObject) {
    this.state = { ...this.state, ...obj };

    if (this.compiledClass) {
      this.compiledClass.updateCompiledElement(this.state, this);
    }
  }

  importComponentStyle() {
    try {
      if (this.component.componentPath) {
        return require(`~/app/${this.component.componentPath}/index.scss`);
      }

      return require('~/app/index.scss');
    } catch (_) {
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

  onMounted() {}

  render(container?: HTMLElement): HTMLElement {
    this.importComponentStyle();
    this.compiledClass = new PVParahybaCompiler(
      this.state, this.componentTemplate, this.component?.components, this,
    );
    const fragment = this.compiledClass.compiledElement;

    this.compileRefs(fragment);
    this.component.elementRef = <HTMLElement>fragment;

    if (container) {
      container.appendChild(this.component.elementRef);
    }

    setTimeout(() => {
      this.onMounted();
    });

    return this.component.elementRef;
  }
}
