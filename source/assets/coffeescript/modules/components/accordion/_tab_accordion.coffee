#---------------------------------------
#  Tabs on desktop, accordion on mobile
#---------------------------------------

initTabsAccordion = ->
  $(".tab_content").hide()
  $(".tab_content:first").show()
  
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
    $(".tab_drawer_heading").removeClass "d_active"
    $(this).addClass "d_active"
    $("ul.tabs li").removeClass "active"
    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass "active"
    # $(this).scrollToMe()
    return
# End tabs to accordion 

$(document).ready ->
  if $(".tabs-container").length > 0
    initTabsAccordion()