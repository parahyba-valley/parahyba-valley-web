import CustomComponent from "../../extends/custom-component";

export default class Slider extends CustomComponent {
  currentSlideIndex: number = 0;
  slides!: HTMLElement;
  indicators!: HTMLElement;
  sliderData: Array<any>;
  sliderIntervalController: any;

  constructor(container: HTMLElement, sliderData: any) {
    super({ name: 'slider', templateParams: { slides: sliderData } });
    this.sliderData = sliderData;
    this.render(container);
    this.initSlider();
    document.addEventListener("visibilitychange", this.onVisibilityChanged, false);
    document.addEventListener("mozvisibilitychange", this.onVisibilityChanged, false);
    document.addEventListener("webkitvisibilitychange", this.onVisibilityChanged, false);
    document.addEventListener("msvisibilitychange", this.onVisibilityChanged, false);
  }

  previous() {
    if (this.currentSlideIndex - 1 < 0) {
      this.currentSlideIndex = this.sliderData?.length;
    }

    this.moveSlides(-1);
  }

  next() {
    if (this.currentSlideIndex + 1 >= this.sliderData?.length) {
      this.currentSlideIndex = -1;
    }

    this.moveSlides(1);
  }

  moveSlides(times: number) {
    if (this.sliderIntervalController) {
      clearInterval(this.sliderIntervalController);
      this.createSliderInterval();
    }
    this.currentSlideIndex = this.currentSlideIndex + times;

    this.moveIndicators(this.currentSlideIndex);
    this.slides.style.left = -100 * this.currentSlideIndex + '%';
  }

  moveIndicators(activeIndex: number) {
    window.requestAnimationFrame(() => {
      const indicatorItens = this.indicators.children as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < indicatorItens?.length; i++) {
        const element = indicatorItens[i];
        element.classList.remove('slider__control-indicators__item--last');
        element.classList.remove('slider__control-indicators__item--second');
        element.classList.remove('slider__control-indicators__item--active');
        element.classList.remove('slider__control-indicators__item--second');
        element.classList.remove('slider__control-indicators__item--last');
      };

      indicatorItens[activeIndex - 1]?.classList.add('slider__control-indicators__item--last');
      indicatorItens[activeIndex]?.classList.add('slider__control-indicators__item--active');
      indicatorItens[activeIndex + 1]?.classList.add('slider__control-indicators__item--last');

      setTimeout(() => {
        this.indicators.style.left = -(indicatorItens[activeIndex]?.offsetLeft - 40) + 'px';
      }, 100);
    });
  }

  initSlider() {
    this.moveIndicators(0);
    this.createSliderInterval();

    for( let i = 0; i < this.sliderData?.length; i++) {
      var x = Math.floor(Math.random() * 256);
      var y = Math.floor(Math.random() * 256);
      var z = Math.floor(Math.random() * 256);
      var bgColor = "rgb(" + x + "," + y + "," + z + ", 0.2)";

      // @ts-expect-error
      this.slides.children[i].style.background = bgColor;
    }
  }

  createSliderInterval() {
    this.sliderIntervalController = setInterval(() => {
      this.next();
    }, 8000);
  }

  changeActiveSlide(event: any) {
    const indicatorIndex = event.currentTarget.getAttribute('data-index');
    this.moveSlides(indicatorIndex - this.currentSlideIndex);
  }

  onVisibilityChanged() {
    if (document.hidden) {
      // The tab has lost focus
      clearInterval(this.sliderIntervalController);
    } else {
      // The tab has gained focus
      this.createSliderInterval();
    }
  }
}
