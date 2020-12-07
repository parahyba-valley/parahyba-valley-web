import PVComponent from "~/pv-parahyba/extends/pv-component";

export default class Copyright extends PVComponent {
  constructor() {
    super({ componentPath: 'components/copyright' });

    this.render();
  }
}
