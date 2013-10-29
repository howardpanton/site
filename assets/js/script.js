// *-----------------------------------------*\
//     * University of the Arts London
//     * Script.js
//     * Authors: Howard Panton, Matt Wisbey,
//     Pete Richardson, Alastair Mucklow
//     Updated Tuesday 08 October 2013 14:49pm
// \*-----------------------------------------*/

// enable caching for GetScript calls
jQuery.ajaxSetup({
  cache: true
});


jQuery.fn.extend({
  scrollToMe: function () {
  var x = jQuery(this).offset().top - 100;
  jQuery('html,body').animate({scrollTop: x}, 500);
}});

// --------------------------------------------------


// add indexOf for IE8 compatibility
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}



jQuery(".date").each(function (i, element) {
  
  str = jQuery( this ).text();
  if (str.indexOf(",") != -1) {
    jQuery(this).text(str.substring(5,16));
  }

});



  var Link_col = jQuery(".college-nav").find("li").slice(3, 6);
  var Link_study_1 = jQuery(".study-nav").find("li").slice(6, 11);
  var Link_study_2 = jQuery(".study-nav").find("li").slice(11, 16);
  var Link_study_3 = jQuery(".study-nav").find("li").slice(16, 19);
  var Link_student = jQuery(".student-nav").find("li").slice(3, 4);
  var Link_alumni = jQuery(".alumni-nav").find("li").slice(4, 6);
  var Link_about = jQuery(".about-nav").find("li").slice(6, 11);
  var Link_about_1 = jQuery(".about-nav").find("li").slice(11, 16);
  var Link_about_2 = jQuery(".about-nav").find("li").slice(16, 19);
  var Link_industry = jQuery('.industry-nav').find("li").slice(4,7);


  Link_col.remove();
  Link_study_1.remove();
  Link_study_2.remove();
  Link_study_3.remove();
  Link_student.remove();
  Link_alumni.remove();
  Link_about.remove();
  Link_about_1.remove();
  Link_about_2.remove();
  Link_industry.remove();
  //console.log(Link_study_3);

  jQuery( ".college-nav" ).append("<ul class=\"subnav-2 region\">");
  jQuery('.college-nav .subnav-2').prepend(Link_col);

  jQuery( ".study-nav" ).append("<ul class=\"subnav-2 pad-top-6x region\">");
  jQuery('.study-nav .subnav-2').prepend(Link_study_1);
  jQuery( ".study-nav" ).append("<ul class=\"subnav-3 pad-top-6x region\">");
  jQuery('.study-nav .subnav-3').prepend(Link_study_2);
  jQuery( ".study-nav" ).append("<ul class=\"subnav-4 pad-top-6x region\">");
  jQuery('.study-nav .subnav-4').prepend(Link_study_3);


  jQuery( ".student-nav" ).append("<ul class=\"subnav-2 region pad-top-6x region\">");
  jQuery('.student-nav .subnav-2').prepend(Link_student);

  jQuery( ".alumni-nav" ).append("<ul class=\"subnav-2 region pad-top-6x region\">");
  jQuery('.alumni-nav .subnav-2').prepend(Link_alumni);
  

  jQuery( ".about-nav" ).append("<ul class=\"subnav-2 pad-top-6x region\">");
  jQuery('.about-nav .subnav-2').prepend(Link_about);

  jQuery( ".about-nav" ).append("<ul class=\"subnav-3 pad-top-6x region\">");
  jQuery('.about-nav .subnav-3').prepend(Link_about_1);

    jQuery( ".about-nav" ).append("<ul class=\"subnav-4 pad-top-6x region\">");
  jQuery('.about-nav .subnav-4').prepend(Link_about_2);

  jQuery( ".industry-nav" ).append("<ul class=\"subnav-2 no-pad-top region\">");
  jQuery('.industry-nav .subnav-2').prepend(Link_industry);

function checkWindowSize() {
  var width = jQuery(window).width(),
  new_class = width > 959 ? 'gDesktop' :
              width > 599 ? 'gTablet' :
              width < 600 ? 'gMobile' :
              width > 1289 ? 'gDesktop' : '';

  jQuery(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_class);
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
  
  jQuery('.js-select-box').each(function() {
    var _start_val = jQuery(this).children('ul.js-select-box-list').children('li.select-box-option:first').children('a').html();
    jQuery(this).children('div').children('h3.selected').html(_start_val);
    jQuery('input.js-select-box-value').attr('value',jQuery(this).children('ul.js-select-box-list').children('li.select-box-option:first').attr('data-sb-value'));

    jQuery(this).children('div').children('h3.selected,div.select-box-arrow').click(function(event) {
      event.preventDefault();
      if(jQuery(this).parent().parent().children('ul.js-select-box-list').css('display') == 'none'){
        jQuery(this).parent().parent().children('ul.js-select-box-list').css('display', 'block');
      }
      else
      {
        jQuery(this).parent().parent().children('ul.js-select-box-list').css('display', 'none');
      }
    });

    jQuery(this).find('li.select-box-option').click(function(event){
      event.preventDefault();
      jQuery(this).parent().css('display','none');
      jQuery('input.js-select-box-value').attr('value',jQuery(this).attr('data-sb-value'));
      var _test = 'the select option is :' + jQuery(this).attr('data-sb-value');
      jQuery(this).parent().parent().children('div').children('h3.selected').html(jQuery(this).children('a'));
      jQuery(this).parent().parent().scrollToMe();
    });
  });
}


/////////////////////
// ON DOCUMENT READY 
/////////////////////
jQuery(document).ready(function(){

  checkWindowSize();

  // detect and handle breadcrumbs
  jQuery('.breadcrumbs').find('a').last().hide();

  // to remove all breadcrumb items after the fifth on short course pages
  jQuery('.browse-sc').find('.breadcrumbs').find('a:gt(4)').remove();


  // Accessible skip-to-content link:  
  // Enable a link to the page title if one exists.
  // If not, then enable a link to the first content-wrapper div to skip the main navigation on screen readerss

  if ( jQuery('.page-title').length > 0) {
    jQuery('.page-title').first().attr('id', 'skip-to-here');
  }
  else {
    jQuery('.content-wrapper').first().attr('id', 'skip-to-here');
  }
   
//////////////////////
// MOBILE SIDEBAR SCRIPT (populate mobile and tablet menu)
/////////////////////


  var _sb_lth = jQuery('.sidebar').length;
  var _has_heading = jQuery('.sidebar').find('.menu-heading').length;
  //&& _has_heading > 0
  if ((_sb_lth > 0) ) {
    var _no_of_li_items = jQuery(".sidebar li").size();

    // If there's more than one item in the left sidebar, then build the mobile sidebar
    if (_no_of_li_items > 1) {
      var _menuHtml = jQuery('.sidebar').html();
      var _sideBarTitle = jQuery('.sidebar li').first();
      var _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + '<a href="#" class="show-mob-sidebar"></a>';
      var _mobMenuContent;


      if (_has_heading > 0) {
        _mobMenuContent = _mobMenuButton + _menuHtml;
      }
      else {
        _mobMenuContent = _menuHtml;
      }

      // create mobile sidebar div and add it to the main content div
      jQuery('<div id="mobile-sidebar" class="mobile-sidebar d-hide"></div>').prependTo('.content');

      // populate the mobile menu with the same content as the desktop sidebar nav & add menu button
      jQuery('#mobile-sidebar').html(_mobMenuContent);

      jQuery('.show-mob-sidebar').click(function(e) {
        e.preventDefault();
        _clicked = jQuery(this);
        
        if (_clicked.hasClass('active')) {
          _clicked.closest(jQuery('#mobile-sidebar')).find(jQuery('ul')).slideUp();
          _clicked.removeClass('active');
        }
        else {
        _clicked.closest(jQuery('#mobile-sidebar')).find(jQuery('ul')).slideDown();
        // update the menu button and set class to active
        _clicked.addClass('active');
        }
      });

      // check if first item is "In This Section" which shouldn't be added as a link to the mob sidebar
      if (_sideBarTitle.text().toLowerCase() == 'in this section') {
      
        // hide "In This Section" in the sidebar dropdown
        jQuery('#mobile-sidebar li').first().remove();
      }
      // if not, it must be a college - so replace text with "college homepage"
      else {
        jQuery('#mobile-sidebar li a').first().text('College Homepage');
      }
    }
  } // end


// LazyLoading with ReSRC.it images
  if (jQuery('.resrc').length > 0) {
    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.review.min.js', function() {
      jQuery('.resrc').review({
          callback: function() {
            resrc.resrc(this);
        }
      });
    });
  }

  // check for selectboxes on the page
  if (jQuery('.select-box').length > 0) {
    // enable custom styled selectboxes
    enableSelectBoxes();
  
  }

  // check for regular blockquotes on the page - 
  // we insert a span at the beginning of the element to show a background image sprite 
  if (jQuery('blockquote').length > 0 ) {
    
    jQuery('blockquote').each(function() {
        jQuery(this).prepend('<span></span>');
    });


  
  }

  // check for large blockquotes on the page - 
  // - insert a span at the beginning to show large blockquote img (sprite)
  if (jQuery('.pull-quote').length > 0) {

    jQuery('.pull-quote').each(function() {
      jQuery(this).prepend('<span></span>');
    });


  }


  // focus highlighting for course search and site search input box
  if (jQuery('.search-input-wrap').length > 0) {

      jQuery('#finder-search-input').focus(function () {
        jQuery('#finder-search-input').parent().parent().addClass('search-gray-border');
      });
   
  }

 
  // NICE IMAGE LOADING
  
  /* 
  * Not part of MixItUp, but this is a great lightweight way 
  *   to gracefully fade-in images with CSS3 after they have loaded
  */
  
  function imgLoaded(img){
    jQuery(img).parent().addClass('loaded');
  }

if (jQuery('#container').length > 0) {
  jQuery.when(
      jQuery.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js' ),
      jQuery.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js' ),
      jQuery.Deferred(function( deferred ){
          jQuery( deferred.resolve );
      })
  ).done(function(){
    // initialise skrollr to handle movement of the circles
      jQuery(function() {

      var container = jQuery("#container"),
          pagination = jQuery("#pagination");

  function setPagination () {
        pagination.jPages({
            containerID : "container",
            perPage : 24,
            midRange : 1,
            previous : "←",
            next : "→",
            direction : "auto",
            animation : "fadeInUp"
 
        });
    }

    function destroyPagination () {
        pagination.jPages("destroy");
    }

    setPagination();

    jQuery.filtrify("container", "placeHolder", {
        block : "data-original",
        callback : function() {
            destroyPagination();
            setPagination();
        }
    });
  });
  });

  if(!jQuery("body").hasClass("gDesktop")) {
    jQuery("#placeHolder").prependTo(".content");
  }

}

  // fade in button when user scrolls down the page
  jQuery(window).scroll(function() {
    if(jQuery("body").hasClass("gDesktop")) {
    if (jQuery(this).scrollTop() > 450) {
      jQuery('.back-to-top').fadeIn(200);
    } else {
      jQuery('.back-to-top').fadeOut(200);
      }
    }
  });


  // scroll to the top of the page when the button is clicked
  jQuery('.back-to-top').click(function(e){
    e.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, 300);
  });
  
  // detect slider component
  
  if (jQuery('.js-carousel').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js', function() {

      jQuery.each(jQuery('.js-carousel'), function() {

        var _this = jQuery(this);
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
          onSliderLoad: function(currentIndex) {
            if (_this.data('counter')) {
              jQuery(_this).closest('.bx-wrapper').find('.bx-controls').prepend('<div class="bx-counter"><span class="bx-index">' + (currentIndex+1) + '</span>/<span class="bx-total">' + _this.getSlideCount() + '</span></div>');
            }
          },
          onSlideAfter: function(jQueryslideElement, oldIndex, newIndex) {
            if (_this.data('counter')) {
              jQuery(_this).closest('.bx-wrapper').find('.bx-index').text(newIndex+1);
            }
          }
        });
      });
    });

  }
  
  // detect slider component
  if (jQuery('.royalSlider').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js', function() {

      jQuery.each(jQuery('.royalSlider'), function() {

        var _this = jQuery(this);

        // get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        var _itemWidth = (_this.data('slider-item-width') > 0) ? _this.data('slider-item-width') : 930;
        var _itemHeight = (_this.data('slider-item-height') > 0) ? _this.data('slider-item-height') : 465;
        var _itemAutoPlay = (_this.data('slider-auto-play') === true) ? _this.data('slider-auto-play') : false;

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
          keyboardNavEnabled: true,
          autoPlay: {
            enabled: _itemAutoPlay,
            pauseOnHover: true
          }
        });

      });



    });
  }


  ///////////////////////
  /////// accreditation
  ///////////////////////

  // Show image credits button fixed to the right of the screen on Desktop only
  
if (jQuery('.credits').length > 0) {


      //only show credits on desktop 
      if (jQuery('body').hasClass('gDesktop')) {
        jQuery('.credits-btn').addClass("show");
        
        jQuery('.show-credits').click(function(event) {
          event.preventDefault();
        
          var c = jQuery(this);
          if (c.hasClass('active') ) {
            c.removeClass('active').attr('title','Show image credits');
            jQuery('.credits').fadeOut();
          } else {
            c.addClass('active').attr('title','Hide image credits');
            jQuery('.credits').fadeIn();
          }
        });
      }
  
  }

function resetSpinners() {
      // check if there are any other open accordion items, and close them if so
      jQuery( ".accordion-list-item" ).each(function (e) {
        var _li_item = jQuery(this);
        if ( _li_item.hasClass('st-open') ) {
            _li_item.find('.st-arrow').rotate({animateTo:0, center: ["50%", "50%"] });
        }
      });
    }

// detect accordion component
if (jQuery('.accordion').length > 0) {

    jQuery.when(
        jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js" ),
        jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js" ),
        jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js" ),
        jQuery.Deferred(function( deferred ){
            jQuery( deferred.resolve );
        })
    ).done(function(){

        //place your code here, the scripts are all loaded
        jQuery('#st-accordion').accordion({
            oneOpenedItem: true
        });

    });

    jQuery(".accordion-list-anchor").on("click", ".size-h4", function(event){
        event.preventDefault();
        var circle = (jQuery(this).next('.st-arrow'));
        var accordion = (jQuery(this).parent().parent());
        var elem = (jQuery(this).parent().next('.st-content'));
              resetSpinners();
              // jQuery(this).scrollToMe(); // scroll to the clicked elem
              if (!elem.is(':visible'))  {
                circle.rotate({animateTo:135});
               } else {
                circle.rotate({animateTo:0, center: ["50%", "50%"], });
              }
    });

    jQuery(".st-arrow").on("click", function(e){
      e.preventDefault();
      resetSpinners();
      var _icon = jQuery(this);
      var _st = jQuery(this).parent().parent();

      if (!_st.hasClass('st-open'))  {
        _icon.rotate({animateTo:135});
      } else {
        _icon.rotate({animateTo:0, center: ["50%", "50%"], });
      }

    });
}



// detect dropdown menu button used in forms or in page for drop menus
if (jQuery('.dd-menu').length > 0) {

    jQuery(".js-dd-menu").click(function (event){
       event.preventDefault();
       var _d = jQuery(this);
       var _d_menu = _d.parent();
       
       if (_d_menu.hasClass('active')) {
          _d_menu.find('.js-dd-menu-icon');
          _d_menu.find('.js-dd-menu-list').slideUp('fast', function() {
            _d_menu.removeClass('active');
         });
       }
       else {
          _d_menu.find('.js-dd-menu-icon');
          _d_menu.find('.js-dd-menu-list').slideDown('fast', function() {
            _d_menu.addClass('active');
         });
       }
    });
}

// detect search filters on page
if (jQuery('.search-filters').length > 0) {
   //allow expand and close for search filters
  jQuery('.filter-heading').click(function(event) {
    event.preventDefault();
    var c = jQuery(this);
    
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
if (jQuery('.showtime-json').length){

  // with a lightbox use-case, Magnific is a dependency. The .lightbox call further down shouldn't fire, since the Showtime lightbox only functions inside the getJSON.
  jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox.js', function() {

    var outputNode = jQuery('.showtime-json');

    jQuery.each(outputNode, function(i) {
      
      var _node = '';  
      _node = jQuery(this);

      var feedUrl = _node.data('url');
      // set a feed limit (this only works for Profiles, for Student we have to set the limit via a counter)
      var limit = _node.data('limit');


      jQuery.getJSON( feedUrl + '&limit=' + limit + '&callback=?', function(data) {
           
         var string = '';
         var media = '';
         var studentName = '';
         var profileUrl = '';
         var counter = 0;
                 
         if (data.data.Student) { // this is a single Showtime profile
           profileUrl = data.data.Student.Student.profileurl;
           studentName = data.data.Student.Student.firstName + ' ' + data.data.Student.Student.lastName;
           media = data.data.Student.Media;
         }
         
         if (data.data.Profiles) { // this is a group of objects in Showtime
           media = data.data.Profiles;
         }
        
        jQuery.each(media, function(i, item) {

          if (counter < limit) {
              profileImg = item.thumb.split('gallery');
              item.profileImg = profileImg[0] + 'profile.jpg';
              item.zoomImg = profileImg[0] + 'screen.jpg';

            if (item.profileName) { //group
              profileUrl = 'http://showtime.arts.ac.uk/' + item.profileName;
              studentName = item.fullName;
            }
           
           string = '<li><a class="zoom no-border" href= "' + item.zoomImg + '" title="' + studentName + '" data-profile-url="' + profileUrl + '" style="background-image: url('+item.profileImg+')"></a></li>';

            
           _node.append(string);

           counter++;

          } else {
           return false;
          }

        }); // end each loop
         
        jQuery('.zoom').magnificPopup({
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

    }); // end each loop

  }); // end getScript loop
  
}


// detect lightbox component
if (jQuery('.js-lightbox').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js', function() {

        // initialise the magnific lightbox
        jQuery('.js-lightbox').each(function() {
          jQuery(this).magnificPopup({
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
              titleSrc: function(item) {
                return item.el.find('span').text();
              },
              tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
          });
        });

    });
}



// show/hide the relevant buttons for browsers that have JS enabled
jQuery(".expanded-content").hide();
jQuery(".show-more").show();

// handle "Show More" button click
jQuery(".show-more").click(function(e){
  e.preventDefault();
  var _clicked = jQuery(this);
  _clicked.closest(".expandable-content").find(".expanded-content").slideDown();
  _clicked.hide();
});

// handle "Show Less" button click
jQuery(".hide-content").click(function(e){
  e.preventDefault();
  var _clicked = jQuery(this);

  var parent = _clicked.closest(".expandable-content");
  jQuery(".expanded-content",parent).hide();
  jQuery(parent).find(".show-more").show();
  parent.scrollToMe(); // make sure the that page scrolls back after hiding the expanded content
});


  //---------------------------------------
  //  Audio Player - based on code from http://bit.ly/12I3B79
  //---------------------------------------


  if (jQuery('audio').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js', function() {

        jQuery('audio').each(function() {
          jQuery(this).audioPlayer();
        });

    });


  }

  //---------------------------------------
  //  Tabs on desktop, accordion on mobile
  //---------------------------------------

  if (jQuery('.tabs-container').length > 0) {

      jQuery(".tab_content").hide();
      jQuery(".tab_content:first").show();
      // update icon for first tab item (it's opened on start by default)
      jQuery(".tab_drawer_heading:first").children('span').removeClass('icon-plus').addClass('icon-right-open-mini');
      /* if in tab mode */
      jQuery("ul.tabs li").click(function() {

        jQuery(".tab_content").hide();
        var activeTab = jQuery(this).attr("rel");
        jQuery("#"+activeTab).show();

        jQuery("ul.tabs li").removeClass("active");
        jQuery(this).addClass("active");

        jQuery(".tab_drawer_heading").removeClass("d_active");
        jQuery(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");

      });

      /* if in drawer mode */
      jQuery(".tab_drawer_heading").click(function() {

        // close any open tabs on click and reset to a down icon
        jQuery(".tab_content").hide();

        var d_activeTab = jQuery(this).attr("rel");
        jQuery("#"+d_activeTab).show();

        jQuery(".tab_drawer_heading").removeClass('d_active').children('span').removeClass('icon-right-open-mini').addClass('icon-plus');
          jQuery(this).addClass("d_active").children('span').removeClass('icon-plus').addClass('icon-right-open-mini');

        jQuery("ul.tabs li").removeClass("active");
        jQuery("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
        jQuery(this).scrollToMe();
      });
    }

// End tabs to accordion 

if (jQuery('.__media').length > 0) {
  jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js', function() {
    jQuery('.__media').fitVids();
  });
}


if (jQuery('video').length > 0) {

  jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/media-element.min.js', function() {

    jQuery('video').mediaelementplayer({
      //pluginPath: 'http://artslondon.github.io/beta/assets/js/libs/'
      pluginPath: 'http://beta.arts.ac.uk/media/beta/beta-assets/plugins/'
    });


  });

}


// KIS WIDGET
if (jQuery('.kis-widget').length > 0) {
  (function (d) {
  "use strict";
  var widgetScript = d.createElement('script');
  widgetScript.id = 'unistats-widget-script';
      widgetScript.src = '//widget.unistats.ac.uk/js/unistats.widget.js';
  var scriptTags = d.getElementsByTagName('script')[0];
  if (d.getElementById('unistats-widget-script')) {  return; }
  scriptTags.parentNode.insertBefore(widgetScript, scriptTags);
  } (document));
}



// Add download class to PDF links
jQuery('a[hrefjQuery=".pdf"]').addClass('download');

  // Creating custom :external selector
  jQuery.expr[':'].external = function(obj){
      return (obj.hostname != location.hostname);
  };

  // Add 'external' CSS class to all external links
  jQuery('.l-content a:external.button-link, aside a:external').addClass('external').each(function() {
    jQuery(this).attr("title", jQuery(this).attr("title") + "(external link)");
});




jQuery('#debug').hide();
jQuery('.debug-toggle').click(function(e) {
  jQuery('#debug').toggle();
  e.preventDefault();
});


jQuery('.lcf').find('h2').wrapInner('<span />');

//jQuery('.lcf').find('.__media').find('h2').wrapInner('<span />');



}); // end document ready



/* 
jQuery.fitHeights by Paravel™

Author: Dave Rupert
Author URL: http://daverupert.com/
Based on: https://github.com/filamentgroup/jQuery-Equal-Heights 

//  example initialise code
//
//   jQuery(window).load(function(){
//      // jQuery(groupOfItems).fitHeights(); 
//      jQuery('ul li').fitHeights();
//    });
*/
(function(){
  
  jQuery.fn.fitHeights = function() {
    
    var items = jQuery(this);
    function setHeights() {
      
      var currentTallest = 0;
  
      items.css({ 'min-height' : currentTallest });  // unset min-height to get actual new height

      // right now this causes a noticeable shift in height on resize. workarounds?
      
      items.each(function(){
        
        if( jQuery(this).height() > currentTallest ) { currentTallest = jQuery(this).height(); }
      });
      items.css({ 'min-height' : currentTallest });
    }
    
    setHeights();
    jQuery(window).on('resize', setHeights);
    return this;
  };
})(jQuery);

// initialise
jQuery(window).load(function(){
  
  if (jQuery('.related-content').length > 0) {
    jQuery('.related-content ul li').fitHeights();
  }

  if (jQuery('.highlight-box-3').length > 0) {
    jQuery('.highlight-box-3 ul li').fitHeights();
  }
  
  if (jQuery('body').is('.chelsea, .camberwell, .wimbledon')) {
    jQuery('.two-up ul li').fitHeights();
    jQuery('.three-up ul li').fitHeights();
  }
  
  if (jQuery('body').is('.ual')) {
    jQuery('.cta .two-up-full ul li').fitHeights();
    jQuery('.st-cp .two-up-full ul li').fitHeights();
    jQuery('.news .four-up-full ul li').fitHeights();
    jQuery('.fe .four-up-full ul li').fitHeights();
  }

  if (jQuery('.__gallery').length > 0) {
    jQuery('.__gallery').each( function() {
      jQuery(this).find('li').fitHeights();
    });
  }

});


// // Fix iOS re-orient problem when changing from portrait to landscape mode
// // The script below will make sure that the screen width is updated correctly 
// window.document.addEventListener('orientationchange', function() {
//   var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
//   var viewportmeta = document.querySelector('meta[name="viewport"]');
//   if (iOS && viewportmeta) {
//     if (viewportmeta.content.match(/width=device-width/)) {
//       viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=1');
//     }
//     viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=' + window.innerWidth);
//   }
//   // If you want to hide the address bar on orientation change, uncomment the next line
//   window.scrollTo(0, 0);
// }, false);
