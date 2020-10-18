import CustomComponent from "../../extends/custom-component";

export default class Header extends CustomComponent {
  constructor(container: HTMLElement) {
    super({ name: 'header' });

    this.render(container);
  }
}
