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
  element: HTMLElement;
  startups: any;
  constructor(container: HTMLElement) {
    super({ components: COMPONENTS });
    this.element = window.document.body;
    // this.startups = [{data: { name: 'hey'}}, {data: { name: 'hi'}}, {data: { name: 'hix'}}, {data: { name: 'hia'}}, {data: { name: 'hi1'}}, {data: { name: 'hi2'}}, {data: { name: 'hi3'}}, {data: { name: 'hi4'}}]; // DEVELOPMENT
    StartupsService
      .getAll()
      .then((response) => { // PROD
        this.startups = response.sort(() => .5 - Math.random());
        // this.startups = [{data: { name: 'hey'}}, {data: { name: 'hi'}}, {data: { name: 'hix'}}, {data: { name: 'hia'}}, {data: { name: 'hi1'}}, {data: { name: 'hi2'}}, {data: { name: 'hi3'}}, {data: { name: 'hi4'}}]; // DEVELOPMENT

        this.templateParams = { startups: this.startups };
        this.render(container);
      });
  }
};