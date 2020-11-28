import './index.scss';
import PVComponent from '~/pv-parahyba/extends/pv-component';
import Slider from '~/app/components/slider';
import Header from '~/app/components/header';
import StartupsService from '~/app/services/startups-service';

const COMPONENTS = {
  slider: Slider,
  header: Header,
};

export default class Index extends  PVComponent {
  constructor(container: HTMLElement) {
    super({ components: COMPONENTS });
    StartupsService
      .getAll()
      .then((response) => { // PROD
        const startups = response.sort(() => .5 - Math.random());
        this.state = { startups };
        this.render(container);
      });

      // this.state = { startups: [{data: { name: 'hey'}}, {data: { name: 'hi'}}, {data: { name: 'hix'}}, {data: { name: 'hia'}}, {data: { name: 'hi1'}}, {data: { name: 'hi2'}}, {data: { name: 'hi3'}}, {data: { name: 'hi4'}}] };
      // this.render(container);
  }
};