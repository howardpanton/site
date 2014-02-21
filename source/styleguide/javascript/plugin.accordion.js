/**
 * jquery.cbpNTAccordion.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 * 
 * http://tympanus.net/codrops/2013/03/29/nested-accordion/
 * http://tympanus.net/Blueprints/NestedAccordion/ (demo)
 */
;( function( $, window, undefined ) {

	'use strict';

	// global
	var $body = $( 'html, body' );

	$.CBPNTAccordion = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.CBPNTAccordion.defaults = {};

	$.CBPNTAccordion.prototype = {
		_init : function( options ) {
			// options
			this.options = $.extend( true, {}, $.CBPNTAccordion.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			// initialize/bind the events
			this._initEvents();
		},
		_config : function() {

			// the clickable items
			this.$items = this.$el.find( '.cbp-nttrigger' );

		},
		_initEvents : function() {


			$('.read-less').hide();

			this.$items.on( 'click.cbpNTAccordion', function() {
				var $listItem = $( this ).parent();
				if( $listItem.hasClass( 'cbp-ntopen' ) ) {
					$listItem.removeClass( 'cbp-ntopen' );
					// add functionality to rotate the icon to show that li is closed
					$listItem.find('h3 span.open-close-icon').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');

					// $listItem.find('p span.open-close-icon').removeClass('fa-angle-up').addClass('fa-angle-down');
					$listItem.find('.read-more').show();
					$listItem.find('.read-less').hide();

				}
				else {
					$listItem.addClass( 'cbp-ntopen' );
					$body.scrollTop( $listItem.offset().top );
					// add functionality to rotate the icon to show that li is open
					$listItem.find('h3 span.open-close-icon').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');

					// $listItem.find('p span.open-close-icon').removeClass('fa-angle-down').addClass('fa-angle-up');
					$listItem.find('.read-more').hide();
					$listItem.find('.read-less').show();
				}
			} );

		},
		destroy : function() {
			this.$items.off( '.cbpNTAccordion' ).parent().removeClass( 'cbp-ntopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.cbpNTAccordion = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'cbpNTAccordion' );
				if ( !instance ) {
					logError( "cannot call methods on cbpNTAccordion prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for cbpNTAccordion instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each(function() {
				var instance = $.data( this, 'cbpNTAccordion' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'cbpNTAccordion', new $.CBPNTAccordion( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );
