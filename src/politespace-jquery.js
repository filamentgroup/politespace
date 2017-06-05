	var componentName = "politespace";

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
