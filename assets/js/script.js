
// --------------------------------------------------
// function to allow scroll to an element on the page
//
// example:  $('some-div').scrollToMe();  
//
jQuery.fn.extend({
  scrollToMe: function () {
  var x = jQuery(this).offset().top - 100;
  jQuery('html,body').animate({scrollTop: x}, 500);
}});

// --------------------------------------------------

var d = $('.breadcrumbs').find('a');
d.last().hide();



function checkWindowSize() {
  var width = $(window).width(),
  new_class = width > 850 ? 'gDesktop' :
              width > 600 ? 'gTablet' :
              width < 600 ? 'gmobile' :
              width > 1289 ? 'gDesktop' : '';

  $(document.body).removeClass('gDesktop gTablet gmobile').addClass(new_class);
}

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();


// enables UAL themed select boxes
function enableSelectBoxes() {
  
  $('.js-select-box').each(function() {
    var _start_val = $(this).children('ul.js-select-box-list').children('li.select-box-option:first').children('a').html();
    $(this).children('div').children('h3.selected').html(_start_val);
    $('input.js-select-box-value').attr('value',$(this).children('ul.js-select-box-list').children('li.select-box-option:first').attr('data-sb-value'));

    $(this).children('div').children('h3.selected,div.select-box-arrow').fastClick(function(event) {
      event.preventDefault();
      if($(this).parent().parent().children('ul.js-select-box-list').css('display') == 'none'){
        $(this).parent().parent().children('ul.js-select-box-list').css('display', 'block');
        $(this).parent().children('div.select-box-arrow').children('span.js-select-box-icon').html('&#59239;');
      }
      else
      {
        $(this).parent().parent().children('ul.js-select-box-list').css('display', 'none');
         $(this).parent().children('div.select-box-arrow').children('span.js-select-box-icon').html('&#59236;');
      }
    });

    $(this).find('li.select-box-option').fastClick(function(event){
      event.preventDefault();
      $(this).parent().css('display','none');
      $('input.js-select-box-value').attr('value',$(this).attr('data-sb-value'));
      var _test = 'the select option is :' + $(this).attr('data-sb-value');
      $(this).parent().parent().children('div').children('h3.selected').html($(this).children('a').html());
      $(this).parent().parent().children('div').children('div.select-box-arrow').children('span.js-select-box-icon').html('&#59236;');
      $(this).parent().parent().scrollToMe();
    });
  });       
}

//////////////////////
// ON DOCUMENT READY 
/////////////////////
$(document).ready(function(){

  // sidebar script (populate mobile and tablet menu)
  if ($('.sidebar').length > 0) {

    var _menuHtml = $('.sidebar').html();
    var _mobMenuButton = '<a href="#" class="show-mob-sidebar icon">≡</a>';
    var _mobMenuContent = _mobMenuButton + _menuHtml;
    
    // create mobile sidebar div and add it to the page before the sidebar
    $('<div id="mobile-sidebar" class="mobile-sidebar"></div>').insertBefore('.sidebar');

    // populate the mobile menu with the same content as the desktop sidebar nav & add menu button
    $('#mobile-sidebar').html(_mobMenuContent);

    $('.show-mob-sidebar').fastClick(function(e) {
      e.preventDefault();
      _clicked = $(this);
      
      if (_clicked.hasClass('active')) {
        _clicked.closest($('#mobile-sidebar')).find($('ul')).slideUp();
        _clicked.html('☰').removeClass('active');
      }
      else {

      _clicked.closest($('#mobile-sidebar')).find($('ul')).slideDown();
      // update the menu button and set class to active
      _clicked.html('❌').addClass('active');

      }

    });
  } // end if $(.sidebar)

  // check for selectboxes on the page
  if ($('.select-box').length > 0) {
    // enable custom styled selectboxes
    enableSelectBoxes();
  
  }


  // check for regular blockquotes on the page - 
  // we insert a span at the beginning of the element to show a background image sprite 
  if ($('blockquote').length > 0 ) {
    
    $('blockquote').each(function() {
        $(this).prepend('<span></span>');
    });


  
  }

  // check for large blockquotes on the page - 
  // - insert a span at the beginning to show large blockquote img (sprite)
  if ($('.pull-quote').length > 0) {

    $('.pull-quote').each(function() {
      $(this).prepend('<span></span>');
    });


  }


  // focus highlighting for course search and site search input box
  if ($('.search-input-wrap').length > 0) {

      $('#finder-search-input').focus(function () {
        $('#finder-search-input').parent().parent().addClass('search-gray-border');
      });
   
  }

  //////////////////////
  // MIXITUP FOR SHORT COURSES 
  /////////////////////

      /* 
      * We would normally recommend that all JavaScript is kept in a seperate .js file,
      *   but we have included it in the document head for convenience.
      */
      
      // NICE IMAGE LOADING
      
      /* 
      * Not part of MixItUp, but this is a great lightweight way 
      *   to gracefully fade-in images with CSS3 after they have loaded
      */
      
      function imgLoaded(img){  
        $(img).parent().addClass('loaded');
      };
      
      // ON DOCUMENT READY:
    
      $(function(){
        
        // INSTANTIATE MIXITUP

        $.when(
            $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery-ui.sortable.min.js" ),
            $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.ui.touch-punch.min.js" ),
            $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.mixitup.min.js" ),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){

          $('#Parks').mixitup({
            layoutMode: 'list', // Start in list mode (display: block) by default
            listClass: 'list', // Container class for when in list mode
            gridClass: 'grid', // Container class for when in grid mode
            effects: ['fade','blur'], // List of effects 
            listEffects: ['fade','rotateX'] // List of effects ONLY for list mode

          });

        });
        
        // HANDLE LAYOUT CHANGES
        
        // Bind layout buttons to toList and toGrid methods:
        
        $('#ToList').on('click',function(){
          $('.button').removeClass('active');
          $(this).addClass('active');
          $('#Parks').mixitup('toList');
        });

        $('#ToGrid').on('click',function(){
          $('.button').removeClass('active');
          $(this).addClass('active');
          $('#Parks').mixitup('toGrid');
        });
        
        // HANDLE MULTI-DIMENSIONAL CHECKBOX FILTERING
        
        /*  
        * The desired behaviour of multi-dimensional filtering can differ greatly 
        * from project to project. MixItUp's built in filter button handlers are best
        * suited to simple filter operations, so we will need to build our own handlers
        * for this demo to achieve the precise behaviour we need.
        */
        
        var $filters = $('#Filters').find('li'),
          dimensions = {
            subject: 'all', // Create string for first dimension
            session: 'all', // Create string for second dimension
            interest: 'all' // Create string for third dimension
          };
          
        // Bind checkbox click handlers:
        
        $filters.on('click',function(){
          var $t = $(this),
            dimension = $t.attr('data-dimension'),
            filter = $t.attr('data-filter'),
            filterString = dimensions[dimension];
            
          if(filter == 'all'){
            // If "all"
            if(!$t.hasClass('active')){
              // if unchecked, check "all" and uncheck all other active filters
              $t.addClass('active').siblings().removeClass('active');
              // Replace entire string with "all"
              filterString = 'all'; 
            } else {
              // Uncheck
              $t.removeClass('active');
              // Emtpy string
              filterString = '';
            }
          } else {
            // Else, uncheck "all"
            $t.siblings('[data-filter="all"]').removeClass('active');
            // Remove "all" from string
            filterString = filterString.replace('all','');
            if(!$t.hasClass('active')){
              // Check checkbox
              $t.addClass('active');
              // Append filter to string
              filterString = filterString == '' ? filter : filterString+' '+filter;
            } else {
              // Uncheck
              $t.removeClass('active');
              // Remove filter and preceeding space from string with RegEx
              var re = new RegExp('(\\s|^)'+filter);
              filterString = filterString.replace(re,'');
            };
          };
          
          // Set demension with filterString
          dimensions[dimension] = filterString;
          
          // We now have two strings containing the filter arguments for each dimension:  
          // console.info('dimension 1: '+dimensions.region);
          console.info('dimension 1: '+dimensions.subject);
          console.info('dimension 2: '+dimensions.session);
          console.info('dimension 3: '+dimensions.interest);
          
          /*
          * We then send these strings to MixItUp using the filter method. We can send as
          * many dimensions to MixitUp as we need using an array as the second argument
          * of the "filter" method. Each dimension must be a space seperated string.
          *
          * In this case, MixItUp will show elements using OR logic within each dimension and
          * AND logic between dimensions. At least one dimension must pass for the element to show.
          */
          
          $('#Parks').mixitup('filter',[dimensions.subject, dimensions.session, dimensions.interest])      
        });

      });

  ////////////////////
  //  Stick div to top of browser on scroll 
  ///////////////////

  // function moveScroller() {
  //   var move = function() {
  //     var st = $(window).scrollTop();
  //     var ot = $(".l-short-courses-list").offset().top; 
  //     var s = $(".grid");
  //     if(st > ot) {
  //       s.css({
  //         position: "fixed",
  //         top: "0px",
  //         bottom: "25%"
  //       });
  //     } else {
  //       if(st <= ot) {
  //         s.css({
  //           position: "relative",
  //           top: ""
  //         });
  //       }
  //     }
  //   };
  //   $(window).scroll(move);
  //   move();
  // }

  // $(function() {
  //   moveScroller();
  // });

  // ////////////////////
  // //  Footer journeys - fadeIn / fadeOut on click 
  // ///////////////////

  // $('#footer-btn-explore').click(function(event) {
  //   event.preventDefault();

  //   _clicked = $(this); 
  //   if ( !_clicked.hasClass('active')) {
  //     _clicked.addClass('active');
  //     $('#footer-journeys-panel').addClass("block");

  //     _clicked.html('Close explore');
  //     _clicked.scrollToMe(); // scroll page to footer position
      
  //   } else {
  //     _clicked.removeClass('active');
  //     // $('#footer-journeys-panel').slideUp();
  //     $('#footer-journeys-panel').addClass("hide");
  //     _clicked.html('Explore');
  //     _clicked.scrollToMe(); // scroll page to footer position
  //   }

  // });




  // fade in button when user scrolls down the page
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.back-to-top').fadeIn(200);
    } else {
      $('.back-to-top').fadeOut(200);
    }
  });


  // scroll to the top of the page when the button is clicked
  $('.back-to-top').fastClick(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 300);
  });



  // detect megamenu 

  // if ($('.megamenu_container').length > 0) {

  //     $.when(
  //       $.getScript( "http://artslondon.github.io/beta/assets/js/libs/megamenu.js" ),
  //       $.getScript( "http://artslondon.github.io/beta/assets/js/libs/megamenu_plugins.js" ),
  //       $.Deferred(function( deferred ){
  //           $( deferred.resolve );
  //       })
  //   ).done(function(){
  //             $('.megamenu').megaMenuCompleteSet({
  //             menu_speed_show : 300, // Time (in milliseconds) to show a drop down
  //             menu_speed_hide : 200, // Time (in milliseconds) to hide a drop down
  //             menu_speed_delay : 200, // Time (in milliseconds) before showing a drop down
  //             menu_effect : 'click_slide', // Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
  //             menu_click_outside : 1, // Clicks outside the drop down close it (1 = true, 0 = false)
  //             menu_show_onload : 0, // Drop down to show on page load (type the number of the drop down, 0 for none)
  //             menu_responsive:1 // 1 = Responsive, 0 = Not responsive
  //             });
  //   });


  // }

  


  // detect slider component
  
  if ($('.js-carousel').length > 0) {

    $.getScript('http://artslondon.github.io/beta/assets/js/components/jquery.bxslider.min.js', function() {

      $.each($('.js-carousel'), function() {

        var _this = $(this);
        var _wrapper = _this.closest('.bx-wrapper'); // the .bx-wrapper container div

        // get the individual slide width from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the width to 0 - i.e. max-width
        var _itemWidth = (_this.data('carousel-item-width') > 0) ? _this.data('carousel-item-width') : 0;
        // set the minimum number of slides before it starts to be responsive
        var _itemMinSlides = (_this.data('carousel-min-slides') > 0) ? _this.data('carousel-min-slides') : 0;
        // get the margin between slides from the data-slider-item-margin value in the HTML. If there's nothing set in the data-attribute, set the margin to 0
        var _itemMargin = (_this.data('carousel-item-margin') > 0) ? _this.data('carousel-item-margin') : 0;
        // slider instances always show next/prev controls, unless data-controls is false          
        var _controlsOpt = true;
        _controlsOpt = _this.data('controls');
        // slider instances do not show a pager, unless data-pager is true          
        var _pagerOpt = (_this.data('pager')) ? _this.data('pager') : false;
        
        _this.bxSlider({
          slideWidth: _itemWidth,
          minSlides: _itemMinSlides,
          maxSlides: 10,
          slideMargin: _itemMargin,
          moveSlides: 1,
          controls: _controlsOpt,
          captions: true,
          pager: _pagerOpt,
          video: true,
          onSliderLoad: function(currentIndex) {
            if (_this.data('counter')) {
              $(_this).closest('.bx-wrapper').find('.bx-controls').prepend('<div class="bx-counter"><span class="bx-index">' + (currentIndex+1) + '</span>/<span class="bx-total">' + _this.getSlideCount() + '</span></div>');
            }
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            if (_this.data('counter')) {
              $(_this).closest('.bx-wrapper').find('.bx-index').text(newIndex+1);
            }
          }
        });
      });
    });

  }
  



  // detect slider component
  if ($('.royalSlider').length > 0) {

    $.getScript('http://artslondon.github.io/beta/assets/js/libs/jquery.royalslider.min.js', function() {

      $.each($('.royalSlider'), function() {

        var _this = $(this);

        // get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        var _itemWidth = (_this.data('slider-item-width') > 0) ? _this.data('slider-item-width') : 930;
        var _itemHeight = (_this.data('slider-item-height') > 0) ? _this.data('slider-item-height') : 465;

        _this.royalSlider({
          arrowsNav: true,
          fadeinLoadedSlide: false,
          arrowsNavAutoHide: false,
          controlNavigation: 'none',
          loop: true,
          autoScaleSlider: true,
          autoScaleSliderWidth: _itemWidth,
          autoScaleSliderHeight: _itemHeight,
          imageScalePadding: 0,
          globalCaption: true, 
          autoPlay: {
            // autoplay options go here
            enabled: true,
            pauseOnHover: true
          }
        });
      });
    });
  }


  ///////////////////////
  /////// accreditation
  ///////////////////////

  // $(".accreditation").hide();

    // detect search filters on page

     //allow expand and close for search filters
  
  if ($('.credits').length > 0) {
    $('.credits-btn').addClass("show");
    $('.show-credits').fastClick(function(event) {
      event.preventDefault();
      // $('.credits').toggle();
      var c = $(this);
      if (c.hasClass('active') ) {
        c.removeClass('active').html("Show Credits");
        $('.credits').fadeOut();
      } else {
        c.addClass('active').html("Hide Credits");
        $('.credits').fadeIn();
      }
    });
  }


// detect accordion component
if ($('.accordion').length > 0) {

    $.when(
        $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.accordion.js" ),
        $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.easing.1.3.js" ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){

        //place your code here, the scripts are all loaded
        $('#st-accordion').accordion({
            oneOpenedItem: true
        });

    });

    $(".accordion-list-anchor").on("click", ".size-h4", function(event){
        var circle = ($(this).next('.st-arrow'));
        var elem = ($(this).parent().next('.st-content'));
        console.log(circle);
              //circle.rotate({animateTo:360});
              if (!elem.is(':visible'))  {
                circle.rotate({animateTo:135});
               } else {
                circle.rotate({animateTo:0, center: ["50%", "50%"], });
            };

});

}
  


// detect vertical accordion component
if ($('#va-accordion').length > 0) {
  $.when(
    $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.easing.1.3.js" ),
    $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.mousewheel.js" ),
    $.getScript( "http://artslondon.github.io/beta/assets/js/components/jquery.vaccordion.js" ),
    $.Deferred(function( deferred ){
      $( deferred.resolve );
    })
  ).done(function(){
  //place your code here, the scripts are all loaded
    $('#va-accordion').vaccordion();
  }); 
}




// detect dropdown menu button used in forms or in page for drop menus

if ($('.dd-menu').length > 0) {

    $(".js-dd-menu").fastClick(function (event){
       event.preventDefault();
       var _d = $(this);
       var _d_menu = _d.parent();
       
       if (_d_menu.hasClass('active')) {
          _d_menu.find('.js-dd-menu-icon').html("&#59236;");
          _d_menu.find('.js-dd-menu-list').slideUp('fast', function() {
            _d_menu.removeClass('active');
         });
       }
       else { 
          _d_menu.find('.js-dd-menu-icon').html("&#59239;");
          _d_menu.find('.js-dd-menu-list').slideDown('fast', function() {
            _d_menu.addClass('active');
         });
       }
    });       
}


// detect circles-callout component

if ($('.circles-component').length > 0) {
  $.when(
      $.getScript( "http://artslondon.github.io/beta/assets/js/libs/skrollr.min.js" ),
      $.Deferred(function( deferred ){
          $( deferred.resolve );
      })
  ).done(function(){
    // initialise skrollr to handle movement of the circles
    var s = skrollr.init();
  });

}

// detect search filters on page
if ($('.search-filters').length > 0) {
   //allow expand and close for search filters
  $('.filter-heading').fastClick(function(event) {
    event.preventDefault();
    var c = $(this);
    
    //process click event if the heading is not set to not-active
    if (!c.hasClass('not-active')){ 

      if (c.parent().hasClass('active') ) {
        c.parent().removeClass('active');
      }
      else {
        c.parent().addClass('active');
      }
    }
  });
}


// Showtime JSON loader
if ($('#showtime-json').length){

  // with a lightbox use-case, Magnific is a dependency. The .lightbox call further down shouldn't fire, since the Showtime lightbox only functions inside the getJSON.
  $.getScript('http://artslondon.github.io/beta/assets/js/libs/magnific-lightbox.js', function() {

    var feedUrl = $('#showtime-json').data('url');
    // set a feed limit (this only works for Profiles, for Student we have to set the limit via a counter)
    var limit = $('#showtime-json').data('limit');
    
    $.getJSON( feedUrl + '&limit=' + limit + '&callback=?', function(data) {
        
      var outputNode = $('#showtime-json');
      var string = '';
      var media = '';
      var counter = 0;
              
      if (data.data.Student) { // this is a single Showtime profile
        var profileUrl = data.data.Student.Student.profileurl;
        var studentName = data.data.Student.Student.firstName + ' ' + data.data.Student.Student.lastName;
        media = data.data.Student.Media;
      } 
      
      if (data.data.Profiles) { // this is a group of objects in Showtime
        media = data.data.Profiles;
      }

      $.each(media, function(i, item) {

            if (counter < limit) {

              profileImg = item.thumb.split('gallery');
              item.profileImg = profileImg[0] + 'profile.jpg';
              item.zoomImg = profileImg[0] + 'screen.jpg';
      
              string = '<li><a class="zoom no-border" href= "' + item.zoomImg + '" title="' + item.fullName + '" data-profile-url="http://showtime.arts.ac.uk/' + item.profileName + '" style="background-image: url('+item.profileImg+')"></a></li>';
            
              outputNode.append(string); 

              counter++;

            } else {
              return false;
            }

      }); // end each loop
      
      $('.zoom').magnificPopup({ 
        type: 'image',
        image: {
          titleSrc: function(item) {
            return item.el.attr('title') + ' - <a class="no-border" href="' + item.el.data('profile-url') + '">View profile</a>';
          }
        },
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        } 
      });

    }); // end getJSON loop

  }); // end getScript loop
  
}


// detect lightbox component
if ($('.js-lightbox').length > 0) {

    $.getScript('http://artslondon.github.io/beta/assets/js/libs/magnific-lightbox.js', function() {

        // initialise the magnific lightbox
        $('.js-lightbox').each(function() {
          $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
              tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
          });
        });

    });
}

  // detect expandable search button
  if ($('#sb-search').length > 0) {
    new UISearch( document.getElementById( 'sb-search' ) );
  }

  // make videos adapt responsively
  //$('.video-wrapper').fitVids();

  // show/hide the relevant buttons for browsers that have JS enabled
  $(".expanded-content").hide();
  $(".show-more").show();
  
  // handle "Show More" button click
  $(".show-more").click(function(e){
    e.preventDefault();  
    var _clicked = $(this);
    var parent = _clicked.closest(".expandable-content"); 
    $(".expanded-content",parent).slideDown(); 
    _clicked.hide();
  });

  // handle "Show Less" button click
  $(".hide-content").click(function(e){
    e.preventDefault();  
    var _clicked = $(this);

    var parent = _clicked.closest(".expandable-content"); 
    $(".expanded-content",parent).hide();
    $(parent).find(".show-more").show();
    parent.scrollToMe(); // make sure the that page scrolls back after hiding the expanded content
  });

  //---------------------------------------
  //  Tabs on desktop, accordion on mobile
  //---------------------------------------

  if ($('.tabs-container').length > 0) {

      $(".tab_content").hide();
      $(".tab_content:first").show();
      
      /* if in tab mode */
      $("ul.tabs li").click(function() {

        $(".tab_content").hide();
        var activeTab = $(this).attr("rel"); 
        $("#"+activeTab).show();    

        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");

        $(".tab_drawer_heading").removeClass("d_active");
        $(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");

      });

      /* if in drawer mode */
      $(".tab_drawer_heading").click(function() {

        $(".tab_content").hide();
        var d_activeTab = $(this).attr("rel"); 
        $("#"+d_activeTab).show();

        $(".tab_drawer_heading").removeClass("d_active");
          $(this).addClass("d_active");

        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
        $(this).scrollToMe();
      });
    }

// End tabs to accordion 


if ($('video').length > 0) {

  $.getScript('http://artslondon.github.io/beta/assets/js/libs/mediaelement-and-player.min.js', function() {

    $('video').mediaelementplayer({
      pluginPath: 'http://artslondon.github.io/beta/assets/js/libs/'
    });


  });

}

// Add download class to PDF links
$('a[href$=".pdf"]').parent().addClass('icon download');

$('#debug').hide();
$('.debug-toggle').click(function(e) {
  $('#debug').toggle();
  e.preventDefault();
});


}); // end document ready

 



////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/* 
jQuery.fitHeights by Paravel™

Author: Dave Rupert
Author URL: http://daverupert.com/
Based on: https://github.com/filamentgroup/jQuery-Equal-Heights 

//  example initialise code
//
//   $(window).load(function(){
//      // $(groupOfItems).fitHeights(); 
//      $('ul li').fitHeights();
//    });
*/
(function(){
  
  $.fn.fitHeights = function() {
    
    var items = $(this);
    function setHeights() {
      
      var currentTallest = 0;
  
      items.css({ 'min-height' : currentTallest });  // unset min-height to get actual new height

      // right now this causes a noticeable shift in height on resize. workarounds?
      
      items.each(function(){
        
        if( $(this).height() > currentTallest ) { currentTallest = $(this).height(); }
      });
      items.css({ 'min-height' : currentTallest });
    }
    
    setHeights();
    $(window).on('resize', setHeights);
    return this;
  };
})(jQuery);

// initialise
$(window).load(function(){
  
  if ($('.related-content ul li').length > 0) {
    $('.related-content ul li').fitHeights();
  }

  if ($('.highlight-box-3').length > 0) {
    $('.highlight-box-3 ul li').fitHeights();
  }

});


///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////




// jquery jpanel slide from left menu for docs page 

/**
  *
  * jPanelMenu 1.3.0 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */
(function(e){e.jPanelMenu=function(t){if(typeof t=="undefined"||t==null)t={};var n={options:e.extend({menu:"#menu",trigger:".menu-trigger",excludedPanelContent:"style, script",direction:"left",openPosition:"250px",animated:!0,closeOnContentClick:!0,keyboardShortcuts:[{code:27,open:!1,close:!0},{code:37,open:!1,close:!0},{code:39,open:!0,close:!0},{code:77,open:!0,close:!0}],duration:150,openDuration:t.duration||150,closeDuration:t.duration||150,easing:"ease-in-out",openEasing:t.easing||"ease-in-out",closeEasing:t.easing||"ease-in-out",before:function(){},beforeOpen:function(){},beforeClose:function(){},after:function(){},afterOpen:function(){},afterClose:function(){},beforeOn:function(){},afterOn:function(){},beforeOff:function(){},afterOff:function(){}},t),settings:{transitionsSupported:"WebkitTransition"in document.body.style||"MozTransition"in document.body.style||"msTransition"in document.body.style||"OTransition"in document.body.style||"Transition"in document.body.style,shiftFixedChildren:!1,panelPosition:"relative",positionUnits:"px"},menu:"#jPanelMenu-menu",panel:".jPanelMenu-panel",fixedChildren:[],timeouts:{},clearTimeouts:function(){clearTimeout(n.timeouts.open);clearTimeout(n.timeouts.afterOpen);clearTimeout(n.timeouts.afterClose)},setPositionUnits:function(){var e=!1,t=["%","px","em"];for(unitID in t){var r=t[unitID];if(n.options.openPosition.toString().substr(-r.length)==r){e=!0;n.settings.positionUnits=r}}e||(n.options.openPosition=parseInt(n.options.openPosition)+n.settings.positionUnits)},checkFixedChildren:function(){n.disableTransitions();var t={position:e(n.panel).css("position")};t[n.options.direction]=e(n.panel).css(n.options.direction)=="auto"?0:e(n.panel).css(n.options.direction);e(n.panel).find("> *").each(function(){e(this).css("position")=="fixed"&&e(this).css(n.options.direction)=="auto"&&n.fixedChildren.push(this)});if(n.fixedChildren.length>0){var r={position:"relative"};r[n.options.direction]="1px";n.setPanelStyle(r);parseInt(e(n.fixedChildren[0]).offset().left)==0&&(n.settings.shiftFixedChildren=!0)}n.setPanelStyle(t)},setjPanelMenuStyles:function(){var t="#fff",r=e("html").css("background-color"),i=e("body").css("background-color");i!="transparent"&&i!="rgba(0, 0, 0, 0)"?t=i:r!="transparent"&&r!="rgba(0, 0, 0, 0)"?t=r:t="#fff";e("#jPanelMenu-style-master").length==0&&e("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;'+n.options.direction+":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;"+n.options.direction+":0;top:0;z-index:2;width:100%;min-height:100%;background:"+t+"}</style>")},setMenuState:function(t){var n=t?"open":"closed";e("body").attr("data-menu-position",n)},getMenuState:function(){return e("body").attr("data-menu-position")},menuIsOpen:function(){return n.getMenuState()=="open"?!0:!1},setMenuStyle:function(t){e(n.menu).css(t)},setPanelStyle:function(t){e(n.panel).css(t)},showMenu:function(){n.setMenuStyle({display:"block"});n.setMenuStyle({"z-index":"1"})},hideMenu:function(){n.setMenuStyle({"z-index":"-1"});n.setMenuStyle({display:"none"})},enableTransitions:function(t,r){var i=t/1e3,s=n.getCSSEasingFunction(r);n.disableTransitions();e("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all '+i+"s "+s+"; -moz-transition: all "+i+"s "+s+"; -o-transition: all "+i+"s "+s+"; transition: all "+i+"s "+s+";}</style>")},disableTransitions:function(){e("#jPanelMenu-style-transitions").remove()},enableFixedTransitions:function(t,r,i,s){var o=i/1e3,u=n.getCSSEasingFunction(s);n.disableFixedTransitions(r);e("body").append('<style id="jPanelMenu-style-fixed-'+r+'">'+t+"{-webkit-transition: all "+o+"s "+u+"; -moz-transition: all "+o+"s "+u+"; -o-transition: all "+o+"s "+u+"; transition: all "+o+"s "+u+";}</style>")},disableFixedTransitions:function(t){e("#jPanelMenu-style-fixed-"+t).remove()},getCSSEasingFunction:function(e){switch(e){case"linear":return e;case"ease":return e;case"ease-in":return e;case"ease-out":return e;case"ease-in-out":return e;default:return"ease-in-out"}},getJSEasingFunction:function(e){switch(e){case"linear":return e;default:return"swing"}},openMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeOpen();n.setMenuState(!0);n.setPanelStyle({position:"relative"});n.showMenu();var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.openDuration,n.options.openEasing);var i={};i[n.options.direction]=n.options.openPosition;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.openDuration,n.options.openEasing);var s={};s[n.options.direction]=n.options.openPosition;e(this).css(s)});n.timeouts.afterOpen=setTimeout(function(){n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.options.after();n.options.afterOpen();n.initiateContentClickListeners()},n.options.openDuration)}else{var s=n.getJSEasingFunction(n.options.openEasing),o={};o[n.options.direction]=n.options.openPosition;e(n.panel).stop().animate(o,n.options.openDuration,s,function(){n.options.after();n.options.afterOpen();n.initiateContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=n.options.openPosition;e(this).stop().animate(t,n.options.openDuration,s)})}},closeMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeClose();n.setMenuState(!1);var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.closeDuration,n.options.closeEasing);var i={};i[n.options.direction]=0+n.settings.positionUnits;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.closeDuration,n.options.closeEasing);var s={};s[n.options.direction]=0+n.settings.positionUnits;e(this).css(s)});n.timeouts.afterClose=setTimeout(function(){n.setPanelStyle({position:n.settings.panelPosition});n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()},n.options.closeDuration)}else{var s=n.getJSEasingFunction(n.options.closeEasing),o={};o[n.options.direction]=0+n.settings.positionUnits;e(n.panel).stop().animate(o,n.options.closeDuration,s,function(){n.setPanelStyle({position:n.settings.panelPosition});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=0+n.settings.positionUnits;e(this).stop().animate(t,n.options.closeDuration,s)})}},triggerMenu:function(e){n.menuIsOpen()?n.closeMenu(e):n.openMenu(e)},initiateClickListeners:function(){e(document).on("click",n.options.trigger,function(){n.triggerMenu(n.options.animated);return!1})},destroyClickListeners:function(){e(document).off("click",n.options.trigger,null)},initiateContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).on("click",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)});e(document).on("touchend",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)})},destroyContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).off("click",n.panel,null);e(document).off("touchend",n.panel,null)},initiateKeyboardListeners:function(){var t=["input","textarea"];e(document).on("keydown",function(r){var i=e(r.target),s=!1;e.each(t,function(){i.is(this.toString())&&(s=!0)});if(s)return!0;for(mapping in n.options.keyboardShortcuts)if(r.which==n.options.keyboardShortcuts[mapping].code){var o=n.options.keyboardShortcuts[mapping];o.open&&o.close?n.triggerMenu(n.options.animated):o.open&&!o.close&&!n.menuIsOpen()?n.openMenu(n.options.animated):!o.open&&o.close&&n.menuIsOpen()&&n.closeMenu(n.options.animated);return!1}})},destroyKeyboardListeners:function(){e(document).off("keydown",null)},setupMarkup:function(){e("html").addClass("jPanelMenu");e("body > *").not(n.menu+", "+n.options.excludedPanelContent).wrapAll('<div class="'+n.panel.replace(".","")+'"/>');e(n.options.menu).clone().attr("id",n.menu.replace("#","")).insertAfter("body > "+n.panel)},resetMarkup:function(){e("html").removeClass("jPanelMenu");e("body > "+n.panel+" > *").unwrap();e(n.menu).remove()},init:function(){n.options.beforeOn();n.initiateClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.initiateKeyboardListeners();n.setjPanelMenuStyles();n.setMenuState(!1);n.setupMarkup();n.setMenuStyle({width:n.options.openPosition});n.checkFixedChildren();n.setPositionUnits();n.closeMenu(!1);n.options.afterOn()},destroy:function(){n.options.beforeOff();n.closeMenu();n.destroyClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.destroyKeyboardListeners();n.resetMarkup();var t={};t[n.options.direction]="auto";e(n.fixedChildren).each(function(){e(this).css(t)});n.fixedChildren=[];n.options.afterOff()}};return{on:n.init,off:n.destroy,trigger:n.triggerMenu,open:n.openMenu,close:n.closeMenu,isOpen:n.menuIsOpen,menu:n.menu,getMenu:function(){return e(n.menu)},panel:n.panel,getPanel:function(){return e(n.panel)}}}})(jQuery);






///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


