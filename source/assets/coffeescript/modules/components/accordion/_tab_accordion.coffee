#---------------------------------------
#  Tabs on desktop, accordion on mobile
#---------------------------------------

initTabsAccordion = ->
  $(".tab_content").hide()
  $(".tab_content:first").show()


  $(".tab_drawer_heading").each (i) ->
  	_tab_heading = $(this)
  	_tab_heading.addClass "icon-plus"

  $(".tab_drawer_heading").first().addClass("icon-minus")

  # if in tab mode
  $("ul.tabs li").click ->
    $(".tab_content").hide()
    activeTab = $(this).attr("rel")
    $("#" + activeTab).show()
    $("ul.tabs li").removeClass "active"
    $(this).addClass "active"
    $(".tab_drawer_heading").removeClass "d_active"
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass "d_active"
    return


  # if in drawer mode
  $(".tab_drawer_heading").click ->
    $(".tab_content").hide()
    d_activeTab = $(this).attr("rel")
    $("#" + d_activeTab).show()
    $(".tab_drawer_heading").removeClass "d_active icon-minus"

    $(this).addClass "d_active icon-minus"
    $("ul.tabs li").removeClass "active"
    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass "active"
    $('html, body').animate({'scrollTop': $(this).offset().top}, 'fast', 'linear');
    return
# End tabs to accordion


$(document).ready ->
  if $(".tabs-container").length > 0
    initTabsAccordion()
