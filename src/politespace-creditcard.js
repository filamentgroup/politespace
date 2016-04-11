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
		var adjustMaxlength = $t.is( "[data-politespace-creditcard-maxlength]" );

		// AMEX
		if( firstDigit === 3 ) {
			pspace.setGroupLength( adjustMaxlength ? "4,6,5" : "4,6," );
		} else { // Visa, Mastercard, Discover
			pspace.setGroupLength( adjustMaxlength ? "4,4,4,4" : "4" );
		}
	});

}( jQuery ));
