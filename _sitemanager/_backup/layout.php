<t4 type="navigation" id="3769"/>
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
    <?php 
	$title = "<t4 type="navigation" id="49"/>"; 
	if (!empty($title)) {
  
  	echo "<title>" . $title.  " - University of Arts London</title>";
  
	} else {
  
  	echo "<title> University of Arts London</title>";
  
	}
    
    ?>
    <meta charset='utf-8'>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible"'>
    
    <!--<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">-->
    <meta content='on' http-equiv='cleartype'>
    <meta content='University of Arts London, Web Team' name='author'>
    <!-- Meta description tag -->
    <t4 type="meta" id="6"/>
    
<!-- For all browsers old file <t4 type="media" id="209055" formatter="css/*"/>-->
    
<!-- screen.css -->
    
<t4 type="media" id="228747" formatter="css/*"/>
   
<!-- fonts.css -->
<t4 type="media" id="217530" formatter="css/*"/>
    
    <link rel="stylesheet" type="text/css" href="//cloud.typography.com/7258632/627802/css/fonts.css" />
    
<!-- royalslider.css -->
<!--<t4 type="media" id="220882" formatter="css/*"/>-->
    
<!-- Debug CSS -->
<!--<link rel='stylesheet' href='http://artslondon.github.io/beta/assets/css/debug.css'>-->

<!--[if (lt IE 9) & (!IEMobile)]>
    <script src='http://artslondon.github.io/beta/assets/js/libs/selectivizr-min.js'></script>
    <script src="http://artslondon.github.io/beta/assets/js/libs/html5shiv.js"></script>
    <script src ='http://raw.github.com/scottjehl/Respond/master/respond.src.js'></script>
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
       
  </head>

<?php 
// By default, sections have H1 headings
$header = true;
$currentSectionID = "<t4 type="navigation" id="3409" />";
$levelThreeID = "<t4 type="navigation" id="3509" />";

// Turn off the header on main home page and College landing pages
switch ($currentSectionID) {
    case '33986': 
    $sectionClass = "home";
    $collegeClass = "ual";
    $header = false;
    break;
    case '35288':
    $sectionClass = "home";
    $header = false;
        break;
    case '35289':
    $sectionClass = "home";
    $header = false;
        break;
    case '35290':
    $sectionClass = "home";
    $header = false;  
        break;
    case '35291':
    $sectionClass = "home";
    $header = false;
        break;
    case '35292':
    $sectionClass = "home";
    $header = false;
        break;
    case '35293':
    $sectionClass = "home";
    $header = false;
        break;
}

// Set a body class based on the college section, for CSS namespacing
switch ($levelThreeID) {
    case '35288':
        $collegeClass = "camberwell college";
  	$menuHeading = '<a href="http://beta.arts.ac.uk/camberwell" title="Camberwell College of Art">Camberwell College of Art</a>';
        break;
    case '35289':
        $collegeClass = "csm college";
  $menuHeading = '<a href="http://beta.arts.ac.uk/csm" title="Central Saint Martins">Central Saint Martins</a>';
        break;
    case '35290':
        $collegeClass = "chelsea college";
  $menuHeading = '<a href="http://beta.arts.ac.uk/chelsea" title="Chelsea College of Art">Chelsea College of Art</a>';
        break;
    case '35291':
        $collegeClass = "lcc college";
        $menuHeading = '<a href="http://beta.arts.ac.uk/lcc" title="London College of Communication">London College of Communication</a>';
        break;
    case '35292':
        $collegeClass = "lcf college";
        $menuHeading = '<a href="http://beta.arts.ac.uk/fashion" title="London College of Fashion">London College of Fashion</a>';
        break;
    case '35293':
        $collegeClass = "wimbledon college";
  	$menuHeading = '<a href="http://beta.arts.ac.uk/wimbledon" title="Wimbledon College of Art">Wimbledon College of Art</a>';
        break;
    default:
        $collegeClass = "ual";
        $menuHeading = "In this section";
}
?>

<body class="<?php echo $collegeClass . ' ' . $sectionClass; ?> <t4 type="navigation" id="3529" />">
 <div class="ual-black-bg cf">
<div class="header-wrapper">
  <div class="row">  
      <div class="ual-banner-menu">
        
        <div class="ual-logo-tab-mobile">
          <a href="http://beta.arts.ac.uk" title="Navigate back to the UAL homepage"><div class="logo-ual-mobile"></div></a>
        </div>
        <div class="ual-logo-desktop">
          <div class="logo-ual<?php if ($collegeClass != 'ual') { echo '-' . $collegeClass; }?>"></div>
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
<t4 type="navigation" id="3469"/>
</div>
</div>
</div>
<?php
if ($header != false) { ?> 
<div class="header-panel bg-gray-bg">
    <div class="header-wrapper">
  <div class="row">
          <!-- navigation object : Breadcrumbs --><t4 type="navigation" id="3349"/>
    <div class="page-title">
      <h1><!-- navigation object : Section name --><t4 type="navigation" id="3250"/></h1>
    </div>
  </div>  
    </div>
</div>
<?php } ?>

 <!-- section name -->
<!--<div class="content-wrapper">
  <div class="row">
    <div class="d5-d16">
      <h1><t4 type="navigation" id="3250"/></h1>
    </div>
  </div>
  </div>-->
<!-- Add banner here -->
<div class="content-wrapper">

  <!-- Home page slider include -->
  <t4 type="navigation" id="3849" />
  
  <?php 

  if (($currentSectionID !== '33986') && ($currentSectionID !== '37512') && ($currentSectionID !== '37851') && ($currentSectionID !== '37508')) { ?>
  
    <div class="row">
      
      <nav role="navigation" class="sidebar">


	        <?php
	        // Dont show for Business and Innovation and show for all other sections
	        	if (($currentSectionID !== '35311') && ($currentSectionID !==  '42813') && ($currentSectionID !==  '44824') && ($currentSectionID !==  '44684') && ($currentSectionID !==  '44849') && ($currentSectionID !==  '44435') && ($currentSectionID !==  '44851') ) { ?>
	        <!-- navigation object : Left navigation -->
			<!-- navigation object : Include Course Dropdown -->
			<t4 type="navigation" id="4289"/>
			<?php if ($navDropdown !== TRUE) { ?>
	        <ul>
	          <li class="menu-heading"><?php echo $menuHeading; ?></li>
	          <t4 type="navigation" id="3229"/>
	        </ul>
			<?php } ?>
	        <?php } 

	        // Only show for Business and Innovation
	        if ($currentSectionID == '35311') : ?>
	          <ul>
	            <li><a href="#link-one">Working with our students</a>
	            <li><a href="#link-two">Working with our staff</a>
	            <li><a href="#link-three">Working with our communities</a>
	            <li><a href="#link-four">Education, skills and qualifications</a>
	            <li><a href="#link-five">Events and Conferences</a>
	            <li><a href="#link-six">Mentoring and Networks</a>
	            <li><a href="#link-seven">Supporting Our Students</a>
	          </ul>
	        <?php endif ?>
			<?php
	         if (($currentSectionID ==  '42813') || ($currentSectionID ==  '44824') || ($currentSectionID ==  '44684') || ($currentSectionID ==  '44849') || ($currentSectionID ==  '44435') || ($currentSectionID ==  '44851') ) : ?>
	  			<div id="placeHolder"></div>
	          <?php endif ?>

      </nav>
      <div role="main" class="content">

  <?php } ?>

<!-- Content ->

    </div>
  </div>
</div>



<!-- navigation object : College Footer Include --><t4 type="navigation" id="4209"/>
<!-- navigation object : Main Footer Include --><t4 type="navigation" id="4109"/>

<footer class="row white-bg hide">
    <div class="footer-wrapper">
        <a href="#" class="open-close debug-toggle"><span>↓</span> Open Debug panel</a>
        <!-- debug -->
        <ul id="debug">
          <li>Channel base uri: <t4 type="channel" output="site-root"/></li>
          <li>Channel base description: <t4 type="channel" output="description"/></li>
          <li>Channel base id: <t4 type="channel" output="id"/></li>
          <li>Channel base name: <t4 type="channel" output="name"/></li>
          <li>Page created : <t4 type="navigation" id="3369"/></li>
          <li>Page modified : <t4 type="navigation" id="3389"/></li>
          <?php $i = 0; ?><t4 type="navigation" id="3569"/>
          <li>Section id : <t4 type="navigation" id="3409"/></li>
      </ul>
        <!-- end debug -->
    </div>

</footer>
<div class="credits-btn"><a href="#" class="show-credits">Show Credits</a></div>
<!-- Include js scripts -->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script>
    Modernizr.Detectizr.detect({detectScreen:false});
</script>
<script src="http://use.resrc.it/js/resrc-0.6.1.min.js"></script>



<!-- Fastclick js -->
<t4 type="media" id="222095" formatter="javascript/*"/>

<!-- jquery.fitvids-ck.js -->
<t4 type="media" id="229707" formatter="javascript/*"/>
 
<!-- reView script - used for LazyLoading with ReSRC.it -->
<t4 type="media" id="222144" formatter="javascript/*"/>

<!-- navigation object : Javascript include 
<t4 type="navigation" id="3289"/>-->
  


<!-- Mega Menu Plugins -->
<t4 type="media" id="231368" formatter="javascript/*"/>
<!-- Mega Menu Script -->
<t4 type="media" id="231373" formatter="javascript/*"/>

<!-- Scripts -->
<!-- <t4 type="media" id="209056" formatter="javascript/*"/> -->

<t4 type="media" id="229129" formatter="javascript/*"/>

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