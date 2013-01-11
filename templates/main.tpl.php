<?php

  include_once('/var/www/public//system/functions.php'); 
?>
<!DOCTYPE html>
<!-- 
Wirefy by Chris Da Sie
Version: 2.0.8
URL: https://getwirefy.com
Apache License: v2.0. http://www.apache.org/licenses/LICENSE-2.0
-->

<!-- HTML5 Mobile Boilerplate -->
<!--[if IEMobile 7]><html class="no-js iem7"><![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--><html class="no-js" lang="en"><!--<![endif]-->

<!-- HTML5 Boilerplate -->
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html class="no-js lt-ie9 lt-ie8" lang="en"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html class="no-js lt-ie9" lang="en"><![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"><!--<![endif]-->

 <!-- Basic Page Needs
================================================= -->
 <meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
 <title><?php print @$this->title; ?></title>
 <meta name="description" content="">
 <meta name="author" content="">
 
 
<?php  print t('head');  ?>
        
<body>
  <!--[if lt IE 7]>
  <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
  <![endif]-->
  
  <!-- Begin adding your site or application content here -->

  <!-- Add your site or application content here -->
  <div class="container clearfix">
  
  <!-- This is the header information. You can add things like logos and navigation here. -->
    <header role="banner" class="row">
    <div class="logo five columns">
      <h1><img src="http://placehold.it/250x100&text=[Introduction Logo]"></h1>
    </div>
  <!-- Navigation. This navigation uses the three line approach for small viewports. Check documentation for other examples -->
    <div class="menu-button">Menu</div>
    <a href="#main" class="skip">Skip navigation</a>
    <nav role="navigation" id="nav" class="toggle eight columns">
      <ul>
    <?php foreach (@$this->menu as $link) {
  echo "<li class='top-level'><a href='".  curPageURL() . $link . "'>" . $link . "</a></li>";
} ?>
      </ul> 
      </nav>
  <!-- End Of Navigation -->
    </header>
  <!-- End Of Header -->

  <!-- The Main content area can be used to create lots of different block areas. 
  As Jeffery Zeldman once said, "Content precedes design. Design in the absence 
  of content is not design, it's decoration." -->
  
  <?php $crumbs = explode("/",$_SERVER["REQUEST_URI"]);
  $breadcrumb = array_filter($crumbs); ?>
  
  <div class="breadcrumbs">
  <ul>
  <?php

echo breadcrumbs(); 
?>
  </ul>
  </div>   
  <div role="main" class="content" clearfix">

  
  <?php print $this->body; ?>
  
  </div>
  
  <!-- Footer -->
    <hr>      
      <footer role="contentinfo" class="row">
    <p class="eleven columns">&copy; Copyright Sidebar Template Wirefy.</p>
    <div class="five columns">
      <ul class="link-list">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
        <li><a href="#">Link 4</a></li>
        <li><a href="#">Link 5</a></li>
        </ul>
    </div>
      </footer><!-- End Of Footer -->
 
  </div><!-- End Of Container -->

<?php  print t('footer');  ?>
