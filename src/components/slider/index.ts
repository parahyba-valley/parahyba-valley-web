import CustomComponent from "../../extends/custom-component";
import StartupsService from "../../services/startups-service";

export default class Slider extends CustomComponent {

  constructor(container: HTMLElement) {
    super({ name: 'slider' });

    this.render(container);

    // TODO Remove me
    console.log(StartupsService.getAll());
  }

  previous() {
    console.log('previous clicked');
  }

  next() {
    console.log('next clicked');
  }
}
