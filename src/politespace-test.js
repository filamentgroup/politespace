(function( w, $ ) {
	"use strict";

	function insertHtml( html ) {
		var $fixture = $( "#qunit-fixture" );
			$fixture.html( html );
			$fixture.trigger( "enhance" );
	}

	module( "Defaults", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace>' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Blur", function() {
		this.pspace.$element.val( "12345678" ).trigger( "blur" );
		equal( this.pspace.$element.val(), "123 456 78" );
	});

	test( "Formats", function() {
		equal( this.pspace.format( "12" ), "12" );
		equal( this.pspace.format( "123" ), "123" );
		equal( this.pspace.format( "1234" ), "123 4" );
		equal( this.pspace.format( "4444444444" ), "444 444 444 4" );
	});

	module( "Grouplength 2", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-grouplength="2">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Formats", function() {
		equal( this.pspace.format( "12" ), "12" );
		equal( this.pspace.format( "123" ), "12 3" );
		equal( this.pspace.format( "1234" ), "12 34" );
		equal( this.pspace.format( "4444444444" ), "44 44 44 44 44" );
	});

	module( "Grouplength 1,2,", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-grouplength="1,2,">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Formats", function() {
		equal( this.pspace.format( "12" ), "1 2" );
		equal( this.pspace.format( "123" ), "1 23" );
		equal( this.pspace.format( "1234" ), "1 23 4" );
		equal( this.pspace.format( "1234567890" ), "1 23 4567890" );
	});

	module( "Grouplength 1,2,3", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-grouplength="1,2,3">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Formats", function() {
		equal( this.pspace.format( "12" ), "1" );
		equal( this.pspace.format( "123" ), "1 23" );
		equal( this.pspace.format( "1234" ), "1 23" );
		equal( this.pspace.format( "1234567890" ), "1 23 456" );
	});

	// module( "Number type", {
	// 	setup: function() {
	// 		insertHtml( '<input type="number" data-politespace>' );
	// 		this.pspace = $( "[data-politespace]" ).data( "politespace" );
	// 	},
	// 	teardown: function() {
	// 		this.pspace = null;
	// 	}
	// });

	// test( "Blur", function() {
	// 	this.pspace.$element.val( "12345678" ).trigger( "blur" );
	// 	equal( this.pspace.$element.val(), "123 456 78" );
	// });

}( this, jQuery ));
