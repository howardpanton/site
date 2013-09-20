// --------------------------------------------------
// function to allow scroll to an element on the page
//
// example:  $('some-div').scrollToMe();  
//
//

jQuery.fn.extend({
  scrollToMe: function () {
  var x = jQuery(this).offset().top - 100;
  jQuery('html,body').animate({scrollTop: x}, 500);
}});

// --------------------------------------------------

$(".date").each( function(i, element) {
  
  dateString = this.textContent;
  var idx = dateString.indexOf(",");
  var t = dateString.substr(idx + 2, 11);

  $(this).text(t);
  
});


  var Link_col = $(".college-nav").find("li").slice(3, 6);
  var Link_study_1 = $(".study-nav").find("li").slice(6, 11);
  var Link_study_2 = $(".study-nav").find("li").slice(11, 16);
  var Link_study_3 = $(".study-nav").find("li").slice(16, 19);
  var Link_student = $(".student-nav").find("li").slice(3, 4);
  var Link_alumni = $(".alumni-nav").find("li").slice(4, 6);
  var Link_about = $(".about-nav").find("li").slice(5, 9);
  var Link_about_1 = $(".about-nav").find("li").slice(9, 11);


  Link_col.remove();
  Link_study_1.remove();
  Link_study_2.remove();
  Link_study_3.remove();
  Link_student.remove();
  Link_alumni.remove();
  Link_about.remove();
  Link_about_1.remove();
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


function checkWindowSize() {
  var width = $(window).width(),
  new_class = width > 850 ? 'gDesktop' :
              width > 600 ? 'gTablet' :
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
        $(this).parent().children('div.select-box-arrow').children('span.js-select-box-icon').html('î§');
      }
      else
      {
        $(this).parent().parent().children('ul.js-select-box-list').css('display', 'none');
         $(this).parent().children('div.select-box-arrow').children('span.js-select-box-icon').html('î¤');
      }
    });

    $(this).find('li.select-box-option').click(function(event){
      event.preventDefault();
      $(this).parent().css('display','none');
      $('input.js-select-box-value').attr('value',$(this).attr('data-sb-value'));
      var _test = 'the select option is :' + $(this).attr('data-sb-value');
      $(this).parent().parent().children('div').children('h3.selected').html($(this).children('a').html());
      $(this).parent().parent().children('div').children('div.select-box-arrow').children('span.js-select-box-icon').html('î¤');
      $(this).parent().parent().scrollToMe();
    });
  });       
}

//////////////////////
// ON DOCUMENT READY 
/////////////////////
$(document).ready(function(){

  checkWindowSize();

  // detect and handle breadcrumbs
  if ($('.breadcrumbs').length > 0) {
    var d = $('.breadcrumbs').find('a');
    d.last().hide();
  }

   

  // sidebar script (populate mobile and tablet menu)
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
      $('<div id="mobile-sidebar" class="mobile-sidebar"></div>').prependTo('.content');

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
  } // end if $(.sidebar) > 0


// LazyLoading with ReSRC.it images
  if ($('.resrc').length > 0) {
    $.getScript('/media/beta/beta-assets/js/jquery.review-1.0.0.min.js', function() {
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
  };


if ($('#container').length > 0) {
  $.when(
      $.getScript( '/media/beta/beta-assets/js/filtrify.min.js' ),
      $.getScript( '/media/beta/beta-assets/js/jPages.min.js' ),
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
            previous : "â†",
            next : "â†’",
            direction : "auto",
            animation : "fadeInUp"
 
        });
    };

    function destroyPagination () {
        pagination.jPages("destroy");
    };

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
}

  // fade in button when user scrolls down the page
  $(window).scroll(function() {
    if ($(this).scrollTop() > 450) {
      $('.back-to-top').fadeIn(200);
    } else {
      $('.back-to-top').fadeOut(200);
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

    $.getScript('/media/beta/beta-assets/js/jquery.bxslider.min.js', function() {

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

    $.getScript('/media/beta/beta-assets/js/jquery.royalslider.min.js', function() {

      $.each($('.royalSlider'), function() {

        var _this = $(this);

        // get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        var _itemWidth = (_this.data('slider-item-width') > 0) ? _this.data('slider-item-width') : 930;
        var _itemHeight = (_this.data('slider-item-height') > 0) ? _this.data('slider-item-height') : 465;
        var _itemAutoPlay = (_this.data('slider-auto-play') == true) ? _this.data('slider-auto-play') : false;

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


  ///////////////////////
  /////// accreditation
  ///////////////////////

  // Show image credits button fixed to the right of the screen on Desktop only
  
  if ($('.credits').length > 0) {

    $.when(
        $.getScript( '/media/beta/beta-assets/js/jquery-rotate-ck.js' ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){
      //  
      if ($('body').hasClass('gDesktop')) {
        //$('.credits-btn').addClass("show").rotate({angle:-90});
        
        $('.show-credits').click(function(event) {
          event.preventDefault();
         
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

      // show image credits by default on tablet and mobile
      else {
        $('.credits').show();
      }
    });
    
  }


// detect accordion component
if ($('.accordion').length > 0) {

    $.when(
        $.getScript( '/media/beta/beta-assets/js/jquery.accordion-ck.js' ),
        $.getScript( '/media/beta/beta-assets/js/jquery.easing.1.3-ck.js'),
        $.getScript( '/media/beta/beta-assets/js/jquery-rotate-ck.js' ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function(){

        //place your code here, the scripts are all loaded
        $('#st-accordion').accordion({
            oneOpenedItem: true
        });

    });

    function resetSpinners() {
      // check if there are any other open accordion items, and close them if so
      $( ".accordion-list-item" ).each(function (e) {
        var _li_item = $(this); 
        if ( _li_item.hasClass('st-open') ) {
            _li_item.find('.st-arrow').rotate({animateTo:0, center: ["50%", "50%"], });
        }
      });
    }

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
                circle.rotate({animateTo:0, center: ["50%", "50%"], });
              };
    });

    $(".st-arrow").on("click", function(e){
      e.preventDefault();
      resetSpinners();
      var _icon = $(this);
      var _st = $(this).parent().parent();

      if (!_st.hasClass('st-open'))  {
        _icon.rotate({animateTo:135});
      } else {
        _icon.rotate({animateTo:0, center: ["50%", "50%"], });
      };

    });
}



// detect dropdown menu button used in forms or in page for drop menus
if ($('.dd-menu').length > 0) {

    $(".js-dd-menu").click(function (event){
       event.preventDefault();
       var _d = $(this);
       var _d_menu = _d.parent();
       
       if (_d_menu.hasClass('active')) {
          _d_menu.find('.js-dd-menu-icon').html("î¤");
          _d_menu.find('.js-dd-menu-list').slideUp('fast', function() {
            _d_menu.removeClass('active');
         });
       }
       else { 
          _d_menu.find('.js-dd-menu-icon').html("î§");
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
if ($('#showtime-json').length){

  // with a lightbox use-case, Magnific is a dependency. The .lightbox call further down shouldn't fire, since the Showtime lightbox only functions inside the getJSON.
  $.getScript('/media/beta/beta-assets/js/magnific-lightbox-ck.js', function() {

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

    $.getScript('/media/beta/beta-assets/js/magnific-lightbox-ck.js', function() {

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

if ($('.__media').length > 0) {
  $.getScript('/media/beta/beta-assets/js/jquery.fitvids-ck.js', function() {
    $('.__media').fitVids();
  });
}


if ($('video').length > 0) {

  $.getScript('/media/beta/beta-assets/js/mediaelement-and-player.min.js', function() {

    $('video:not(.no-mejs)').mediaelementplayer({
      //pluginPath: 'http://artslondon.github.io/beta/assets/js/libs/'
      pluginPath: 'http://beta.arts.ac.uk/media/beta/beta-assets/plugins/'
    });


  });

}

// add icons to social media links inside .l-content and aside
$('.l-content a[href*="facebook"], aside a[href*="facebook"]').addClass('facebook-link');

$('.l-content a[href*="twitter"], aside a[href*="twitter"]').addClass('twitter-link');

$('.l-content a[href*="flickr"], aside a[href*="flickr"]').addClass('flickr-link');

$('.l-content a[href*="youtube"], aside a[href*="youtube"]').addClass('youtube-link');

$('.l-content a[href*="linkedin"], aside a[href*="linkedin"]').addClass('linkedIn-link');

$('.l-content a[href*="tumblr"], aside a[href*="tumblr"]').addClass('tumblr-link');

$('.l-content a[href*="vimeo"], aside a[href*="vimeo"]').addClass('vimeo-link');

$('.l-content a[href*="pinterest"], aside a[href*="pinterest"]').addClass('pinterest-link');

$('.l-content a[href*="plus.google"], aside a[href*="plus.google"]').addClass('gplus-link');

$('.l-content a[href*="github."], aside a[href*="github"]').addClass('github-link');


// Add download class to PDF links
$('a[href$=".pdf"]').parent().addClass('download');
// $('.content a[href$=".html"]').parent().addClass('external');

  // Creating custom :external selector
  $.expr[':'].external = function(obj){
      return (obj.hostname != location.hostname);
  };

  // Add 'external' CSS class to all external links
  $('a:external.button-link').addClass('external').each(function() {
    $(this).attr("title", $(this).attr("title") + "(external link)");
});
  $('.content ul li a:external').parent().addClass('external').each(function() {
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
