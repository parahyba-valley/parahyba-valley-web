import CustomComponent from "../../extends/custom-component";

export default class Slider extends CustomComponent {

  constructor(container: HTMLElement) {
    super({ name: 'slider' });

    this.render(container);
  }

  previous() {
    console.log('previous clicked');
  }

  next() {
    console.log('next clicked');
  }
}
