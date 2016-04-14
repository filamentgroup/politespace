/*global jQuery:true*/
/*global NumericInput:true*/
/*
 * Create masked input toggle that works with polite space
 *
 * Copyright (c) 2015 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, window ) {
	"use strict";

	function MaskedInput( e ) {
		var self, $element;

		self = this;
		$element = (this.$element = $(e));
		this.selector = this.$element.attr( "data-toggle-mask" );
		this.$selectedElement = $( this.selector );


		this.$element.on("click", function(){ self.mask(); });
		this.$element.prop( "checked", false );
		this.mask();
	}

	MaskedInput.prototype.mask = function(){
		var type, newType;

		type = this.$selectedElement.attr( "type" );

		if( this.$element.prop( "checked") ){
			newType = this.$selectedElement.attr( "data-toggle-type" ) || "text";
			this.$selectedElement.attr( "type", newType );

			// make sure politespace knows that the type has changed
			this.$selectedElement.trigger( "politespace-show-proxy" );
		} else {
			this.$selectedElement.attr( "data-toggle-type", type );
			this.$selectedElement.attr( "type", "password" );

			// make sure politespace knows that the type has changed
			this.$selectedElement.trigger( "politespace-hide-proxy" );
		}

	};

	$( document ).bind( "enhance", function( e ) {
		$( "[data-toggle-mask]" ).each(function( i, e ){
			$(e).data( "masked-input", new MaskedInput(e));
		});
	});
}( jQuery, this ));
