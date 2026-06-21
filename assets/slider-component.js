class SliderComponent extends HTMLElement {
  connectedCallback() {
    this._track = this.querySelector('[data-slider-track]');
    if (!this._track) return;

    this.querySelector('[name="previous"]')?.addEventListener('click', () => this.#scrollBy(-1));
    this.querySelector('[name="next"]')?.addEventListener('click', () => this.#scrollBy(1));

    const emitChange = () => {
      this.dispatchEvent(new CustomEvent('slider:change', {
        detail: { index: this.#currentIndex() },
        bubbles: true
      }));
    };

    if ('onscrollend' in window) {
      this._track.addEventListener('scrollend', emitChange, { passive: true });
    } else {
      let timer;
      this._track.addEventListener('scroll', () => {
        clearTimeout(timer);
        timer = setTimeout(emitChange, 100);
      }, { passive: true });
    }
  }

  #scrollBy(direction) {
    if (!this._track) return;
    const isRtl = document.documentElement.dir === 'rtl';
    const amount = this._track.clientWidth * 0.9 * direction * (isRtl ? -1 : 1);
    this._track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  #currentIndex() {
    const track = this._track;
    if (!track || !track.clientWidth) return 0;
    return Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
  }

  goToIndex(index) {
    const track = this._track;
    if (!track) return;
    const items = Array.from(track.children);
    if (!items[index]) return;
    const isRtl = document.documentElement.dir === 'rtl';
    track.scrollTo({ left: track.clientWidth * index * (isRtl ? -1 : 1), behavior: 'smooth' });
  }
}

if (!customElements.get('slider-component')) {
  customElements.define('slider-component', SliderComponent);
}
