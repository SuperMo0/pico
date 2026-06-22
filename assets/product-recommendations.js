/**
 * <product-recommendations data-url="…">
 *
 * Lazy-fetches the Shopify Product Recommendations section (related or
 * complementary intent) just before it scrolls into view, then injects the
 * rendered carousel. The `recommendations` Liquid object is only populated when
 * the section is requested via routes.product_recommendations_url, so this is
 * the only way to render it. If the API returns nothing, the element removes
 * itself so no empty shell remains.
 *
 * Injected markup relies on globally available CSS (.product-carousel in
 * theme.css), the global <slider-component>, and the <product-card> component —
 * the Section Rendering API does not ship a section's scoped JS/CSS bundles.
 */
class ProductRecommendations extends HTMLElement {
  connectedCallback() {
    if (!this.dataset.url || this.dataset.loaded) return;

    this.#observer = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(this);
        this.#load();
      },
      { rootMargin: '0px 0px 200px 0px' }
    );
    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
  }

  #observer = null;

  async #load() {
    this.dataset.loaded = 'true';
    try {
      const response = await fetch(this.dataset.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const text = await response.text();
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const fragment = doc.querySelector('product-recommendations');
      const markup = fragment ? fragment.innerHTML.trim() : '';

      if (markup) {
        this.innerHTML = markup;
      } else {
        this.remove();
      }
    } catch (error) {
      console.error('Product recommendations failed to load:', error);
      this.remove();
    }
  }
}

if (!customElements.get('product-recommendations')) {
  customElements.define('product-recommendations', ProductRecommendations);
}
