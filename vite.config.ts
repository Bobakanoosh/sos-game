import solid from "solid-start/vite";
import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import cloudflareAdapter from "solid-start-cloudflare-pages";

export default defineConfig({
	plugins: [
		solid({
			adapter: cloudflareAdapter({ edge: true }),
		}),
		devtools({
			autoname: true,
		}),
	],
});
