(function($){

	window.PROJECT_NAME = {};

	var SHORT_NAME = window.PROJECT_NAME;

	SHORT_NAME.init = function(){
		SHORT_NAME.setElements();
		SHORT_NAME.basics();
	}

	SHORT_NAME.setElements = function(){
		SHORT_NAME.elems = {};
	}

	SHORT_NAME.basics = function(){

	}

	$(window).load(function() {

	});


	// function to check window size
	function checkWindowSize() {

        var width = $(window).width();
		var new_class = width > 959 ? 'gLarge' :
			width > 600 ? 'gMedium' :
			width < 600 ? 'gSmall' : '';

		$(document.body).removeClass('gLarge gMedium gSmall').addClass(new_class);
	}

	$(document).ready(function(){

		// call checkWindowSize function
		checkWindowSize();

		SHORT_NAME.init();

        //////////////////////////////////////////////////////////////////////////////
        // Slide and push menus //////////////////////////////////////////////////////
        // http://tympanus.net/codrops/2013/04/17/slide-and-push-menus ///////////////
        //////////////////////////////////////////////////////////////////////////////

        var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
        menuRight = document.getElementById( 'cbp-spmenu-s2' ),
        menuTop = document.getElementById( 'cbp-spmenu-s3' ),
        menuBottom = document.getElementById( 'cbp-spmenu-s4' ),
        showLeft = document.getElementById( 'showLeft' ),
        showRight = document.getElementById( 'showRight' ),
        showTop = document.getElementById( 'showTop' ),
        showBottom = document.getElementById( 'showBottom' ),
        showLeftPush = document.getElementById( 'showLeftPush' ),
        showRightPush = document.getElementById( 'showRightPush' ),
        body = document.body;

        // showLeft.onclick = function() {
        //     classie.toggle( this, 'active' );
        //     classie.toggle( menuLeft, 'cbp-spmenu-open' );
        //     disableOther( 'showLeft' );
        // };
        // showRight.onclick = function() {
        //     classie.toggle( this, 'active' );
        //     classie.toggle( menuRight, 'cbp-spmenu-open' );
        //     disableOther( 'showRight' );
        // };
        // showTop.onclick = function() {
        //     classie.toggle( this, 'active' );
        //     classie.toggle( menuTop, 'cbp-spmenu-open' );
        //     disableOther( 'showTop' );
        // };
        // showBottom.onclick = function() {
        //     classie.toggle( this, 'active' );
        //     classie.toggle( menuBottom, 'cbp-spmenu-open' );
        //     disableOther( 'showBottom' );
        // };
        showLeftPush.onclick = function() {
            classie.toggle( this, 'active' );
            classie.toggle( body, 'cbp-spmenu-push-toright' );
            classie.toggle( menuLeft, 'cbp-spmenu-open' );
            disableOther( 'showLeftPush' );
        };
        showRightPush.onclick = function() {
            classie.toggle( this, 'active' );
            classie.toggle( body, 'cbp-spmenu-push-toleft' );
            classie.toggle( menuRight, 'cbp-spmenu-open' );
            disableOther( 'showRightPush' );
        };

        function disableOther( button ) {
            if( button !== 'showLeft' ) {
                classie.toggle( showLeft, 'disabled' );
            }
            if( button !== 'showRight' ) {
                classie.toggle( showRight, 'disabled' );
            }
            if( button !== 'showTop' ) {
                classie.toggle( showTop, 'disabled' );
            }
            if( button !== 'showBottom' ) {
                classie.toggle( showBottom, 'disabled' );
            }
            if( button !== 'showLeftPush' ) {
                classie.toggle( showLeftPush, 'disabled' );
            }
            if( button !== 'showRightPush' ) {
                classie.toggle( showRightPush, 'disabled' );
            }
        }

        //////////////////////////////////////////////////////////////////////////////
        // Nested accordion //////////////////////////////////////////////////////////
        // http://tympanus.net/codrops/2013/03/29/nested-accordion/ //////////////////
        //////////////////////////////////////////////////////////////////////////////
        $( function() {
            /*
            - how to call the plugin:
            $( selector ).cbpNTAccordion( [options] );
            - destroy:
            $( selector ).cbpNTAccordion( 'destroy' );
            */

            // check for accordions
            if ($('.cbp-ntaccordion').length > 0) {
                $.each($('.cbp-ntaccordion'), function() {
                    $(this).cbpNTAccordion();
                });
            }
        });



        //////////////////////////////////////////////////////////////////////////////
        // Menu icon change //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////

        $('.showLeftPush').click(function(event) {
            event.preventDefault();
            var c = $(this);
            if (c.hasClass('fa-bars') ) {
                c.removeClass('fa-bars').addClass('fa-times');
            } else {
                c.addClass('fa-bars').removeClass('fa-times');
            }
        });

        $('.showRightPush').click(function(event) {
            event.preventDefault();
            var c = $(this);
            if (c.hasClass('fa-cog') ) {
                c.removeClass('fa-cog').addClass('fa-times');
            } else {
                c.addClass('fa-cog').removeClass('fa-times');
            }
        });




	});//close document ready

})(jQuery)
