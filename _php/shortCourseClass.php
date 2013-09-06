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
