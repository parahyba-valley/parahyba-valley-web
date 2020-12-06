import PVComponent from "~/pv-parahyba/extends/pv-component";

export default class Cities extends PVComponent {
  constructor() {
    super({ componentPath: 'components/cities' });

    this.render();
  }
}
