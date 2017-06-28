	$( document ).bind( "politespace-init politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-politespace-creditcard]" ) ) {
			return;
		}
		var pspace = $t.data( "politespace" );
		var val = $t.val();
		var adjustMaxlength = $t.is( "[data-politespace-creditcard-maxlength]" );
		var type = w.CreditableCardType( val );

		if( type === "AMEX" ) {
			pspace.setGroupLength( adjustMaxlength ? "4,6,5" : "4,6," );

			if( adjustMaxlength ) {
				$t.attr( "maxlength", 15 );
			}
		} else if( type === "DISCOVER" || type === "VISA" || type === "MASTERCARD" || type === "JCB") {
			pspace.setGroupLength( adjustMaxlength ? "4,4,4,4" : "4" );

			if( adjustMaxlength ) {
				$t.attr( "maxlength", 16 );
			}
		}
	});
