import CustomComponent from "../../extends/custom-component";

export default class Slider extends CustomComponent {
  currentSlideIndex: number = 0;
  sliders!: HTMLCollectionOf<HTMLElement>;

  constructor(container: HTMLElement, sliderData: any) {
    super({ name: 'slider', templateParams: { sliders: sliderData } });

    this.render(container);
    this.initSlider();
  }

  previous() {
    if (this.currentSlideIndex - 1 < 0) {
      return;
    }

    for(let i = 0; i < this.sliders?.length; i++) {
      const currentLeft = parseInt(this.sliders[i].style.left.split('%')[0]);
      this.sliders[i].style.left = currentLeft + 100 + '%';
    }

    this.currentSlideIndex = this.currentSlideIndex - 1;

    if (this.currentSlideIndex - 1 < 0) {
      this.turnControlHidden('slider__control--left');
    }

    this.turnControlVisible('slider__control--right');
  }

  next() {
    if (this.currentSlideIndex + 1 >= this.sliders?.length) {
      return;
    }

    for(let i = 0; i < this.sliders?.length; i++) {
      const currentLeft = parseInt(this.sliders[i].style.left.split('%')[0]);
      this.sliders[i].style.left = currentLeft - 100 + '%';
    }

    this.currentSlideIndex = this.currentSlideIndex + 1;

    if (this.currentSlideIndex + 1 >= this.sliders?.length) {
      this.turnControlHidden('slider__control--right');
    }

    this.turnControlVisible('slider__control--left');
  }

  initSlider() {
    this.sliders = this.component.elementRef?.getElementsByClassName('slider__slide') as HTMLCollectionOf<HTMLElement>;

    if (this.sliders?.length) {
      for( let i = 0; i < this.sliders?.length; i++) {
        this.sliders[i].style.left = 100 * i + '%';
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";

        this.sliders[i].style.background = bgColor;
      }
    }
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
}
