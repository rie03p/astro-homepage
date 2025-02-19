import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site.config";

import sitemap from "@astrojs/sitemap";

const rawFonts = ext => {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
};

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [expressiveCode(expressiveCodeOptions), mdx(), sitemap()],
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/_variables.scss" as *;`,
        },
      },
    },
  },
});
