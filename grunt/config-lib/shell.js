module.exports = {
	"gh-pages-pre": {
		command: 'mv _bower.json bower.json',
		options: {
			stdout: true
		}
	},
	"gh-pages-post": {
		command: 'mv bower.json _bower.json',
		options: {
			stdout: true
		}
	}
};
