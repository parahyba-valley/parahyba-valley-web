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

    StartupsService.getAll().then((response) => {
      console.log(response);
      new Slider(this.element, response);
    });
  }
};

(() => new Index())();
