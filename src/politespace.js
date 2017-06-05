(function( w ){
	"use strict";

	var Politespace = function( element ) {
		if( !element ) {
			throw new Error( "Politespace requires an element argument." );
		}

		if( !element.getAttribute || window.operamini ) {
			// Cut the mustard
			return;
		}

		this.element = element;
		this.delimiter = element.getAttribute( "data-delimiter" ) || " ";
		// https://en.wikipedia.org/wiki/Decimal_mark
		this.decimalMark = element.getAttribute( "data-decimal-mark" ) || "";
		this.reverse = element.hasAttribute( "data-reverse" );
		this.strip = element.getAttribute( "data-politespace-strip" );
		this.groupLength = element.getAttribute( "data-grouplength" ) || 3;

		var proxyAnchorSelector = element.getAttribute( "data-proxy-anchor" );
		this.proxyAnchor = this.element;
		this.proxy = null;

		if( proxyAnchorSelector ) {
			this.proxyAnchor = element.closest( proxyAnchorSelector );
		}
	};

	Politespace.prototype._divideIntoArray = function( value ) {
		var split = ( '' + this.groupLength ).split( ',' ),
			isUniformSplit = split.length === 1,
			dividedValue = [],
			loopIndex = 0,
			groupLength,
			substrStart,
			useCharCount;

		while( split.length && loopIndex < value.length ) {
			if( isUniformSplit ) {
				groupLength = split[ 0 ];
			} else {
				// use the next split or the rest of the string if open ended, ala "3,3,"
				groupLength = split.shift() || value.length - loopIndex;
			}

			// Use min if we’re at the end of a reversed string
			// (substrStart below grows larger than the string length)
			useCharCount = Math.min( parseInt( groupLength, 10 ), value.length - loopIndex );

			if( this.reverse ) {
				substrStart = -1 * (useCharCount + loopIndex);
			} else {
				substrStart = loopIndex;
			}
			dividedValue.push( value.substr( substrStart, useCharCount ) );
			loopIndex += useCharCount;
		}

		if( this.reverse ) {
			dividedValue.reverse();
		}

		return dividedValue;
	};

	Politespace.prototype.format = function( value ) {
		var split;
		var val = this.unformat( value );
		if( this.strip ) {
			val = val.replace( new RegExp(  this.strip, 'g' ), "" );
		}
		var suffix = '';

		if( this.decimalMark ) {
			split = val.split( this.decimalMark );
			suffix = split.length > 1 ? this.decimalMark + split[ 1 ] : '';
			val = split[ 0 ];
		}

		return this._divideIntoArray( val ).join( this.delimiter ) + suffix;
	};

	Politespace.prototype.trimMaxlength = function( value ) {
		var maxlength = this.element.getAttribute( "maxlength" );
		// Note input type="number" maxlength does nothing
		if( maxlength ) {
			value = value.substr( 0, maxlength );
		}
		return value;
	};

	Politespace.prototype.getValue = function() {
		return this.trimMaxlength( this.element.value );
	};

	Politespace.prototype.update = function() {
		this.element.value = this.useProxy() || this.element.getAttribute( "type" ) === "password" ?
			this.getValue() :
			this.format( this.getValue() );
	};

	Politespace.prototype.unformat = function( value ) {
		return value.replace( new RegExp(  this.delimiter, 'g' ), '' );
	};

	Politespace.prototype.reset = function() {
		this.element.value = this.unformat( this.element.value );
	};

	Politespace.prototype.useProxy = function() {
		var pattern = this.element.getAttribute( "pattern" );
		var type = this.element.getAttribute( "type" );

		// this needs to be an attr check and not a prop for `type` toggling (like password)
		return type === "number" ||
			// When Chrome validates form fields using native form validation, it uses `pattern`
			// which causes validation errors when we inject delimiters. So use the proxy to avoid
			// delimiters in the form field value.
			// Chrome also has some sort of
			( pattern ? !( new RegExp( "^" + pattern + "$" ) ).test( this.delimiter ) : false );
	};

	Politespace.prototype.updateProxy = function() {
		if( this.useProxy() && this.proxy ) {
			var html = this.format( this.getValue() );
			var width = this.element.offsetWidth;

			this.proxy.innerHTML = html;

			if( width ) {
				this.proxy.style.setProperty( "width", width + "px" );
			}

			// Hide if empty, to show placeholder
			this.proxy.closest( ".politespace-proxy" )
				.classList[ html ? 'add' : 'remove' ]( "notempty" );
		}
	};

	Politespace.prototype.createProxy = function() {
		if( !this.useProxy() ) {
			return;
		}

		function sumStyles( style, props ) {
			var total = 0;
			for( var j = 0, k = props.length; j < k; j++ ) {
				total += parseFloat( style.getPropertyValue( props[ j ] ) );
			}
			return total;
		}

		var computed = window.getComputedStyle( this.element );

		var el = document.createElement( "div" );
		el.className = "politespace-proxy active";

		var nextSibling = this.proxyAnchor.nextSibling;
		var parent = this.proxyAnchor.parentNode;

		var proxy = document.createElement( "div" );
		proxy.className = "politespace-proxy-val";
		proxy.style.setProperty( "font", computed.getPropertyValue( "font" ) );
		proxy.style.setProperty( "padding-left", sumStyles( computed, [ "padding-left", "border-left-width" ] ) + "px");
		proxy.style.setProperty( "padding-right", sumStyles( computed, [ "padding-right", "border-right-width" ] ) + "px");
		proxy.style.setProperty( "top",  sumStyles( computed, [ "padding-top", "border-top-width", "margin-top" ] ) + "px");
		this.proxy = el.appendChild( proxy );
		el.appendChild( this.proxyAnchor );

		if( nextSibling ) {
			el.insertBefore( nextSibling );
		} else {
			parent.appendChild( el );
		}

		this.updateProxy();
	};

	Politespace.prototype.setGroupLength = function( length ) {
		this.groupLength = length;
		this.element.setAttribute( "data-grouplength", length );
	};

	w.Politespace = Politespace;

})( this );
