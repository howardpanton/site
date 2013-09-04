<?php

if(isset($_GET['errors'])){
	ini_set('display_errors',1); 
	ini_set('error_reporting', E_ALL); 
	error_reporting(E_ALL);
}

function courseDatesCache($courseids="", $companyid=""){

    $cache_file = "/t4shortcoursecache/ci-".$courseids."-".$companyid.".txt";
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

$xml = @simplexml_load_string(courseDatesCache('INTROD9Ww6', 'LCF'));
echo "<pre>";
var_dump($xml);
echo "</pre>";
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
    <title>Foundation Degree Beauty and Spa Management - University of Arts London</title>    <meta charset='utf-8'>
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
          <!-- navigation object : Breadcrumbs --><div class="breadcrumbs"><a href="/">Beta Home</a><a href="/fashion/">London College of Fashion</a><a href="/fashion/courses/">Courses</a><a href="/fashion/courses/undergraduate/">Undergraduate</a><a href="/fashion/courses/undergraduate/fdsc-beauty-and-spa-management/">Foundation Degree Beauty and Spa Management</a></div>
    <div class="page-title">
      <h1><!-- navigation object : Section name -->Foundation Degree Beauty and Spa Management</h1>
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
	<div class="l-content  block  __text  __with-aside">
        	<div class="text">
  			
			<p class="leader">Become a professional within the beauty and spa industry, through practical hands-on training supported by theoretical studies. Business management is embedded throughout the course, enabling you on completion to manage a full-service spa or salon.</p>
			
		</div>
   	</div>

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

        <!-- navigation object : Accordion item --><li class="accordion-list-item">
  <a class="accordion-list-anchor" href="#"><h3 class="size-h4">Facts</h3><div class="st-arrow icon circled-plus">⊕</div></a>
  <div class="st-content">
  <table class="course-data">
    <tbody>
      <tr><th>Course Leader</th><td><p>Yvonne Mills</p></td></tr>
	<tr><th>Course Location</th><td><p><span>John Prince's Street</span></p></td></tr> 	
     	<tr><th>Study Level</th><td>Foundation</td></tr>
      <tr><th>Study Mode</th><td>Full time</td></tr>
      <tr><th>Course Length</th><td>2 years</td></tr>
      <!-- IELTS requirement -->	            		
      <tr><th>Home/EU Fee</th><td><p><span>&pound;9,000 per year</span></p></td></tr>
      <tr><th>International Fee</th><td><p><span>&pound;13,800 per year</span></p></td></tr>
      
      <tr><th>Autumn Term Dates</th><td>23 Sept - 6 Dec 2013</td></tr>
      <tr><th>Spring Term Dates</th><td>6 Jan - 21 Mar 2014</td></tr> 
      <tr><th>Summer Term Dates</th><td>22 Apr - 20 Jun 2014</td></tr> 
        	
      <tr><th>Application Route</th><td><p><a href="http://www.ucas.com">UCAS</a></p></td></tr>
      
              
          
      <tr><th>UCAS Code</th><td>B900</td></tr>
      <tr><th>University Code</th><td>U65</td></tr>
    </tbody>
  </table>
  </div>  
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Content and Structure</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	
			<p class="Default">The FdSc Beauty and Spa Management course is one of a group of courses in the School of Management and Science that are designed to prepare students for a particular role in the fashion industry. This course provides you with an excellent grounding in the science, business and management subjects necessary to have a successful career as a practitioner in the beauty industry or in spa management, together with broader academic studies which allow you to see the context of your particular study in the wider perspectives of fashion, society and the environment. The beauty, medispa and spa industries are involved with the course on every level, from supplying brand products for students to use on clients, to visits to companies where new techniques are demonstrated to students, to setting projects and providing opportunities for work placements, and to providing employment to graduates from the course. High-achieving graduates from this course have the opportunity to do a third year of specialist studies to gain a BSc Honours degree.</p>
<p class="Default">FdSc Beauty and Spa Management is based at&nbsp;John Prince&rsquo;s Street, Oxford Circus, in the heart of the West End. The area is one of the prime shopping centres in London, with the majority of London&rsquo;s department stores, including Selfridges, Liberty, Fenwick and John Lewis, within a short walk of five minutes or less. The green spaces of Hyde Park and Regent&rsquo;s Park are close, as is Soho, with its many bars, restaurants and clubs, and Berwick Street market. The Wallace Collection, the Royal Academy of Arts, and the West End art galleries are all within walking distance.</p>
<h4>Course Structure</h4>
<h4>Year One &nbsp; &nbsp; Stage One &nbsp; &nbsp; Level 4 &nbsp; &nbsp; 120 credits&nbsp;</h4>
<p><strong>Term One:&nbsp;</strong>Introduction to Study in Higher Education (20 credits);&nbsp;Beauty and Spa Therapies (20 credits);</p>
<p><strong>Term Two:&nbsp;</strong>Introduction to Cultural and Historical Studies (20 credits);&nbsp;Beauty and Spa Treatments (20 credits);</p>
<p><strong>Term Three:&nbsp;</strong>The Practices and Management of the Beauty and Spa Industries (WBL) (40 credits)</p>
<h4>Year Two &nbsp; &nbsp; Stage Two &nbsp; &nbsp; Level 5 &nbsp; &nbsp; 120 credits</h4>
<p><strong>Term One:</strong>&nbsp;Cultural and Historical Studies (20 credits);&nbsp;Advanced Spa Therapies (20 credits);</p>
<p><strong>Term Two:&nbsp;</strong>Professional Practice and Effective Management in the Beauty and Spa Industries (WBL) (40 credits);</p>
<p><strong>Term Three:&nbsp;</strong>Cosmetic Products (20 credits);&nbsp;Complementary Therapy (20 credits);</p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Staff</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	<h4>Resources</h4>
<p>Our excellent resources for educating our students are two-fold: people and premises. People includes everyone at the College who contributes directly in some way to your education, whether as a subject tutor, a technician, an Open Access officer, a librarian or a study support tutor. Premises include the buildings and the facilities contained in them, such as specialist machinery, design studios and workshops, lecture and seminar rooms, and the library.</p>

			<p>The specialist facilities for Beauty and Spa Management include two fully equipped beauty salons and three science laboratories. Companies supplying brand products for face and body treatments that students use on clients include Decleor, Guinot, Dermlogica, Spa Find, the Skincare Sanctuary and Jessica. Professional training on the use of these products is given by the relevant company at LCF, and students gain accreditation certificates for specific treatments.</p>
<h4>Yvonne Mills</h4>
<p>As the Course Leader for our FdSc Beauty and Spa Management, has worked for many years as a therapist in the beauty industry in well know salons and spas including, Regis Europe based in Selfridges, Essanelle based in Debenhams and Holmes Place, Notting Hill. In addition she obtained management experience in running a successful beauty salon based in Kensington as well as working as an educator/consultant for Training Solutions; this involved delivering one-day beauty courses around the country. She has been teaching for thirteen years working across Further and Higher Education levels. She completed a Graduate Certificate in Learning and Teaching In Art, Design and Communication (FE) in 2002 a Postgraduate Certificate in Teaching and Learning (HE) in 2006 and commenced a PG Diploma in teaching and Learning (HE) in 2009 due for completion September 2010.</p>
<p>In 2005/06 she was granted a CLIP/CETL award to participate in an action research project to identify ways in which UAL could further support students, lead to the production of a DVD entitled "Bridging the Gap." The project researched into one Black and Minority Ethnic (BME) student's journey from the start of her beauty foundation degree onto the designated BSc and beyond. In October 2009 Yvonne was awarded a Centre for Learning and Teaching grant in conjunction with the Higher Education Academy to establish ways of encouraging and motivating BME students to aim higher.&nbsp;</p>
<h4>Rosemary Randall - Associate Lecturer</h4>
<p>Rosemary is a Chartered and State registered physiotherapist (MCSP SRP) and is also a member of the Acupuncturist Association of Chartered Physiotherapist (AACP). She has worked as a physiotherapist for over 35 years, initially with the Health Services and now in her own private practice for the past 20 years. She has also attended various courses in acupuncture and cognitive neuro physiotherapy and had a clinic at Circus Space for fours years where they teach circus skills.<br />Rosemary has had a long career with The London College of Fashion, having taught anatomy and physiology on the ND, HND and FdSc Beauty Therapy courses and BA (Hons) Active Sportswear and theatrical make up courses. She will also be delivering a new short Artscom course in anatomy for those requiring refreshers in the subject and has completed a City &amp; Guilds course in silk painting which she has delivered in India. Rosemary has an interactive and supportive approach to her teaching and delivery to fully engage the students in a practical approach to learning and understanding anatomy.&nbsp;</p>
<h4>Karen Butler</h4>
<p>Karen obtained her Higher National Diploma in Beauty Therapy at LCF in 1986 and has since worked in the Beauty Industry and Beauty Education. Her industry experience includes area management of Body Shop franchises, 11 Green Room Salons, an in- house company trainer for Perfector Face Lift and also working in beauty journalism.</p>
<p>Karen is currently developing short courses for LCF, as well as teaching on the FdSc Beauty and Spa Management course.&nbsp;</p>
<h4>Karen Manville</h4>
<p>As a Lecturer in Beauty Therapy who obtained her Higher National Diploma in Beauty Therapy at the London College of Fashion, Karen has worked for companies such as Farmacia at Selfridges, L'Occitane as a consultant and The Refinery at Harrods. She has a City and Guilds Teaching and Learning certificate and a Level 5 Certificate in Education. She joined the London College of Fashion lecturing on the Spa and Business Management short course and now teaches on the FdSc Beauty and Spa Management course. She has over 10 years industry experience and has been quoted in newspapers and magasines such as The Independent, Vogue, Instyle, and ES Magasine as one of the "Hottest Face-makers in London". Karen feels that her role as a group tutor is vital to supporting and guiding students, not only academically, but also pastorally. She has recently completed an Indian Head Massage course to further her understanding of holistic treatments' and is currently studying at Roehampton University to gain her Masters in Education which will include modules that will help to support and guide students from initial induction through to their final dissertation. She also consults privately and is currently working with a corporation in India in the initial stage of creating a Spa.&nbsp;</p>
<h4>Sue McKenna</h4>
<p>Sue has worked for London College of Fashion for 19 years and is the Beauty Therapy receptionist and administrator. Sue enjoys this role as the job is very varied and there is a lot of contact with students. Sue is always on hand to answers queries and provide student support.&nbsp;</p>
<h4>Dr. Glenis Wade</h4>
<p>Google-ing Dr Glenis Wade produces over 3 pages of links to her lecturing and research about management at various UK universities. Her&nbsp;<a href="http://www.gleniswade.co.uk/">beauty business blog</a>&nbsp;refers to what she notices in her management consulting and training&nbsp;practice. Dr Glenis owes this success to her successful career in the beauty and spa therapy worlds. She began as an international practitioner working in such places as the USA and Qatar. She became: the Regus Europe and Sterex blend trainer; Green Room manager and proprietor of her own Fleet Street practice. Glenis enjoys sharing academic and practical business insights when teaching on the FdSc Beauty and Spa Management course and writing for professional beauty publications.&nbsp;</p>
<h4>Gloria Nelson</h4>
<p>Gloria has worked at LCF for 13 years, mainly running the laundry department for the Beauty and Spa Management course and the rest of the College. Gloria also assists with other duties such as stock control and checking the rooms constantly meet hygiene standards. Gloria is always on hand to help students.&nbsp;</p>
<h4>Malcolm Newbery</h4>
<p>Malcom is a retail consultant, specialising in fashion retailing, marketing and supply. After more than 20 years in the industry he is still involved in writing, public speaking, training and the development of fashion industry academic qualifications. Malcolm continues to specialise in the supply chain of the fashion industries, namely buying and merchandising, sourcing and logistics, and the computer systems that back these up. Malcolm has been teaching for the last three years and is currently teaching on the FdSc Beauty and Spa Management.&nbsp;</p>
<h4>Caroline Searing</h4>
<p>Caroline trained as a physiologist at Bristol University and spend the first ten years of her career working as a research scientist for the Royal Navy, specialising in respiratory physiology and thermally stressful environments. Following a career break to have children she had a change of direction and entered the education sector. She now has 17 years experience and has taught across the levels from further education to postgraduate and masters levels. She teaches on the FdSc Beauty Therapy and Health Studies and the BSc (Hons) Cosmetic Science. She holds a City &amp; Guilds further and adult education teaching certificate, a PGDip and an MA in learning and teaching in higher education. Her research interests include factors influencing students' approaches to learning, the subject of her MA dissertation. She is currently researching ways of increasing student engagement with the academic literature.</p>
<p>As a first year group tutor Caroline is very involved in supporting the students through their first terms at the college. She has performed this role throughout her time at LCF so has experience at providing both academic and pastoral support in the variety of different situations that students may find themselves in.&nbsp;</p>
<h4>Zoe Yates</h4>
<p>Zoe graduated from London College of Fashion with a BA (Hons) in Make up for the Performing Arts and went on to work in film, theatre and fashion as a freelance make up artist. She began her training in media make up and cosmetic make up with beauty therapy before moving to London to gain her degree. She currently works in the School of Science and Management as a full time Beauty Therapy Technician, on hand to support students and staff during lessons, Open Access and assessments. Her skills and experience are quite varied, from electrical body and facial treatments including Guinot and Ionithermie to specialising in different make up techniques, such as corrective and camouflage to evening and bridal. She is continually developing her skills by training in professional beauty treatments and taking part in a teacher training course for technicians, with a long term goal of achieving a PGCE to become a lecturer at London College of Fashion.&nbsp;</p>
<h4>Maria Labedzka</h4>
<p>Maria grew up in Poland and was educated in Germany, receiving her PhD in biochemistry from the University of Hamburg. Following her passion in making cosmetic products she worked for over 20 years as a product development and technical manager for Unilever in Germany and the UK. She co-created many products from the Unilever personal care brands including Timotei, Sunsilk, Vaseline, Ponds, Lynx and Dove. In 2010 Maria retired from Unilever and decided to become a teacher. Consequently she took on the role as Course Leader at LCF in September 2010 which combines both her passions. She also teaches the principles of Cosmetic Science in the second year of the FdSc BSM. Maria recognises that teaching is about helping students to learn and took on a PG Certification course to improve her skills as a teacher.</p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Careers</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	<h4>Developing your skills</h4> 
<p>All our undergraduate courses are concerned with the development of your personal and professional skills. On your course you will evolve from learning basic skills in your discipline through to a position where you are an independent creative thinker capable of making an effective contribution to the relevant sector of the fashion industry. Personal and Professional Development (PPD) skills are embedded in all units on every course. Speaker programmes with contributions from alumni, members of industry and others are a part of many courses, as are work placement opportunities in industry. Where relevant, students have the chance to attend trade fairs, enter industry competitions, visit exhibitions and go on field trips and visits. The central position of our John Prince’s Street site in the West End affords students easy access to all sectors of the fashion retail market. In addition, our position as a constituent College in the University of the Arts London means that our students have access to the wide range of activities and events that occur in all the Colleges and at the University’s centre. Last but not least, being in London gives every student opportunities to explore and be inspired by the cultural, intellectual and social life of one of the great capital cities of the world.</p>

			<h4>Future Careers and Graduate Prospects</h4>
<p>High-achieving graduates from this course have the opportunity to do a third year of specialist studies to gain a BSc Honours degree.</p>
<p>Many graduates prefer to seek employment as soon as they have completed their undergraduate studies. Our students have the opportunity while on course to attend the recruitment sessions run by Steiner, Espa and Clarins, and this has frequently led to employment after graduation. The work placements in the industry that are undertaken by students in both years of the course continue to provide future employment. Companies providing work placement opportunities include Elemis Day Spa, Champneys, Benefit Boutique, Scin Day Spa, The Rejuvenation Clinic and Medispa, Groom and the Decleor Training Academy.</p>
<p>A number of our graduates have gone into self-employment as beauty therapists and now own their own salons. Others have gained employment with Steiner Luxury Cruise Liners, Elemis Day Spa, Eve Lom, Renew Medica, Space NK, Mandarin Oriental Hyde Park, The Mayfair Illuminata Spa and many others.</p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Entry Requirements</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	<h4>Opportunities for All</h4>
<p>We are committed to making university education an achievable option for a wider range of people and seek to recruit students from diverse socio-economic, cultural and educational backgrounds. We are committed to supporting all our students in achieving their potential both during and after their courses.</p>

			<h4>Course Entry Requirements</h4>
<p>Entry to this course is highly competitive: applicants are expected to achieve, or already have, the course entry requirements detailed below.</p>
<p>One &lsquo;A&rsquo; level pass at grade C or above (80 UCAS tariff points required)&nbsp;<strong>PLUS</strong>&nbsp;four GCSE passes in other subjects at grade C or above</p>
<p><strong>OR</strong></p>
<p>BTEC National Diploma in a beauty/spa related subject&nbsp;<strong>PLUS</strong>&nbsp;four GCSE passes in other subjects at grade C or above</p>
<p><strong>OR</strong></p>
<p>NVQ level 3 in a related subject&nbsp;<strong>PLUS</strong>&nbsp;four GCSE passes in other subjects at grade C or above</p>
<p><strong>OR</strong></p>
<p>Access course in a relevant subject&nbsp;<strong>PLUS</strong>&nbsp;four GCSE passes in other subjects at grade C or above</p>
<p><strong>OR equivalent awards</strong></p>
<p>Preferred subjects include Biology, Chemistry, Physics, Business Studies and English.</p>
<p>This course requires a minimum 80 UCAS tariff points.</p>
<p>Exceptionally, applicants who do not meet these course entry requirements may still be considered if the course team judges the application demonstrates additional strengths and alternative evidence. This might, for example, be demonstrated by: related academic or work experience; the quality of the personal statement; a strong academic or other professional reference; or a combination of these factors.</p>
<p>If the application indicates suitability for the course, applicants will be invited for interview.<strong>&nbsp;</strong></p>
<p><strong>English Language Requirements</strong></p>
<p>All classes are conducted in English. If English is not your first language you will be asked to provide evidence of your English language ability when you enrol.</p>
<p>The level required by the University for this course is IELTS 5.5 with a minimum of 4.5 in any one skill.</p>
<p>Please visit the <a href="/study-at-ual/international/application-advice/language-requirements/">UAL Language Requirements</a>&nbsp;page. Read carefully and look at the relevant documents. &nbsp;&nbsp;</p>
<h4>Student Selection Criteria</h4>
<p><strong>What We Look For</strong></p>
<p>The course team seeks to recruit students who can demonstrate:</p>
<ul>
<li>An interest in the beauty therapy and spa industry</li>
<li>Strong interpersonal, teamwork and communication skills</li>
<li>An approach suited to the demands of the course and study of science and management subjects<strong>&nbsp;</strong></li>
</ul>
<p><strong>Interview Advice</strong></p>
<h4>Applicants will be expected to demonstrate the following at interview: knowledge about the course; strong interest in working in the beauty therapy and spa industry; an idea of what they can bring to the course; interpersonal skills suitable for working in the industry; and a motivation to succeed on the course.</h4>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">How to Apply</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	<h4>Home EU Applicants</h4>
<p>You apply online through the&nbsp;<a href="http://www.ucas.com">Universities and Colleges Admissions Service</a>&nbsp;(UCAS).</p>
<p>Go to &lsquo;Apply&rsquo; from the UCAS home page, where you will be able to register and create a password that gives you unique access as you complete your application form.</p>
<p>You will need the University code, the UCAS code for this course, and the deadline date for your application. You will find these on the <strong>Facts</strong> tab.</p>
<p><strong>Contact us on:</strong>&nbsp;</p>
<p>Telephone: +44 (0)20 7514 7563 / 7582 / 7344</p>
<p>Or you can use the&nbsp;<a href="/study-at-ual/courses/courses-enquiry-form/">UAL Course Enquiry Form</a></p>
<h4>International Applicants</h4>
<p>For advice about how to apply as an international applicant please visit the <a href="/study-at-ual/international/application-advice/">UAL International Application Advice</a>&nbsp;page.</p>
<p>The International Recruitment Office at London College of Fashion will help to guide you through the application process and answer any specific questions that you may have regarding our courses. This may include portfolio advice, the application process and fee advice. We offer a &lsquo;drop-in&rsquo; facility for applicants who may be in London and wish to obtain further course and admissions information. Please contact us for further information on this facility. We can also arrange a tour of our facilities if we are given prior notice.&nbsp;</p>
<p>Our contact details are:</p>
<p>International Recruitment Office, London College of Fashion, 20 John Prince&rsquo;s Street, London W1G 0BJ</p>
<p>Telephone: +44 (0)20 7514 7656 / 7678 / 7629&nbsp;</p>
<p>Or you can use the&nbsp;<a href="/study-at-ual/courses/courses-enquiry-form/">UAL Course Enquiry Form</a></p>
<h4>Deferred Entry</h4>
<p>Deferred Entry is normally only allowed in exceptional circumstances. Please contact us before you submit your application if you are considering applying for deferred entry.</p>
			<h4>What Happens Next?</h4>
<p>All application forms, personal statements and references are read and considered by the course team against the selection criteria listed on the <strong>Entry Requirements</strong> tab, under <strong>What We Look For</strong>.</p>
<p>Depending on the quality of your application, you may be asked to an interview with the course team. If you are successful at the interview stage you will be offered a place. Applicants are not guaranteed an interview.</p>
<p>Please note that if you are unable to attend the College may not be able to re-schedule.</p>
<p>If you applied through UCAS the result of your application will be communicated to you via UCAS through ucastrack. You will only receive further communication directly from the College if your application has been successful. This will be in the form of a full offer pack including details of accommodation, fees, and other important information.<strong><br /></strong></p>
                        <h4>Showing your Work</h4>
<p>All final year students are given the opportunity to profile their work online via Showtime. London College of Fashion can make no guarantee that your work (either in sum or in part) will be shown, exhibited or profiled in any way as part of your course. All student work appearing in College organised events, catwalk shows, exhibitions and other forms of showcase, is selected by a panel of senior staff and, in some instances, external industry judges.</p>
 
<h4>Additional Costs</h4>
<p>Some courses charge a fee for the bulk purchase of materials and/or equipment used on the course. Further details will be supplied at Open Days and/or Interview.</p>

		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Course Units</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	
			<h4>Year One</h4>
<p>In the first term you will study two units.</p>
<p><strong><em>Introduction to Study in Higher Education</em></strong>&nbsp;gives you an understanding of your personal and professional development at university, with three core purposes: to introduce you to the necessary learning skills for undergraduate study; to show you where you are situated within the College and the University; and to help you understand what you will learn on your course and how you will develop your skills.</p>
<p><strong><em>Beauty and Spa Therapies&nbsp;</em></strong>introduces you to the beauty and spa industries and allows you to develop the hands on practical and communication skills that you will need as a professional. You will learn about the science underpinning the therapies used, and will particularly study the skin as knowledge and understanding of this aspect of human biology is fundamental to beauty and spa therapies.</p>
<p>In the second term you will study two units.</p>
<p><strong><em>Introduction to Cultural and Historical Studies</em></strong>&nbsp;introduces you to key concepts and ways of thinking about beauty and its context in society and culture. You will attend lectures, seminars and workshops, and do a significant amount of reading of academic texts in order to complete a formal academic essay for assessment. Completion of this unit will allow you to make an informed choice of subject for study in the second year Cultural and Historical Studies unit.</p>
<p><strong><em>Beauty and Spa Treatments&nbsp;</em></strong>develops your understanding and knowledge of the variety of beauty and spa treatments available. You will learn the importance of tailoring the treatment to the needs of the individual client, based on the appropriate scientific principles. You will develop your consultation techniques and communication skills through your professional practice.</p>
<p>In the third term&nbsp;<strong><em>The Practices and Management of the Beauty and Spa Industries</em></strong>&nbsp;unit will be undertaken. This gives you the opportunity to explore the relationships between the scientific, managerial and practical aspects of your learning. You will look at the professional treatment packages offered in the beauty and spa industries and the science behind these treatments. You will undertake case study observation and client consultation to further develop your awareness of how to select effective treatments that are suitable for the individual client. You will have the opportunity to do a work placement, which will allow you to see first hand how the industry operates, and you will look at a range of different management structures. In your report you will be able to analyse how the various elements, such as retail and human resources management, integrate into a successful overall business environment.</p>
<h4>Year Two</h4>
<p>In the first term you will be able to study a&nbsp;<strong><em>Cultural and Historical Studies</em></strong>&nbsp;unit of your choice that will broaden or deepen your learning of areas relating to your interests in your chosen field. You will have the opportunity to participate in lectures, seminars and workshops with students from other courses within your School, and will read relevant academic texts and complete a formal academic essay for assessment.</p>
<p>Also in the first term, the&nbsp;<strong><em>Advanced Spa Therapies</em></strong>&nbsp;unit gives you the opportunity to broaden and deepen your knowledge of all aspects of the spa industry, both in the UK and globally. You will look at the physiological principles underlying growth and ageing in the human body, and consider relevant spa treatments to enhance well-being. You will gain practical experience of the application of a number of spa treatments.</p>
<p>In the second term the&nbsp;<strong><em>Professional Practice and Effective Management in the Beauty and Spa Industries</em></strong>&nbsp;unit gives you an integrated experience of the two strands running through the course. You will gain more experience in selecting advanced treatments, and you will analyse the role of physical activity in optimum health. Through developing your understanding of the relationship between physical activity, fitness and health, you will be able to make judgements on the use of exercise as a means to health and well-being. Alongside this you will explore the fundamental issues and criteria necessary to run a successful beauty or spa business. You will prepare a business and operational plan, incorporating all the components necessary for the setting up and effective management of the business. In this unit you will also have the opportunity to apply your knowledge and skills through a work placement in industry. You will be able to look at your placement company from a number of different angles, including internal organisation, profit generation and the management of globalisation and sustainability.</p>
<p>In the third term you will undertake two units.</p>
<p><strong><em>&nbsp;Cosmetic Products&nbsp;</em></strong>introduces you to cosmetic science and the processes involved in the formulation, manufacture and evaluation of decorative cosmetic, skincare and toiletry products. You will be supported in developing the basic skills needed to analyse the formulation, produce it in laboratory conditions and assess its main characteristics. You will learn about risk assessments and safe laboratory procedures.</p>
<p>The&nbsp;<strong><em>Complementary Therapy</em></strong>&nbsp;unit gives you the opportunity to develop your research skills through analysing the use of essential oils and their importance within the beauty therapy, health and spa industry. You will develop your theoretical knowledge of different treatment techniques and use your practical skills to deliver appropriate, safe and effective treatments. The physiological effects and long term consequences of obesity and other nutritional disorders will be explored, and the various approaches to treatment will be considered.</p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Testimonials</h3><div class="st-arrow icon circled-plus">⊕</div></a>
		<div class="st-content">
                  	
			<h4>Industry</h4>
<p><strong>Stephanie Gilchrist, Training&nbsp;Development Manager (UK &amp; Ireland), Guinot</strong></p>
<blockquote>"It is a pleasure to work with London College of Fashion. We are proud to support such a professional institution by providing training sessions both theory-wise and practically on the Hydradermie &amp; Hydradermie Lift, we also offer top-up sessions where we impart our knowledge pertaining to a particular subject area for the student. This benefits us here at Guinot as it creates brand awareness and also demonstrates to the students our efficiency and effectiveness as a brand, due to the immediate results they witness from providing the before mentioned treatments. The students benefit as they&rsquo;re certified in certain elements of Guinot training, which potentially could lead them into a job vacancy."</blockquote>
<p><strong>Lucy Vose, Salon Priv&eacute;</strong></p>
<blockquote>"Having worked closely with Yvonne Mills and her team for the past 10 years I have always been very impressed at the high calibre and knowledge of both the lecturers and the students who I have spent time with. It is easy to recognise the high standards of education that are delivered and this is clearly evident when working with the students in both their academic capabilities as well as their positive approach to their work. It has always been a pleasure to have an association with the college.</blockquote>
<blockquote>Ionithermie is one of the No.1 preferred slimming and firming treatments both in the U.K and on board cruise liners. As a company, we provide a theoretical introduction and demonstration of the treatment which is then followed up with further training by the lecturers during the term. We then provide a practical and written assessment to be able to certify the students before completion of their course. We also offer retail skills workshops which have been designed to provide greater understanding of the importance of retailing plus increase students confidence upon entering the their first job.</blockquote>
<blockquote>In terms of learning other treatments, I think this really benefits the students by giving them more qualifications to be able to utilise in the workplace. The retail skills training provides an insight into what becomes a crucial part of any job role within the beauty industry and can help them to increase their revenue on a long term basis."</blockquote>
<p><strong>Gaynor Farmer, Senior Instructor (worldwide), Eve Taylor</strong></p>
<blockquote>"I find all of the staff at London College of Fashion extremely friendly, organised and professional. This establishment is a pleasure to work with. Eve Taylor (London) Ltd creates real life industry treatments for the students to practice before returning to assess their skills and understanding of the treatment. This is mutually beneficial to us and the students as they are exposed to another professional skin care range rather than only working with one line, giving them greater experience that will serve as a positive when searching for work. We benefit by putting our excellent products in the hands of the future professional beauty therapists and gain more credibility through association with London College of Fashion."</blockquote>
                        
		</div>
</li>
    
        </ul>
      </div>
  </div>
</div>	

		</div>
		</div>
		</div>

		<div class="panel bg-gray-bg">
			<div class="content-wrapper">
				<div class="row">
					<div class="content">
	 

	<div class="row">
	    <div class="__gallery  four-up">
	            
			<h2>Staff, Students and Alumni</h2>
				
	      		<ul>
	      	                 
<li>
			<a class="no-border" href="/fashion/people/teaching-staff/yvonne-mills/">
			
				<img src="/media/beta/beta-colleges/beta-lcf/courses/undergraduate/yvonne-mills-thumbnail.jpg" alt="Staff: Yvonne Mills">
			
			
		</a>
	    
	<h3 class="size-h5"><a href="/fashion/people/teaching-staff/yvonne-mills/" title="">Staff: Yvonne Mills</a></h3>	       
	  		
</li><li>
			<a class="no-border" href="/fashion/people/student-voices/becky-score/">
			
				<img src="/media/beta/beta-colleges/beta-lcf/lcf-people/students/img/becky-score210.jpg" alt="Student: Becky Score">
			
			
		</a>
	    
	<h3 class="size-h5"><a href="/fashion/people/student-voices/becky-score/" title="">Student: Becky Score</a></h3>	       
	  		
</li>        
        	</ul>
    	</div>
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
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/fastclick.js"></script>

<!--[if (lt IE 9) & (!IEMobile)]>
	<script type="text/javascript" src="/media/beta/beta-assets/respond.js"></script>
<![endif]-->



  <script src='http://artslondon.github.io/beta/assets/js/style-guide/jquery.fitvids.js' type='text/javascript'></script>
 
<!-- reView script - used for LazyLoading with ReSRC.it -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/jquery.review-1.0.0.min.js"></script>


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

<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/t4-script-ck.js"></script>

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