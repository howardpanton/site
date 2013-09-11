<?php $shortEnv = TRUE ; ?>
<?php 

  class ShortCourse {
    
    public $xml;
    public $courseIds;
    public $companyId;

    
    /**
     * [__construct This returns the courseId and companyId in the object]
     *
     * @param string  $courseIds [set the courseID for the SimpleXML Object]
     * @param string  $companyId [set the companyID for the SimpleXml Object]
     */
    public function __construct( $courseIds = "", $companyId = "" ) {
      // 'INTROD9Ww6'
      $this->courseIds = $courseIds;
      // 'LCF', 'CSM'  
      $this->companyId = $companyId;

    }
    
    public function courseDatesCache($courseids="", $companyid=""){

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
    
    public function returnXml() {
      
      $this->xml = @simplexml_load_string($this->courseDatesCache($this->courseIds, $this->companyId));
      $result = $this->xml;
      return $this->xml;
      
    }
    
    public function returnErrors() {
      
      if(isset($_GET['errors'])){
        ini_set('display_errors',1); 
        ini_set('error_reporting', E_ALL); 
        error_reporting(E_ALL);
      }
    }
    
    public function description() {
      $description = strip_tags($this->xml->course->description);
      return $description;
    }
    
    public function materials() {
      $materials = strip_tags($this->xml->course->materials);
      return $materials;
    }
    
    public function title() {
      $title = $this->xml->xpath('/courses/course/@label');
      foreach ($title as $key => $value) {
        echo $value;
      } 
    }

    public function dates() {
      $dates = $this->xml->course->dates;
      return $dates;
    }
    
    public function datesChildren() {
      $datesChildren = $this->xml->course->dates->children();
      return $datesChildren;
    }
    
    public function Truncate($string, $length, $stopanywhere = false) {
        //truncates a string to a certain char length, stopping on a word if not specified otherwise.
        if (strlen($string) > $length) {
            //limit hit!
            $string = substr($string,0,($length -3));
            if ($stopanywhere) {
                //stop anywhere
                $string .= '...';
            } else{
                //stop on a word.
                $string = substr($string,0,strrpos($string,' ')).'...';
            }
        }
        return $string;
    }
  
}

$test = new ShortCourse('INTROD9Ww6','LCF');
$r = $test->returnXml();
$t = $test->dates();
$c = $test->datesChildren();
$test->title();
//echo $test->description();
//echo $test->returnXml()->course->dates;
//$title = $this->xml->xpath('/courses/course/@label');
//var_dump($c);


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
    <td ><ol><li>


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


?>
</table>
<br />
<p>Alternative Dates and Times<br />
Many of our courses are repeated throughout the year. If the above dates is not suitable for you, 
or there are no dates showing for this session, then please <a href="http://www.csm.arts.ac.uk/shortcourses/by-session.htm">choose an alternative session</a>.</p>

            <?php 

    } // End of CSM dates box
    ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <title>Introduction to footwear design  - London College of Fashion</title>

     
      <!-- Common Metadata Tags -->
      
     <meta name="publisher" content="University of the Arts London" />
      <meta name="format" content="text/html" />
      <meta name="distribution" content="global" />
      <meta name="robots" content="all" />

      <meta http-equiv="imagetoolbar" content="no" />


      <link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/html.css" />
      <link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/custom.css" />
      <link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/gallery-complex.css" />
     <link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/t4fixes.css" /><!-- T4 Fixes -->
      <!-- navigation object : CSS Selector --><link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/theme-purple.css" />
      <!-- table.css --><link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/table.css" />
      <!-- ualgrid.css --><link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/ualgrid.css" />
      <!-- print.css --><link rel="stylesheet" type="text/css" media="print" href="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/css/print.css" />
 
     

     
    <!-- navigation object : Analytics Code -->    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-182294-6']);
        _gaq.push(['_trackPageview']);
    
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>

   </head>
   <body id="table" class="purple">
      <div id="wrapper" class="container_16">
         <div id="logo"><a href="/"><!-- navigation object : Logo --><img src="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/images/purple.gif" /></a></div>
         <div id="guides"></div>
         <h1 class="aa">University of the Arts London</h1>
         <h2 class="aa">Home</h2>
         <a href="#nav-sub" class="aa">Skip primary navigation</a>
         <!-- navigation object : Accessibility Links -->
         <ul id="nav-main" class="nav">
            <li><a accesskey="h" href="http://www.arts.ac.uk/">University Home</a></li>
         </ul>

         <a href="#content" class="aa">Skip secondary navigation</a>
         <!-- navigation object : College Top Navigation Column 2 --><ul id="nav-sub" class="nav"><li><a href="/">Home</a></li><li><a href="/about/">About Us</a></li><li><span class="currentbranch0"><a href="/courses/">Courses</a></span></li><li><a href="/prospective-students/">Prospective Students</a></li><li><a href="http://blogs.fashion.arts.ac.uk/snapshot/">News</a></li><li><a href="http://newsevents.arts.ac.uk/lcf/events/">Events</a></li><li><a href="/showcase/">Showcase</a></li><li><a href="/research/">Research</a></li><li><a href="/international/">International</a></li><li><a href="/business-innovation/">Business and Innovation</a></li><li><a href="/alumni/">Alumni</a></li></ul>
         <!-- navigation object : College Top Navigation Column 3 --><ul id="nav-popup" class="nav"><li><a href="/courses/../courses-by-level/">Courses by level</a></li><li><a href="/courses/../courses-by-subject/">Courses by subject</a></li><li><span class="currentbranch0"><a href="/courses/../short-courses/">Short Courses</a></span></li><li><a href="/courses/../study-abroad/">Study Abroad</a></li><li><a href="/courses/flexible/">Flexible Learning</a></li><li><a href="http://www.arts.ac.uk/enquiry-form/">Course Enquiry</a></li></ul>
         <!-- navigation object : Way Finder --><div id="wayfinder">
   <ul class="thumbs">
      <li id="wayfinder2" class="item purple" title="London College of Fashion"><a href="http://www.fashion.arts.ac.uk/" onClick="javascript:urchinTracker('/wayfinder/LCF');" id="link2"><img src="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/way/way_lcf.jpg" alt="" /></a></li>
      <li id="wayfinder1" class="item green" title="London College of Communication"><a href="http://www.lcc.arts.ac.uk/" onClick="javascript:urchinTracker('/wayfinder/LCC');" id="link1"><img src="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/way/way_lcc.jpg" alt="" /></a></li>
      <li id="wayfinder0" class="item red" title="Central Saint Martins College of Arts and Design"><a href="http://www.csm.arts.ac.uk/" onClick="javascript:urchinTracker('/wayfinder/CSM');" id="link0"><img src="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/way/way_csm.jpg" alt="" /></a></li>
   </ul>
   <ul class="thumbs">
      <li id="wayfinder5" class="item gold" title="Wimbledon College of Art"><a href="http://www.wimbledon.arts.ac.uk" onClick="javascript:urchinTracker('/wayfinder/Wimb');" id="link5"><img src="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/way/way_wimb.jpg" alt="" /></a></li>
      <li id="wayfinder4" class="item orange" title="Chelsea College of Art and Design"><a href="http://www.chelsea.arts.ac.uk/" onClick="javascript:urchinTracker('/wayfinder/Chelsea');" id="link4"><img src="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/way/way_chel.jpg" alt="" /></a></li>
      <li id="wayfinder3" class="item blue" title="Camberwell College of Arts"><a href="http://www.camberwell.arts.ac.uk/" onClick="javascript:urchinTracker('/wayfinder/Camb');" id="link3"><img src="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/way/way_camb.jpg" alt="" /></a></li>
   </ul>
   <div id="wayfinder-caption"><!-- caption --></div>
</div>

         <div id="content" class="aa"></div>
         <div id="main-content">
            <div id="breadcrumb-trail">
               <ul>
                  <!-- navigation object : Breadcrumb --><li><a href="/">London College of Fashion</a></li><li><a href="/courses/">Courses</a></li><li><a href="/courses/../short-courses/">Short Courses</a></li><li><a href="/courses/../short-courses/by-subject/">Courses by subject</a></li><li><a href="/courses/../short-courses/by-subject/footwear/">Footwear</a></li><li>Introduction to footwear design </li>
               </ul>
            </div>
            <div id="content-col" class="course-page">
               <h1><!-- navigation object : Name of Current Section -->Introduction to footwear design </h1>
               <div id="inner-left">
                  <!-- navigation object : Above Left Nav -->
                  <!-- navigation object : All content in the text/menu format -->
                  <!-- navigation object : Below Left Nav Inherits -->
<div id="nav-inpage"><h4>Useful Information</h4>
<ul>
<li><a title="Home &amp;raquo; arts.ac.uk &amp;raquo; University Home &amp;raquo; London College of Fashion &amp;raquo; Courses &amp;raquo; Short Courses" href="/courses/../short-courses/">Short course homepage</a></li>
<li><a title="Home &amp;raquo; arts.ac.uk &amp;raquo; University Home &amp;raquo; London College of Fashion &amp;raquo; Courses &amp;raquo; Short Courses &amp;raquo; Contact us &amp;amp; information &amp;raquo; How to book" href="/courses/../short-courses/usefulinformation/how-to-book/">How to book</a></li>
<li><a title="Home &amp;raquo; arts.ac.uk &amp;raquo; University Home &amp;raquo; London College of Fashion &amp;raquo; Courses &amp;raquo; Short Courses &amp;raquo; Useful information &amp;raquo; Request a brochure" href="/courses/../short-courses/usefulinformation/../lcf-short-courses-brochure/">Request a brochure</a></li>
<li><a title="Home &amp;raquo; arts.ac.uk &amp;raquo; University Home &amp;raquo; London College of Fashion &amp;raquo; Courses &amp;raquo; Short Courses &amp;raquo; Contact us &amp;amp; information &amp;raquo; General information" href="/courses/../short-courses/usefulinformation/usefulinformation/">Useful information</a></li>
<li><a title="Home &amp;raquo; arts.ac.uk &amp;raquo; University Home &amp;raquo; London College of Fashion &amp;raquo; Courses &amp;raquo; Short Courses &amp;raquo; A-Z index of short courses" href="/courses/../short-courses/a-z/">A-Z list of short courses</a></li>
<li><a title="Home &amp;raquo; arts.ac.uk &amp;raquo; University Home &amp;raquo; London College of Fashion &amp;raquo; Courses &amp;raquo; Short Courses &amp;raquo; Contact us &amp;amp; information &amp;raquo; Contact us" href="/courses/../short-courses/contact/">Contact us</a></li>
</ul></div>
               </div>
<div id="inner-right">
<!-- navigation object : Left Offset -->
<?php if (!isset($shortEnv)) { $shortEnv = FALSE; } ?>
<?php if ($shortEnv == TRUE) { 
$test = new ShortCourse('FOOTWEoB95','lcf');
$r = $test->returnXml();
$title = $test->title();
$t = $test->dates();
$c = $test->datesChildren();
$tutors = $test->getTutors();
$description = $test->Truncate($test->description(), 300);
$desc_accordion = $test->description_acc();
$materials_accordion = $test->materials();

?>

<div class="row">
  <div class="l-content  block  __text  __with-aside">
     <div class="text">
        <!-- Return description from XML file -->
      <p class="leader"><?php echo $description; ?></p>
 	<!-- Return optionla tutor information, will need to add a conditional element in site manager -->
 	<p class="tutor">
  	<strong>Taught by: </strong>
  		<?php echo $tutors ; ?>
 	</p>
    </div>
   </div>
</div>
<!-- Slider navigation object here -->

<div class="row">
  <div class="accordion">
     <div id="st-accordion" class="st-accordion">
        <ul class="accordion-list">

        <!-- navigation object : Accordion item --><li class="accordion-list-item">
  <a class="accordion-list-anchor" href="#"><h3 class="size-h4">Description</h3><div class="st-arrow icon circled-plus">⊕</div></a>
  <div class="st-content">
<?php echo $desc_accordion ; ?>
  </div>  
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Materials</h3><div class="st-arrow icon circled-plus">⊕</div></a>
    <div class="st-content">
                    <?php echo $materials_accordion ; ?>
                    
    </div>
</li>

        </ul>
      </div>
  </div>
</div> 

<!-- Table Acordion -->

      <div class="row">
        <div class="l-content-full-width block table-responsive">
      <h2>Details for booking</h2>
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
    <td ><ol><li>


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
            </div>

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

    $cache_file = "/web/sites/t4shortcoursecache/ci-".$courseids."-".$companyid.".txt";
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

$xml = @simplexml_load_string(courseDatesCache('FOOTWEoB95', 'lcf'));

?>
	<ul id="tab-buttons" class="mootabs_title">
    <li title="glance"><a href="#glance">At a Glance</a></li>
    <li title="materials"><a href="#materials">Materials</a></li>
          
          	<?php 
	$csm = ('lcf');
		if ( $csm <> 'csm' ) {
			?>
    <li title="course-booking"><a href="#course-booking">Dates &amp; Prices</a></li>
          	<?php 	
			}  // End of Dates and Prices tab
			?>
</ul>

<div id="glance" class="course-tab mootabs_panel section-purple">

<div id="course-info-wide">
    <h3><?php echo $xml->course["label"];?></h3>

          	<?php 
	$csm = ('lcf');
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
	$csm = ('lcf');
		if ( $csm <> 'csm' ) {
?>

	<div class="course-image section-solid-purple">
        <img  src="/courses/../short-courses/by-subject/footwear/footwear-design/short_courses_shoedesign_rdax_110x110_100.jpg"  width="110"  height="110"  alt=""  />
    </div>    
          	<?php 	
} //End of Image
?>

    <div id="glancecontent" class="course-tab-content">
<?php echo $xml->course->description;?>



          	<?php 
	$csm = ('lcf');
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
	$csm = ('lcf');
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
<div id="materials" class="course-tab mootabs_panel section-purple">
<div id="materialscontent" class="course-tab-wrapper">
<?php echo $xml->course->materials;?>
</div>
</div><!--materials -->

	<?php 
	$csm = ('lcf');
		if ( $csm <> 'csm' ) {
			// Dates content generated for non-CSM courses
		?>
		
			<div id="course-booking" class="course-tab mootabs_panel section-purple">
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
<?php } ?>            </div><!-- navigation object : Left Image Inline Float -->
</div>
            <div id="side-bar">
               <!-- navigation object : Site Search --><div id="site-search">
   <!-- Google CSE Search Box Begins -->
   <h4>Site Search</h4>
   <form id="cse-search-box" action="http://www.fashion.arts.ac.uk/site-search/" class="bodycopy">
      <input type="hidden" name="cx" value="017699431643206132718:st9hhvy4ehc" />
      <input type="hidden" name="cof" value="FORID:11" />
      <input type="hidden" name="ie" value="UTF-8" />
      <input name="q" type="text" />
      <p><input type="image" class="rollbtn" src="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/images/btn-go.gif" alt="Go" name="submit-image" /></p>
      <!-- rollover button <img src="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/images/btn-go-over.gif" alt="" style="width : 35px; height : 18px;    " />-->
   </form>
   <!-- Google CSE Search Box Ends -->
</div>
               <!-- navigation object : Related Links --><div id="related-links">
<h4>Related links</h4>
<ul class="side-panel">
<li><a href="/courses/../short-courses/by-subject/footwear/footwear-design-2/">Footwear design 2</a></li><li><a href="/courses/../short-courses/gallery/footwearpatterncuttinggallery/">Shoe making: gallery </a></li><li><a href="/courses/../short-courses/gallery/footwear-jewellery-accessories/">Footwear, jewellery and accessories: video</a></li><li><a href="/courses/../short-courses/usefulinformation/studenttestimonials/mimifootweardesign/"></a></li><li><a href="/courses/../short-courses/usefulinformation/shortcourseaccommodationoptions/">Short Course Accommodation </a></li><li><a href="/courses/../short-courses/usefulinformation/immigrationguidanceforoverseasstudents/">Immigration information for Non-EU/EEA students</a></li><li><a href="/courses/../short-courses/by-subject/footwear/footwearpatterncutting/">Footwear pattern cutting</a></li></ul>
</div>
               <!-- navigation object : Social Links -->
               <!-- navigation object : below_search_box_inherits --><div>
<h4>My Account</h4>
                <iframe id="basket" name="basket" frameborder="0" src="http://arts.accessplanit.com/accessplan/pid-lcf/config/arts/pages/integrationmenu.aspx">
                    <p>Your browser does not support iframes.</p>
                </iframe>
</div>
            </div>
         </div>
         <!-- navigation object : Footer Boxes -->
         <!-- navigation object : Footer Links --><ul id="footer">
  <li><a href="/about/contact/"><span>Contact Us</span></a></li>
   <li><a href="/about/locations/"><span>Find Us</span></a></li> 
   <li><a href="http://www.arts.ac.uk/accessibility/"><span>Accessibility</span></a></li>
   <!--<li><a href="http://www.fashion.arts.ac.uk/sitemap-en.xml"><span>Sitemap</span></a></li>-->
   <li><a href="http://www.fashion.arts.ac.uk/brochure/"><span>Prospectus?</span></a></li>
</ul>
         <div class="grid_16"><p class="copyright"><!-- navigation object : Copyright text -->&copy; 2013 University of the Arts London All Rights Reserved.
<!-- this <?php echo date(‘Y’); ?> does not work --></p></div>
      </div><!-- #wrapper -->
   </body>
    <!-- navigation object : Google-hosted jQuery --> <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

<!-- Jquery cookie -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/artsacukstyleassets/component-library/javascript/jquery.cookie.js"></script>
		
    <!-- wayfinder.js --><script type="text/javascript" src="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/js/wayfinder.js"></script>
    <!-- jQuery Tools --><script type="text/javascript" src="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/js/jquery.tools.min.js"></script>
    <!-- common.js --><script type="text/javascript" src="http://www.arts.ac.uk/media/artsacukstyleassets/styleassets/js/jquery.common.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>

    <!-- navigation object : Inline javascript --><script>
jQuery(document).ready(function($) {

// initialise tabs with history functionality
$("#tab-buttons").tabs(".course-tab", { history: true });

// re-position the old course links list to the bottom of the right sidebar
$('.links').prepend($('#move-links').html());
	
if ($('#main-course-image').find('.item').length < 2) {
    $('#paginate, #main-course-image .nextPage, #main-course-image .prevPage').hide();
} else {	
    var api = $("#main-course-image .scrollable").scrollable({ size: 1, clickable: false, api: true });
			
    // insert the pagination counter
    var printIndex = api.getIndex() + 1;
    $('#paginate').append(printIndex + " / " + api.getSize());
			
    // update the pagination counter onSeek
    api.onSeek(function(e, index) {
	var printIndex = index + 1;
	$('#paginate').empty().append(printIndex + " / " + this.getSize());
    });
}

// initialise mini scrollables - revealing the arrows if there is overflow
var mini = $('.mini');
		
mini.each( function(i) {
	if ($(this).find('.item').length > 2) {
		$(this).parent().find('.next').removeClass('disabled');
		$(this).scrollable();
	}
});

});
</script>
    <!-- navigation object : Section javascript -->

<!-- navigation object : course_search_nav_item --><style type="text/css">
/* STYLES FOR BLACK BAR AT THE TOP OF THE PAGE */
  body {
    padding: 0;
    margin: 0;
  }
  .container {
    margin-top: 18px;
  }
 #topbar {
    background: #000;
    position: relative;
    top: 0px;
    left: 0;
    width: 100%;
    height: 24px;
  }

#findernav {
display: block;
overflow: hidden;
}

#wrapper {
margin-top:18px;
}

 body.ual #topbar {
    background: #000;
    position: relative;
    top: 0px;
    left: 0;
    width: 100%;
    height: 25px;
  }
   #topbar #global {
    width: 940px;
    margin: 0 auto;
  }
   #topbar #global a {
    color: #fff;
   background: transparent;
   text-decoration: none;
   font-size: 14px;
  }
   #topbar #global li {
    list-style-type: none;
    display: inline;
    color: #fff;
    margin-left: 25px;
    line-height: 25px;
    float: right;
  }

  #topbar #global li a#open.inactive {
    background-image: url(http://www.arts.ac.uk/css/bootstrap/images/arrow-down-white.jpg);
    background-repeat: no-repeat;
    background-position: right;
    padding-right: 24px;

  }
  #topbar #global li a#open.inactive:hover {
    background-image: url(http://www.arts.ac.uk/css/bootstrap/images/arrow-down-blue.jpg);
    color: #00b3ff;
  }
  #topbar #global li a#close.active {
    background-image: url(http://www.arts.ac.uk/css/bootstrap/images/arrow-up-blue.jpg);
    background-repeat: no-repeat;
    background-position: right;
    padding-right: 24px;
    color: #00b3ff;
  }
  #topbar #global li a#close.active:hover {
    background-image: url(http://www.arts.ac.uk/css/bootstrap/images/arrow-up-white.jpg);
    color: #fff;
  }

   #topbar #topnav {
    float: right;
  }
    div#coursebgfilter {
    display:none;
    position:fixed;
    _position:absolute; /* hack for internet explorer 6*/
    height:100% !important;
    width:100%;
    top:22px;
    left:0;
    background:#000000;
    z-index:9999;
  }
   #finder {
    width: 100%;
    position: absolute;
    top:24px;
    left:0px;
    z-index: 99999;
  }
   #finder #cfiframe {
    width: 100%;
    height: 530px;
  }  
   #finder object {
    width: 100%;
    height: 530px;
  }  
</style><!--[if lt IE 9]>
  <script type="text/javascript">

  // for IE browsers
  var coursefinderHTML= "<div id='topbar'>"
    + "<div id='global'>"
    + "<ul id='findernav'>"
    + "<li><a title='Open course finder' class='inactive' href='http://www.arts.ac.uk/course-finder/index.php'>Course finder</a></li>"
    + "</ul>"
    + "</div>"
    + "</div>";

    jQuery("body").prepend(coursefinderHTML);
  </script>
<![endif]-->

<!--[if !IE]><!-->

<script type="text/javascript">

    // for all other browsers
    var coursefinderHTML= "<div id='topbar'>"
      + "<div id='global'>"
      + "<ul id='findernav'>"
      + "<li><a id='open' title='Open course finder' class='inactive' href='#'>Course finder</a><a id='close' title='Close course finder' class='active' href='#'>Course finder</a></li>"
      + "</ul>"
      + "</div>"
      + "</div>"
      + "<div id='finder'>"
      + "<iframe src='http://www.arts.ac.uk/course-finder/index.php' frameborder='0' id='cfiframe'></iframe>"
      + "</div>"
      + "<div id='coursebgfilter'></div>";

      jQuery("body").prepend(coursefinderHTML);
</script>
<!--<![endif]-->



<script type="text/javascript">


// hide the course finder and close link
jQuery('#finder').hide();
jQuery('#close').hide();

// enable popup
function enablePopup(){
    jQuery("#coursebgfilter").fadeIn("slow");
    jQuery("#finder").fadeIn("slow");
  }

// disable popup 
function disablePopup(){
    jQuery("#coursebgfilter").fadeOut("slow");
    jQuery("#finder").fadeOut("slow");
  }

// hide open link, show iframe and, show close link
jQuery("#open").click(function () {
      jQuery(this).hide();
      jQuery('#close').show();
      jQuery("#coursebgfilter").css({
      "opacity": "0.8"
    });
    enablePopup();
});

jQuery("#openfrompage").click(function () {
      // jQuery(this).hide();
      // jQuery('#close').show();
      jQuery("#coursebgfilter").css({
      "opacity": "0.8"
    });
    enablePopup();
});

// hide close link, hide iframe and, show open link
jQuery("#close").click(function () {
    jQuery(this).hide();
    jQuery('#open').show();
    disablePopup();
});

// hide iframe 
jQuery("#coursebgfilter").click(function () {
      jQuery('#open').show();
      jQuery('#close').hide();
    disablePopup();
});
</script>

</html>
