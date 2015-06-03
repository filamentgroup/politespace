module.exports = {
	options: {
		stripBanners: true
	},
	js: {
		src: [],
		dest: "<%= pkg.config.dist %>/<%= pkg.name %>.js"
	},
	css: {
		src: [],
		dest: "<%= pkg.config.dist %>/<%= pkg.name %>.css"
	},
	jstest: {
		src: [],
		dest: "<%= pkg.config.dist %>/test/tests.js"
	}
};
