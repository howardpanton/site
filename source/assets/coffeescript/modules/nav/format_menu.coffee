#
#    -------------------------------------------------------------
#        formatMainNavDDCols()
#
#        This slices the main navigation dropdown menu lists
#        into columns for desktop view
#    -------------------------------------------------------------
#

formatMainNavDDCols = ->

		# Colleges Dropdown
    # Link_col = $(".college-nav").find("li").slice(7, 6)
    # Link_col.remove()

    # Study At UAL Dropdown
    Link_study_1 = $(".study-nav").find("li").slice(7, 13)
    Link_study_2 = $(".study-nav").find("li").slice(13, 19)
    Link_study_3 = $(".study-nav").find("li").slice(19, 25)
    Link_study_1.remove()
    Link_study_2.remove()
    Link_study_3.remove()

    # Research Dropdown
    Link_research = $(".research-nav").find("li").slice(7, 13)
    Link_research.remove()

    # Student Jobs & Careers Dropdown
    Link_student = $(".student-nav").find("li").slice(7, 13)
    Link_student.remove()

    # Alumni & Friends Dropdown
    Link_alumni = $(".alumni-nav").find("li").slice(7, 13)
    Link_alumni.remove()

    # About UAL Dropdown
    Link_about = $(".about-nav").find("li").slice(7, 13)
    Link_about_1 = $(".about-nav").find("li").slice(13, 19)
    Link_about_2 = $(".about-nav").find("li").slice(19, 25)
   	Link_about.remove()
    Link_about_1.remove()
    Link_about_2.remove()



		# set up 2nd, 3rd, 4th cols
    # $(".college-nav").append "<ul class=\"subnav-2 region\">"
    # $(".college-nav .subnav-2").prepend Link_col
    $(".study-nav").append "<ul class=\"subnav-2 pad-top-6x region\">"
    $(".study-nav .subnav-2").prepend Link_study_1
    $(".study-nav").append "<ul class=\"subnav-3 pad-top-6x region\">"
    $(".study-nav .subnav-3").prepend Link_study_2
    $(".study-nav").append "<ul class=\"subnav-4 pad-top-6x region\">"
    $(".study-nav .subnav-4").prepend Link_study_3
    $(".research-nav").append "<ul class=\"subnav-2 pad-top-6x region\">"
    $(".research-nav .subnav-2").prepend Link_research
    $(".student-nav").append "<ul class=\"subnav-2 region pad-top-6x region\">"
    $(".student-nav .subnav-2").prepend Link_student
    $(".alumni-nav").append "<ul class=\"subnav-2 region pad-top-6x region\">"
    $(".alumni-nav .subnav-2").prepend Link_alumni
    $(".about-nav").append "<ul class=\"subnav-2 pad-top-6x region\">"
    $(".about-nav .subnav-2").prepend Link_about
    $(".about-nav").append "<ul class=\"subnav-3 pad-top-6x region\">"
    $(".about-nav .subnav-3").prepend Link_about_1
    $(".about-nav").append "<ul class=\"subnav-4 pad-top-6x region\">"
    $(".about-nav .subnav-4").prepend Link_about_2


$(document).ready ->
    formatMainNavDDCols()

