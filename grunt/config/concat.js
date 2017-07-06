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
	},
	cssdemo: {
		src: [
			"node_modules/xrayhtml/dist/xrayhtml.css"
		],
		dest: "<%= pkg.config.dist %>/libs/libs.css"
	},
	jsdemo: {
		src: [
			// load jQuery
			"node_modules/jquery/dist/jquery.js",
			// load shoestring
			// "node_modules/shoestring/dist/shoestring.js",
			"node_modules/xrayhtml/dist/xrayhtml.js"
		],
		dest: "<%= pkg.config.dist %>/libs/libs.js"
	}
};
