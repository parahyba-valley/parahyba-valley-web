import './index.scss';
import PVComponent from '~/pv-parahyba/extends/pv-component';
import Slider from '~/app/components/slider';
import Header from '~/app/components/header';
import Cities from '~/app/components/cities';
import Footer from '~/app/components/footer';
import Copyright from '~/app/components/copyright';
import StartupsService from '~/app/services/startups-service';

const COMPONENTS = {
  slider: Slider,
  header: Header,
  cities: Cities,
  footer: Footer,
  copyright: Copyright,
};

export default class Index extends  PVComponent {
  constructor(container: HTMLElement) {
    super({ components: COMPONENTS });
    StartupsService
      .getAll()
      .then((response) => {
        const startups = response.sort(() => .5 - Math.random());
        this.state = { startups };
        this.render(container);
      });
  }
};
