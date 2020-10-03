import Component from '../interfaces/component';

export default class CustomComponent {
  component: Component;
  template: String = '';

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

  applyParamsToTemplate(params: any) {
    Object.keys(params).forEach((key) => {
      this.template = this.template.replace(new RegExp(`{{ ${key} }}`, 'g'), params[key]);
    });
  }

  bindListeners(element: DocumentFragment) {
    const clickListeners = element.querySelectorAll('[data-click]');
    clickListeners.forEach((elementToBind) => {
      const functionName = elementToBind.getAttribute('data-click');

      if (functionName) {
        // @ts-expect-error
        elementToBind.addEventListener('click', this[functionName])
        elementToBind.removeAttribute('click');
      }
    });
  }

  render(container: HTMLElement) {
    this.importComponentStyle();

    this.template = this.componentTemplate;
    if (this.component.templateParams) {
      this.applyParamsToTemplate(this.component.templateParams);
    }

    let template = document.createElement('template');
    template.innerHTML += this.template;
    this.component.elementRef = template.content;

    this.bindListeners(this.component.elementRef);

    container.appendChild(this.component.elementRef);
  }
}
