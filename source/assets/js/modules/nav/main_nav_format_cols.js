/*
    -------------------------------------------------------------
        formatMainNavDropdownCols()

        This slices the main navigation dropdown menu lists
        into columns for desktop view
    -------------------------------------------------------------
*/


function formatMainNavDropdownCols() {

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

};
