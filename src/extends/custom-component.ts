import Component from '../interfaces/component';

export default abstract class CustomComponent {
  public component: Component;
  template: string = '';

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

  applyParamsToTemplate(template: string, params: any, prefix?: any) {
    if (prefix) {
      Object.keys(params).forEach((key) => {
        template = template.replace(new RegExp(`{{ ${prefix}.${key} }}`, 'g'), params[key]);
      });
    } else {
      Object.keys(params).forEach((key) => {
        template = template.replace(new RegExp(`{{ ${key} }}`, 'g'), params[key]);
      });
    }

    return template;
  }

  bindListeners(element: HTMLElement) {
    const clickListeners = element.querySelectorAll('[data-click]');

    clickListeners.forEach((elementToBind) => {
      const functionName = elementToBind.getAttribute('data-click');

      if (functionName) {
        // @ts-expect-error
        elementToBind.addEventListener('click', this[functionName].bind(this))
        elementToBind.removeAttribute('click');
      }
    });
  }

  compileRepeats(element: HTMLElement) {
    const elementsToRepeat = element.querySelectorAll('[data-repeat]');

    elementsToRepeat.forEach((elementToRepeat) => {
      const parent = elementToRepeat.parentElement;
      const paramKey = elementToRepeat.getAttribute('data-repeat');
      const objectKey = elementToRepeat.getAttribute('data-repeat-prop');

      if (!paramKey || !parent) {
        throw new Error("data-repeat without key value or parent");
      }

      const data = this.component.templateParams[paramKey];

      data.forEach((item: Object) => {
        let elementHtml = elementToRepeat.outerHTML;
        elementHtml = this.applyParamsToTemplate(elementHtml, item, objectKey);
        parent.appendChild(this.createElement(elementHtml));
      });

      elementToRepeat.remove();
    });
  }

  createElement(template: string){
    let templateElement = document.createElement('template');
    templateElement.innerHTML += template;
    return templateElement.content;
  }

  render(container: HTMLElement) {
    this.importComponentStyle();

    this.template = this.componentTemplate;
    if (this.component.templateParams) {
      this.applyParamsToTemplate(this.template, this.component.templateParams);
    }

    const fragment = <HTMLElement><any>this.createElement(this.template);
    this.compileRepeats(fragment);
    this.bindListeners(fragment);
    this.component.elementRef = <HTMLElement>fragment.children[0];
    container.appendChild(this.component.elementRef);
  }
}
