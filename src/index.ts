import App from './app';

export default class Index {
  constructor() {
    new App(window.document.body)
  }
};

(() => new Index())();
