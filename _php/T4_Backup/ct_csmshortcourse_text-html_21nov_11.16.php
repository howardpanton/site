<?php
if (!isset($shortEnv)) { $shortEnv = FALSE; }
if ($shortEnv == TRUE) { 
$test = new ShortCourse('<t4 type="content" name="Course ID" output="normal" modifiers=""  />','<t4 type="navigation" id="149"/>');
$r = $test->returnXml();
$title = $test->title();
$t = $test->dates();
$c = $test->datesChildren();
$description = $test->Truncate($test->description(), 300);
$desc_accordion = $test->description_acc();
$materials_accordion = $test->materials();
$shortCourse = TRUE;

// tutors data


$pid_check = $test->companyId ;
switch ($pid_check) {
  case 'LCC':
    $pid = 'lcc';
    break;
  case 'CSM':
    $pid = 'csm';
    break;
  case 'LCF':
    $pid = 'lcf';
    break;
  case 'CHELSEA':
    $pid = 'chelsea';
    break;
  case 'WIMB':
    $pid = 'wimb';
    break;
  case 'CAMB':
    $pid = 'camb';
    break;
  default:
    $pid = '';
    break;
}
?>

<div class="row">
  <div class="l-content  block  __text  __with-aside">
        <!-- Return description from XML file -->
      <p class="leader"><?php echo $description; ?></p>
         <?php $test->getTutors(); ?>
   </div>
     <aside>
        <h4>My Account</h4>
          <iframe id="basket" name="basket" frameborder="0" src="http://arts.accessplanit.com/accessplan/pid-<?php echo $pid ; ?>/config/arts/pages/integrationmenu.aspx">
              <p>Your browser does not support iframes.</p>
          </iframe>
  </aside>   
</div>
<!-- Slider navigation object here -->

<div class="row">
  <div class="accordion">
     <div id="st-accordion" class="st-accordion">
        <ul class="accordion-list">

        <!-- navigation object : Accordion item -->
        <li class="accordion-list-item">
  <a class="accordion-list-anchor" href="#"><h3 class="size-h4">Description</h3><div class="st-arrow icon icon-plus-circled"></div></a>
  <div class="st-content">
<?php echo $desc_accordion ; ?>
  </div>  
</li>
  <?php $test->getTutorsBiography(); ?>
<li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Materials</h3><div class="st-arrow icon icon-plus-circled"></div></a>
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

<?php 
if (!empty ($t)) { ?>
         <div class="table-container">
    <table class="data-table" >
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
<?php foreach($c as $date) {

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

                                                    
            <td ><a onclick="addToBasket(<?php echo $date["coursedateid"];?>, '<?php echo addslashes($title);?>', '<?php echo $date["startdate"];?> - <?php echo $date["enddate"];?>', '<?php echo $date["starttime"];?> - <?php echo $date["endtime"];?>', '<?php echo round($date["cost"],0);?>', '<?php echo addslashes($venuename[0]['name']); ?>');return false;" href="#">Add to Basket</a></td>
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
          </div>
<?php if ($test->companyId == "csm") : ?>
  <p>Alternative Dates and Times<br />
Many of our courses are repeated throughout the year. If the above dates is not suitable for you, 
or there are no dates showing for this session, then please <a href="http://www.arts.ac.uk/csm/courses/short-courses/browse-short-courses/">choose an alternative session</a>.</p>

<?php endif ?>
            <?php 

    } // End of CSM dates box

    else {
      echo "<p>There are no dates available please contact the college for any future dates.</p>";
    }
    ?>

      </div>
            </div>



<!-- insert nav object for related links (like Downloads list) -->
<t4 type="navigation" id="4449" />

<!-- insert nav object for gallery -->
<t4 type="navigation" id="4429" />

<div id="basketmessage"><div id="close" style="text-align:right;"><a onclick="hideBasketMessage();return false;" href="#">x</a></div><br /><h2>1 Course was added to your basket </h2><p><br />[Course Name]<br />[Course Date], [Course Time]<br />[Course Venue], £[Course Cost]</p><p>Your place is not confirmed until you’ve completed your booking</p><br />
<a onclick="hideBasketMessage();return false;" href="#">Add another course</a><div style="display: inline; margin-left: 30px; margin-right: 30px;">&nbsp;</div><a onclick="openBasket();return false;" href="#">Book now</a></div>

<?php // run the normal old-style output
} else { ?>
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

$xml = @simplexml_load_string(courseDatesCache('<t4 type="content" name="Course ID" output="normal" modifiers="htmlentities"  />', '<t4 type="navigation" id="149"/>'));

?>
  <ul id="tab-buttons" class="mootabs_title">
    <li title="glance"><a href="#glance">At a Glance</a></li>
    <li title="materials"><a href="#materials">Materials</a></li>
          
            <?php 
  $csm = ('<t4 type="navigation" id="149"/>');
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
  $csm = ('<t4 type="navigation" id="149"/>');
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
  $csm = ('<t4 type="navigation" id="149"/>');
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
  $csm = ('<t4 type="navigation" id="149"/>');
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
  $csm = ('<t4 type="navigation" id="149"/>');
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
    <td style="text-align:left;vertical-align:top;">


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

</td>

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
  $csm = ('<t4 type="navigation" id="149"/>');
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