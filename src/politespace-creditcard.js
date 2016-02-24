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

		switch( firstDigit ) {
			case 3: // AMEX or Diners Club
				pspace.setGroupLength( "4,6," );
				break;
			case 4:
			case 5:
			case 6:
				pspace.setGroupLength( "4" );
				break;
		}
	});

}( jQuery ));
