import PVComponent from '~/pv-parahyba/extends/pv-component';

export default class Footer extends PVComponent {
  constructor() {
    super({ componentPath: 'components/footer' });

    this.render();
  }
}
