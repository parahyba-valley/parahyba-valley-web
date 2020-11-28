import IPVComponent from '~/pv-parahyba/interfaces/pv-component.interface';
import PVParahybaCompiler from '~/pv-parahyba/pv-parahyba-compiler.compiler';

export default abstract class PVComponent {
  public component: IPVComponent;
  public state: any;

  constructor(component: IPVComponent) {
    this.component = component;
    this.state = {};
  }

  get componentTemplate() {
    if (this.component.componentPath) {
      return require(`~/app/${this.component.componentPath}/index.html`);
    }

    return require(`~/app/index.html`);
  }

  set _self(_self: any) {
    this.component._self = _self;
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

  render(container?: HTMLElement): HTMLElement {
    this.importComponentStyle();
    const fragment = new PVParahybaCompiler(
      this.state, this.componentTemplate, this.component?.components, this.component?._self
    ).compiledElement;

    this.compileRefs(fragment);
    this.component.elementRef = <HTMLElement>fragment;

    if (container) {
      container.appendChild(this.component.elementRef);
    }

    return this.component.elementRef;
  }
}
