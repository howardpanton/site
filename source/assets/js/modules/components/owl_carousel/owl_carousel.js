// Generated by CoffeeScript 1.7.1
(function() {
  var initOwlCarousel;

  initOwlCarousel = function() {
    jQuery.getScript("http://static.arts.ac.uk/assets/js/owl.carousel.js", function() {
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
