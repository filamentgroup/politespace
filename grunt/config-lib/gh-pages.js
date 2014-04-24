module.exports = {
	options: {
		branch: "gh-pages",
		tag: "v<%= pkg.version %>",
		message: "politespace <%= pkg.version %> [ci skip]"
	},
	src: [
		"bower.json",
		"<%= pkg.config.dist %>/**/*",
		"<%= pkg.config.test %>/**/*",
		"<%= pkg.config.demo %>/**/*",
		"<%= pkg.config.bower %>/**/*"
	]
};
