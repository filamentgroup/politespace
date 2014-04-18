# Politespace

[![Build Status](https://travis-ci.org/filamentgroup/politespace.png?branch=master)](https://travis-ci.org/filamentgroup/politespace)

## Using Politespace

Add `data-politespace` to your form’s `input[type=text]` (et al) or `textarea` and we’ll add spaces to the value when the user blurs off of it. We’ll also remove those spaces on focus.

To customize the number of spaces, use the `data-grouplength` attribute. It can be:

 * single number (to uniformly repeat, like a credit card)
 * a comma delimited list (for non-uniform strings, like "2,4" for MM YYYY). This also works with open ended commas, like "2," for MM YYYY or "3,3," for a US phone number.

### [Demo](http://filamentgroup.github.io/politespace/demo/demo.html)

## Using the repo

Run these commands:

 * `npm install`
 * `bower install`

## Configuring Grunt

Rather than one giant `Gruntfile.js`, this project is using a modular Grunt setup. Each individual grunt configuration option key has its own file located in `grunt/config-lib/` (readonly upstream configs, do not modify these directly) or `grunt/config/` (project specific configs). You may use the same key in both directories, the objects are smartly combined using [Lo-Dash merge](http://lodash.com/docs#merge).

For concatenation in the previous Gruntfile setup, you’d add another key to the giant object passed into `grunt.initConfig` like this: `grunt.initConfig({ concat: { /* YOUR CONFIG */ } });`. In the new configuration, you’ll create a `grunt/config/concat.js` with `module.exports = { /* YOUR CONFIG */ };`.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
