(function() {
  var kisWidget;

  kisWidget = function() {
    return (function(d) {
      "use strict";
      var scriptTags, widgetScript;
      widgetScript = d.createElement("script");
      widgetScript.id = "unistats-widget-script";
      widgetScript.src = "//widget.unistats.ac.uk/js/unistats.widget.js";
      scriptTags = d.getElementsByTagName("script")[0];
      if (d.getElementById("unistats-widget-script")) {
        return;
      }
      return scriptTags.parentNode.insertBefore(widgetScript, scriptTags);
    })(document);
  };

  $(document).ready(function() {
    if ($(".kis-widget").length > 0) {
      return kisWidget();
    }
  });

}).call(this);

(function() {
  var initAccordion, resetSpinners;

  resetSpinners = function() {
    return $(".accordion-list-item").each(function(e) {
      var _li_item;
      _li_item = $(this);
      if (_li_item.hasClass("st-open")) {
        return _li_item.find(".st-arrow").rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
  };


  /*
      -------------------------------------------------------------
          initAccordion()
  
          Load accordion script and handle clicks
      -------------------------------------------------------------
   */

  initAccordion = function() {
    $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js"), $.Deferred(function(deferred) {
      return $(deferred.resolve);
    })).done(function() {
      return $("#st-accordion").accordion({
        oneOpenedItem: true
      });
    });
    $(".accordion-list-anchor").on("click", ".size-h4", function(event) {
      var accordion, circle, elem;
      event.preventDefault();
      circle = $(this).next(".st-arrow");
      accordion = $(this).parent().parent();
      elem = $(this).parent().next(".st-content");
      resetSpinners();
      if (!elem.is(":visible")) {
        return circle.rotate({
          animateTo: 135
        });
      } else {
        return circle.rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
    return $(".st-arrow").on("click", function(e) {
      var _icon, _st;
      e.preventDefault();
      resetSpinners();
      _icon = $(this);
      _st = $(this).parent().parent();
      if (!_st.hasClass("st-open")) {
        return _icon.rotate({
          animateTo: 135
        });
      } else {
        return _icon.rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
  };

  $(document).ready(function() {
    if ($(".accordion").length > 0) {
      return initAccordion();
    }
  });

}).call(this);

(function() {
  var initTabsAccordion;

  initTabsAccordion = function() {
    $(".tab_content").hide();
    $(".tab_content:first").show();
    $("ul.tabs li").click(function() {
      var activeTab;
      $(".tab_content").hide();
      activeTab = $(this).attr("rel");
      $("#" + activeTab).show();
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");
      $(".tab_drawer_heading").removeClass("d_active");
      $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
    });
    return $(".tab_drawer_heading").click(function() {
      var d_activeTab;
      $(".tab_content").hide();
      d_activeTab = $(this).attr("rel");
      $("#" + d_activeTab).show();
      $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
      $("ul.tabs li").removeClass("active");
      $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });
  };

  $(document).ready(function() {
    if ($(".tabs-container").length > 0) {
      return initTabsAccordion();
    }
  });

}).call(this);

(function() {
  var initAudio;

  initAudio = function() {
    jQuery.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js", function() {
      $("audio").each(function() {
        return $(this).audioPlayer();
      });
    });
  };

  $(document).ready(function() {
    if ($("audio").length > 0) {
      return initAudio();
    }
  });

}).call(this);

(function() {
  var initCarousel;

  initCarousel = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js", function() {
      return $.each($(".js-carousel"), function() {
        var _controlsOpt, _itemMargin, _itemMinSlides, _itemWidth, _pagerOpt, _this, _wrapper;
        _this = $(this);
        _wrapper = _this.closest(".bx-wrapper");
        _itemWidth = (_this.data("carousel-item-width") > 0 ? _this.data("carousel-item-width") : 0);
        _itemMinSlides = (_this.data("carousel-min-slides") > 0 ? _this.data("carousel-min-slides") : 0);
        _itemMargin = (_this.data("carousel-item-margin") > 0 ? _this.data("carousel-item-margin") : 0);
        _controlsOpt = true;
        _controlsOpt = _this.data("controls");
        _pagerOpt = (_this.data("pager") ? _this.data("pager") : false);
        return _this.bxSlider({
          slideWidth: _itemWidth,
          minSlides: _itemMinSlides,
          maxSlides: 10,
          slideMargin: _itemMargin,
          moveSlides: 1,
          controls: _controlsOpt,
          captions: true,
          pager: _pagerOpt,
          onSliderLoad: function(currentIndex) {
            if (_this.data("counter")) {
              return $(_this).closest(".bx-wrapper").find(".bx-controls").prepend("<div class=\"bx-counter\"><span class=\"bx-index\">" + (currentIndex + 1) + "</span>/<span class=\"bx-total\">" + _this.getSlideCount() + "</span></div>");
            }
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            if (_this.data("counter")) {
              return $(_this).closest(".bx-wrapper").find(".bx-index").text(newIndex + 1);
            }
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".js-carousel").length > 0) {
      return initCarousel();
    }
  });

}).call(this);

(function() {
  var initDropdownBtn;

  initDropdownBtn = function() {
    return $(".js-dd-menu").click(function(event) {
      var _d, _d_menu;
      event.preventDefault();
      _d = $(this);
      _d_menu = _d.parent();
      if (_d_menu.hasClass("active")) {
        _d_menu.find(".js-dd-menu-icon");
        return _d_menu.find(".js-dd-menu-list").slideUp("fast", function() {
          return _d_menu.removeClass("active");
        });
      } else {
        _d_menu.find(".js-dd-menu-icon");
        return _d_menu.find(".js-dd-menu-list").slideDown("fast", function() {
          return _d_menu.addClass("active");
        });
      }
    });
  };

  $(document).ready(function() {
    if ($(".dd-menu").length > 0) {
      return initDropdownBtn();
    }
  });

}).call(this);

(function() {
  var expCB;

  expCB = function() {
    $(".expanded-content").hide();
    $(".show-more").show();
    $(".show-more").click(function(e) {
      var _clicked;
      e.preventDefault();
      _clicked = $(this);
      _clicked.closest(".expandable-content").find(".expanded-content").slideDown();
      return _clicked.hide();
    });
    return $(".hide-content").click(function(e) {
      var parent, _clicked;
      e.preventDefault();
      _clicked = $(this);
      parent = _clicked.closest(".expandable-content");
      $(".expanded-content", parent).hide();
      $(parent).find(".show-more").show();
      return parent.scrollToMe();
    });
  };

  $(document).ready(function() {
    if ($(".expanded-content").length > 0) {
      return expCB();
    }
  });

}).call(this);

(function() {
  var initLightbox;

  initLightbox = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", function() {
      return $(".js-lightbox").each(function() {
        return $(this).magnificPopup({
          delegate: "a",
          type: "image",
          tLoading: "Loading image #%curr%...",
          mainClass: "mfp-img-mobile",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
          },
          image: {
            tError: "<a href=\"%url%\">The image #%curr%</a> could not be loaded."
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".js-lightbox").length > 0) {
      return initLightbox();
    }
  });

}).call(this);

(function() {
  var initOwlCarousel;

  initOwlCarousel = function() {
    jQuery.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/owl.carousel.js", function() {
      $(".owl-carousel").each(function() {
        $(this).owlCarousel({
          items: 3,
          itemsDesktop: [1280, 3],
          itemsTablet: [959, 2],
          itemsMobile: [599, 1],
          lazyLoad: true,
          pagination: false,
          navigation: true,
          navigationText: ["<i class='icon-left-open-big'></i>", "<i class='icon-right-open-big'></i>"]
        });
      });
      $(".owl-carousel").each(function() {
        var total_items;
        total_items = $(".item", this).length;
        $(".item-description", this).append(function(i) {
          return $("<span />", {
            text: i + 1 + " of " + total_items
          });
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".owl-carousel").length > 0) {
      return initOwlCarousel();
    }
  });

}).call(this);

(function() {
  var initSlider;

  initSlider = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js", function() {
      return $.each($(".royalSlider"), function() {
        var _itemAutoPlay, _itemHeight, _itemWidth, _this;
        _this = $(this);
        _itemWidth = (_this.data("slider-item-width") > 0 ? _this.data("slider-item-width") : 930);
        _itemHeight = (_this.data("slider-item-height") > 0 ? _this.data("slider-item-height") : 465);
        _itemAutoPlay = (_this.data("slider-auto-play") === true ? _this.data("slider-auto-play") : false);
        return _this.royalSlider({
          arrowsNav: true,
          fadeinLoadedSlide: false,
          arrowsNavAutoHide: false,
          controlNavigation: "none",
          loop: true,
          autoScaleSlider: true,
          autoScaleSliderWidth: _itemWidth,
          autoScaleSliderHeight: _itemHeight,
          imageScalePadding: 0,
          globalCaption: true,
          keyboardNavEnabled: true,
          autoPlay: {
            enabled: _itemAutoPlay,
            pauseOnHover: true,
            delay: 3000
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".royalSlider").length > 0) {
      return initSlider();
    }
  });

}).call(this);

(function() {
  var searchFilters;

  searchFilters = function() {
    return $(".filter-heading").click(function(event) {
      var c;
      event.preventDefault();
      c = $(this);
      if (!c.hasClass("not-active")) {
        if (c.parent().hasClass("active")) {
          return c.parent().removeClass("active");
        } else {
          return c.parent().addClass("active");
        }
      }
    });
  };

  $(document).ready(function() {
    if ($(".search-filters").length > 0) {
      return searchFilters();
    }
  });

}).call(this);

(function() {
  var searchFocusHighlight;

  searchFocusHighlight = function() {
    return $("#finder-search-input").focus(function() {
      return $("#finder-search-input").parent().parent().addClass("search-gray-border");
    });
  };

  $(document).ready(function() {
    if ($(".search-input-wrap").length > 0) {
      return searchFocusHighlight();
    }
  });

}).call(this);

(function() {
  var initFitVids;

  initFitVids = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js", function() {
      return $(".__media").fitVids();
    });
  };

  $(document).ready(function() {
    if ($(".__media").length > 0) {
      return initFitVids();
    }
  });

}).call(this);

(function() {
  var checkForVideo;

  checkForVideo = function() {
    return $.getScript("https://raw.github.com/johndyer/mediaelement/master/build/mediaelement-and-player.js", function() {
      return $("video").mediaelementplayer({
        pluginPath: "http://d27lwoqz7s24cy.cloudfront.net/assets/swf/"
      });
    });
  };

  $(document).ready(function() {
    if ($("video").length > 0) {
      return checkForVideo();
    }
  });

}).call(this);

(function() {
  var debugSwitch;

  debugSwitch = function() {
    $("#debug").hide();
    return $(".debug-toggle").click(function(e) {
      $("#debug").toggle();
      return e.preventDefault();
    });
  };

  $(document).ready(function() {
    return debugSwitch;
  });

}).call(this);

(function() {
  this.getEventsFeed = function() {
    return $.getJSON("http://events.arts.ac.uk/apex/eventsfeed?callback=?", function(data) {
      var count, output;
      output = "<ul class=\"cf\">";
      count = 6;
      $.each(data, function(i, item) {
        var events;
        if (i < count) {
          events = data.Events[i];
          return output += "<li><p>" + events.id + "</p></li>";
        }
      });
      output += "</ul></div>";
      $(".events-feed").html(output);
    });
  };

  $(document).ready(function() {
    if ($(".events-feed").length > 0) {
      return $.each($(".events-feed"), function() {
        return getEventsFeed();
      });
    }
  });

}).call(this);

(function() {
  this.getNewsFeed = function(college, feed_id) {
    var blog_url, feed_url;
    feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&count=6&include=title,url,attachments";
    blog_url = "http://blogs.arts.ac.uk/" + college;
    return $.getJSON(feed_url, function(data) {
      var count, output;
      output = "<div class=\"feed-comp\"> <ul class=\"cf\">";
      count = 6;
      $.each(data.posts, function(i, item) {
        var length, news, short_title, title;
        if (i < count) {
          news = data.posts[i];
          length = 60;
          title = news.title;
          if (title.length > length) {
            short_title = title.substring(0, length) + "...";
          } else {
            short_title = title;
          }
          return output += "<li> <div class=\"feed-image\"> <div class=\"center-cropped\" style=\"background-image: url(" + news.attachments[0].url + ")\"> <img src=\"" + news.attachments[0].url + "\"> </div> </div> <div class=\"title\"> <a href=\"" + news.url + "\" tite=\"" + news.title + "\">" + short_title + "</a> </div> </li>";
        }
      });
      output += "</ul> <p class=\"view-all\"><a href=\"" + blog_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>";
      $(".news-feed-" + feed_id).html(output);
    });
  };

}).call(this);


/*
		-------------------------------------------------------------
				enableSelectBoxes()

				UAL formatting for select boxes
		-------------------------------------------------------------
 */

(function() {
  if ($(".select-box").length > 0) {
    $(".js-select-box").each(function() {
      var _start_val;
      _start_val = $(this).children("ul.js-select-box-list").children("li.select-box-option:first").children("a").html();
      $(this).children("div").children("h3.selected").html(_start_val);
      $("input.js-select-box-value").attr("value", $(this).children("ul.js-select-box-list").children("li.select-box-option:first").attr("data-sb-value"));
      $(this).children("div").children("h3.selected,div.select-box-arrow").click(function(event) {
        event.preventDefault();
        if ($(this).parent().parent().children("ul.js-select-box-list").css("display") === "none") {
          return $(this).parent().parent().children("ul.js-select-box-list").css("display", "block");
        } else {
          return $(this).parent().parent().children("ul.js-select-box-list").css("display", "none");
        }
      });
      return $(this).find("li.select-box-option").click(function(event) {
        event.preventDefault();
        $(this).parent().css("display", "none");
        $("input.js-select-box-value").attr("value", $(this).attr("data-sb-value"));
        return $(this).parent().parent().children("div").children("h3.selected").html($(this).children("a"));
      });
    });
  }

}).call(this);


/*
		-------------------------------------------------------------
				checkWindowSize() function
					Adds width classes to <body> tag.
					Used for tablet, desktop, mobile styling
		-------------------------------------------------------------
 */

(function() {


}).call(this);


/*
    -------------------------------------------------------------
       Enable caching of getScript calls
    -------------------------------------------------------------
 */

(function() {
  jQuery.ajaxSetup({
    cache: true
  });

}).call(this);


/*
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
 */

(function() {
  var formatDateUAL;

  formatDateUAL = function() {
    return $(".date").each(function(i, element) {
      var str;
      str = $(this).text();
      if (str.indexOf(",") !== -1) {
        return $(this).text(str.substring(5, 16));
      }
    });
  };

  $(document).ready(function() {
    if ($(".date").length > 0) {
      return formatDateUAL();
    }
  });

}).call(this);


/*
		-------------------------------------------------------------
			Javascript hasClass function - can use instead of jquery .hasClass

			Example use:

			JS:

			var element = document.getElementById('element');
			if ( hasClass(element, "class_one") ) {
					// Do stuff here
			}

			Coffeescript:

			element = document.getElementById("element")
			if hasClass(element, "class_one")
				console.log "do something here"
				console.log "do something else here"
		-------------------------------------------------------------
 */

(function() {
  this.hasClass = function(el, clss) {
    return el.className && new RegExp("(^|\\s)" + clss + "(\\s|$)").test(el.className);
  };

}).call(this);

(function() {
  this.imageCredits = function() {
    if ($("html").hasClass("desktop")) {
      $(".credits-btn").addClass("show");
      return $(".show-credits").click(function(event) {
        var c;
        event.preventDefault();
        c = $(this);
        if (c.hasClass("active")) {
          c.removeClass("active").attr("title", "Show image credits");
          return $(".credits").fadeOut();
        } else {
          c.addClass("active").attr("title", "Hide image credits");
          return $(".credits").fadeIn();
        }
      });
    }
  };

  $(document).ready(function() {
    if ($(".credits").length > 0) {
      return imageCredits();
    }
  });

}).call(this);


/*
    -------------------------------------------------------------
        add indexOf support for IE8 compatibility

          Used to reformat dates within feeds
    -------------------------------------------------------------
 */

(function() {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
      var from, len;
      len = +this.length || 0;
      from = Number(arguments_[1]) || 0;
      from = (from < 0 ? Math.ceil(from) : Math.floor(from));
      if (from < 0) {
        from += len;
      }
      while (from < len) {
        if (from in this && this[from] === elt) {
          return from;
        }
        from++;
      }
      return -1;
    };
  }

}).call(this);

(function() {
  var getLCFJobsFeed;

  getLCFJobsFeed = function() {
    return $.getJSON("http://my.lcffirstmove.co.uk/jobs.json?callback=?", function(data) {
      var count, months, output;
      output = "<div class=\"table-container padded\"><table class=\"data-table\"><thead><tr><th>Title</th><th>Location</th><th>Salary</th><th>Closing date</th></tr></thead><tbody>";
      count = 10;
      months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      $.each(data, function(i, item) {
        var dt, job, job_date, old_salary, salary;
        if (i < count) {
          job = data[i];
          salary = "";
          old_salary = job.salary;
          if (old_salary === null) {
            salary = job.salary_range.description;
          } else {
            salary = old_salary;
          }
          job_date = job.closes_on;
          dt = new Date(job_date);
          output += "<tr>" + "<td><a href=\"http://my.lcffirstmove.co.uk/jobs/" + job.id + "\">" + job.job_title + "</a></td>" + "<td>" + job.region + "</td>" + "<td>" + salary + "</td>" + "<td>" + dt.getDate() + " " + months[dt.getMonth()] + "</td>" + "</tr>";
        }
      });
      output += "</tbody></table></div>";
      $("#lcf-jobs").html(output);
    });
  };

  $(document).ready(function() {
    if ($("#lcf-jobs").length > 0) {
      return getLCFJobsFeed();
    }
  });

}).call(this);


/*
		-------------------------------------------------------------
				Google maps
		-------------------------------------------------------------
 */

(function() {
  var markerIcons;

  markerIcons = {};

  this.addMarker = function(data, map, infoWindow) {
    var contentString, marker;
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lng),
      map: map,
      title: data.name,
      icon: markerIcons["accomMarker"]
    });
    contentString = "<h3>" + data.name + "</h3>" + "<p>" + data.content + "</p>";
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.open(map, marker);
      infoWindow.setContent(contentString);
    });
  };

  this.setupMarkerIcons = function(data) {
    var i, icon_name, _results, _this;
    _results = [];
    for (i in data) {
      _this = data[i];
      icon_name = _this.markerName;
      _results.push(markerIcons[icon_name] = {
        url: _this.url,
        scaledSize: new google.maps.Size(_this.scaledSize_x, _this.scaledSize_y),
        origin: new google.maps.Point(_this.origin_x, _this.origin_y),
        anchor: new google.maps.Point(_this.anchor_x, _this.anchor_y)
      });
    }
    return _results;
  };

  this.loadMap = function() {
    var bikeLayer, gJson, i, infoWindow, initialLocation, map, mapDiv, mapOptions, transitLayer, _mapCanvas;
    gJson = [];
    initialLocation = new google.maps.LatLng(mapConfig.initLat, mapConfig.initLng);
    mapOptions = {
      zoom: mapConfig.zoom,
      center: initialLocation
    };
    mapDiv = document.getElementById("map-canvas");
    map = new google.maps.Map(mapDiv, mapOptions);
    infoWindow = new google.maps.InfoWindow({
      content: "",
      maxWidth: 400
    });
    _mapCanvas = $("#map-canvas");
    if (_mapCanvas.data("transit-layer") === true) {
      transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(map);
    }
    if (_mapCanvas.data("bicycling-layer") === true) {
      bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);
    }
    setupMarkerIcons(map_markers_json);
    for (i in maps_json) {
      addMarker(maps_json[i], map, infoWindow);
    }
  };

  this.loadMapsScript = function() {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=loadMap";
    document.body.appendChild(script);
  };

}).call(this);


/*
		-------------------------------------------------------------
				.back-to-top
					Scroll to the top of the page
					when a link with .back-to-top class clicked

					On desktop the button will fade in when the user
					scrolls down the page
		-------------------------------------------------------------
 */

(function() {
  var backToTop, checkScrollPos;

  checkScrollPos = function() {
    if ($("html").hasClass("desktop")) {
      if ($(this).scrollTop() > 450) {
        return $(".back-to-top").fadeIn(200);
      } else {
        return $(".back-to-top").fadeOut(200);
      }
    }
  };

  backToTop = function() {
    $(window).scroll(checkScrollPos());
    return $("back-to-top").click(function(event) {
      event.preventDefault();
      return $("html, body").animate({
        scrollTop: 0
      }, 300);
    });
  };

  $(document).ready(function() {});

}).call(this);

(function() {
  var breadcrumbs;

  breadcrumbs = function() {
    $(".breadcrumbs").find("a").last().hide();
    return $(".browse-sc").find(".breadcrumbs").find("a:gt(4)").remove();
  };

  $(document).ready(function() {
    return breadcrumbs();
  });

}).call(this);

(function() {
  var formatMainNavDDCols;

  formatMainNavDDCols = function() {
    var Link_about, Link_about_1, Link_about_2, Link_alumni, Link_col, Link_industry, Link_student, Link_study_1, Link_study_2, Link_study_3;
    Link_col = $(".college-nav").find("li").slice(3, 6);
    Link_study_1 = $(".study-nav").find("li").slice(6, 11);
    Link_study_2 = $(".study-nav").find("li").slice(11, 16);
    Link_study_3 = $(".study-nav").find("li").slice(16, 19);
    Link_student = $(".student-nav").find("li").slice(3, 4);
    Link_alumni = $(".alumni-nav").find("li").slice(4, 6);
    Link_about = $(".about-nav").find("li").slice(6, 11);
    Link_about_1 = $(".about-nav").find("li").slice(11, 16);
    Link_about_2 = $(".about-nav").find("li").slice(16, 19);
    Link_industry = $(".industry-nav").find("li").slice(4, 7);
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
    $(".college-nav").append("<ul class=\"subnav-2 region\">");
    $(".college-nav .subnav-2").prepend(Link_col);
    $(".study-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".study-nav .subnav-2").prepend(Link_study_1);
    $(".study-nav").append("<ul class=\"subnav-3 pad-top-6x region\">");
    $(".study-nav .subnav-3").prepend(Link_study_2);
    $(".study-nav").append("<ul class=\"subnav-4 pad-top-6x region\">");
    $(".study-nav .subnav-4").prepend(Link_study_3);
    $(".student-nav").append("<ul class=\"subnav-2 region pad-top-6x region\">");
    $(".student-nav .subnav-2").prepend(Link_student);
    $(".alumni-nav").append("<ul class=\"subnav-2 region pad-top-6x region\">");
    $(".alumni-nav .subnav-2").prepend(Link_alumni);
    $(".about-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".about-nav .subnav-2").prepend(Link_about);
    $(".about-nav").append("<ul class=\"subnav-3 pad-top-6x region\">");
    $(".about-nav .subnav-3").prepend(Link_about_1);
    $(".about-nav").append("<ul class=\"subnav-4 pad-top-6x region\">");
    $(".about-nav .subnav-4").prepend(Link_about_2);
    $(".industry-nav").append("<ul class=\"subnav-2 no-pad-top region\">");
    return $(".industry-nav .subnav-2").prepend(Link_industry);
  };

  $(document).ready(function() {
    return formatMainNavDDCols();
  });

}).call(this);

(function() {
  var buildMobileSidebar;

  buildMobileSidebar = function() {
    var _has_heading, _menuHtml, _mobMenuButton, _mobMenuContent, _no_of_li_items, _sb_lth, _sideBarTitle;
    _sb_lth = $(".sidebar").length;
    _has_heading = $(".sidebar").find(".menu-heading").length;
    if (_sb_lth > 0) {
      _no_of_li_items = $(".sidebar li").size();
      if (_no_of_li_items > 1) {
        _menuHtml = $(".sidebar").html();
        _sideBarTitle = $(".sidebar li").first();
        _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + "<a href=\"#\" class=\"show-mob-sidebar\"></a>";
        _mobMenuContent = void 0;
        if (_has_heading > 0) {
          _mobMenuContent = _mobMenuButton + _menuHtml;
        } else {
          _mobMenuContent = _menuHtml;
        }
        $("<div id=\"mobile-sidebar\" class=\"mobile-sidebar d-hide\"></div>").prependTo(".content");
        $("#mobile-sidebar").html(_mobMenuContent);
        $(".show-mob-sidebar").click(function(e) {
          var _clicked;
          e.preventDefault();
          _clicked = $(this);
          if (_clicked.hasClass("active")) {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideUp();
            return _clicked.removeClass("active");
          } else {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideDown();
            return _clicked.addClass("active");
          }
        });
        if (_sideBarTitle.text().toLowerCase() === "in this section") {
          return $("#mobile-sidebar li").first().remove();
        } else {
          return $("#mobile-sidebar li a").first().text("College Homepage");
        }
      }
    }
  };

  $(document).ready(function() {
    return buildMobileSidebar();
  });

}).call(this);

(function() {


}).call(this);

(function() {
  var skipToContent;

  skipToContent = function() {
    if ($(".page-title").length > 0) {
      return $(".page-title").first().attr("id", "skip-to-here");
    } else {
      return $(".content-wrapper").first().attr("id", "skip-to-here");
    }
  };

  $(document).ready(function() {
    return skipToContent();
  });

}).call(this);

(function() {
  var shortCourseFilters;

  shortCourseFilters = function() {
    if ($("#container").length > 0) {
      $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js"), $.Deferred(function(deferred) {
        $(deferred.resolve);
      })).done(function() {
        $(function() {
          var container, destroyPagination, pagination, setPagination;
          setPagination = function() {
            pagination.jPages({
              containerID: "container",
              perPage: 24,
              midRange: 1,
              previous: "←",
              next: "→",
              direction: "auto",
              animation: "fadeInUp"
            });
          };
          destroyPagination = function() {
            pagination.jPages("destroy");
          };
          container = $("#container");
          pagination = $("#pagination");
          setPagination();
          $.filtrify("container", "placeHolder", {
            block: "data-original",
            callback: function() {
              destroyPagination();
              setPagination();
            }
          });
        });
      });
      if (!$("html").hasClass("desktop")) {
        $("#placeHolder").prependTo(".content");
      }
    }
  };

  $(document).ready(function() {
    if ($("#container").length > 0) {
      return shortCourseFilters;
    }
  });

}).call(this);

(function() {
  var showtimeJSONloader;

  showtimeJSONloader = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", function() {
      var outputNode;
      outputNode = $(".showtime-json");
      return $.each(outputNode, function(i) {
        var feedUrl, limit, _node;
        _node = "";
        _node = $(this);
        feedUrl = _node.data("url");
        limit = _node.data("limit");
        return $.getJSON(feedUrl + "&limit=" + limit + "&callback=?", function(data) {
          var counter, media, profileUrl, string, studentName;
          string = "";
          media = "";
          studentName = "";
          profileUrl = "";
          counter = 0;
          if (data.data.Student) {
            profileUrl = data.data.Student.Student.profileurl;
            studentName = data.data.Student.Student.firstName + " " + data.data.Student.Student.lastName;
            media = data.data.Student.Media;
          }
          if (data.data.Profiles) {
            media = data.data.Profiles;
          }
          $.each(media, function(i, item) {
            var profileImg;
            if (counter < limit) {
              profileImg = item.thumb.split("gallery");
              item.profileImg = profileImg[0] + "profile.jpg";
              item.zoomImg = profileImg[0] + "screen.jpg";
              if (item.profileName) {
                profileUrl = "http://showtime.arts.ac.uk/" + item.profileName;
                studentName = item.fullName;
              }
              string = "<li><a class=\"zoom no-border\" href= \"" + item.zoomImg + "\" title=\"" + studentName + "\" data-profile-url=\"" + profileUrl + "\" style=\"background-image: url(" + item.profileImg + ")\"></a></li>";
              _node.append(string);
              return counter++;
            } else {
              return false;
            }
          });
          return $(".zoom").magnificPopup({
            type: "image",
            image: {
              titleSrc: function(item) {
                return item.el.attr("title") + " - <a class=\"no-border\" href=\"" + item.el.data("profile-url") + "\">View profile</a>";
              }
            },
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1]
            }
          });
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".showtime-json").length > 0) {
      return showtimeJSONloader();
    }
  });

}).call(this);


/*
    -------------------------------------------------------------
        Blockquotes:
          If there are blockquotes or pull-quotes on the page,
          add a <span> to the top of the element
    -------------------------------------------------------------
 */

(function() {
  if ($("blockquote").length > 0) {
    $("blockquote").each(function() {
      return $(this).prepend('<span></span>');
    });
  }

  if ($(".pull-quote").length > 0) {
    $(".pull-quote").each(function() {
      return $(this).prepend('<span></span>');
    });
  }

}).call(this);

(function() {
  var externalLinks;

  externalLinks = function() {
    jQuery.expr[":"].external = function(obj) {
      return obj.hostname !== location.hostname;
    };
    return $(".l-content a:external.button-link, aside a:external").addClass("external").each(function() {
      return $(this).attr("title", $(this).attr("title") + "(external link)");
    });
  };

  $(document).ready(function() {
    return externalLinks();
  });

}).call(this);

(function() {
  $("aside li a[href$=\".pdf\"], .l-content li a[href$=\".pdf\"]").parent().addClass("no-bullet");

  $("aside li a[href$=\".doc\"], .l-content li a[href$=\".doc\"]").parent().addClass("no-bullet");

}).call(this);

(function() {
  var typographyMods;

  typographyMods = function() {
    return $(".lcf").find("h2").wrapInner("<span />");
  };

  $(document).ready(function() {
    return typographyMods();
  });

}).call(this);

(function() {
  $(document).ready(function() {});

}).call(this);

(function() {
  $(window).load(function() {
    if ($(".related-content").length > 0) {
      $(".related-content ul li").fitHeights();
    }
    if ($(".highlight-box-3").length > 0) {
      $(".highlight-box-3 ul li").fitHeights();
    }
    if ($("body").is(".chelsea, .camberwell, .wimbledon")) {
      $(".two-up ul li").fitHeights();
      $(".three-up ul li").fitHeights();
    }
    if ($("body").is(".ual")) {
      $(".cta .two-up-full ul li").fitHeights();
      $(".st-cp .two-up-full ul li").fitHeights();
      $(".news .four-up-full ul li").fitHeights();
      $(".fe .four-up-full ul li").fitHeights();
    }
    if ($(".__gallery").length > 0) {
      $(".__gallery").each(function() {
        return $(this).find("li").fitHeights();
      });
    }
    if ($("#map-canvas").length > 0) {
      return loadMapsScript();
    }
  });

}).call(this);
