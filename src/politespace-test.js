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
		$( this.pspace.element ).val( "12345678" ).trigger( "blur" );
		equal( $( this.pspace.element ).val(), "123 456 78" );
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
		equal( this.pspace.format( "12" ), "1 2" );
		equal( this.pspace.format( "123" ), "1 23" );
		equal( this.pspace.format( "1234" ), "1 23 4" );
		equal( this.pspace.format( "1234567890" ), "1 23 456" );
	});

	module( "Number type", {
		setup: function() {
			insertHtml( '<input type="number" data-politespace>' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Input and blur updates proxy", function() {
		$( this.pspace.element ).val( "12345678" ).trigger( "input" );
		equal( $( this.pspace.element ).val(), "12345678" );
		equal( $( this.pspace.element ).prev().html(), "123 456 78" );
	});

	test( "Focus keeps value", function() {
		$( this.pspace.element ).val( "12345678" ).trigger( "input" );
		equal( $( this.pspace.element ).val(), "12345678" );
		// We don’t test proxy html here because it isn’t shown and is irrelevant.
	});

	// Known issue in Firefox:
	// Does not display leading zeros for input type="number" but .value returns
	// leading zeros.
	test( "Input with leading zero", function() {
		$( this.pspace.element ).val( "01234" ).trigger( "input" );
		equal( $( this.pspace.element ).val(), "01234" );
		equal( $( this.pspace.element ).prev().html(), "012 34" );
	});

	module( "Custom delimiter", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-delimiter="-">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Formats", function() {
		equal( this.pspace.format( "123" ), "123" );
		equal( this.pspace.format( "1234" ), "123-4" );
		equal( this.pspace.format( "1234567890" ), "123-456-789-0" );
	});

	module( "Apply right to left, uniform grouplength", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-grouplength="3" data-reverse data-delimiter=",">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Blur", function() {
		$( this.pspace.element ).val( "12345678" ).trigger( "blur" );
		equal( $( this.pspace.element ).val(), "12,345,678" );
	});

	test( "Formats", function() {
		equal( this.pspace.format( "12" ), "12" );
		equal( this.pspace.format( "123" ), "123" );
		equal( this.pspace.format( "1234" ), "1,234" );
		equal( this.pspace.format( "4444444444" ), "4,444,444,444" );
	});

	module( "Apply right to left, nonuniform grouplength", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-grouplength="4,3," data-reverse data-delimiter="-">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Blur", function() {
		$( this.pspace.element ).val( "1112345678" ).trigger( "blur" );
		equal( $( this.pspace.element ).val(), "111-234-5678" );
	});

	test( "Formats", function() {
		equal( this.pspace.format( "12" ), "12" );
		equal( this.pspace.format( "123" ), "123" );
		equal( this.pspace.format( "12345" ), "1-2345" );
		equal( this.pspace.format( "444444444444" ), "44444-444-4444" );
	});

	module( "Edit twice", {
		setup: function() {
			insertHtml( '<input type="text" data-politespace data-grouplength="3,3," data-delimiter="-">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		teardown: function() {
			this.pspace = null;
		}
	});

	test( "Blur", function() {
		$( this.pspace.element ).val( "1112223333" ).trigger( "blur" );
		equal( $( this.pspace.element ).val(), "111-222-3333" );
		$( this.pspace.element ).trigger( "focus" ).trigger( "blur" );
		equal( $( this.pspace.element ).val(), "111-222-3333" );
	});

}( this, jQuery ));
