// jQuery Plugin
(function( w, $ ) {
	"use strict";

	var maxlengthCacheKey = "politespace-us-telephone-maxlength";
	var eventName = "politespace-beforeblur.politespace-us-telephone";

	function cleanup( el ) {
		var $t = $( el );
		var val = $t.val();

		$t.val( val.replace( /^1/, "" ) );
	}

	// On init
	$( document ).bind( "politespace-init", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-us-telephone]" ) ) {
			return;
		}

		// Adjust maxlength
		var maxlength= $t.attr( "maxlength" );

		if( maxlength ) {
			$t.data( maxlengthCacheKey, parseInt( maxlength, 10 ) );

			cleanup( $t[ 0 ] );
			$t.off( eventName ).on( eventName, function() {
				$( this ).attr( "maxlength", $t.data( maxlengthCacheKey ) );
				cleanup( this );
			});
		}
	});

	// On input
	$( document ).bind( "politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-us-telephone]" ) ) {
			return;
		}

		if( $t.val().indexOf( '1' ) === 0 ) {
			$t.attr( "maxlength", $t.data( maxlengthCacheKey ) + 1 );
		}
	});

}( typeof global !== "undefined" ? global : this, jQuery ));
