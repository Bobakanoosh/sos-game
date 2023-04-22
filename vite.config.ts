import solid from "solid-start/vite";
import { defineConfig } from "vite";
import devtools from "solid-devtools/vite";
import vercelAdapter from "solid-start-vercel";

export default defineConfig({
	plugins: [
		solid({
			adapter: vercelAdapter({ edge: true }),
		}),
		devtools({
			autoname: true,
		}),
	],
});
