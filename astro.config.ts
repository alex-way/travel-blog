import { resolve } from "node:path";
import { defineConfig } from "astro/config";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { pagefind } from "vite-plugin-pagefind";

import { BASE, SITE } from "./src/config.json";

import customEmbeds from "astro-custom-embeds";

import ExcalidrawEmbed from "./src/embeds/excalidraw/embed";
import LinkCardEmbed from "./src/embeds/link-card/embed";
import YoutubeEmbed from "./src/embeds/youtube/embed";

// https://astro.build/config
export default defineConfig({
	vite: {
		resolve: {
			alias: {
				$components: resolve("./src/components"),
				$layouts: resolve("./src/layouts"),
				$pages: resolve("./src/pages"),
				$assets: resolve("./src/assets"),
				$content: resolve("./src/content"),
			},
		},
		ssr: {
			noExternal: [`${BASE}/pagefind/pagefind.js`],
		},
		plugins: [
			// pagefind()
		],
		build: {
			rollupOptions: {
				external: [`${BASE}/pagefind/pagefind.js`],
			},
		},
	},

	integrations: [
		customEmbeds({
			embeds: [ExcalidrawEmbed, YoutubeEmbed, LinkCardEmbed],
		}),
		mdx(),
		sitemap(),
		tailwind(),
		svelte(),
	],

	markdown: {
		shikiConfig: {
			// Choose from Shiki's built-in themes (or add your own)
			// https://shiki.style/themes
			// Alternatively, provide multiple themes
			// See note below for using dual light/dark themes
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			defaultColor: false,
			transformers: [],
			wrap: true,
		},

		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeMathjax],
	},

	prefetch: {
		prefetchAll: true,
	},
	site: SITE,
	base: BASE,
	output: "static",
});
