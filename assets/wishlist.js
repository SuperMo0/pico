(function () {
  'use strict';

  class WishlistManager {
    constructor() {
      var cid        = window.__wishlistCustomerId;
      this._guestKey = 'beeko_wishlist_guest';
      this._key      = cid ? 'beeko_wishlist_' + cid : this._guestKey;

      // When a logged-in customer visits, pull in any items saved as a guest
      if (cid && this._key !== this._guestKey) {
        var guestItems = this._readKey(this._guestKey);
        if (guestItems.length) {
          var merged = Array.from(new Set(guestItems.concat(this._read())));
          this._save(merged, false);
          localStorage.removeItem(this._guestKey);
        }
      }

      // Merge server-saved handles from customer metafield (read-only; write sync requires Customer Account API)
      var serverItems = window.__wishlistServerItems;
      if (Array.isArray(serverItems) && serverItems.length) {
        var mergedServer = Array.from(new Set(serverItems.concat(this._read())));
        this._save(mergedServer, false);
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

    _read()       { return this._readKey(this._key); }

    _readKey(key) {
      try { return JSON.parse(localStorage.getItem(key) || '[]'); }
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

  // ── Toast ────────────────────────────────────────────────────────
  var _toastTimer;
  function showToast(msg) {
    var el = document.getElementById('wishlist-toast');
    if (!el) return;
    el.textContent = msg;
    // Restart animation by briefly hiding
    el.hidden = true;
    el.hidden = false;
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { el.hidden = true; }, 2500);
  }

  // ── Count badge ──────────────────────────────────────────────────
  function updateCountBadge() {
    var badge = document.getElementById('wishlist-count');
    if (!badge) return;
    var count = window.wishlist.getAll().length;
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  // ── Global click delegation ──────────────────────────────────────
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
      : (i18n.add    || 'Add to wishlist'));
    if (isActive) showToast(i18n.added || 'Added to wishlist');
  });

  // ── Sync buttons + badge on every wishlist change ────────────────
  document.addEventListener('theme:wishlist:updated', function () {
    document.querySelectorAll('[data-wishlist-handle]:not([data-wishlist-remove])').forEach(function (btn) {
      btn.classList.toggle('is-active', window.wishlist.has(btn.dataset.wishlistHandle));
    });
    updateCountBadge();
  });

  // Initialise states and signal waiting components
  document.dispatchEvent(new CustomEvent('theme:wishlist:updated', { detail: { items: window.wishlist.getAll() } }));
  document.dispatchEvent(new Event('theme:wishlist:ready'));
})();
