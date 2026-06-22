class PopupModal extends HTMLElement {
    connectedCallback() {

        // Build native <dialog> — handles ESC, focus trap, and backdrop automatically
        this._dialog = document.createElement('dialog');
        this._dialog.className = 'popup-modal';
        this._dialog.setAttribute('aria-modal', 'true');

        // Close button — part of the component, not supplied by user
        const closeBtn = document.createElement('button');
        closeBtn.className = 'popup-modal__close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.innerHTML =
            '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
            '<line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
            '<line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
            '</svg>';

        // Content wrapper — receives user nodes
        this.body = document.createElement('div');
        this.body.className = 'popup-modal__body';

        this._dialog.appendChild(closeBtn);
        this._dialog.appendChild(this.body);
        this.appendChild(this._dialog);

        // Close button click
        closeBtn.addEventListener('click', () => this.close());

        // Backdrop click — <dialog> fires click with target === dialog when backdrop is hit
        this._dialog.addEventListener('click', e => {
            if (e.target === this._dialog) this.close();
        });

        // Native ESC fires 'cancel' then 'close' — restore scroll on 'close'
        this._dialog.addEventListener('close', () => {
            document.body.style.overflow = '';
        });
    }

    open() {
        this._dialog.showModal();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this._dialog.close();
    }

    async loadProduct(url) {
        this.body.innerHTML = ''; // show loading state
        const res = await fetch(`${url}?sections=quick-view`);
        const json = await res.json();
        this.body.innerHTML = json['quick-view']; // inject rendered section HTML
        this.open();
    }

}

customElements.define('popup-modal', PopupModal);
