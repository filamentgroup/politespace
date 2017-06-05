module.exports = {
	js: {
		src: [
			"node_modules/creditable/creditablecardtype.js",
			"src/politespace-intro.js",
			"src/politespace.js",
			"src/politespace-jquery.js",
			"src/politespace-creditcard.js",
			"src/politespace-us-telephone.js",
			"src/politespace-outro.js",
		]
	},
	jsinit: {
		src: [
			"src/politespace-init.js"
		],
		dest: "<%= pkg.config.dist %>/<%= pkg.name %>-init.js"
	},
	css: {
		src: [
			"src/politespace.css"
		]
	},
	jstest: {
		src: [
			"src/politespace-test.js"
		]
	}
};
