// *-----------------------------------------*\
//     * University of the Arts London
//     * Script.js
//     * Authors: Howard Panton, Matt Wisbey,
//     Pete Richardson, Alastair Mucklow
//     Updated Tuesday 27 November 2013 14:58
// \*-----------------------------------------*/

// 
// enable caching for GetScript calls
jQuery.ajaxSetup({
  cache: true
});

// // position prev and next navigation buttons for OwlCarousel
// function positionOwlCarouselNav() {
//   // getMax height of images in carousel  // currently this will only work on one instance of owlCarousel
//   var maxImgHeight = Math.max.apply(null, $(".owl-carousel img.lazyOwl").map(function() {
//       return $(this).height();
//   }));
//   // calculate slider controls position from top of slider container
//   var distFromTop = ( ((maxImgHeight / 2) - 16) + 12);  // 16px is half height of navcontrol buttons , 12px is top margin
//   // set position of slider nav buttons from top 
//   $(".owl-prev, .owl-next").css("top", distFromTop);
// }



jQuery.fn.extend({
  scrollToMe: function () {
  var x = jQuery(this).offset().top - 100;
  jQuery('html,body').animate({scrollTop: x}, 500);
}});

// --------------------------------------------------


// add indexOf for IE8 compatibility
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = +this.length || 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}



$(".date").each(function (i, element) {
  
  str = $( this ).text();
  if (str.indexOf(",") != -1) {
    $(this).text(str.substring(5,16));
  }

});



  var Link_col = $(".college-nav").find("li").slice(3, 6);
  var Link_study_1 = $(".study-nav").find("li").slice(6, 11);
  var Link_study_2 = $(".study-nav").find("li").slice(11, 16);
  var Link_study_3 = $(".study-nav").find("li").slice(16, 19);
  var Link_student = $(".student-nav").find("li").slice(3, 4);
  var Link_alumni = $(".alumni-nav").find("li").slice(4, 6);
  var Link_about = $(".about-nav").find("li").slice(6, 11);
  var Link_about_1 = $(".about-nav").find("li").slice(11, 16);
  var Link_about_2 = $(".about-nav").find("li").slice(16, 19);
  var Link_industry = $('.industry-nav').find("li").slice(4,7);


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

  $( ".college-nav" ).append("<ul class=\"subnav-2 region\">");
  $('.college-nav .subnav-2').prepend(Link_col);

  $( ".study-nav" ).append("<ul class=\"subnav-2 pad-top-6x region\">");
  $('.study-nav .subnav-2').prepend(Link_study_1);
  $( ".study-nav" ).append("<ul class=\"subnav-3 pad-top-6x region\">");
  $('.study-nav .subnav-3').prepend(Link_study_2);
  $( ".study-nav" ).append("<ul class=\"subnav-4 pad-top-6x region\">");
  $('.study-nav .subnav-4').prepend(Link_study_3);


  $( ".student-nav" ).append("<ul class=\"subnav-2 region pad-top-6x region\">");
  $('.student-nav .subnav-2').prepend(Link_student);

  $( ".alumni-nav" ).append("<ul class=\"subnav-2 region pad-top-6x region\">");
  $('.alumni-nav .subnav-2').prepend(Link_alumni);
  

  $( ".about-nav" ).append("<ul class=\"subnav-2 pad-top-6x region\">");
  $('.about-nav .subnav-2').prepend(Link_about);

  $( ".about-nav" ).append("<ul class=\"subnav-3 pad-top-6x region\">");
  $('.about-nav .subnav-3').prepend(Link_about_1);

    $( ".about-nav" ).append("<ul class=\"subnav-4 pad-top-6x region\">");
  $('.about-nav .subnav-4').prepend(Link_about_2);

  $( ".industry-nav" ).append("<ul class=\"subnav-2 no-pad-top region\">");
  $('.industry-nav .subnav-2').prepend(Link_industry);

function checkWindowSize() {
  var width = $(window).width(),
  new_class = width > 959 ? 'gDesktop' :
              width > 599 ? 'gTablet' :
              width < 600 ? 'gMobile' :
              width > 1289 ? 'gDesktop' : '';

  $(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_class);
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

    $(this).children('div').children('h3.selected,div.select-box-arrow').click(function(event) {
      event.preventDefault();
      if($(this).parent().parent().children('ul.js-select-box-list').css('display') == 'none'){
        $(this).parent().parent().children('ul.js-select-box-list').css('display', 'block');
      }
      else
      {
        $(this).parent().parent().children('ul.js-select-box-list').css('display', 'none');
      }
    });

    $(this).find('li.select-box-option').click(function(event){
      event.preventDefault();
      $(this).parent().css('display','none');
      $('input.js-select-box-value').attr('value',$(this).attr('data-sb-value'));
      var _test = 'the select option is :' + $(this).attr('data-sb-value');
      $(this).parent().parent().children('div').children('h3.selected').html($(this).children('a'));
      $(this).parent().parent().scrollToMe();
    });
  });      
}


function resetSpinners() {
  // check if there are any other open accordion items, and close them if so
  $( ".accordion-list-item" ).each(function (e) {
    var _li_item = $(this);
    if ( _li_item.hasClass('st-open') ) {
        _li_item.find('.st-arrow').rotate({animateTo:0, center: ["50%", "50%"] });
    }
  });
}


/////////////////////
// ON DOCUMENT READY 
/////////////////////
$(document).ready(function(){

  checkWindowSize();

  // detect and handle breadcrumbs
  $('.breadcrumbs').find('a').last().hide();

  // to remove all breadcrumb items after the fifth on short course pages
  $('.browse-sc').find('.breadcrumbs').find('a:gt(4)').remove();


  // Accessible skip-to-content link:  
  // Enable a link to the page title if one exists.
  // If not, then enable a link to the first content-wrapper div to skip the main navigation on screen readerss

  if ( $('.page-title').length > 0) {
    $('.page-title').first().attr('id', 'skip-to-here');
  }
  else {
    $('.content-wrapper').first().attr('id', 'skip-to-here');
  }
   
//////////////////////
// MOBILE SIDEBAR SCRIPT (populate mobile and tablet menu)
/////////////////////


  var _sb_lth = $('.sidebar').length;
  var _has_heading = $('.sidebar').find('.menu-heading').length;
  //&& _has_heading > 0
  if ((_sb_lth > 0) ) {
    var _no_of_li_items = $(".sidebar li").size();

    // If there's more than one item in the left sidebar, then build the mobile sidebar
    if (_no_of_li_items > 1) {
      var _menuHtml = $('.sidebar').html();
      var _sideBarTitle = $('.sidebar li').first();
      var _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + '<a href="#" class="show-mob-sidebar"></a>';
      var _mobMenuContent;


      if (_has_heading > 0) {
        _mobMenuContent = _mobMenuButton + _menuHtml;
      }
      else {
        _mobMenuContent = _menuHtml;
      }

      // create mobile sidebar div and add it to the main content div
      $('<div id="mobile-sidebar" class="mobile-sidebar d-hide"></div>').prependTo('.content');

      // populate the mobile menu with the same content as the desktop sidebar nav & add menu button
      $('#mobile-sidebar').html(_mobMenuContent);

      $('.show-mob-sidebar').click(function(e) {
        e.preventDefault();
        _clicked = $(this);
        
        if (_clicked.hasClass('active')) {
          _clicked.closest($('#mobile-sidebar')).find($('ul')).slideUp();
          _clicked.removeClass('active');
        }
        else {
        _clicked.closest($('#mobile-sidebar')).find($('ul')).slideDown();
        // update the menu button and set class to active
        _clicked.addClass('active');
        }
      });

      // check if first item is "In This Section" which shouldn't be added as a link to the mob sidebar
      if (_sideBarTitle.text().toLowerCase() == 'in this section') {
      
        // hide "In This Section" in the sidebar dropdown
        $('#mobile-sidebar li').first().remove();
      }
      // if not, it must be a college - so replace text with "college homepage"
      else {
        $('#mobile-sidebar li a').first().text('College Homepage');
      }
    }
  } // end


// LazyLoading with ReSRC.it images
  if ($('.resrc').length > 0) {
    $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.review.min.js', function() {
      $('.resrc').review({
          callback: function() {
            resrc.resrc(this);
        }
      });
    });
  }

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

 
  // NICE IMAGE LOADING
  
  /* 
  * Not part of MixItUp, but this is a great lightweight way 
  *   to gracefully fade-in images with CSS3 after they have loaded
  */
  
  function imgLoaded(img){
    $(img).parent().addClass('loaded');
  }

if ($('#container').length > 0) {
  $.when(
      $.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js' ),
      $.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js' ),
      $.Deferred(function( deferred ){
          $( deferred.resolve );
      })
  ).done(function(){
    // initialise skrollr to handle movement of the circles
      $(function() {

      var container = $("#container"),
          pagination = $("#pagination");

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

    $.filtrify("container", "placeHolder", {
        block : "data-original",
        callback : function() {
            destroyPagination();
            setPagination();
        }
    });
  });
  });

  if(!$("body").hasClass("gDesktop")) {
    $("#placeHolder").prependTo(".content");
  }

}

  // fade in button when user scrolls down the page
  $(window).scroll(function() {
    if($("body").hasClass("gDesktop")) {
    if ($(this).scrollTop() > 450) {
      $('.back-to-top').fadeIn(200);
    } else {
      $('.back-to-top').fadeOut(200);
      }
    }
  });


  // scroll to the top of the page when the button is clicked
  $('.back-to-top').click(function(e){
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

    $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js', function() {

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

    $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js', function() {

      $.each($('.royalSlider'), function() {

        var _this = $(this);

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

        // var slider = _this.data('royalSlider');
        // slider.ev.on('rsAfterContentSet', function(e, object) {
        //   resrc.resrcAll();
        // });

      });



    });
  }


// Owl slider (research profiles)
if ($('.owl-carousel').length > 0) {

  jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/owl.carousel.js" , function() {
     $('.owl-carousel').each(function() {
        $(this).owlCarousel({
        items: 3,
        itemsDesktop : [1280, 3], // items between 1000px and 901px
        itemsTablet: [959, 2], // items between 
        itemsMobile : [599, 1], // itemsMobile disabled - inherit from items
        lazyLoad : true,
        pagination: false,
        navigation : true,
        navigationText : ["<i class='icon-left-open-big'></i>", "<i class='icon-right-open-big'></i>"]
        // afterAction : function(elem){
        //   positionOwlCarouselNav();
        // },

        // afterUpdate: function(elem){
        //   positionOwlCarouselNav();
        // },
      });

    });

     // get number of items in each owl-carousel and output pagination to each item in the carousel
    $(".owl-carousel").each(function() {
        var total_items = $('.item', this).length;
        // console.log("the number of items is: " + total_items);
        $(".item-description", this).append(function(i) {
            return $("<span />", {text: i+1 + ' of ' + total_items });
         });

    });

  });
}


  ///////////////////////
  /////// accreditation
  ///////////////////////

  // Show image credits button fixed to the right of the screen on Desktop only
  
if ($('.credits').length > 0) {


      //only show credits on desktop 
      if ($('body').hasClass('gDesktop')) {
        $('.credits-btn').addClass("show");
        
        $('.show-credits').click(function(event) {
          event.preventDefault();
        
          var c = $(this);
          if (c.hasClass('active') ) {
            c.removeClass('active').attr('title','Show image credits');
            $('.credits').fadeOut();
          } else {
            c.addClass('active').attr('title','Hide image credits');
            $('.credits').fadeIn();
          }
        });
      }
  }


// detect accordion component
if ($('.accordion').length > 0) {

    $.when(
        $.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js" ),
        $.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js" ),
        $.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js" ),
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
        event.preventDefault();
        var circle = ($(this).next('.st-arrow'));
        var accordion = ($(this).parent().parent());
        var elem = ($(this).parent().next('.st-content'));
              resetSpinners();
              // $(this).scrollToMe(); // scroll to the clicked elem
              if (!elem.is(':visible'))  {
                circle.rotate({animateTo:135});
               } else {
                circle.rotate({animateTo:0, center: ["50%", "50%"] });
              }
    });

    $(".st-arrow").on("click", function(e){
      e.preventDefault();
      resetSpinners();
      var _icon = $(this);
      var _st = $(this).parent().parent();

      if (!_st.hasClass('st-open'))  {
        _icon.rotate({animateTo:135});
      } else {
        _icon.rotate({animateTo:0, center: ["50%", "50%"] });
      }

    });
}



// detect dropdown menu button used in forms or in page for drop menus
if ($('.dd-menu').length > 0) {

    $(".js-dd-menu").click(function (event){
       event.preventDefault();
       var _d = $(this);
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
if ($('.search-filters').length > 0) {
   //allow expand and close for search filters
  $('.filter-heading').click(function(event) {
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
if ($('.showtime-json').length){

  // with a lightbox use-case, Magnific is a dependency. The .lightbox call further down shouldn't fire, since the Showtime lightbox only functions inside the getJSON.
  $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js', function() {

    var outputNode = $('.showtime-json');

    $.each(outputNode, function(i) {
      
      var _node = '';
      _node = $(this);

      var feedUrl = _node.data('url');
      // set a feed limit (this only works for Profiles, for Student we have to set the limit via a counter)
      var limit = _node.data('limit');


      $.getJSON( feedUrl + '&limit=' + limit + '&callback=?', function(data) {
           
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
        
        $.each(media, function(i, item) {

          if (counter < limit) {

            //if (item.type == 'video' || item.type == 'publication') {
            //  item.profileImg = 'http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/images/placeholder-lcf-580-4.jpg';
            //} else {
              profileImg = item.thumb.split('gallery');
              item.profileImg = profileImg[0] + 'profile.jpg';
              item.zoomImg = profileImg[0] + 'screen.jpg';
            //}

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

    }); // end each loop

  }); // end getScript loop
  
}


// detect lightbox component
if ($('.js-lightbox').length > 0) {

    $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js', function() {

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



// show/hide the relevant buttons for browsers that have JS enabled
$(".expanded-content").hide();
$(".show-more").show();

// handle "Show More" button click
$(".show-more").click(function(e){
  e.preventDefault();
  var _clicked = $(this);
  _clicked.closest(".expandable-content").find(".expanded-content").slideDown();
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
      // update icon for first tab item (it's opened on start by default)
      $(".tab_drawer_heading:first").children('span').removeClass('icon-plus').addClass('icon-right-open-mini');
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

        // close any open tabs on click and reset to a down icon
        $(".tab_content").hide();

        var d_activeTab = $(this).attr("rel");
        $("#"+d_activeTab).show();

        $(".tab_drawer_heading").removeClass('d_active').children('span').removeClass('icon-right-open-mini').addClass('icon-plus');
          $(this).addClass("d_active").children('span').removeClass('icon-plus').addClass('icon-right-open-mini');

        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
        $(this).scrollToMe();
      });
    }

// End tabs to accordion 

if ($('.__media').length > 0) {
  $.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js', function() {
    $('.__media').fitVids();
  });
}


  //---------------------------------------
  //  Audio Player - based on code from http://bit.ly/12I3B79
  //---------------------------------------


  if ($('audio').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js', function() {

        $('audio').each(function() {
          $(this).audioPlayer();
        });

    });


  }
  

if ($('video').length > 0) {

  $.getScript('https://raw.github.com/johndyer/mediaelement/master/build/mediaelement-and-player.js', function() {

    if (!$('video').hasClass('no-mejs')) {
      $('video').mediaelementplayer({
        //pluginPath: 'http://artslondon.github.io/beta/assets/js/libs/'
        pluginPath: 'http://beta.arts.ac.uk/media/beta/beta-assets/plugins/'
      });
    }

  });

}


// KIS WIDGET
if ($('.kis-widget').length > 0) {
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



// add class to remove standard list bullets for PDF download lists
$('aside li a[href$=".pdf"], .l-content li a[href$=".pdf"]').parent().addClass('no-bullet');

// add class to remove standard list bullets for DOC download lists
$('aside li a[href$=".doc"], .l-content li a[href$=".doc"]').parent().addClass('no-bullet');

// Creating custom :external selector
jQuery.expr[':'].external = function(obj){
  return (obj.hostname != location.hostname);
};

// Add 'external' CSS class to all external links
$('.l-content a:external.button-link, aside a:external').addClass('external').each(function() {
$(this).attr("title", $(this).attr("title") + "(external link)");
});


$('#debug').hide();
$('.debug-toggle').click(function(e) {
  $('#debug').toggle();
  e.preventDefault();
});


$('.lcf').find('h2').wrapInner('<span />');

//$('.lcf').find('.__media').find('h2').wrapInner('<span />');



}); // end document ready



 // // Add download class to PDF links
 //  var pdf = $('a[href$=".pdf"]');

 //  if ( pdf.length > 0 && pdf.parent("li").length > 0) {
 //    pdf.closest("li").addClass('download');
 //  }


 



////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


/* 
jQuery.fitHeights by Paravelâ„¢

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
  
  if ($('.related-content').length > 0) {
    $('.related-content ul li').fitHeights();
  }

  if ($('.highlight-box-3').length > 0) {
    $('.highlight-box-3 ul li').fitHeights();
  }
  
  if ($('body').is('.chelsea, .camberwell, .wimbledon')) {
    $('.two-up ul li').fitHeights();
    $('.three-up ul li').fitHeights();
  }
  
  if ($('body').is('.ual')) {
    $('.cta .two-up-full ul li').fitHeights();
    $('.st-cp .two-up-full ul li').fitHeights();
    $('.news .four-up-full ul li').fitHeights();
    $('.fe .four-up-full ul li').fitHeights();
  }

  if ($('.__gallery').length > 0) {
    $('.__gallery').each( function() {
      $(this).find('li').fitHeights();
    });
  }

});

