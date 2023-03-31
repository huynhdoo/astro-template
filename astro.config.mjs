import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno(),
  integrations: [preact()],
  site: 'https://huynhdoo.github.io',
  base: '/astro-blog',
});