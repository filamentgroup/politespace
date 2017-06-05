// UMD module definition
// From: https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js

(function (factory) {
	if (typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				if ( typeof window !== 'undefined' ) {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";

	var w = typeof window !== "undefined" ? window : this;
