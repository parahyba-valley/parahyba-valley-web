import PVComponent from '~/pv-parahyba/extends/pv-component';

export default class Header extends PVComponent {
  constructor() {
    super({ componentPath: 'components/header' });

    this.render();
  }
}
