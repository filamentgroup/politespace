(function( w ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		if( !element.getAttribute ) {
			// Cut the mustard
			return;
		}

		var groupRegMatch, allowMatch;

		this.element = element;

		allowMatch = this.element.getAttribute("data-allowmatch");
		if ( allowMatch && allowMatch !== "" ) {
			try {
				allowMatch = new RegExp(allowMatch, "g");
			}
			catch (e) {
				allowMatch = false;
			}
		}
		else {
			allowMatch = false;
		}
		this.allowMatch = allowMatch || /\D/g;

		this.groupLength = this.element.getAttribute( "data-grouplength" ) || 3;
		groupRegMatch = this._buildRegexArr( this.groupLength );

		this.groupRegNonUniform = groupRegMatch.length > 1;
		this.groupReg = new RegExp( groupRegMatch.join( '' ), !this.groupRegNonUniform ? 'g' : '' );
	};

	Politespace.prototype._buildRegexArr = function( groupLengths ) {
		var split = ( '' + groupLengths ).split( ',' ),
			str = [];

		for( var j = 0, k = split.length; j<k; j++ ) {
			str.push( '([\\S]{' + ( split[ j ] === '' ? '1,' : split[j] ) + '})' + ( j > 0 ? "?" : "" ) );
		}

		return str;
	};

	Politespace.prototype.format = function( value ) {
		var val, match;

		val = value.replace( this.allowMatch, '' );

		if( this.groupRegNonUniform ) {
			match = val.match( this.groupReg );
			if( match ) {
				match.shift();

				for( var j = 0; j < match.length; j++ ) {
					if( !match[ j ] ) {
						match.splice( j, 1 );
						j--;
					}
				}
			}

			val = ( match || [ val ] ).join( ' ' );
		} else {
			val = val.replace( this.groupReg, "$1 " );

			if( val.substr( val.length - 1 ) === " " ) {
				val = val.substr( 0, val.length - 1 );
			}
		}

		return val;
	};

	Politespace.prototype.update = function() {
		var maxlength = this.element.getAttribute( "maxlength" ),
			val = this.format( this.element.value );

		if( maxlength ) {
			val = val.substr( 0, maxlength );
		}

		this.element.value = val;
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( /\s/g, '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	w.Politespace = Politespace;

}( this ));
