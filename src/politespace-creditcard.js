(function( $ ) {
	"use strict";

	// jQuery Plugin

	$( document ).bind( "politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-creditcard]" ) ) {
			return;
		}
		var pspace = $t.data( "politespace" );
		var firstDigit = parseInt( $t.val().substr( 0, 1 ), 10 );

		// AMEX or Diners Club
		if( firstDigit === 3 ) {
			pspace.setGroupLength( "4,6," );
		} else {
			pspace.setGroupLength( "4" );
		}
	});

}( jQuery ));
