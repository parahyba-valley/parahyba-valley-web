import Slider from './components/slider';
import Header from './components/header';
import StartupsService from "./services/startups-service";
import './index.scss';

export default class Index {
  element: HTMLElement;

  constructor() {
    this.element = window.document.body;
    this.render();
  }

  render() {
    new Header(this.element);
    // new Slider(this.element, [{data: { name: 'hey'}}, {data: { name: 'hi'}}, {data: { name: 'hix'}}, {data: { name: 'hia'}}, {data: { name: 'hi1'}}, {data: { name: 'hi2'}}, {data: { name: 'hi3'}}, {data: { name: 'hi4'}},]); // DEVELOPMENT
    StartupsService.getAll().then((response) => { // PROD
      new Slider(this.element, response.sort(() => .5 - Math.random()));
    });
  }
};

(() => new Index())();
