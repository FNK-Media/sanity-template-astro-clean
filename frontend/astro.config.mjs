import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

const projectId = env.PUBLIC_SANITY_PROJECT_ID || env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || env.PUBLIC_SANITY_STUDIO_DATASET;
const studioUrl = env.PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: "2026-03-26",
      stega: {
        studioUrl,
      },
    }),
    react(),
  ],
  vite: {
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },
    plugins: [tailwindcss()],
  },
});
