/* global Politespace:true */
(function( win ) {
	"use strict";

	var $;
	if( 'shoestring' in win ) {
		$ = win.shoestring;
	} else if( 'jQuery' in win ) {
		$ = win.jQuery;
	} else {
		throw new Error( "politespace: DOM library not found." );
	}

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( "[data-politespace]" ) ? $( e.target ) : $( "[data-politespace]", e.target );
		$sel.politespace();
	});

})( typeof window !== "undefined" ? window : this );
