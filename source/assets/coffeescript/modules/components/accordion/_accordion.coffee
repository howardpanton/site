###
    -------------------------------------------------------------
        checkForAccordion()

        Load accordion script and handle clicks
        if there is an accordion on the page
    -------------------------------------------------------------
###

checkForAccordion = ->
  if $(".accordion").length > 0
    $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js"), $.Deferred((deferred) ->
      $ deferred.resolve
    )).done ->
      $("#st-accordion").accordion oneOpenedItem: true

    $(".accordion-list-anchor").on "click", ".size-h4", (event) ->
      event.preventDefault()
      circle = ($(this).next(".st-arrow"))
      accordion = ($(this).parent().parent())
      elem = ($(this).parent().next(".st-content"))
      resetSpinners()
      unless elem.is(":visible")
        circle.rotate animateTo: 135
      else
        circle.rotate
          animateTo: 0
          center: ["50%", "50%"]


    $(".st-arrow").on "click", (e) ->
      e.preventDefault()
      resetSpinners()
      _icon = $(this)
      _st = $(this).parent().parent()
      unless _st.hasClass("st-open")
        _icon.rotate animateTo: 135
      else
        _icon.rotate
          animateTo: 0
          center: ["50%", "50%"]


