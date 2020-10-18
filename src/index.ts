import Slider from './components/slider';
import Header from './components/header';
import './index.scss';

export default class Index {
  element: HTMLElement;

  constructor() {
    this.element = window.document.body;
    this.render();
  }

  render() {
    new Header(this.element);
    new Slider(this.element);
  }
};

(() => new Index())();
