import { defineConfig } from 'astro/config';

export default defineConfig({
  /*
   * Public production address.
   *
   * Astro uses this for canonical URLs, sitemap generation and other
   * absolute-address features.
   */
  site: 'https://me.jrwroberts.co.uk',

  /*
   * Generate static HTML rather than requiring a Node.js server.
   */
  output: 'static',

  /*
   * Generate directory-based URLs:
   *
   *   /projects/crowdsec/index.html
   *
   * This works naturally with Nginx clean URLs.
   */
  trailingSlash: 'always',
});
