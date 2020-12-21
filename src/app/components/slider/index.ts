import PVComponent from "~/pv-parahyba/extends/pv-component";
import StartupsService from '~/app/services/startups-service';

export default class Slider extends PVComponent {
  currentSlideIndex: number = 0;
  slides!: HTMLElement;
  indicators!: HTMLElement;
  sliderIntervalController: any;

  constructor() {
    super({ componentPath: 'components/slider' });
    this.state = { loading: true, slides: [] };
    this.render();

    addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // The tab has lost focus
        clearInterval(this.sliderIntervalController);
      } else {
        // The tab has gained focus
        this.createSliderInterval();
      }
    });
  }

  onMounted() {

      this.setState({ loading: false, slides: [
        {
          "ref": {
              "@ref": {
                  "id": "284924393597960706",
                  "collection": {
                      "@ref": {
                          "id": "startups",
                          "collection": {
                              "@ref": {
                                  "id": "collections"
                              }
                          }
                      }
                  }
              }
          },
          "ts": 1607983926623000,
          "data": {
              "profile_image": "https://cdn.startupbase.com.br/uploads/startups/2019/12/logobeeonicos_9c210ec5-daa2-4d63-b971-c65af9ba5807.jpg",
              "founded_at": "18/11/2019",
              "id": "681188d3-3bbb-4bae-9e4f-abf5d8e857b7",
              "name": "2B8 - Tecnologia",
              "cnpj": "",
              "email": "2b8tecnologia@gmail.com",
              "phone": "1298283076",
              "short_description": "Desenvolvimento de ferramentas para tomada de decisão suportada por Redes Neurais Artificiais",
              "description": "Desenvolver ferramentas suportadas por redes neurais artificiais para aumento da assertividade das predições de processos industriais.\n\nNosso objetivo é criar soluções que auxiliem os gestores na tomada de decisão.\n\nTemos como missão, garantir o aumento da eficiência dos processos industriais e de receita por meio do aumento da assertividade na tomada de decisão com uso de inteligência artificial.\n",
              "tags": "RedesNeuraisArtificiais,AI,MachineLearning",
              "slug": "2b8-tecnologia",
              "is_verified": 0,
              "created_by": "9a741433-6e6d-48d1-926f-bbbcf554fba3",
              "created_at": "2019-12-06T18:27:39.000Z",
              "updated_at": "2020-02-12T16:34:44.000Z",
              "links": {
                  "website": "https://www.linkedin.com/company/2b8-tecnologia",
                  "linkedin": "http://www.linkedin.com/company/2b8-tecnologia"
              },
              "badges": [],
              "startup": {
                  "id": "451c9248-084c-46bd-890d-9de9a0873cb1",
                  "fk_business_model": "e257186f-6576-48c3-95cf-70adb0024846",
                  "fk_business_phase": "52e15202-cbe6-4066-8471-293be66c3e12",
                  "fk_business_target": "564e8192-8641-4688-99a3-6dabcef9a772",
                  "annual_revenue": "N/D",
                  "employees": "1-5",
                  "model": {
                      "id": "e257186f-6576-48c3-95cf-70adb0024846",
                      "name": "Outros"
                  },
                  "phase": {
                      "id": "52e15202-cbe6-4066-8471-293be66c3e12",
                      "name": "Operação",
                      "description": "Protótipos validados, modelo de negócio definido, conhecimento do mercado"
                  },
                  "target": {
                      "id": "564e8192-8641-4688-99a3-6dabcef9a772",
                      "name": "B2B",
                      "description": "Empresas"
                  }
              },
              "adresses": [{
                  "id": "11772300-2b1c-4824-a791-7a84a2cc8155",
                  "fk_organization": "681188d3-3bbb-4bae-9e4f-abf5d8e857b7",
                  "fk_city": "7c4ee79b-3563-48b2-9308-c7b45b1c42fe",
                  "address_line_1": "Estrada Doutor Altino Bondensan",
                  "address_line_2": "",
                  "number": "500",
                  "neighborhood": "Eugênio de Mello",
                  "zip_code": "12247-016",
                  "is_parent": 1,
                  "city": {
                      "id": "7c4ee79b-3563-48b2-9308-c7b45b1c42fe",
                      "fk_state": "33aecb52-b98d-4fd2-a071-82f0ef949fb6",
                      "name": "São José dos Campos",
                      "id_ibge": 3549904
                  },
                  "state": {
                      "id": "33aecb52-b98d-4fd2-a071-82f0ef949fb6",
                      "uf": "SP",
                      "name": "São Paulo",
                      "region": "Sudeste",
                      "id_ibge": 35
                  }
              }],
              "segment": {
                  "primary": "Desenvolvimento de Software",
                  "secondary": "Serviços Profissionais"
              }
          }
        }]
      });
  }

  previous() {
    this.moveSlides(-1);
  }

  next() {
    this.moveSlides(1);
  }

  moveSlides(times: number) {
    if (!this.state.slides[this.currentSlideIndex + times]) {
      return;
    }

    if (this.sliderIntervalController) {
      clearInterval(this.sliderIntervalController);
      this.createSliderInterval();
    }

    this.currentSlideIndex = this.currentSlideIndex + times;
    this.moveIndicators(this.currentSlideIndex);
    this.slides.style.left = -100 * this.currentSlideIndex + '%';

    this.checkControlsVisibility();
  }

  checkControlsVisibility() {
    if (this.currentSlideIndex + 1 >= this.state.slides.length) {
      this.turnControlHidden('slider__control--right');
    } else {
      this.turnControlVisible('slider__control--right');
    }

    if (this.currentSlideIndex === 0) {
      this.turnControlHidden('slider__control--left');
    } else {
      this.turnControlVisible('slider__control--left');
    }
  }

  moveIndicators(activeIndex: number) {
    window.requestAnimationFrame(() => {
      const indicatorItens = this.indicators.children as HTMLCollectionOf<HTMLElement>;
      const indicatorsOffsetLeft = this.indicators.offsetLeft;
      for (let i = 0; i < indicatorItens?.length; i++) {
        const element = indicatorItens[i];
        element.classList.remove('slider__control-indicators__item--last');
        element.classList.remove('slider__control-indicators__item--active');
        element.classList.remove('slider__control-indicators__item--last');
      };

      indicatorItens[activeIndex]?.classList.add('slider__control-indicators__item--active');

      if (
        indicatorItens[activeIndex]?.offsetLeft >
        (this.indicators.parentElement?.offsetWidth || 0) + (indicatorsOffsetLeft * -1)
      ) {
        setTimeout(() => {
          this.indicators.style.left = -(indicatorItens[activeIndex]?.offsetLeft - 80) + 'px';
        }, 100);

      } else if (
        indicatorItens[activeIndex]?.offsetLeft <
        (indicatorsOffsetLeft * -1)
      ) {
        setTimeout(() => {
          this.indicators.style.left = - indicatorItens[activeIndex]?.offsetLeft + 'px';
        }, 100);
      }
    });
  }

  initSlider() {
    this.moveIndicators(0);
    this.checkControlsVisibility();
    this.createSliderInterval();
  }

  turnControlVisible(elementClass: string) {
    const control = this.component.elementRef?.getElementsByClassName(elementClass)[0];
    if(control) {
      control.classList.remove('slider__control--hidden');
    }
  }

  turnControlHidden(elementClass: string) {
    const control = this.component.elementRef?.getElementsByClassName(elementClass)[0];

    if(control) {
      control.classList.add('slider__control--hidden');
    }
  }

  createSliderInterval() {
    this.sliderIntervalController = setTimeout(() => {
      this.next();
    }, 8000);
  }

  changeActiveSlide(indicatorIndex: number) {
    this.moveSlides(indicatorIndex - this.currentSlideIndex);
  }
}
