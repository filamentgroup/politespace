module.exports = {
	dist: {
		src: [
			"<%= concat.js.dest %>",
			"<%= concat.css.dest %>"
		]
	}
};
