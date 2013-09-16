<?php $shortEnv = TRUE ; ?>
<?php if (!isset($shortEnv)) { $shortEnv = FALSE; } ?>
<?php if ($shortEnv == TRUE) { ?>
<?php include_once('shortCourseClass.php'); 
$test = new ShortCourse('ARCHITtZ6U','CSM');
//$test = new ShortCourse('FASHIOg9xz','LCF');
$r = $test->returnXml();
$title = $test->title();
$t = $test->dates();
$c = $test->datesChildren();
$tutors = $test->getTutors();
$description = $test->Truncate($test->description(), 300);
$desc_accordion = $test->description_acc();
$materials_accordion = $test->materials();
$tutor_description = $test->getTutorsBiography();
//print_r($r);
?>
<!-- navigation object : PHP Classes -->    
<!-- Research Profile Class -->
<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]>
  <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en">
<![endif]-->
<!--[if IE 7]>
  <html class="no-js lt-ie9 lt-ie8" lang="en">
<![endif]-->
<!--[if IE 8]>
  <html class="no-js lt-ie9" lang="en">
<![endif]-->
<!--[if gt IE 8]>
  <!--> <html lang="en"> <!--
<![endif]-->
  <head>
<!-- Add section name tag -->
    <title><?php $title; ?></title>    <meta charset='utf-8'>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible"'>
    <meta content='on' http-equiv='cleartype'>
    <meta content='University of Arts London, Web Team' name='author'>
    <!-- Meta description tag -->
    
    
<!-- For all browsers old file <link rel="stylesheet" type="text/css" media="screen" href="/media/beta/beta-assets/screen.css" />-->
    
<!-- screen.css -->
    
<link rel="stylesheet" type="text/css" media="screen" href="http://beta.arts.ac.uk/media/beta/beta-assets/css/screen.css" />
   
<!-- fonts.css -->
<link rel="stylesheet" type="text/css" media="" href="http://beta.arts.ac.uk/media/beta/beta-assets/fonts.css" />
    
    <link rel="stylesheet" type="text/css" href="//cloud.typography.com/7258632/627802/css/fonts.css" />
    
<!-- royalslider.css -->
<!--<link rel="stylesheet" type="text/css" media="" href="/media/beta/beta-assets/css/royalslider.css" />-->
    
<!-- Debug CSS -->
<!--<link rel='stylesheet' href='http://artslondon.github.io/beta/assets/css/debug.css'>-->

<!--[if (lt IE 9) & (!IEMobile)]>
    <script src='http://artslondon.github.io/beta/assets/js/libs/selectivizr-min.js'></script>
    <script src="http://artslondon.github.io/beta/assets/js/libs/html5shiv.js"></script>
<![endif]-->
    
<!-- JavaScript -->
    <script src='http://artslondon.github.io/beta//assets/js/libs/modernizr-2.6.2-min.js'></script>
    <script src='http://artslondon.github.io/beta//assets/js/libs/detectizr.min.js'></script> 
    <script> Modernizr.Detectizr.detect({detectScreen:false}); </script>
    
    <!-- load icon files for logos and icons -->

     <script>
  /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "http://artslondon.github.io/beta/assets/css/logos/logos.data.svg.css", "http://artslondon.github.io/beta/assets/css/logos/logos.data.png.css", "http://artslondon.github.io/beta/assets/css/logos/logos.fallback.css" ] );
  </script>
  <noscript><link href="http://artslondon.github.io/beta/assets/img/css/logos.fallback.css" rel="stylesheet"></noscript>

<!-- need to combine these two includes -->
  <script>
  /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "http://artslondon.github.io/beta/assets/img/svg/icons.data.svg.css", "http://artslondon.github.io/beta/assets/img/svg/icons.data.png.css", "http://artslondon.github.io/beta/assets/img/svg/icons.fallback.css" ] );
  </script>
  <noscript><link href="http://artslondon.github.io/beta/assets/img/svg/icons.fallback.css" rel="stylesheet"></noscript>

    <style>
#basketmessage
{
display: none;

}
    </style>
  

   
  </head>


<body class="lcf college  ">
 <div class="ual-black-bg cf">
<div class="header-wrapper">
  <div class="row">  
      <div class="ual-banner-menu">
        
        <div class="ual-logo-tab-mobile">
          <div class="logo-ual-mobile"></div>
        </div>
        <div class="ual-logo-desktop">
          <div class="logo-ual-lcf college"></div>
        </div> 

      <nav class="college-link-menu">
        <ul>
          <li class="col-link-ual"><a href="/">University Home</a></li>
            <li class="col-link-camberwell"><a href="http://beta.arts.ac.uk/camberwell/">Camberwell</a></li>
            <li class="col-link-csm"><a href="http://beta.arts.ac.uk/csm/">CSM</a></li>
            <li class="col-link-chelsea"><a href="http://beta.arts.ac.uk/chelsea/">Chelsea</a></li>
            <li class="col-link-lcc"><a href="http://beta.arts.ac.uk/lcc/">LCC</a></li>
            <li class="col-link-lcf"><a href="http://beta.arts.ac.uk/fashion/">LCF</a></li>
            <li class="col-link-wimbledon"><a href="http://beta.arts.ac.uk/wimbledon/">Wimbledon</a></li>
        </ul>
      </nav>
    </div>
  </div>


<div class="row">  
<!-- navigation object : Main navigation include -->
<nav class="main-nav-wrapper" id="global-nav" role="navigation">
    <div class="megamenu_container top-bar">        
        <a href="#">
            <div class="ual-logo-tab-mobile">
                <div class="logo-ual-mobile"></div>
            </div>
        </a>
    <ul class="megamenu">
      <!-- mobile menu button  -->
        <li class="megamenu_button">
            <a href="#" class="m-menu-btn-toggle"><span>&#9776;</span></a>
        </li> 
      <!-- Course Finder -->          
      <!-- menu button -->
      <li>
        <!--<div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div>-->
        <a href="#" class="megamenu_drop needsclick">Course Finder</a><!-- Begin Item -->
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
            <div class="dd-menu-dropdown-wrapper">
                <div class="d-course-finder-menu-panel row">
                    <div class="row relative">
                        <form class="d-search-input-form">
                            <input class="course-finder-txt-input" type="text" required placeholder="Search for a course here">
                            <div class="go-search-button"> 
                                <a>Search</a> 
                            </div>
                            <div class="small-text-link"><a href="" >view all courses</a></div>
                        </form>
                    </div>
                 </div> 
            </div>    
        </div><!-- End Item Container --> 
      </li><!-- End Item -->
      <!-- End Course Finder -->

      <!-- Colleges --> 
      <!-- menu button -->
      <li>
      <!--   <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick" title="">Colleges</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
            <div class="dd-menu-dropdown-wrapper">
                <div class="region college-nav">  
                    <ul class="subnav-1 region">
                        <li>
                           <a href="/camberwell/" title="Visit Camberwell">Camberwell College of Art</a>
                        </li>
                        <li>
                          <a href="/csm/" title="Visit Central Saint Martins">Central Saint Martins (CSM)</a>
                        </li>
                        <li>
                       <a href="/chelsea/" title="Visit Chelsea">Chelsea College of Art</a>
                        </li>
                        <li>
                      <a href="/lcc/" title="Visit London College of Communication">London College of Communication (LCC)</a>
                        </li>
                        <li>
                       <a href="/fashion/" title="Visit London College of Fashion">London College of Fashion (LCF)</a>
                        </li>
                        <li>
                       <a href="/wimbledon/" title="Visit Wimbledon">Wimbledon College of Art</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div><!-- End Item Container --> 
      </li>
      <!-- End Colleges -->

      <!-- Study at UAL --> 
      <!-- menu button -->
      <li>
      <!--   <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick" title="">Study at UAL</a>
        <!-- dropdown -->
            <div class="dropdown_fullwidth"> 
                <div class="dd-menu-dropdown-wrapper study-nav">
                    <ul class="subnav-1 no-pad-top region">
                        <li class="no-border-top"><a href="/study-at-ual/" title="Study at UAL">Study at UAL</a></li>
                        <li><a href="/study-at-ual/courses/">Courses</a></li><li><a href="/study-at-ual/international/">International</a></li><li><a href="/study-at-ual/open-days/">Open Days</a></li><li><a href="/study-at-ual/apply/">Apply</a></li><li><a href="/study-at-ual/enrol/">Enrol</a></li><li><a href="/study-at-ual/tuitions-fees/">Tuition Fees</a></li><li><a href="/study-at-ual/scholarships-bursaries-and-loans/">Scholarships, Bursaries &amp; Loans</a></li><li><a href="/study-at-ual/financial-advice/">Financial Advice</a></li><li><a href="/study-at-ual/student-support/">Student Support</a></li><li><a href="/study-at-ual/library-services/">Library Services</a></li><li><a href="/study-at-ual/learning-and-teaching/">Learning &amp; Teaching</a></li><li><a href="/study-at-ual/term-dates/">Term Dates</a></li><li><a href="/study-at-ual/academic-regulations/">Academic Regulations</a></li><li><a href="/study-at-ual/accomodation/">Accommodation</a></li><li><a href="/study-at-ual/students-union/">Students' Union</a></li><li><a href="/study-at-ual/facilities/">Facilities</a></li><li><a href="/study-at-ual/widening-participation/">Widening Participation</a></li>
                    </ul>
                </div>
            </div><!-- End dropdown --> 
      </li>
      <!-- End Study at UAL -->


      <!-- Research --> 
      <!-- menu button -->
      <li>
        <!-- <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick" title="">Research</a>
        <!-- dropdown -->
            <div class="dropdown_fullwidth"> 
                <div class="dd-menu-dropdown-wrapper">
                    <div class="row region">
                        <div class="sub-inner-menu research-nav">
                            <ul class="subnav-1 no-pad-top region" >
                                <li class="no-border-top"><a href="/research/" title="Research">Research</a></li>
                                <li><a href="/research/research-environment/">Research Environment</a></li><li><a href="/research/research-degrees/">Research Degrees</a></li><li><a href="/research/research-staff/">Research Staff</a></li><li><a href="/research/research-projects/">Research Projects</a></li><li><a href="/research/ual-research-centres/">UAL Research Centres</a></li>
                            </ul>
                        </div>
            <!-- <div class="feature-image m-hide t-hide" >
              <a href="#" title="Link title">
                <figure>
                  <img src="http://placehold.it/300x200&text=4+cols" alt="Image Alt">
                </figure>
              </a>
            </div> -->
                    </div>
                </div>
            </div><!-- End dropdown --> 
      </li>
      <!-- End Research -->


      <!-- Student Jobs & Careers --> 
      <!-- menu button -->
      <li>
        <!-- <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick" title="">Student Jobs &amp; Careers </a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth">  
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
              <div class="sub-inner-menu student-nav">
                <ul class="subnav-1  no-pad-top region" >
                    <li class="no-border-top"><a href="/student-jobs-and-careers/" title="Student jobs &amp; Careers" >Student Jobs &amp; Careers</a></li>
                    <li><a href="/student-jobs-and-careers/opportunities/">Opportunities</a></li><li><a href="/student-jobs-and-careers/event/">Events</a></li><li><a href="/student-jobs-and-careers/finding-work/">Finding Work</a></li><li><a href="/student-jobs-and-careers/resources/">Resources</a></li><li><a href="/student-jobs-and-careers/about-see/">About SEE</a></li>
                </ul>
              </div>
              <div class="feature-image m-hide t-hide" >
                <a href="#" title="Link title">
                  <figure>
                    <img src="http://placehold.it/300x200&text=4+cols" alt="Image Alt">
                  </figure>
                </a>
              </div>
          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End Student Jobs & Careers -->


      <!-- Alumni & Friends --> 
      <!-- menu button -->
      <li>
       <!--  <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick" title="">Alumni &amp; Friends</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"> 
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
            <div class="sub-inner-menu alumni-nav">
              <ul class="subnav-1 region  no-pad-top region">
                <li class="no-border-top"><a href="/alumni-and-friends/" title="Alumni &amp; Friends">Alumni &amp; Friends</a></li>
                <li><a href="/alumni-and-friends/get-involved/">Get Involved</a></li><li><a href="/alumni-and-friends/inspiring-alumni/">Inspiring Alumni</a></li><li><a href="/alumni-and-friends/support-and-donate/">Support &amp; Donate</a></li><li><a href="/alumni-and-friends/benefits/">Benefits</a></li><li><a href="/alumni-and-friends/events-gallery/">Events Gallery</a></li>
              </ul>
            </div>
            <div class="feature-image m-hide t-hide" >
              <a href="#" title="Link title">
                <figure>
                  <img src="http://placehold.it/300x200&text=4+cols" alt="Image Alt">
                </figure>
              </a>
            </div>
          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End Alumni & Friends -->


      <!-- Business & Innovation --> 
<!-- menu button -->
<li>
 <!--  <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
  <a href="#" class="megamenu_drop needsclick" title="">Industry Links</a>
  <!-- dropdown -->
  <div class="dropdown_fullwidth"> 
    <div class="dd-menu-dropdown-wrapper">
      <div class="row region">
        <div class="sub-inner-menu industry-nav">
          <ul class="subnav-1 region" >
            <li>
              <a href='#' title=''>Camberwell Business &amp; Innovation</a>
            </li>
            <li>
              <a href='#' title=''>CSM Business &amp; Innovation</a>
            </li>
            <li>
              <a href='#' title=''>Chelsea Business &amp; Innovation</a>
            </li>
            <li>
              <a href='#' title=''>Event Partners</a>
            </li>
          </ul>
          <ul class="subnav-2 region" >
            <li>
              <a href='#' title=''>LCC Business &amp; Innovation</a>
            </li>
            <li>
              <a href='#' title=''>LCF Business &amp; Innovation</a>
            </li>
            <li>
              <a href='#' title=''>Wimbledon Business &amp; Innovation</a>
            </li>
            <li>
              <a href='#' title=''>Information for Employers</a>
            </li>
          </ul>
        </div>
        <div class="feature m-hide t-hide" >
          <p>
Have you got a business problem? Do you need fresh ideas and talent? Businesses worldwide work with our students and staff to develop new products, reach new markets & find new staff.
          </p>
        </div> 
      </div>
    </div>
  </div><!-- End dropdown --> 
</li>
<!-- End Business & Innovation -->
        
      <!-- About UAL --> 
      <!-- menu button -->
      <li>
        <!-- <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick" title="">About UAL</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"> 
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
           
            <div class="sub-inner-menu about-nav">
              <ul class="subnav-1 no-pad-top region" >
                    <li class="no-border-top"><a href="/about-ual/" title="About UAL">About UAL</a></li>
                    <li><a href="/about-ual/news/">News</a></li><li><a href="/about-ual/events-and-calendar/">Events &amp; Calendar</a></li><li><a href="/about-ual/collections-and-galleries/">Collections &amp; Galleries</a></li><li><a href="/about-ual/ual-showroom/">UAL Showroom</a></li><li><a href="/about-ual/work-at-ual/">Work At UAL</a></li><li><a href="/about-ual/support-our-creative-future/">Support Our Creative Future</a></li><li><a href="/about-ual/strategy-governance/">Strategy and Governance</a></li><li><a href="/about-ual/awarding-body/">Awarding Body</a></li><li><a href="/about-ual/diversity/">Diversity</a></li><li><a href="/about-ual/departmental-pages/">Departmental Pages</a></li><li><a href="/about-ual/contact-ual/">Contact UAL</a></li><li><a href="/about-ual/give-to-ual/">Give to UAL</a></li>
              </ul>
            </div>
            <!-- <div class="feature-image m-hide t-hide" >
              <a href="#" title="Link title">
                <figure>
                  <img src="http://placehold.it/300x200&text=4+cols" alt="Image Alt">
                </figure>
              </a>
            </div> -->
          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End About UAL -->
      <!-- Site Search -->          
      <!-- menu button -->
      <li>
       <!--  <div class="d-hide js-mob-exp-icon menu-plus">&#59232;</div> -->
        <a href="#" class="megamenu_drop needsclick search-icon">&#128269;</a>
        <!-- Begin Item -->
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
          <div class="dd-menu-dropdown-wrapper">
          <div class="d-course-finder-menu-panel row">
            <div class="row relative">
              <form class="d-search-input-form">
              <input class="course-finder-txt-input" type="text" placeholder="Enter your search here">
              <div class="go-search-button"><a>Search</a></div>
              </form>
            </div>
          </div> 
          </div>    
        </div><!-- End Item Container --> 
      </li><!-- End Item -->
      <!-- End Site Search -->
      
      </ul>
      <!-- End expandable search button -->  
  </div>
  
</nav>
</div>
</div>
</div>
 
<div class="header-panel bg-gray-bg">
    <div class="header-wrapper">
  <div class="row">
          <!-- navigation object : Breadcrumbs --><div class="breadcrumbs"><a href="/">Beta Home</a><a href="/fashion/">London College of Fashion</a><a href="/fashion/courses/">Courses</a><a href="/fashion/courses/undergraduate/">Undergraduate</a><a href="/fashion/courses/undergraduate/fdsc-beauty-and-spa-management/"><?php echo $title; ?></a></div>
    <div class="page-title">
      <h1><!-- navigation object : Section name -->
<?php $title; ?>
      </h1>
    </div>
  </div>  
    </div>
</div>

 <!-- section name -->
<!--<div class="content-wrapper">
  <div class="row">
    <div class="d5-d16">
      <h1>Foundation Degree Beauty and Spa Management</h1>
    </div>
  </div>
  </div>-->
<!-- Add banner here -->
<div class="content-wrapper">

  <!-- Home page slider include -->
  
  
    
    <div class="row">
      
      <nav role="navigation" class="sidebar">


                    <!-- navigation object : Left navigation -->
      <!-- navigation object : Include Course Dropdown -->
      
<div class="dd-menu siblings">
  <div class="js-dd-menu dd-menu-heading">
    <h3 class="dd-menu-title">In this section</h3>
    <div class="dd-menu-arrow"><span class="js-dd-menu-icon icon">&#59236;</span></div>
  </div>
  <ul class="js-dd-menu-list"><li><a href="/fashion/courses/undergraduate/international-preparation-for-fashion-cert-he/">International Preparation for Fashion (Certificate in Higher Education)</a></li><li><a href="/fashion/courses/undergraduate/fdsc-beauty-and-spa-management/">Foundation Degree Beauty and Spa Management</a></li><li><a href="/fashion/courses/undergraduate/ba-3d-effects-for-performance-and-fashion/">BA (Hons) 3D Effects for Performance and Fashion</a></li><li><a href="/fashion/courses/undergraduate/ba-bespoke-tailoring/">BA (Hons) Bespoke Tailoring</a></li><li><a href="/fashion/courses/undergraduate/ba-cordwainers-fashion-bags-and-accessories/">BA (Hons) Cordwainers Fashion Bags and Accessories: Product Design and Innovation</a></li><li><a href="/fashion/courses/undergraduate/ba-cordwainers-footwear/">BA (Hons) Cordwainers Footwear: Product Design and Innovation </a></li><li><a href="/fashion/courses/undergraduate/ba-costume-for-performance/">BA (Hons) Costume For Performance</a></li><li><a href="/fashion/courses/undergraduate/ba-creative-direction-for-fashion/">BA (Hons) Creative Direction For Fashion</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-business-part-time/">BA (Hons) Fashion Business (Part time)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-buying-and-merchandising/">BA (Hons) Fashion Buying and Merchandising</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-contour/">BA (Hons) Fashion Contour</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-design-part-time/">BA (Hons) Fashion Design (Part time)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-design-and-development/">BA (Hons) Fashion Design and Development</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-design-technology-menswear/">BA (Hons) Fashion Design Technology: Menswear</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-design-technology-womenswear/">BA (Hons) Fashion Design Technology: Womenswear</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-illustration/">BA (Hons) Fashion Illustration</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-jewellery/">BA (Hons) Fashion Jewellery</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-journalism/">BA (Hons) Fashion Journalism</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-management/">BA (Hons) Fashion Management</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-marketing/">BA (Hons) Fashion Marketing</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-media-part-time/">BA (Hons) Fashion Media (Part time)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-pattern-cutting/">BA (Hons) Fashion Pattern Cutting</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-photography/">BA (Hons) Fashion Photography</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-sportswear/">BA (Hons) Fashion Sportswear</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-styling-and-production/">BA (Hons) Fashion Styling and Production</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-textiles-embroidery/">BA (Hons) Fashion Textiles: Embroidery</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-textiles-knit/">BA (Hons) Fashion Textiles: Knit</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-textiles-print/">BA (Hons) Fashion Textiles: Print</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-visual-merchandising-and-branding/">BA (Hons) Fashion Visual Merchandising and Branding</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-visual-merchandising-and-branding-pt/">BA (Hons) Fashion Visual Merchandising and Branding (Part time)</a></li><li><a href="/fashion/courses/undergraduate/ba-hair-and-make-up-for-fashion/">BA (Hons) Hair and Make-up for Fashion</a></li><li><a href="/fashion/courses/undergraduate/ba-hair-make-up-and-prosthetics-for-performance/">BA (Hons) Hair, Make Up and Prosthetics for Performance</a></li><li><a href="/fashion/courses/undergraduate/ba-strategic-communication-for-fashion/">BA (Hons) Strategic Communication for Fashion</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-buying-and-merchandising-top-up/">BA (Hons) Fashion: Buying and Merchandising (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-design-and-marketing-top-up/">BA (Hons) Fashion: Design and Marketing (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-design-and-technology-top-up/">BA (Hons) Fashion: Design and Technology (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-hair-and-make-up-for-fashion-top-up/">BA (Hons) Fashion: Hair and Make-up for Fashion (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-marketing-and-promotion-top-up/">BA (Hons) Fashion: Marketing and Promotion (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-retail-branding-visual-merchandising/">BA (Hons) Fashion: Retail Branding and Visual Merchandising (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-retail-branding-visual-merchandising-pt/">BA (Hons) Fashion: Retail Branding and Visual Merchandising (Part time) (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-retail-management-top-up/">BA (Hons) Fashion: Retail Management (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-fashion-styling-and-photography-top-up/">BA (Hons) Fashion: Styling and Photography (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-hair-and-make-up-for-film-and-tv-top-up/">BA (Hons) Hair and Make-up for Film and TV (Top Up)</a></li><li><a href="/fashion/courses/undergraduate/ba-beauty-and-spa-management-top-up/">BSc (Hons) Beauty and Spa Management (Top Up)</a></li></ul>
</div>
                
      </nav>
      <div role="main" class="content">
    <div class="row">
  <div class="l-content block __text __with-aside">
      <p class="leader"><?php echo $description; ?></p>
   <p class="tutor">
  <strong>Taught by: </strong>
  <?php echo $tutors ; ?>
 </p>
  </div>
  <aside>
              <h4>My Account</h4>
                <iframe id="basket" name="basket" frameborder="0" src="http://arts.accessplanit.com/accessplan/pid-csm/config/arts/pages/integrationmenu.aspx">
                    <p>Your browser does not support iframes.</p>
                </iframe>
  </aside>    
</div>


        <div class="row slider-container ">
          <!--  optional slider heading -->
            
                    <div class="royalSlider rsDefault block" data-slider-auto-play="" data-slider-item-width='948' data-slider-item-height='474'> 
              

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_2.jpg" alt="Guinot Hydradermie treatment, cleansing technique" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p><span>Guinot Hydradermie treatment, cleansing technique</span></p></span></figcaption>
  
</figure>

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_1.jpg" alt="Guinot Hydradermie treatment, roller technique" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p><span>Guinot Hydradermie treatment, roller technique</span></p></span></figcaption>
  
</figure>

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_3.jpg" alt="Guinot Hydradermie treatment" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p><span>Guinot Hydradermie treatment</span></p></span></figcaption>
  
</figure>

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_4.jpg" alt="Guinot Hydradermie treatment" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p><span>Guinot Hydradermie treatment</span></p></span></figcaption>
  
</figure>

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_5.jpg" alt="Guinot Hydradermie treatment, roller technique" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p>Guinot Hydradermie treatment, roller technique</p></span></figcaption>
  
</figure>

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_6.jpg" alt="Jessica beauty products" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p><span>Jessica beauty products</span></p></span></figcaption>
  
</figure>

<figure>

      
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk/media/beta/beta-colleges/beta-lcf/courses/undergraduate/beauty-spa-1860-930_7.jpg" alt="SkinCeuticals Hydrating B5" class="rsImg resrc" />

  
  
  
  <figcaption class="rsCaption"><span><p><span>SkinCeuticals Hydrating B5</span></p></span></figcaption>
  
</figure>
        
          
          </div> 
                  </div><!-- end row div -->

<div class="row">
  <div class="accordion">

    
      
      <div id="st-accordion" class="st-accordion">
        <ul class="accordion-list">

        <!-- navigation object : Accordion item -->
        <li class="accordion-list-item">
          <a class="accordion-list-anchor" href="#"><h3 class="size-h4">Description</h3><div class="st-arrow icon circled-plus">⊕</div></a>
            <div class="st-content">
              <?php echo $desc_accordion ; ?>
          </div>  
        </li>

<?php if ($tutor_description != FALSE) : ?>

          <li class="accordion-list-item">
          <a class="accordion-list-anchor" href="#"><h3 class="size-h4">Tutors</h3><div class="st-arrow icon circled-plus">⊕</div></a>
            <div class="st-content">
              <?php echo $tutor_description ; ?>
          </div>  
        </li>
<?php endif ?>

        <li class="accordion-list-item">
          <a class="accordion-list-anchor" href=""><h3 class="size-h4">Materials</h3><div class="st-arrow icon circled-plus">⊕</div></a>
            <div class="st-content">
              <?php echo $materials_accordion ; ?>
                            
            </div>
        </li>

        </ul>
      </div>
  </div>
</div>  

    </div>
    </div>
    </div>

<div class="content-wrapper">
  <div class="row"><div role="main" class="content">

      <div class="row">
        <div class="l-content-full-width block table-responsive">
      <h2>Details for booking</h2>
      <?php //var_dump($t); ?>
      <?php if (!empty($t)) { ?>
  <table class="table" >
  <tr>
    <th>Date</th>
    <th>Day of Week</th>
    <th>Time</th>
    <th>Duration</th>

    <th>Cost</th>
    <th>Status</th>
    <th>Location</th>
    <th>Action</th>
  </tr>
<?php 
if (!empty ($t)) {
foreach($c as $date) {

if(strtolower($date["status"]) != "cancelled") {

  $date["value"]; ?>
  
    <tr>
<td ><?php echo $date["startdate"];?> - <?php echo $date["enddate"];?></td>
    <td ><?php echo $date["dayofweek"];?></td>
    <td ><?php echo $date["starttime"];?> - <?php echo $date["endtime"];?></td>
    <td ><?php echo $date["duration"];?></td>
    <td >&#163;<?php echo round($date["cost"],0);?></td>
    <td ><?php echo $date["status"];?></td>
    <td >


<?php 
    $venuelat = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
      echo "<!--";
    }
    ?>

<a href="http://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=<?php 
    $venuelat = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    echo $venuelat[0]['lat'];
    ?>,<?php 
    $venuelong = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    echo $venuelong[0]['long'];
    ?>&sll=53.86482,-2.71345&sspn=0.625989,1.207123&ie=UTF8&t=h&z=16">


<?php 
    $venuelat = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
    echo "-->";
    }
    ?>

<?php        
    $venuename = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    echo $venuename[0]['name'];
    
    ?>

<?php 
    $venuelat = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
      echo "<!--";
    }
    ?>
    
</a>

<?php 
    $venuelat = $r->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
    echo "-->";
    }
    ?>

</td>

  <?php 
    if ( $date["bookable"] == 'false' ) {
      echo "<!--";
    }
    ?>

                                                    
    <td ><a onclick="addToBasket(<?php  echo $t['date']['coursedateid'];?>, '<?php  echo addslashes($r["course"]["label"]);?>', '<?php  echo $t['date']['startdate'];?> - <?php echo $t['date']['enddate'];?>', '<?php  echo $t['date']['starttime'];?> - <?php  echo $t['date']['endtime'];?>', '<?php  echo round($t['date']['cost'],0);?>', '<?php  echo addslashes($venuename[0]['name']);?>');return false;" href="#">Add to Basket</a></td>

<?php 
    if ( $date["bookable"] == 'false' ) {
      echo "-->";
    }
    ?>

</tr>

  <?php
  }
} 


?>
</table>

<?php } ?>

<?php if ($test->companyId == "CSM") : ?>
  <p>Alternative Dates and Times<br />
Many of our courses are repeated throughout the year. If the above dates is not suitable for you, 
or there are no dates showing for this session, then please <a href="http://www.csm.arts.ac.uk/shortcourses/by-session.htm">choose an alternative session</a>.</p>

<?php endif ?>

            <?php 

    } // End of CSM dates box
    ?>

      </div>
            </div>
              </div>
                </div>
                  </div>


  <div class="content-wrapper">
    <div class="row">
      <div class="content">

    
</div>  
</div>
</div>  
</div>  
<div class="panel">
    <div class="content-wrapper">
      <div class="row">
          <div class="content">
            <div class="row">
          <div class="l-content  block  __text  __with-aside">
                  <h2>Downloads</h2>
                  <ul>
<li><a href="/media/beta/beta-colleges/beta-lcf/courses/programme-specs/2013-14_FdSc-Beauty-and-Spa-Management-Prog-Specs.pdf">FdSc Beauty and Spa Management Programme Specification [PDF - 49KB]</a></li>
</ul>
                </div>
                <aside>
                                    <!-- KIS Widget -->
                  <div class="kis-widget"
data-institution="10007162"
data-course="20171"
data-orientation="vertical"
data-size= "small" style="min-height: 430px"></div>
                </aside>
              </div>
          </div>
      </div>
    </div><!-- .content-wrapper -->
</div><!-- .panel -->
<div class="content-wrapper">
  <div class="row">
      <div class="content">
            </div>
  </div>
</div>



<!-- navigation object : College Footer Include -->
<footer class="college-footer row ">
  <div class="footer-wrapper">
    <div class="footer-block left">
                  
      <h3 class='size-h2'>Get In Touch</h3>
      <!-- see http://html5doctor.com/microformats/ -->
      <ul class="vcard">
        <li class="no-bullet">
          <a class="fn org url" href="/fashion/" title="Contact information for London College of Fashion"><span class="organization-name">London College of Fashion</span></a>
        </li>
        <li>
        <span class="adr">
          <span class="street-address">20 John Prince's Street</span>, 
          <span class="region">London</span> <span class="postal-code">W1G 0BJ</span> 
          <br>
        </span>
        </li>
        <li><span class="tel">Telephone: <span class="value">+44 (0)2075147400</span></span></li>
        <li><a href="info@fashion.arts.ac.uk">info@fashion.arts.ac.uk</a></li>
      </ul>
    </div>
    <div class="footer-block middle">
      <h3 class='size-h2'>Pigeons & Peacocks</h3>
      <p>A fashion and lifestyle magazine like no other.</p>
<p><a href="http://www.pigeonsandpeacocks.com">Visit the website</a></p>
    </div>
    <div class="footer-block right">
      <h3 class='size-h2'>We're Social</h3>
        <ul class="icons no-bullet">
                      <li>
              <a href="http://twitter.com/LCFLondon" class=""><span class="icon-fit-text"></span></a>
            </li>
                      <li>
              <a href="http://www.facebook.com/LCFOfficial" class=""><span class="icon-fit-text"></span></a>
            </li>
           
        </ul>
    </div>
  </div>
</footer>

<!-- navigation object : Main Footer Include --><!-- start footer -->
<footer class='global-footer row'>
  <div class="footer-wrapper">
    <div class="row">
      <div class='footer-links'>
        <ul class='footer-col-1'>
          <li>
            <a href=''>Accessibility</a>
          </li>
          <li>
            <a href='/about-ual/strategy-governance/public-information/freedom-of-information/'>FOI</a>
          </li>
          <li>
            <a href='/privacy-and-cookies/'>Privacy &amp; Cookies</a>
          </li>
          <li>
            <a href='/disclaimer/'>Disclaimer</a>
          </li>
        </ul>

        <ul class='footer-col-2'>
          <li>
            <a href=''>Sitemap</a>
          </li>

          <li>
            <a href='/about-ual/strategy-governance/public-information/charitable-status/'>Charitable Status</a>
          </li>
          <li>
            <a href='/about-ual/give-to-ual/'>Give to UAL</a>
          </li>
          <li>
            <a href='/about-ual/work-at-ual/'>Work at UAL</a>
          </li>
        </ul>

        <ul class='footer-col-3'>
          <li>
            <a href='http://ualshowtimelink'>Showtime</a>
          </li>
          <li>
            <a href='http://myartslink'>Log in to My.Arts</a>
          </li>
          <li>
            <a href='http://ualeditlink'>UAL Edit</a>
          </li>
        </ul>

        <ul class="social-links">
          <h3>Connect with UAL:</h3>
          <li><a href="https://twitter.com/UniArtsLondon" title="UAL on Twitter"><span class="footer-ico twitter">&#62217;</span></a></li> 
          <li><a href="https://www.facebook.com/UniversityoftheArtsLondon" title="UAL on Facbook"><span class="footer-ico facebook">&#62220;</span></a></li>
          <li><a href="http://www.youtube.com/user/universityartslondon" title="UAL on YouTube"><span class="youtube">&#9654;</span></a></li>
          <li><a href="#" title="UAL on Flickr"><span class="footer-ico flickr">&#62211;</span></a></li>
        </ul>
      </div>


      
      <div class="row">
        <div class='copyright'>
          <p>&copy; 2013 University of the Arts London All Rights Reserved</p>
        </div>
      </div>
    </div>
  </div>

  <a href="#" class="back-to-top"><span>&uarr;</span> back to top</a>
</footer>
<div id="basketmessage" class="PopupDiv" ><div id="close" style="text-align:right;"><a onclick="hideBasketMessage();return false;" href="#">x</a></div><br><h2>1 Course was added to your basket </h2><p><br>Architectural Portfolio - (Christmas)<br>09/12/2013 - 13/12/2013, 10:00 - 16:00<br>Venue to be confirmed, £410</p><p>Your place is not confirmed until you’ve completed your booking</p><br>
<a onclick="hideBasketMessage();return false;" href="#">Add another course</a><div style="display: inline; margin-left: 30px; margin-right: 30px;">&nbsp;</div><a onclick="openBasket();return false;" href="#">Book now</a></div>
<footer class="row white-bg hide">
    <div class="footer-wrapper">
        <a href="#" class="open-close debug-toggle"><span>↓</span> Open Debug panel</a>
        <!-- debug -->
        <ul id="debug">
          <li>Channel base uri: /</li>
          <li>Channel base description: This channel is used to publish the BETA UAL Website.</li>
          <li>Channel base id: 18</li>
          <li>Channel base name: Beta UAL Website</li>
          <li>Page created : Wed 22 Aug 2012 05:28:13</li>
          <li>Page modified : Wed 4 Sep 2013 03:27:37</li>
                    <li>Section id : 39705</li>
      </ul>
        <!-- end debug -->
    </div>

</footer>
<div class="credits-btn"><a href="#" class="show-credits">Show Credits</a></div>
<!-- Include js scripts -->
 <script>
    Modernizr.Detectizr.detect({detectScreen:false});
  </script>
 <script src="//use.resrc.it"></script>
  <script>
    if (typeof jQuery == 'undefined') {
        document.write(unescape("%3Cscript src='http://artslondon.github.io/beta/assets/js/libs/jquery-1.8.2.min.js' type='text/javascript'%3E%3C/script%3E"));
    }
  </script>

<!-- Fastclick js -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/libs/fastclick.js"></script>

<!--[if (lt IE 9) & (!IEMobile)]>
  <script type="text/javascript" src="/media/beta/beta-assets/respond.js"></script>
<![endif]-->



  <script src='http://artslondon.github.io/beta/assets/js/style-guide/jquery.fitvids.js' type='text/javascript'></script>
 
<!-- reView script - used for LazyLoading with ReSRC.it -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/libs/jquery.review-1.0.0.min.js"></script>


<!-- navigation object : Javascript include -->
<script>
  (function (d) {
  "use strict";
  var widgetScript = d.createElement('script'); 
  widgetScript.id = 'unistats-widget-script';
      widgetScript.src = '//widget.unistats.ac.uk/js/unistats.widget.js';
  var scriptTags = d.getElementsByTagName('script')[0];
  if (d.getElementById('unistats-widget-script')) {  return; } 
  scriptTags.parentNode.insertBefore(widgetScript, scriptTags);
  } (document));
</script>
  


<!-- Mega Menu Plugins -->
<script type="text/javascript" src="http://artslondon.github.io/beta/assets/js/libs/megamenu_plugins.js"></script>
<!-- Mega Menu Script -->
<script type="text/javascript" src="http://artslondon.github.io/beta/assets/js/libs/megamenu.js"></script>


<!-- Scripts -->
<!-- <script type="text/javascript" src="/media/beta/beta-assets/script.js"></script> -->

<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/script-1.js"></script>
<script type="text/javascript" src="http://arts.accessplanit.com/accessplan/config/arts/scripts/website.js">  </script>
  <script>
  $(document).ready(function($){
      $('.megamenu').megaMenuCompleteSet({
          menu_effect : 'open_close_slide', // Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
          menu_click_outside : 1, // Clicks outside the drop down close it (1 = true, 0 = false)
          menu_show_onload : 0, // Drop down to show on page load (type the number of the drop down, 0 for none)
          menu_responsive:1 // 1 = Responsive, 0 = Not responsive
      });
  
});
</script>  
</body>
</html>

<?php } else { ?>


  <style>
  iframe#basket {
width: 170px;
}
</style>
<!-- Updated: Nov 1st -->
<script type="text/javascript" src="https://arts.accessplanit.com/accessplan/config/arts/scripts/website.js"></script>
<div id="basketmessage"><div id="close" style="text-align:right;"><a onclick="hideBasketMessage();return false;" href="#">x</a></div><br /><h2>1 Course was added to your basket </h2><p><br />[Course Name]<br />[Course Date], [Course Time]<br />[Course Venue], £[Course Cost]</p><p>Your place is not confirmed until you’ve completed your booking</p><br />
<a onclick="hideBasketMessage();return false;" href="#">Add another course</a><div style="display: inline; margin-left: 30px; margin-right: 30px;">&nbsp;</div><a onclick="openBasket();return false;" href="#">Book now</a></div>
<br class="clear" />
<?php

if(isset($_GET['errors'])){
  ini_set('display_errors',1); 
  ini_set('error_reporting', E_ALL); 
  error_reporting(E_ALL);
}

function courseDatesCache($courseids="", $companyid=""){

    $cache_file = "t4shortcoursecache/ci-".$courseids."-".$companyid.".txt";
    $cache_outofdate = "-1 day"; // Minimum interval to update the cache file    
    
    // TRY AND GET THE LIVE DATA
    // --------------------------------------
    $ch = curl_init("http://arts.accessplanit.com/accessplan/config/arts/handlers/coursedates.ashx?courseids=".$courseids."&companyid=".$companyid);
    curl_setopt($ch, CURLOPT_PROXY, 'wwwcache.arts.ac.uk:3128');  curl_setopt($ch, CURLOPT_FAILONERROR,1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1); curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $retValue = curl_exec($ch); curl_close($ch);
    
    if (!empty($retValue)) {
        // IF the LIVE data was returned. 
        if ((!file_exists($cache_file)) OR (!empty($_GET['cacheupdate'])) OR (@filesize($cache_file) <= 10) OR ((filemtime($cache_file) < (strtotime($cache_outofdate))))) {
            // IF no cache exists OR forced update OR cache file is emmpty OR cachefile is out of date (as defiend by $cache_outofdate), UPDATE IT.
            $writeDat = @file_put_contents($cache_file, $retValue);
            echo '<!-- DEBUG: Cache file was successfully updated -->'; // echo '<!-- DEBUG: Cache file was successfully updated (' . $cache_file . ') -->';
        }
        
        // Return LIVE data
        return $retValue;
        
    } else {
        // ELSE no live data was returned. Try read it from the cache
        if ((@file_exists($cache_file)) AND (filesize($cache_file) > 10)) {
            // As long as the cache file is populated, return that.
            echo '<!-- DEBUG: cache update failed, read old information from cache (' . $cache_file . ') -->';
            $retValue = @file_get_contents($cache_file);
            
            // As long as it is not empty, return cache data
            if (!empty($retValue)) {
                return $retValue;
            }
        }
        
        // Return Error message (No LIVE data or populated CACHE data)
        echo '<!-- DEBUG: Unable to update file and no cache available -->';
        return '<courses><course courseid="ERR0R" label="Error loading information"><materials>&lt;P&gt;There was an error loading course information&lt;/P&gt;</materials><description>&lt;P&gt;There was an error loading course information.&lt;/P&gt;</description><dates></dates></course><tutors></tutors><venues></venues></courses>';
    }
}

$xml = @simplexml_load_string(courseDatesCache('INTRODhlja', 'LCF'));

?>
  <ul id="tab-buttons" class="mootabs_title">
    <li title="glance"><a href="#glance">At a Glance</a></li>
    <li title="materials"><a href="#materials">Materials</a></li>
          
            <?php 
  $csm = ('csm');
    if ( $csm <> 'csm' ) {
      ?>
    <li title="course-booking"><a href="#course-booking">Dates &amp; Prices</a></li>
            <?php   
      }  // End of Dates and Prices tab
      ?>
</ul>

<div id="glance" class="course-tab mootabs_panel section-<t4 type="navigation" id="143"/>">

<div id="course-info-wide">
    <h3><?php echo $xml->course["label"];?></h3>

            <?php 
  $csm = ('csm');
    if ( $csm == 'csm' ) {
if (!empty ($xml->tutors)) {
  echo "<p class=\"bio\"><strong>";
  $a = 1;
  foreach($xml->tutors->children() as $tutor) {
    $tutor["value"];
    if ( $a <> 1 ) {echo ", ";} 
    $a = $a+1;
    echo $tutor["name"]; 
  } // End of For each tutor
    echo "</strong></p>";
} //End of if not empty
} //End of Tutors for CSM
?>

            <?php 
  $csm = ('csm');
    if ( $csm <> 'csm' ) {
?>

  <div class="course-image section-solid-<t4 type="navigation" id="143"/>">
        <t4 type="content" name="Image" output="image" modifiers=""  />
    </div>    
            <?php   
} //End of Image
?>

    <div id="glancecontent" class="course-tab-content">
<?php echo $xml->course->description;?>

<t4 type="content" name="Additional Description" output="normal" modifiers="medialibrary, nav_sections"  />

            <?php 
  $csm = ('csm');
    if ( $csm == 'csm' ) {
if (!empty ($xml->tutors)) {


foreach($xml->tutors->children() as $tutor) {
  $tutor["value"]; 
  
  if (strncasecmp($tutor->description,"<p>",3)<>0) {
    echo "<p class=\"bio\">";
  } // End If
  ?>

<strong><?php echo $tutor->description;?></strong>

  <?php
  if (strncasecmp($tutor->description,"<p>",3)<>0) {
    echo "</p>";
  } // End If

} // End of For each tutor
} //End of if not empty
} //End of Tutors for CSM
?>

     <?php 
  $csm = ('csm');
    if ( $csm == 'csm' ) {
      // Dates box generated on At a Glance tab for CSM
      ?>
    
  <table id="ualQuickDatesTable" class="detailGrid" cellpadding="2" border="0">
  <tr>
    <th style="text-align: left;">Date</th>
    <th style="text-align: left;">Day of Week</th>
    <th style="text-align: left;">Time</th>
    <th>Duration</th>

    <th>Cost</th>
    <th>Status</th>
    <th style="text-align: left;">Location</th>
    <th>Action</th>
  </tr>
<?php 
if (!empty ($xml->course->dates)) {
foreach($xml->course->dates->children() as $date) {

if(strtolower($date["status"]) != "cancelled") {

  $date["value"]; ?>
  
    <tr>
<td style="text-align:left;vertical-align:top;"><?php echo $date["startdate"];?> - <?php echo $date["enddate"];?></td>
    <td style="text-align:left;vertical-align:top;"><?php echo $date["dayofweek"];?></td>
    <td style="text-align:left;vertical-align:top;"><?php echo $date["starttime"];?> - <?php echo $date["endtime"];?></td>
    <td style="text-align:center;vertical-align:top;"><?php echo $date["duration"];?></td>
    <td style="text-align:center;vertical-align:top;">&#163;<?php echo round($date["cost"],0);?></td>
    <td style="text-align:center;vertical-align:top;"><?php echo $date["status"];?></td>
    <td style="text-align:left;vertical-align:top;"><ol style="list-style: none; margin: 0; padding: 0;"><li>


<?php 
    $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
      echo "<!--";
    }
    ?>

<a href="http://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=<?php 
    $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    echo $venuelat[0]['lat'];
    ?>,<?php 
    $venuelong = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    echo $venuelong[0]['long'];
    ?>&sll=53.86482,-2.71345&sspn=0.625989,1.207123&ie=UTF8&t=h&z=16">


<?php 
    $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
    echo "-->";
    }
    ?>

<?php        
    $venuename = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    echo $venuename[0]['name'];
    
    ?>

<?php 
    $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
      echo "<!--";
    }
    ?>
    
</a>

<?php 
    $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
    if ( $venuelat[0]['lat'] == '0' ) {
    echo "-->";
    }
    ?>

</li></ol></td>

  <?php 
    if ( $date["bookable"] == 'false' ) {
      echo "<!--";
    }
    ?>

                                                    
    <td style="text-align:center;vertical-align:top;"><a onclick="addToBasket(<?php echo $date["coursedateid"];?>, '<?php echo addslashes($xml->course["label"]);?>', '<?php echo $date["startdate"];?> - <?php echo $date["enddate"];?>', '<?php echo $date["starttime"];?> - <?php echo $date["endtime"];?>', '<?php echo round($date["cost"],0);?>', '<?php echo addslashes($venuename[0]['name']);?>');return false;" href="#">Add to Basket</a></td>

<?php 
    if ( $date["bookable"] == 'false' ) {
      echo "-->";
    }
    ?>

</tr>

  <?php
  }
} 
}

?>
</table>
<br />
<p>Alternative Dates and Times<br />
Many of our courses are repeated throughout the year. If the above dates is not suitable for you, 
or there are no dates showing for this session, then please <a href="http://www.csm.arts.ac.uk/shortcourses/by-session.htm">choose an alternative session</a>.</p>

            <?php 

    } // End of CSM dates box
    ?>


    </div>
</div><!-- course-info -->
</div><!-- glance -->
<div id="materials" class="course-tab mootabs_panel section-<t4 type="navigation" id="143"/>">
<div id="materialscontent" class="course-tab-wrapper">
<?php echo $xml->course->materials;?>
</div>
</div><!--materials -->

  <?php 
  $csm = ('csm');
    if ( $csm <> 'csm' ) {
      // Dates content generated for non-CSM courses
    ?>
    
      <div id="course-booking" class="course-tab mootabs_panel section-<t4 type="navigation" id="143"/>">
        <div id="booking" class="course-tab-wrapper">        
        
        
        <table id="ualQuickDatesTable" class="detailGrid" cellpadding="2" border="0">
        <tr>
          <th style="text-align: left;">Date</th>
          <th style="text-align: left;">Day of Week</th>
          <th style="text-align: left;">Time</th>
          <th>Duration</th>

          <th>Cost</th>
          <th>Status</th>
          <th style="text-align: left;">Location</th>
          <th>Action</th>
        </tr>
      <?php 
      if (!empty ($xml->course->dates)) {
      foreach($xml->course->dates->children() as $date) {

      if(strtolower($date["status"]) != "cancelled") {

        // $date["value"]; 
        ?>
        
          <tr>
      <td style="text-align:left;vertical-align:top;"><?php echo $date["startdate"];?> - <?php echo $date["enddate"];?></td>
          <td style="text-align:left;vertical-align:top;"><?php echo $date["dayofweek"];?></td>
          <td style="text-align:left;vertical-align:top;"><?php echo $date["starttime"];?> - <?php echo $date["endtime"];?></td>
          <td style="text-align:center;vertical-align:top;"><?php echo $date["duration"];?></td>
          <td style="text-align:center;vertical-align:top;">&#163;<?php echo round($date["cost"],0);?></td>
          <td style="text-align:center;vertical-align:top;"><?php echo $date["status"];?></td>
          <td style="text-align:left;vertical-align:top;"><ol style="list-style: none; margin: 0; padding: 0;"><li>

      <?php 
          $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          if ( $venuelat[0]['lat'] == '0' ) {
            echo "<!--";
          }
          ?>

      <a href="http://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=<?php 
          $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          echo $venuelat[0]['lat'];
          ?>,<?php 
          $venuelong = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          echo $venuelong[0]['long'];
          ?>&sll=53.86482,-2.71345&sspn=0.625989,1.207123&ie=UTF8&t=h&z=16">

      <?php 
          $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          if ( $venuelat[0]['lat'] == '0' ) {
          echo "-->";
          }
          ?>

      <?php        
          $venuename = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          echo $venuename[0]['name'];
          
          ?>

      <?php 
          $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          if ( $venuelat[0]['lat'] == '0' ) {
            echo "<!--";
          }
          ?>

      </a>

      <?php 
          $venuelat = $xml->xpath('//venue[@venueid="'.$date["venueid"].'"]');
          if ( $venuelat[0]['lat'] == '0' ) {
          echo "-->";
          }
          ?>

      </li></ol></td>

        <?php 
          if ( $date["bookable"] == 'false' ) {
            echo "<!--";
          }
          ?>

          <td style="text-align:center;vertical-align:top;"><a onclick="addToBasket(<?php echo $date["coursedateid"];?>, '<?php echo addslashes($xml->course["label"]);?>', '<?php echo $date["startdate"];?> - <?php echo $date["enddate"];?>', '<?php echo $date["starttime"];?> - <?php echo $date["endtime"];?>', '<?php echo round($date["cost"],0);?>', '<?php echo addslashes($venuename[0]['name']); ?>');return false;" href="#">Add to Basket</a></td>
        

      <?php 
          if ( $date["bookable"] == 'false' ) {
            echo "-->";
          }
          ?>
          

      </tr>

        <?php
        }
      }
      }

      ?>
      </table>

      </div>
      </div>

            <?php 

    } // End of non-CSM dates box
    ?>

<?php } ?>

