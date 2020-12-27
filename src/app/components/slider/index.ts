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
    StartupsService
    .getAll()
    .then((response) => {
      const startups = response.sort(() => .5 - Math.random());
      this.setState({ loading: false, slides: startups });
      this.initSlider();
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
