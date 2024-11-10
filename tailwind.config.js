export default {
	mode: 'jit',
	content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {},
			maxWidth: {
				150: '150px',
			},
			scale: {
				custom: '0.9', 
			},
			width: {
				custom: '85%',
			},
		},
	},
};
