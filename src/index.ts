import Slider from './components/slider';
import './index.scss';

export default class Index {
  element: HTMLElement;

  constructor() {
    this.element = window.document.body;
    this.render();
  }

  render() {
    new Slider(this.element);
  }
};

(() => new Index())();
