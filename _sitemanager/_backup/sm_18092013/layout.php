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
    <meta content='on' http-equiv='cleartype'>
    <meta content='University of Arts London, Web Team' name='author'>
    <!-- Meta description tag -->
    <t4 type="meta" id="6"/>
    
<!-- The fav icons -->
<link rel="shortcut icon" href="http://www.beta.arts.ac.uk/new_favicon.ico" />

<!-- screen.css -->    
<t4 type="media" id="228747" formatter="css/*"/>

<!-- fonts.css -->
<t4 type="media" id="217530" formatter="css/*"/>
    
<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7258632/627802/css/fonts.css" />
    

<!--[if (lt IE 9) & (!IEMobile)]>
    <script src='<t4 type="media" id="233928" formatter="path/*"/>'></script>
    <script src="<t4 type="media" id="233929" formatter="path/*"/>"></script>
    <script src ='<t4 type="media" id="233930" formatter="path/*"/>'></script>
<![endif]-->
    
<!-- JavaScript -->
   <t4 type="media" id="233931" formatter="javascript/*"/>
   <t4 type="media" id="233932" formatter="javascript/*"/> 
    
    <script> Modernizr.Detectizr.detect({detectScreen:false}); </script>
    
    <!-- load icon files for logos and icons -->
     <script>
  /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "<t4 type="media" id="233937" formatter="path/*"/>", "<t4 type="media" id="233938" formatter="path/*"/>", "<t4 type="media" id="233939" formatter="path/*"/>" ] );
  </script>
  <noscript><link href="<t4 type="media" id="233939" formatter="path/*"/>" rel="stylesheet"></noscript>
       
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
  	$menuHeading = '<a href="/camberwell" title="Camberwell College of Art">Camberwell College of Art</a>';
        break;
    case '35289':
        $collegeClass = "csm college";
  $menuHeading = '<a href="/csm" title="Central Saint Martins">Central Saint Martins</a>';
        break;
    case '35290':
        $collegeClass = "chelsea college";
  $menuHeading = '<a href="/chelsea" title="Chelsea College of Art">Chelsea College of Art</a>';
        break;
    case '35291':
        $collegeClass = "lcc college";
        $menuHeading = '<a href="/lcc" title="London College of Communication">London College of Communication</a>';
        break;
    case '35292':
        $collegeClass = "lcf college";
        $menuHeading = '<a href="/fashion" title="London College of Fashion">London College of Fashion</a>';
        break;
    case '35293':
        $collegeClass = "wimbledon college";
  	$menuHeading = '<a href="/wimbledon" title="Wimbledon College of Art">Wimbledon College of Art</a>';
        break;
    default:
        $collegeClass = "ual";
        $menuHeading = "In this section";
}
?>

<body class="<?php echo $collegeClass . ' ' . $sectionClass; ?> <t4 type="navigation" id="3529" /> <t4 type="navigation" id="4550" />">
 <div class="ual-black-bg cf">
<div class="header-wrapper">
  <div class="row">  
      <div class="ual-banner-menu">
        
        <div class="ual-logo-tab-mobile">
          <a href="/" title="Navigate back to the UAL homepage"><div class="logo-ual-mobile"></div></a>
        </div>
        <div class="ual-logo-desktop">
          <div class="logo-ual<?php if ($collegeClass != 'ual') { echo '-' . $collegeClass; }?>"></div>
        </div> 

      <nav class="college-link-menu">
        <ul>
          <li class="col-link-ual"><a href="/">University Home</a></li>
            <li class="col-link-camberwell"><a href="/camberwell/">Camberwell</a></li>
            <li class="col-link-csm"><a href="/csm/">CSM</a></li>
            <li class="col-link-chelsea"><a href="/chelsea/">Chelsea</a></li>
            <li class="col-link-lcc"><a href="/lcc/">LCC</a></li>
            <li class="col-link-lcf"><a href="/fashion/">LCF</a></li>
            <li class="col-link-wimbledon"><a href="/wimbledon/">Wimbledon</a></li>
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