<?php 

	if(class_exists('ShortCourse') != true) 
	{

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

		    $cache_file = "/web/sites/t4www/www.arts.ac.uk/ci-".$courseids."-".$companyid.".txt";
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
		
		public function getCourseID() {
			$courseID = strip_tags($this->courseIds);
			return $courseID;
		}
				
		public function description() {
			$description = strip_tags($this->xml->course->description);
			return $description;
		}

		public function description_acc() {
			$description_acc = $this->xml->course->description;
			return $description_acc;
		}
		
		
		public function materials() {
			$materials = strip_tags($this->xml->course->materials);
			return $materials;
		}
		
		public function title() {
			$title = $this->xml->xpath('/courses/course/@label');
			foreach ($title as $key => $value) {
				return $value;
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

		public function getTutors() {
			 if (!empty ($this->xml->tutors)) {
				$a = 1;
				foreach($this->xml->tutors->children() as $tutor) {
					$tutor["value"];
					if ( $a <> 1 ) {echo ", ";} 
					$a = $a+1;
					return $tutor["name"]; 
				} // End of For each tutor

			} //End of if not empty
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
}
?>