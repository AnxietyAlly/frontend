import { join } from "path";

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { skeleton } from "@skeletonlabs/tw-plugin";
import { myCustomTheme } from "./my-custom-theme";

export default {
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}", join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")],
	theme: {
		extend: {
			backgroundColor: {
				"blue-600": "#3b82f6",
				"blue-400": "#93c5fd",
			  },
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				myCustomTheme
			},
		}),
	],
};
