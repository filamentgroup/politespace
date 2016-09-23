// jQuery Plugin
(function( w, $ ) {
	"use strict";

	function cleanup( el ) {
		var $t = $( el );
		$t.val( $t.val().replace( /[^\d]*/g, "" ).replace( /^1/, "" ) );
	}

	$( document ).bind( "politespace-init politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-us-telephone]" ) ) {
			return;
		}
		var val = $t.val();

		// Adjust maxlength
		var maxlength= $t.attr( "maxlength" );
		var maxlengthCacheKey = "politespace-us-telephone-maxlength";
		var maxlengthCache = $t.data( maxlengthCacheKey );

		if( maxlength && !maxlengthCache ) {
			maxlengthCache = maxlength;
			$t.data( maxlengthCacheKey, maxlength );

			cleanup( $t[ 0 ] );
			$t.one( "blur", function() {
				$( this ).attr( "maxlength", maxlength );
				cleanup( this );
			});
		}

		if( val.indexOf( '1' ) === 0 ) {
			$t.attr( "maxlength", parseInt( maxlengthCache, 10 ) + 1 );
		}
	});

}( typeof global !== "undefined" ? global : this, jQuery ));
