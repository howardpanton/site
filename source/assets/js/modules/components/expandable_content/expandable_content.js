/*
    -------------------------------------------------------------
        expandableContent()

        detect and handle expandable content blocks
    -------------------------------------------------------------
*/

function expandableContent() {

    if ($('.expanded-content').length > 0) {

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
    }
}
