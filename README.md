# GRUNTLERPLATE

<!--
[![Build Status](https://travis-ci.org/zachleat/GRUNTLERPLATE.png?branch=master)](https://travis-ci.org/zachleat/GRUNTLERPLATE)
-->

## Using the repo

Run these commands:

 * `npm install`
 * `bower install`
 * `grunt init`

Replace instances of GRUNTLERPLATE with your project name.

You’ll probably want to start by creating a few JS (and/or CSS) source files to `src/` and adding them to grunt via `grunt/config/concat.js`.

Run `grunt` as normal.

## Configuring Grunt

Rather than one giant `Gruntfile.js`, this project is using a modular Grunt setup. Each individual grunt configuration option key has its own file located in `grunt/config-lib/` (readonly upstream configs, do not modify these directly) or `grunt/config/` (project specific configs). You may use the same key in both directories, the objects are smartly combined using [Lo-Dash merge](http://lodash.com/docs#merge).

For concatenation in the previous Gruntfile setup, you’d add another key to the giant object passed into `grunt.initConfig` like this: `grunt.initConfig({ concat: { /* YOUR CONFIG */ } });`. In the new configuration, you’ll create a `grunt/config/concat.js` with `module.exports = { /* YOUR CONFIG */ };`.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## TODO

 * Make a yeoman generator to replace GRUNTLERPLATE with the project name.
