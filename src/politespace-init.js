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

			$t.bind( "politespace-hide-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).removeClass( "active" );
				})
				.bind( "politespace-show-proxy", function() {
					$( this ).closest( ".politespace-proxy" ).addClass( "active" );

					polite.update();
					polite.updateProxy();
				})
				.bind( "paste", function(e){
					var event = e.originalEvent || e;

					// http://stackoverflow.com/questions/6035071/intercept-paste-event-in-javascript
					var pastedText;

					if (window.clipboardData && window.clipboardData.getData) { // IE
						pastedText = window.clipboardData.getData('Text');
					} else if (event.clipboardData && event.clipboardData.getData) {
						pastedText = event.clipboardData.getData('text/plain');
					}

					// if we were unable to get the pasted text avoid doing anything
					if( !pastedText ){
						return;
					}

					// otherwise force the text to look right
					this.value = polite.conform(pastedText);

					// prevent the original paste behavior
					event.preventDefault();

					// and update the state of the plugin
					polite.update();
					polite.updateProxy();
				})
				.bind( "input keydown", function() {
					$( this ).trigger( "politespace-input" );

					polite.updateProxy();
				})
				.bind( "blur", function() {
					$( this ).trigger( "politespace-beforeblur" );

					polite.update();

					if( polite.useProxy() ){
						$( this ).trigger( "politespace-show-proxy" );
					}
				})
				.bind( "focus", function() {
					$( this ).trigger( "politespace-hide-proxy" );
					polite.reset();
				})
				.data( componentName, polite )
				.trigger( "politespace-init" );

			polite.update();
			polite.updateProxy();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( initSelector ) ? $( e.target ) : $( initSelector, e.target );
		$sel[ componentName ]();
	});

}( jQuery ));
