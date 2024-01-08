module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		// Indentation
		'indent': ['error', 'tab'],
	
		// Semicolons
		'semi': ['error', 'always'],
		'semi-style': ['warn', 'last'],
	
		// Empty lines
		'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
	
		// Spaces
		'no-multi-spaces': 'error',
		'semi-spacing': ['warn', {'before': false, 'after': true}],
		'space-infix-ops': ['error', { 'int32Hint': false }],
		'space-in-parens': ['error', 'never'],
	
		// Variable naming
		// WARNING: does not check if first char is Capital, but you should do it anyway
		'camelcase': ['error', { 'properties': 'always'}],
		'id-length': ['error', { 'min': 3, 'exceptions': ['i', 'j', 'n', 'PI', 'pi']}],
		'no-underscore-dangle': ['error'],
	
		// Comments
		'no-warning-comments': 'warn',
		'spaced-comment': ['warn', 'always'],
		
		// Other
		'no-var': 'error',
		'prefer-const': 'error',
		'quotes': ['warn', 'double'],
	}
};
