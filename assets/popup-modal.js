class PopupModal extends HTMLElement {
  #controller = null;

  connectedCallback() {
    // Build native <dialog> — handles ESC, focus trap, and backdrop automatically
    this._dialog = document.createElement('dialog');
    this._dialog.className = 'popup-modal';
    this._dialog.setAttribute('aria-modal', 'true');

    // Close button — part of the component, not supplied by the caller
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-modal__close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', this.dataset.closeLabel || 'Close');
    closeBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
      '<line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';

    // Content wrapper — receives injected HTML
    this.body = document.createElement('div');
    this.body.className = 'popup-modal__body';

    this._dialog.appendChild(closeBtn);
    this._dialog.appendChild(this.body);
    this.appendChild(this._dialog);

    closeBtn.addEventListener('click', () => this.close());

    // Backdrop click — <dialog> reports target === dialog when the backdrop is hit
    this._dialog.addEventListener('click', e => {
      if (e.target === this._dialog) this.close();
    });

    // Native ESC fires 'cancel' then 'close' — clean up on 'close'
    this._dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      this.#controller?.abort();
      this._dialog.classList.remove('popup-modal--wide');
      this.body.innerHTML = '';
    });
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  open() {
    this._dialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  close() {
    this._dialog.close();
  }

  /**
   * Fetch a product's quick-view section and show it in the modal.
   * @param {string} url - The product URL (e.g. product.url)
   */
  async loadProduct(url) {
    if (!url) return;

    this.#controller?.abort();
    this.#controller = new AbortController();

    // Open immediately with a skeleton so the click feels instant
    this._dialog.classList.add('popup-modal--wide');
    this.body.innerHTML = this.#skeleton();
    this.open();

    try {
      const res = await fetch(`${url.split('?')[0]}?sections=quick-view`, { signal: this.#controller.signal });
      if (!res.ok) throw new Error(`quick-view ${res.status}`);
      const data = await res.json();
      this.body.innerHTML = data['quick-view'];
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('PopupModal loadProduct error:', err);
      this.body.innerHTML = `<p class="popup-modal__error">${this.dataset.errorText || ''}</p>`;
    }
  }

  #skeleton() {
    return (
      '<div class="popup-modal__skeleton" aria-hidden="true">' +
        '<div class="popup-modal__skeleton-media"></div>' +
        '<div class="popup-modal__skeleton-lines">' +
          '<span></span><span></span><span></span><span></span>' +
        '</div>' +
      '</div>'
    );
  }
}

customElements.define('popup-modal', PopupModal);
