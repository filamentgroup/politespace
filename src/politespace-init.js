/* global Politespace:true */
(function( $ ) {
	"use strict";

	// jQuery Plugin

	var componentName = "politespace",
		initSelector = "[data-" + componentName + "]";

	$.fn[ componentName ] = function(){
		return this.each( function(){
			var $t = $( this );
			if( $t.data( componentName ) ) {
				return;
			}

			var polite = new Politespace( this );
			if( polite.useProxy() ) {
				polite.createProxy();
			}

			$( this )
				.bind( "input keydown", function() {
					polite.updateProxy();
				})
				.bind( "blur", function() {
					$( this ).closest( ".politespace-proxy" ).addClass( "active" );
					polite.update();
					polite.updateProxy();
				})
				.bind( "focus", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
					polite.reset();
				})
				.data( componentName, polite );

			polite.update();

			$( "[data-toggle-mask]" ).on( "click", function(){
				var selector = $(this).attr( "data-toggle-mask" );
				var $element = $( selector );
				var type = $element.attr( "type" );

				if( type === "password" ){
					$element.attr( "type", $element.attr( "data-toggle-type" ) || "text" );
					$element.data( "politespace" ).unmask();
				} else {
					$element.attr( "data-toggle-type", $element.attr( "type" ));
					$element.attr( "type", "password" );
					$element.data( "politespace" ).mask();
				}
			});
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]();
	});

}( jQuery ));
