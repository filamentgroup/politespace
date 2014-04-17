/*! politespace - v0.0.1 - 2014-04-17
Politely add spaces to input values to increase readability (credit card numbers, phone numbers, etc).
 * https://github.com/filamentgroup/politespace
 * Copyright (c) 2014 Filament Group (@filamentgroup)
 * MIT License */

(function( $, w ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		this.$element = $( element );

		var grouplength = this.$element.attr( "data-grouplength" ) || 3,
			groupRegMatch = this._buildRegexArr( grouplength );

		this.groupRegNonUniform = groupRegMatch.length > 1;
		this.groupReg = new RegExp( groupRegMatch.join( '' ), !this.groupRegNonUniform ? 'g' : '' );
	};

	Politespace.prototype._buildRegexArr = function( groupLengths ) {
		var split = ( '' + groupLengths ).split( ',' ),
			str = [];
		for( var j = 0, k = split.length; j<k; j++ ) {
			str.push( '([\\S]{' + ( split[ j ] === '' ? '1,' : split[j] ) + '})' );
		}
		return str;
	};

	Politespace.prototype.format = function( value ) {
		var val = value.replace( /\D/g, '' ),

			match;

		if( this.groupRegNonUniform ) {
			match = val.match( this.groupReg );
			if( match ) {
				match.shift();
			}

			val = ( match || [ val ] ).join( ' ' );
		} else {
			val = val.replace( this.groupReg, "$1 " );
		}

		return val;
	};

	Politespace.prototype.update = function() {
		var maxlength = this.$element.attr( "maxlength" ),
			val = this.format( this.$element.val() );

		if( maxlength ) {
			val = val.substr( 0, maxlength );
		}

		this.$element.val( val );
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( /\s/g, '' );
	};

	Politespace.prototype.reset = function() {
		this.$element.val( this.unformat( this.$element.val() ) );
	};

	w.Politespace = Politespace;

}( jQuery, this ));

(function( $ ) {
	"use strict";

	var componentName = "politespace",
		enhancedAttr = "data-enhanced",
		initSelector = "[data-" + componentName + "]:not([" + enhancedAttr + "])";

	$.fn[ componentName ] = function(){
		return this.each( function(){
			var polite = new Politespace( this );

			$( this ).bind( "blur", function() {
					polite.update();
				})
				.bind( "focus", function() {
					polite.reset();
				})
				.data( componentName, polite );

			polite.update();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]().attr( enhancedAttr, "true" );
	});

}( jQuery ));
