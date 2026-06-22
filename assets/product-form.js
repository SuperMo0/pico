/* ────────────────────────────────────────────
   ProductGallery — swipeable track + thumb sync
   ──────────────────────────────────────────── */
class ProductGallery extends HTMLElement {
  connectedCallback() {
    this._sectionId  = this.dataset.sectionId;
    this._sliderEl   = this.querySelector('slider-component');
    this._thumbs     = Array.from(this.querySelectorAll('.product-gallery__thumb'));

    this._thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => this.#goTo(i));
    });

    this.addEventListener('slider:change', (e) => {
      this.#setActiveThumb(e.detail.index);
    });

    this._variantListener = this.#onVariantMedia.bind(this);
    document.addEventListener('theme:gallery:go-to-variant', this._variantListener);
  }

  disconnectedCallback() {
    document.removeEventListener('theme:gallery:go-to-variant', this._variantListener);
  }

  #goTo(index) {
    this._sliderEl?.goToIndex(index);
    this.#setActiveThumb(index);
  }

  #setActiveThumb(index) {
    this._thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('product-gallery__thumb--active', i === index);
    });
    this._thumbs[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  #onVariantMedia(event) {
    const { sectionId, mediaId } = event.detail;
    if (sectionId !== this._sectionId) return;
    const slides = Array.from(this._sliderEl?.querySelectorAll('[data-media-id]') || []);
    const index = slides.findIndex(s => s.dataset.mediaId === String(mediaId));
    if (index !== -1) this.#goTo(index);
  }
}

if (!customElements.get('product-gallery')) {
  customElements.define('product-gallery', ProductGallery);
}

/* ────────────────────────────────────────────
   VariantPicker — option selection → variant ID + URL
   ──────────────────────────────────────────── */
class VariantPicker extends HTMLElement {
  connectedCallback() {
    const sectionId = this.dataset.sectionId;
    const scriptEl  = document.getElementById(`product-json-${sectionId}`);
    if (!scriptEl) return;

    this._product      = JSON.parse(scriptEl.textContent);
    this._variantInput = document.getElementById(`variant-id-${sectionId}`);
    this._selectedOpts = {};
    // Inside the quick-view modal we must not rewrite the host page's URL.
    this._inModal      = !!this.closest('popup-modal');

    const currentId      = this._variantInput?.value;
    const currentVariant = this._product.variants.find(v => String(v.id) === String(currentId));
    if (currentVariant) {
      this._product.options.forEach((_, i) => {
        this._selectedOpts[i + 1] = currentVariant[`option${i + 1}`];
      });
    }

    this._updateButtonStates();

    this.querySelectorAll('[data-option-position]').forEach(btn => {
      btn.addEventListener('click', this.#handleOption.bind(this));
    });
  }

  #handleOption(event) {
    const btn = event.currentTarget;
    this._selectedOpts[Number(btn.dataset.optionPosition)] = btn.dataset.optionValue;
    this._updateButtonStates();
    this._applyVariant();
  }

  _updateButtonStates() {
    this.querySelectorAll('[data-option-position]').forEach(btn => {
      const isActive = this._selectedOpts[Number(btn.dataset.optionPosition)] === btn.dataset.optionValue;
      btn.classList.toggle('product-swatch--active',    isActive && btn.classList.contains('product-swatch'));
      btn.classList.toggle('product-size-chip--active', isActive && btn.classList.contains('product-size-chip'));
    });
  }

  _applyVariant() {
    const variant = this._product.variants.find(v =>
      this._product.options.every((_, i) => {
        const pos = i + 1;
        return v[`option${pos}`] === this._selectedOpts[pos];
      })
    ) || null;

    if (variant && this._variantInput) {
      this._variantInput.value = variant.id;

      if (!this._inModal) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url.toString());
      }

      if (variant.featured_media) {
        document.dispatchEvent(new CustomEvent('theme:gallery:go-to-variant', {
          detail: { sectionId: this.dataset.sectionId, mediaId: variant.featured_media.id }
        }));
      }
    }

    this.dispatchEvent(new CustomEvent('variant:changed', {
      detail: { variant },
      bubbles: true
    }));
  }
}

if (!customElements.get('variant-picker')) {
  customElements.define('variant-picker', VariantPicker);
}

/* ────────────────────────────────────────────
   QuantityInput — +/- stepper clamped 1–99
   ──────────────────────────────────────────── */
class QuantityInput extends HTMLElement {
  connectedCallback() {
    this._input = this.querySelector('input[type="number"]');
    this.querySelector('[data-qty-decrement]')?.addEventListener('click', () => this.#step(-1));
    this.querySelector('[data-qty-increment]')?.addEventListener('click', () => this.#step(1));
  }

  #step(delta) {
    const current = parseInt(this._input?.value, 10) || 1;
    this._input.value = Math.min(99, Math.max(1, current + delta));
  }
}

if (!customElements.get('quantity-input')) {
  customElements.define('quantity-input', QuantityInput);
}

/* ────────────────────────────────────────────
   ProductForm — Section Rendering API variant update + AJAX ATC
   ──────────────────────────────────────────── */
class ProductForm extends HTMLElement {
  #atcController     = null;
  #variantController = null;

  connectedCallback() {
    const sectionId = this.dataset.sectionId;
    this._sectionId = sectionId;
    this._form      = this.querySelector('form');
    this._atcBtn    = document.getElementById(`atc-btn-${sectionId}`);
    this._priceEl   = document.getElementById(`product-price-${sectionId}`);

    // In the quick-view modal, window.location is the host page (e.g. a
    // collection), not the product — use the product URL passed in via dataset.
    this._inModal    = !!this.dataset.inModal;
    this._productUrl = this.dataset.productUrl || window.location.pathname;
    this._addedLabel = this.dataset.addedLabel;

    this._form?.addEventListener('submit', this.#handleSubmit.bind(this));
    this.addEventListener('variant:changed', this.#handleVariantChanged.bind(this));
  }

  disconnectedCallback() {
    this.#atcController?.abort();
    this.#variantController?.abort();
  }

  async #handleVariantChanged(event) {
    const { variant } = event.detail;

    if (!variant) {
      if (this._atcBtn) this._atcBtn.disabled = true;
      return;
    }

    this.#variantController?.abort();
    this.#variantController = new AbortController();

    if (this._priceEl) this._priceEl.setAttribute('aria-busy', 'true');

    try {
      const res = await fetch(
        `${this._productUrl}?variant=${variant.id}&sections=${this._sectionId}`,
        { signal: this.#variantController.signal }
      );
      if (!res.ok) throw new Error(`section render ${res.status}`);

      const data = await res.json();
      const html = data[this._sectionId];
      if (!html) return;

      const doc = new DOMParser().parseFromString(html, 'text/html');

      const newPrice = doc.getElementById(`product-price-${this._sectionId}`);
      if (newPrice && this._priceEl) {
        this._priceEl.innerHTML = newPrice.innerHTML;
      }

      const newBtn = doc.getElementById(`atc-btn-${this._sectionId}`);
      if (newBtn && this._atcBtn) {
        this._atcBtn.disabled    = newBtn.disabled;
        this._atcBtn.textContent = newBtn.textContent.trim();
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Variant render error:', err);
    } finally {
      if (this._priceEl) this._priceEl.removeAttribute('aria-busy');
    }
  }

  async #handleSubmit(event) {
    event.preventDefault();
    if (!this._form) return;

    const btn = this._atcBtn;
    if (btn?.getAttribute('aria-busy') === 'true') return;

    const originalText = btn ? btn.textContent.trim() : '';

    btn?.setAttribute('aria-busy', 'true');
    if (btn) btn.disabled = true;

    this.#atcController?.abort();
    this.#atcController = new AbortController();

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: new FormData(this._form),
        signal: this.#atcController.signal
      });

      if (!res.ok) throw new Error(`cart/add ${res.status}`);

      const cartSectionId = document.getElementById('cart-drawer')?.dataset.sectionId || 'cart-drawer';
      const [cartRes, sectionRes] = await Promise.all([
        fetch('/cart.js', { headers: { 'X-Requested-With': 'XMLHttpRequest' }, signal: this.#atcController.signal }),
        fetch(`${window.location.pathname}?sections=${cartSectionId}`, { signal: this.#atcController.signal })
      ]);
      const cart = await cartRes.json();
      const sectionData = await sectionRes.json();

      // From the modal we keep the dialog open and refresh the cart silently;
      // suppressDrawer tells cart-drawer to update its contents but not slide open.
      document.dispatchEvent(new CustomEvent('theme:cart:updated', {
        detail: { cart, sectionHtml: sectionData[cartSectionId], suppressDrawer: this._inModal }
      }));

      if (this._inModal && btn && this._addedLabel) {
        btn.textContent = this._addedLabel;
        btn.classList.add('product__atc--added');
        clearTimeout(this._addedTimer);
        this._addedTimer = setTimeout(() => {
          btn.classList.remove('product__atc--added');
          btn.textContent = originalText;
        }, 2500);
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error('ProductForm submit error:', err);
    } finally {
      btn?.removeAttribute('aria-busy');
      if (btn) btn.disabled = false;
    }
  }
}

if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}
