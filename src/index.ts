import App from './app';
import './index.scss';

export default class Index {
  constructor() {
    new App(window.document.body)
  }
};

(() => new Index())();
