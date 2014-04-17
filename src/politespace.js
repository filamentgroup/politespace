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
