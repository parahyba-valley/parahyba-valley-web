import CustomComponent from "../../extends/custom-component";

export default class Slider extends CustomComponent {

  constructor(container: HTMLElement) {
    super({ name: 'slider' });

    this.render(container);

    // TODO Remove me
    fetch('/.netlify/functions/startups-read-all').then((response) => {
      console.log(response);
    });
  }

  previous() {
    console.log('previous clicked');
  }

  next() {
    console.log('next clicked');
  }
}
