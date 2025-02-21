import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site.config";
import sitemap from "@astrojs/sitemap";

// Remark plugins
import remarkDirective from "remark-directive";
import { remarkAdmonitions } from "./src/plugins/remark-admonitions";

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

export default defineConfig({
  site: "https://example.com",
  integrations: [expressiveCode(expressiveCodeOptions), mdx(), sitemap()],
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
    build: { rollupOptions: { external: ["@resvg/resvg-js"] } },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/_variables.scss" as *;`,
        },
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions],
  },
});
