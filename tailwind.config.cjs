/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				p1: {
					primary: "#f97316",
				},
				p2: {
					primary: "#3b82f6",
				},
			},
		},
	},
	plugins: [],
};
