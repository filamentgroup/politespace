(function( w, $ ) {
	"use strict";

	function insertHtml( html ) {
		var $fixture = $( "#qunit-fixture" );
			$fixture.html( html );
			$fixture.trigger( "enhance" );
	}

	QUnit.module( "Defaults", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace>' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Not Reversed", function( assert ) {
		assert.strictEqual( this.pspace.reverse, false );
	});

	QUnit.test( "Blur", function( assert ) {
		$( this.pspace.element ).val( "12345678" ).trigger( "blur" );
		assert.equal( $( this.pspace.element ).val(), "123 456 78" );
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "12" );
		assert.equal( this.pspace.format( "123" ), "123" );
		assert.equal( this.pspace.format( "1234" ), "123 4" );
		assert.equal( this.pspace.format( "4444444444" ), "444 444 444 4" );
	});

	QUnit.module( "Grouplength 2", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="2">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "12" );
		assert.equal( this.pspace.format( "123" ), "12 3" );
		assert.equal( this.pspace.format( "1234" ), "12 34" );
		assert.equal( this.pspace.format( "4444444444" ), "44 44 44 44 44" );
	});

	QUnit.module( "Grouplength 1,2,", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="1,2,">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "1 2" );
		assert.equal( this.pspace.format( "123" ), "1 23" );
		assert.equal( this.pspace.format( "1234" ), "1 23 4" );
		assert.equal( this.pspace.format( "1234567890" ), "1 23 4567890" );
	});

	QUnit.module( "Grouplength 1,2,3", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="1,2,3">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "1 2" );
		assert.equal( this.pspace.format( "123" ), "1 23" );
		assert.equal( this.pspace.format( "1234" ), "1 23 4" );
		assert.equal( this.pspace.format( "1234567890" ), "1 23 456" );
	});

	QUnit.module( "Number type", {
		beforeEach: function() {
			insertHtml( '<input type="number" data-politespace>' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Input and blur updates proxy", function( assert ) {
		$( this.pspace.element ).val( "12345678" ).trigger( "input" );
		assert.equal( $( this.pspace.element ).val(), "12345678" );
		assert.ok( $( this.pspace.element ).prev().is( ".politespace-proxy-val" ), "Proxy value exists." );
		assert.ok( $( this.pspace.element ).parent().is( ".politespace-proxy" ), "Proxy exists." );
		assert.equal( $( this.pspace.element ).prev().html(), "123 456 78" );
	});

	QUnit.test( "Focus keeps value", function( assert ) {
		$( this.pspace.element ).val( "12345678" ).trigger( "input" );
		assert.equal( $( this.pspace.element ).val(), "12345678" );
		// We don’t test proxy html here because it isn’t shown and is irrelevant.
	});

	// Known issue in Firefox:
	// Does not display leading zeros for input type="number" but .value returns
	// leading zeros.
	QUnit.test( "Input with leading zero", function( assert ) {
		$( this.pspace.element ).val( "01234" ).trigger( "input" );
		assert.equal( $( this.pspace.element ).val(), "01234" );
		assert.equal( $( this.pspace.element ).prev().html(), "012 34" );
	});

	QUnit.module( "Custom delimiter", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-delimiter="-">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "123" ), "123" );
		assert.equal( this.pspace.format( "1234" ), "123-4" );
		assert.equal( this.pspace.format( "1234567890" ), "123-456-789-0" );
	});

	QUnit.module( "Apply right to left, uniform grouplength", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="3" data-politespace-reverse data-politespace-delimiter="," data-politespace-decimal-mark=".">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Blur", function( assert ) {
		$( this.pspace.element ).val( "12345678" ).trigger( "blur" );
		assert.equal( $( this.pspace.element ).val(), "12,345,678" );
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "12" );
		assert.equal( this.pspace.format( "123" ), "123" );
		assert.equal( this.pspace.format( "1234" ), "1,234" );
		assert.equal( this.pspace.format( "4444444444" ), "4,444,444,444" );
		assert.equal( this.pspace.format( "4444444444.44" ), "4,444,444,444.44" );
	});

	QUnit.module( "Apply right to left, uniform grouplength, i18n Four Thousand = 4 000,00", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="3" data-politespace-reverse data-politespace-delimiter=" " data-politespace-decimal-mark=",">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "12" );
		assert.equal( this.pspace.format( "123" ), "123" );
		assert.equal( this.pspace.format( "1234" ), "1 234" );
		assert.equal( this.pspace.format( "4444444444" ), "4 444 444 444" );
		assert.equal( this.pspace.format( "4444444444,44" ), "4 444 444 444,44" );
	});

	QUnit.module( "Apply right to left, nonuniform grouplength", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="4,3," data-politespace-reverse data-politespace-delimiter="-">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Blur", function( assert ) {
		$( this.pspace.element ).val( "1112345678" ).trigger( "blur" );
		assert.equal( $( this.pspace.element ).val(), "111-234-5678" );
	});

	QUnit.test( "Formats", function( assert ) {
		assert.equal( this.pspace.format( "12" ), "12" );
		assert.equal( this.pspace.format( "123" ), "123" );
		assert.equal( this.pspace.format( "12345" ), "1-2345" );
		assert.equal( this.pspace.format( "444444444444" ), "44444-444-4444" );
	});

	QUnit.module( "Edit twice", {
		beforeEach: function() {
			insertHtml( '<input type="text" data-politespace data-politespace-grouplength="3,3," data-politespace-delimiter="-">' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Blur", function( assert ) {
		$( this.pspace.element ).val( "1112223333" ).trigger( "blur" );
		assert.equal( $( this.pspace.element ).val(), "111-222-3333" );
		$( this.pspace.element ).trigger( "focus" ).trigger( "blur" );
		assert.equal( $( this.pspace.element ).val(), "111-222-3333" );
	});

	QUnit.module( "Proxy Anchor", {
		beforeEach: function() {
			insertHtml( '<div class="field"><input type="number" data-politespace data-politespace-proxy-anchor=".field"></div>' );
			this.pspace = $( "[data-politespace]" ).data( "politespace" );
		},
		afterEach: function() {
			this.pspace = null;
		}
	});

	QUnit.test( "Test ancestor class names", function( assert ) {
		assert.equal( this.pspace.$element.parent().is( ".field" ), true, "First ancestor is the proxy anchor (.field)." );
		assert.equal( this.pspace.$element.parent().parent().is( ".politespace-proxy" ), true, "Second ancestor is the politespace proxy" );
	});

}( this, jQuery ));
