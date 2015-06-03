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
		this.type = this.element.getAttribute( "type" );
		this.delimiter = this.element.getAttribute( "data-delimiter" ) || " ";

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

			val = ( match || [ val ] ).join( this.delimiter );
		} else {
			val = val.replace( this.groupReg, "$1" + this.delimiter );

			if( val.substr( val.length - 1 ) === this.delimiter ) {
				val = val.substr( 0, val.length - 1 );
			}
		}

		return val;
	};

	Politespace.prototype.val = function() {
		return this.format( this.element.value );
	};

	Politespace.prototype.update = function() {
		var maxlength = this.element.getAttribute( "maxlength" ),
			val = this.val();

		if( maxlength ) {
			val = val.substr( 0, maxlength );
		}

		if( !this.useProxy() ) {
			this.element.value = val;
		}
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( /\s/g, '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	Politespace.prototype.useProxy = function() {
		return this.type === "number";
	};

	Politespace.prototype.updateProxy = function() {
		if( this.useProxy() ) {
			this.element.parentNode.firstChild.innerHTML = this.val();
		}
	};

	Politespace.prototype.createProxy = function() {
		if( !this.useProxy() ) {
			return;
		}

		function getStyle( el, prop ) {
			return window.getComputedStyle( el, null ).getPropertyValue( prop );
		}
		function getStyleFloat( el, prop ) {
			return parseFloat( getStyle( el, prop ) );
		}

		var parent = this.element.parentNode;
		var el = document.createElement( "div" );
		var proxy = document.createElement( "div" );
		proxy.innerHTML = this.val();
		proxy.style.fontFamily = getStyle( this.element, "font-family" );
		proxy.style.left = ( getStyleFloat( this.element, "padding-left" ) + getStyleFloat( this.element, "border-left-width" ) ) + "px";
		proxy.style.top = ( getStyleFloat( this.element, "padding-top" ) + getStyleFloat( this.element, "border-top-width" ) ) + "px";

		el.appendChild( proxy );
		el.className = "politespace-proxy active";
		var formEl = parent.replaceChild( el, this.element );
		el.appendChild( formEl );
	};

	w.Politespace = Politespace;

}( this ));
