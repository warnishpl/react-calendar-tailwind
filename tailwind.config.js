export default {
	mode: 'jit',
	content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {},
			maxWidth: {
				'150': '150px', // Dodaje klasę max-w-175px
			},
			scale: {
				'custom': '0.9', // Dodaje klasę max-w-175px
			},
		},
	},
};