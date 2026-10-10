import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import delivery from "./deployment/public-assets.json" with {type: "json"};

export default defineConfig({
  site: "https://guojindigital.com",
  output: "static",
  devToolbar: {enabled:false},
  trailingSlash: "always",
  build: {assetsPrefix: delivery.baseUrl},
  vite: {
    build: {
      target: ["chrome79", "edge79", "firefox78", "safari14"],
      cssTarget: ["chrome79", "edge79", "firefox78", "safari14"]
    }
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "zh-CN",
        locales: {
          "zh-CN": "zh-CN",
          en: "en"
        }
      }
    })
  ]
});
