(function () {
  'use strict';

  class WishlistManager {
    constructor() {
      var cid = window.__wishlistCustomerId;
      this._key = cid ? 'beeko_wishlist_' + cid : 'beeko_wishlist_guest';

      // Merge server-saved handles from customer metafield (read-only; write sync requires Customer Account API)
      var serverItems = window.__wishlistServerItems;
      if (Array.isArray(serverItems) && serverItems.length) {
        var merged = Array.from(new Set(serverItems.concat(this._read())));
        this._save(merged, false);
      }
    }

    getAll() { return this._read(); }
    has(h)   { return this._read().includes(h); }

    add(h) {
      var items = this._read();
      if (!items.includes(h)) this._save(items.concat([h]));
    }

    remove(h) {
      this._save(this._read().filter(function (x) { return x !== h; }));
    }

    toggle(h) {
      if (this.has(h)) { this.remove(h); return false; }
      this.add(h); return true;
    }

    _read() {
      try { return JSON.parse(localStorage.getItem(this._key) || '[]'); }
      catch (e) { return []; }
    }

    _save(items, dispatch) {
      if (dispatch === undefined) dispatch = true;
      localStorage.setItem(this._key, JSON.stringify(items));
      if (dispatch) {
        document.dispatchEvent(new CustomEvent('theme:wishlist:updated', { detail: { items: items } }));
      }
    }
  }

  window.wishlist = new WishlistManager();

  // Global click delegation — handles toggle buttons and remove-only buttons
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-wishlist-handle]');
    if (!btn) return;
    e.preventDefault();
    var handle = btn.dataset.wishlistHandle;

    if (btn.hasAttribute('data-wishlist-remove')) {
      window.wishlist.remove(handle);
      return;
    }

    var isActive = window.wishlist.toggle(handle);
    btn.classList.toggle('is-active', isActive);
    var i18n = window.__wishlistI18n || {};
    btn.setAttribute('aria-label', isActive
      ? (i18n.remove || 'Remove from wishlist')
      : (i18n.add || 'Add to wishlist'));
  });

  // Sync all toggle button states when wishlist changes
  document.addEventListener('theme:wishlist:updated', function () {
    document.querySelectorAll('[data-wishlist-handle]:not([data-wishlist-remove])').forEach(function (btn) {
      btn.classList.toggle('is-active', window.wishlist.has(btn.dataset.wishlistHandle));
    });
  });

  // Set initial button states and signal any waiting components
  document.dispatchEvent(new CustomEvent('theme:wishlist:updated', { detail: { items: window.wishlist.getAll() } }));
  document.dispatchEvent(new Event('theme:wishlist:ready'));
})();
