<?php $shortEnv = TRUE ; ?><?php 

function environment() {
	
	// get the value of the server uri
	$uri = $_SERVER['REQUEST_URI'];

	if (strpos($uri, 'phppreview') !== false) {
		$environment = 'cms';
	} else {
		$environment = 'live';
	}

	return $environment;
}

// get site URL for reSRC.it calls
function siteURL() {
	$siteURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {$siteURL .= "s";}
		$siteURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$siteURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"];
	} else {
		$siteURL .= $_SERVER["SERVER_NAME"];
	}
	return $siteURL;
}

?><?php
    // Block class
// check whether class exists
if(class_exists('Block') != true) 
{
/**
 * 2, 3, 4 up Block class for building block object from an array
 */
class Block {
  // Block layout, content or featured
  // Block template, 2up, 3up or 4up
  public $template; // 2up, 3up or 4up
  public $component; //  content or fullwidth
  public $heading; // main block heading
  public $array; // blocks content array


  /**
   * [__construct description]
   *
   * @param array   $array     [array of content]
   * @param string  $template  [set whether it is a 2up, 3up or 4uip]
   * @param string  $component [set whether it is fullwidth or content width]
   * @param string  $heading   [set component heading]
   */
  public function __construct( array $array = array(), $template = "default", $component = "default", $heading = "default" ) {
    $this->array = $array;
    $this->template = $template;
    $this->component = $component;
    $this->heading = $heading;
  }

  /**
   * [__destruct destroy array after completion]
   */
  public function __destruct() {
    unset( $this->array );
  }

  /**
   * [environment check whether on local or live site]
   * @return [string] [server environment]
   */
  public function environment() {
    // get the value of the server uri
    $uri = $_SERVER['REQUEST_URI'];

    if (strpos($uri, 'phppreview') !== false) {
      $environment = 'cms';
    } else {
      $environment = 'live';
    }

    return $environment;
  }

  public function component() {

    switch ($this->component) {
        case "feature":
            $b = "l-content-full-width";
            break;
        case "content":
            $b = "l-content";
            break;
        default:
           $b = "default";
    }
    return $b;
  }

  /**
   * [set_component_start output opening div]
   */
  public function set_component_start() {
    
    if  ( $this->template == "four-up" ) {
      $compenent_four_up = "</div>";
    }

    $component_start = "<div class=\"row\">";
    $component_start .= "<div class=\"" . $this->component() . " block  __media  " .  $this->template  . "\">";
    
    if ( $t == "four-up" ) {
      echo $compenent_four_up;
    }
      echo $component_start;
  }

  /**
   * [set_component_end output closing divs and check whether it is a four-up]
   */
  public function set_component_end() {

    if ( $this->template == "four-up" ) {
      $compenent_four_up_end = "<div class=\"row\">";
      $compenent_four_up_end .= "<div role=\"main\" class=\"content\">";
    }

    $component_end = "</div> <!-- end image-block -->";
    $component_end .= "</div> <!-- end row -->";

    echo $component_end;

    if ( $this->template == "four-up" ) {
      echo $compenent_four_up_end;

    }
  }

  /**
   * [set_block_output output the content for the blocks]
   */
  public function set_block_output() {
    $this->set_component_start();
    if ( !$this->heading == "" ) :
      echo  "<h2>" . $this->heading . "</h2>";
    endif;

    echo "<ul>";

      for ( $i = 0; $i < count( $this->array ); $i++ ) {
        echo "<li>";

      if (!$this->array[$i]['video-url'] == "" ) { 
      
          echo "<video src=\"" .$this->array[$i]['media']. "\" style=\"width:100%;height:100%;\" controls=\"control\" preload=\"none\">";
          echo "<source src=\"" .$this->array[$i]['video-url']. "\" type=\"video/youtube\"/>";
          echo "</video>";
      }

      if ( !$this->array[$i]['image'] == "" ) {
      echo "<figure class=\"feature\">";

        if ( !$this->array[$i]['section_link'] == "" ) {
          echo "<a href=\""  . $this->array[$i]['section_link'] . "\"title=\"" . $this->array[$i]['link_title'] . "\">" ;
        }
              // If we're working in the CMS, reveal the original upload
              if ($this->environment() == 'cms') {
                echo "<img src=\""  . $this->array[$i]['image'] . "\" alt=\"Image Alt\">";
              // otherwise, load a resrc'd image
              } else { 
                echo "<img data-src=\"http://app.resrc.it/o=60/" . siteURL() . $this->array[$i]['image'] . "\" alt=\"Image Alt\" class=\"resrc\">";
              }

        echo "</a>";
        if ( !$this->array[$i]['credit'] == "" ) {
          echo "<div class=\"credits\">" . $this->array[$i]['credit'] . "</div>";
        }

        if ( !$this->array[$i]['figcaption'] == "" ) {
          echo "<figcaption><span>" . $this->array[$i]['figcaption'] . "</span></figcaption>";
        }

        echo "</figure>";

      }
      // end image

      if ( !$this->array[$i]['title'] == "" ) {
        
        if ( !$this->array[$i]['section_link'] == "" ) {
          echo "<h3><a href=\"" . $this->array[$i]['section_link'] . "\" title=\"". $this->array[$i]['title'] . "\">" . $this->array[$i]['title'] . "</a></h3>";
        } else {
          echo "<h3>" . $this->array[$i]['title'] . "</h3>";
        }
        
      }

      if ( !$this->array[$i]['text'] == "" ) {
        echo "<p>" .  $this->array[$i]['text'] . "</p>";
      }

      // if the user wants a button
      if ( !$this->array[$i]['button_link_text'] == "" ) { 
        echo "<p><a href=\"";
          if (!$this->array[$i]['external_link'] == "") { // use the external link if supplied
            echo $this->array[$i]['external_link'];
          } else { // use the original section link
            echo $this->array[$i]['section_link'];
          }  
        echo "\" class=\"button-link\" title=\"" . $this->array[$i]['link_title'] . "\"><span class=\"hide-descriptive-text\">Follow this link to go to more information about</span>" . $this->array[$i]['button_link_text'] . "</a></p>";
      }

      echo "</li>";

    }

    echo "</ul>";


    $this->set_component_end();
  }


} // Block Class declaration


} // end check if class_exists

?><?php

if(class_exists('Course') != true) 
{
	
	class Course {
    		// Create course object
    		public function __construct(Array $properties = array()) {
	
//		public static function get_college($query) {
//			parse_str($_SERVER['QUERY_STRING']);
//		}
//	
		function set_college($properties) {
		    parse_str($_SERVER['QUERY_STRING']);
		    if (isset($college)) {
		    	$d = urldecode($college);
		    }
		    if (isset($level)) {
		    	$l = urldecode($level);
		    }
		    if (isset($mode)) {
		    	$m = urldecode($mode);
		    }

		    //$m = urldecode($mode);
		    if ( isset($d)  ) {
		    	$t = $properties['college'] == $d;

		    }

		    if ( isset($l)  ) {
		    	$t = $properties['level'] == $l;

		    }
		    if ( isset($m)  ) {
		    	$t = $properties['mode'] == $m;

		    }  

		    if (isset($d) && isset($l) ) {
		    	$t = $properties['college'] == $d && $properties['level'] == $l;
		    }
		    if (isset($d) && isset($m) ) {
		    	$t = $properties['college'] == $d && $properties['mode'] == $m;
		    }
		    if (isset($l) && isset($m) ) {
		    	$t = $properties['level'] == $l && $properties['mode'] == $m;
		    }
		    
		    return($t);
	
		}
 
 			if (!empty($_GET)) {

			$test = array_filter($properties, "set_college");
					//print_r($test);
			} else {
				$test = $properties ;
			}
			     foreach($test as $key => $value) {
        		$this->{$key} = $value;
      		}
    		}

	}

}

?><?php
// check whether class exists
if(class_exists('AZ') != true) 
{

	class AZ {

		public $array; // profiles content array

		/**
		 * [__construct description]
		 *
		 * @param array   $array     [array of content]
		 */
		public function __construct( array $array = array() ) {
			$this->array = $array;
		}

		/**
		 * [__destruct destroy array after completion]
		 */
		public function __destruct() {
			unset( $this->array);
		}


		/**
		 * [get_first_word - extract the first_word from title field]
		 */
		public function get_first_word($name) {

			$name = trim($name);
			$pos = strpos($name, ' ');

			if ($pos === false) {
				$first_word = $name;
			}

			$first_word = substr($name, 0, $pos);
			
			//return trim($first_word);
			return trim($first_word);
			
		}


		/**
		 * [get_last_word - extract the last_word from title field]
		 */
		public function get_last_word($name) {

			$name = trim($name);
			$pos = strrpos($name, ' ');

			if ($pos === false) {
				$last_word = $name;
			}

			$last_word = substr($name, $pos);
			
			//return trim($first_word);
			return trim($last_word);
			
		}


		/**
		 * [alpha_sort_array - sort our array by a custom orderby parameter]
		 */
		public function alpha_sort_array($array, $orderby) {

			$sortArray = array(); 

			foreach($array as $item){ 
				
			    foreach($item as $key=>$value){ 
			        if(!isset($sortArray[$key])){ 
			            $sortArray[$key] = array(); 
			        } 
			        $sortArray[$key][] = $value; 
			    } 
			} 

			array_multisort($sortArray[$orderby],SORT_ASC,$array); 

			return $array;

		}


		/**
		 * [enhance_arrays - push additional values into our existing $this->array]
		 */
		public function enhance_arrays() {

			$enhancedArray = array();
			$enhancedItemArray = array();

			foreach($this->array as $item){ 

				$first_word = $this->get_first_word($item['title']);
				$last_word = $this->get_last_word($item['title']);

				//echo $this->get_first_word($item['title']);
				//echo $this->get_last_word($item['title']);

				foreach($item as $key=>$value){ 
					$enhancedItemArray[$key] = $value;
					$enhancedItemArray['first_word'] = $first_word;
					$enhancedItemArray['last_word'] = $last_word;
					$enhancedItemArray['first_word_letter'] = $first_word[0];
					$enhancedItemArray['last_word_letter'] = $last_word[0];
				}

				$enhancedArray[] = $enhancedItemArray;
			}

			return $enhancedArray;

		}



		public function do_item_loop($item) {
		?>
			<li class="row">
				<!--<figure>
					<a href="<?php echo $item['section_link']; ?>" title=""><img src="http://placehold.it/300x300&text=THUMBNAIL" alt="Image Alt"></a>
				</figure>-->
				<div class="text">
					<h3 class="size-h5"><a href="<?php echo $item['section_link']; ?>" title=""><?php echo $item['title']; ?></a></h3>
					<?php if ($item['teaser'] != '') { echo "<p>" . $item['teaser'] . "</p>"; } ?>
				</div>
			</li>
		<?php 	
		}



		/**
		 * [do_output output the content for the blocks]
		 */
		public function do_output($orderby) {
			
			$enhanced = $this->enhance_arrays();

			$sorted = $this->alpha_sort_array($enhanced, $orderby);

			// pump out A-Z letter scroll
			if ($orderby == 'first_word') { 
				$letter = 'first_word_letter'; 
			} else {
				$letter = 'last_word_letter'; 
			}
			?>
			
			<div class="row">
				<div class="a-to-z">
					<ul class="js-carousel" data-carousel-item-width="48" data-carousel-item-margin="12" data-carousel-min-items="6"> 
					<?php		
					$temp_letter = '';
					foreach ($sorted as $item) { 
						if ( $item[$letter] != $temp_letter ) {
							echo '<li class="slide"><a href="#'.$item[$letter].'">'.$item[$letter].'</a></li>'; 
						}
						$temp_letter = $item[$letter];
					}
					?>
					</ul>
				</div>
			</div>
				
			<div class="row">
				
				<?php	
				$temp_letter = '';
				$counter = 1;
				$item_count = sizeof($sorted);

				foreach ($sorted as $item) { 

					if ( $item[$letter] != $temp_letter ) { 

						if ($counter > 1) { ?>	

									</ul>
								</div><!-- .l-content -->
							</div><!-- .row -->	

						<?php } ?>

							<div class="row  az-group" id="<?php echo $item[$letter]; ?>" data-group="<?php echo $item[$letter]; ?>">
								<h2 class="az-letter"><?php echo $item[$letter]; ?></h2>
								<div class="image-list-with-text-content">
									<ul>

					<?php }

					$this->do_item_loop($item);

					if ($counter == $item_count) { ?>

									</ul>
								</div><!-- .l-content -->
							</div><!-- .row -->	
					<?php
					}

					$temp_letter = $item[$letter];
					$counter++;

				} // end foreach ?>

			</div><!-- .row -->
		<?php
		} 

	} // AZ Class declaration

} // end check if class_exists

?><?php 

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

		public function description_acc() {
			$description_acc = $this->xml->course->description;
			return $description_acc;
		}
		
		
		public function materials() {
			$materials = $this->xml->course->materials;
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
			$array = get_object_vars($dates);
			if (empty($array)) {
				return FALSE;
				} else {
					return $array;
			}
		}
		
		public function datesChildren() {
			$datesChildren = $this->xml->course->dates->children();
			return $datesChildren;
		}

		public function getTutors() {
			$tutors = $this->xml->tutors->children();
			if (empty($tutors)) {
				return FALSE;
			} else {
				$a = 1;
				echo "<p class=\"tutor\"><strong>Taught by: </strong>";
				foreach($this->xml->tutors->children() as $tutor) {
					$tutor["value"];
					if ( $a <> 1 ) {echo ", ";} 
					$a = $a+1;
					echo $tutor["name"]; 
				} // End of For each tutor
				echo "</p>";
			}
		}

		public function getTutorsBiography() {
			$tutors = $this->xml->tutors->children();
			if (empty($tutors)) {
				return FALSE;
			} else {
				$a = 1;

				echo '<li class="accordion-list-item"><a class="accordion-list-anchor" href="#"><h3 class="size-h4">Tutor information</h3><div class="st-arrow icon-plus-circled"></div></a>
            <div class="st-content">';
	
				foreach($this->xml->tutors->children() as $tutor) {

					echo "<p>" . $tutor->description . "</p>"; 
				} // End of For each tutor

				echo '</div></li>';
			}
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
	$title = "John Doe"; 
	if (!empty($title)) {
  
  	echo "<title>" . $title.  " - University of the Arts London</title>";
  
	} else {
  
  	echo "<title> University of the Arts London</title>";
  
	}
    
    ?>
    <meta charset='utf-8'>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible"'>
    <meta content='on' http-equiv='cleartype'>
    <meta content='University of Arts London, Web Team' name='author'>
    <!-- Meta description tag -->
    
    <link rel="dns-prefetch" href="//s3.amazonaws.com">
    <link rel="dns-prefetch" href="//ajax.googleapis.com">
    <link rel="dns-prefetch" href="//app.resrc.it">
    <link rel="dns-prefetch" href="//www.google-analytics.com">
<!-- The fav icons -->
    <link rel="shortcut icon" href="http://www.arts.ac.uk/media/beta/beta-assets/img/favicon.ico" />
    
<!-- screen.css -->    
<link rel="stylesheet" type="text/css" media="screen" href="http://www.arts.ac.uk/media/beta/beta-assets/css/screen.css" />
    
    <!-- Temporarily remove LCC image borders inside sliders, to fix bug in FF with royalSlider -->
    <style>
      .lcc .royalSlider img { border: 0 !important;} 
    </style>
    
<!-- fonts.css -->
<!-- <link rel="stylesheet" type="text/css" media="" href="http://www.arts.ac.uk/media/beta/beta-assets/fonts.css" /> -->
    
<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7258632/627802/css/fonts.css" />
    

<!--[if (lt IE 9) & (!IEMobile)]>
    <script src='http://artslondon.github.io/beta/assets/js/libs/selectivizr-min.js'></script>
    <script src="http://artslondon.github.io/beta/assets/js/libs/html5shiv.js"></script>
    <script src ='http://raw.github.com/scottjehl/Respond/master/respond.src.js'></script>
<![endif]-->
    
    
	<!-- JavaScript 
	<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/modernizr-2.6.2-min.js"></script>
   	<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/detectizr.min.js"></script>  
    	<script> Modernizr.Detectizr.detect({detectScreen:false}); </script>-->
    
    <script>function loadScript(e,t){var n,r,i;r=!1,n=document.createElement("script"),n.type="text/javascript",n.src=e,null==t&&(t=function(){}),n.onload=n.onreadystatechange=function(){var e=this.readyState;if(!(r||e&&"complete"!=e&&"loaded"!=e)){r=!0;try{t()}catch(n){}}},i=document.getElementsByTagName("script")[0],i.parentNode.insertBefore(n,i)}window.Modernizr=function(e,t,n){function r(e){m.cssText=e}function i(e,t){return r(b.join(e+";")+(t||""))}function s(e,t){return typeof e===t}function o(e,t){return!!~(""+e).indexOf(t)}function u(e,t){for(var r in e){var i=e[r];if(!o(i,"-")&&m[i]!==n)return t=="pfx"?i:!0}return!1}function a(e,t,r){for(var i in e){var o=t[e[i]];if(o!==n)return r===!1?e[i]:s(o,"function")?o.bind(r||t):o}return!1}function f(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+E.join(r+" ")+r).split(" ");return s(t,"string")||s(t,"undefined")?u(i,t):(i=(e+" "+S.join(r+" ")+r).split(" "),a(i,t,n))}var l="2.6.2",c={},h=!0,p=t.documentElement,d="modernizr",v=t.createElement(d),m=v.style,g,y={}.toString,b=" -webkit- -moz- -o- -ms- ".split(" "),w="Webkit Moz O ms",E=w.split(" "),S=w.toLowerCase().split(" "),x={svg:"http://www.w3.org/2000/svg"},T={},N={},C={},k=[],L=k.slice,A,O=function(e,n,r,i){var s,o,u,a,f=t.createElement("div"),l=t.body,c=l||t.createElement("body");if(parseInt(r,10))while(r--)u=t.createElement("div"),u.id=i?i[r]:d+(r+1),f.appendChild(u);return s=["&#173;",'<style id="s',d,'">',e,"</style>"].join(""),f.id=d,(l?f:c).innerHTML+=s,c.appendChild(f),l||(c.style.background="",c.style.overflow="hidden",a=p.style.overflow,p.style.overflow="hidden",p.appendChild(c)),o=n(f,e),l?f.parentNode.removeChild(f):(c.parentNode.removeChild(c),p.style.overflow=a),!!o},M={}.hasOwnProperty,_;!s(M,"undefined")&&!s(M.call,"undefined")?_=function(e,t){return M.call(e,t)}:_=function(e,t){return t in e&&s(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if(typeof t!="function")throw new TypeError;var n=L.call(arguments,1),r=function(){if(this instanceof r){var i=function(){};i.prototype=t.prototype;var s=new i,o=t.apply(s,n.concat(L.call(arguments)));return Object(o)===o?o:s}return t.apply(e,n.concat(L.call(arguments)))};return r}),T.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:O(["@media (",b.join("touch-enabled),("),d,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=e.offsetTop===9}),n},T.csstransforms=function(){return!!f("transform")},T.svg=function(){return!!t.createElementNS&&!!t.createElementNS(x.svg,"svg").createSVGRect};for(var D in T)_(T,D)&&(A=D.toLowerCase(),c[A]=T[D](),k.push((c[A]?"":"no-")+A));return c.addTest=function(e,t){if(typeof e=="object")for(var r in e)_(e,r)&&c.addTest(r,e[r]);else{e=e.toLowerCase();if(c[e]!==n)return c;t=typeof t=="function"?t():t,typeof h!="undefined"&&h&&(p.className+=" "+(t?"":"no-")+e),c[e]=t}return c},r(""),v=g=null,c._version=l,c._prefixes=b,c._domPrefixes=S,c._cssomPrefixes=E,c.testProp=function(e){return u([e])},c.testAllProps=f,c.testStyles=O,p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+k.join(" "):""),c}(this,this.document),Modernizr.addTest("fullscreen",function(){for(var e=0;e<Modernizr._domPrefixes.length;e++)if(document[Modernizr._domPrefixes[e].toLowerCase()+"CancelFullScreen"])return!0;return!!document.cancelFullScreen||!1});Modernizr.addTest("hidpi",function(){if(window.matchMedia){var e=window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");if(e&&e.matches)return!0}});</script>
    
   <!-- load icon files for logos and icons -->
     <script>
  /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "http://www.arts.ac.uk/media/beta/beta-assets/css/logos/logos.data.svg.css", "http://www.arts.ac.uk/media/beta/beta-assets/css/logos/logos.data.png.css", "http://www.arts.ac.uk/media/beta/beta-assets/css/logos/logos.fallback.css" ] );
  </script>
  <noscript><link href="http://www.arts.ac.uk/media/beta/beta-assets/css/logos/logos.fallback.css" rel="stylesheet"></noscript>
  </head>

<?php 
// By default, sections have H1 headings
$header = true;
$currentSectionID = "49900";
$levelThreeID = "51148";

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
    default:
    $sectionClass = "";
    	break;
}

// Set a body class based on the college section, for CSS namespacing
switch ($levelThreeID) {
    case '35288':
        $collegeClass = "camberwell college";
  	$menuHeading = '<a href="/camberwell" title="Camberwell College of Art">Camberwell College of Arts</a>';
        break;
    case '35289':
        $collegeClass = "csm college";
  $menuHeading = '<a href="/csm" title="Central Saint Martins">Central Saint Martins</a>';
        break;
    case '35290':
        $collegeClass = "chelsea college";
  $menuHeading = '<a href="/chelsea" title="Chelsea College of Art">Chelsea College of Arts</a>';
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
  	$menuHeading = '<a href="/wimbledon" title="Wimbledon College of Art">Wimbledon College of Arts</a>';
        break;
    default:
        $collegeClass = "ual";
        $menuHeading = "In this section";
}
?>

<body class="<?php echo $collegeClass . ' ' . $sectionClass; ?>  ">
 <!--[if lt IE 9]>
    <div style="line-height: 2;padding: 10px 0px 10px 80px; background-color:#e9e9e9;">
        <font face="Swiss721BT-Bold">The UAL website is best viewed in an alternative browser, such as Google Chrome, Mozilla Firefox or Safari.</font>
    </div>
<![endif]-->
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
            <a href="#" class="m-menu-btn-toggle"><span class="icon-menu-1"></span></a>
        </li> 
      <!-- Course Finder -->          
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick">Course Finder</a><!-- Begin Item -->
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
            <div class="dd-menu-dropdown-wrapper">
                <div class="d-course-finder-menu-panel row">
                    <div class="row relative">
                        <form method="" action="http://search.arts.ac.uk/s/search.html" class="d-search-input-form">
                            <input  accesskey="q" value="" class="course-finder-txt-input" type="text"  placeholder="Search for a course here" name="query">
                            <input type="hidden" value="simple" name="form">
                            <input type="hidden" value="courses" name="collection">
                            <input type="submit" name="submit-course-search" class="go-search-button" value="Go"/>
                            <div class="small-text-link"><a href="http://search.arts.ac.uk/s/search.html?query=&form=simple&collection=courses&submit-course-search=Go" >view all courses</a></div>
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
        <a href="#" class="megamenu_drop needsclick" title="">Colleges</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
            <div class="dd-menu-dropdown-wrapper">
                <div class="region college-nav">  
                    <ul class="subnav-1 region">
                        <li>
                           <a href="/camberwell/" title="Visit Camberwell">Camberwell College of Arts</a>
                        </li>
                        <li>
                          <a href="/csm/" title="Visit Central Saint Martins">Central Saint Martins (CSM)</a>
                        </li>
                        <li>
                       <a href="/chelsea/" title="Visit Chelsea">Chelsea College of Arts</a>
                        </li>
                        <li>
                      <a href="/lcc/" title="Visit London College of Communication">London College of Communication (LCC)</a>
                        </li>
                        <li>
                       <a href="/fashion/" title="Visit London College of Fashion">London College of Fashion (LCF)</a>
                        </li>
                        <li>
                       <a href="/wimbledon/" title="Visit Wimbledon">Wimbledon College of Arts</a>
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
        <a href="#" class="megamenu_drop needsclick" title="">Study at UAL</a>
        <!-- dropdown -->
            <div class="dropdown_fullwidth"> 
                <div class="dd-menu-dropdown-wrapper study-nav">
                    <ul class="subnav-1 no-pad-top region">
                        <li class="no-border-top"><a href="/study-at-ual/" title="Study at UAL">Study at UAL</a></li>
                        <li><a href="/study-at-ual/courses/">Courses</a></li><li><a href="/study-at-ual/postgraduate/">Postgraduate Study</a></li><li><a href="/study-at-ual/international/">International</a></li><li><a href="/study-at-ual/open-days/">Open Days</a></li><li><a href="/study-at-ual/apply/">Apply</a></li><li><a href="/study-at-ual/enrol/">Enrol</a></li><li><a href="/study-at-ual/tuitions-fees/">Tuition Fees</a></li><li><a href="/study-at-ual/scholarships-bursaries-and-loans/">Scholarships, Bursaries &amp; Loans</a></li><li><a href="/study-at-ual/financial-advice/">Financial Advice</a></li><li><a href="/study-at-ual/student-support/">Student Support</a></li><li><a href="/study-at-ual/library-services/">Library Services</a></li><li><a href="/study-at-ual/learning-and-teaching/">Learning &amp; Teaching</a></li><li><a href="/study-at-ual/term-dates/">Term Dates</a></li><li><a href="/study-at-ual/academic-regulations/">Academic Regulations</a></li><li><a href="/study-at-ual/accommodation/">Accommodation</a></li><li><a href="/study-at-ual/students-union/">Students' Union</a></li><li><a href="/study-at-ual/facilities/">Facilities</a></li><li><a href="/study-at-ual/widening-participation/">Widening Participation</a></li>
                    </ul>
                </div>
            </div><!-- End dropdown --> 
      </li>
      <!-- End Study at UAL -->


      <!-- Research --> 
      <!-- menu button -->
      <li>
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
        <a href="#" class="megamenu_drop needsclick" title="">Student Jobs &amp; Careers </a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth">  
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
              <div class="sub-inner-menu student-nav">
                <ul class="subnav-1  no-pad-top region" >
                    <li class="no-border-top"><a href="/student-jobs-and-careers/" title="Student jobs &amp; Careers" >Student Jobs &amp; Careers</a></li>
                    <li><a href="/student-jobs-and-careers/opportunities/">Opportunities</a></li><li><a href="/student-jobs-and-careers/events/">Events</a></li><li><a href="/student-jobs-and-careers/finding-work/">Finding Work</a></li><li><a href="/student-jobs-and-careers/resources/">Resources</a></li><li><a href="/student-jobs-and-careers/about-see/">About SEE</a></li>
                </ul>
              </div>
          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End Student Jobs & Careers -->


      <!-- Alumni & Friends --> 
      <!-- menu button -->
      <li>
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

          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End Alumni & Friends -->


      <!-- Business & Innovation --> 
<!-- menu button -->
<li>
  <a href="#" class="megamenu_drop needsclick" title="">Industry Links</a>
  <!-- dropdown -->
  <div class="dropdown_fullwidth"> 
    <div class="dd-menu-dropdown-wrapper">
      <div class="row region">
        <div class="sub-inner-menu industry-nav">
          <ul class="subnav-1 no-pad-top region" >
            <li><a href="/camberwell/business-and-innovation/">Camberwell Business &amp; Innovation</a></li><li><a href="/csm/business-and-innovation/">CSM Business &amp; Innovation</a></li><li><a href="/chelsea/business-and-innovation/">Chelsea Business &amp; Innovation</a></li><li><a href="/lcc/business-and-innovation/">LCC Business &amp; Innovation</a></li><li><a href="/fashion/business-and-innovation/">LCF Business &amp; Innovation</a></li><li><a href="/wimbledon/business-and-innovation/">Wimbledon Business &amp; Innovation</a></li><li><a href="/student-jobs-and-careers/finding-work/information-for-employers/">Information for Employers</a></li>
          </ul>
        </div>
        <div class="feature m-hide t-hide" >
          <p>
Businesses worldwide work with us to find creative solutions, discover fresh ideas and recruit new talent. Join them, and let us help you develop your future.
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
        <a href="#" class="megamenu_drop needsclick" title="">About UAL</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"> 
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
           
            <div class="sub-inner-menu about-nav">
              <ul class="subnav-1 no-pad-top region" >
                    <li class="no-border-top"><a href="/about-ual/" title="About UAL">About UAL</a></li>
                    <li><a href="/about-ual/news/">News</a></li><li><a href="http://ual.force.com/apex/eventpage">Events</a></li><li><a href="/about-ual/ual-showroom/">UAL Showroom</a></li><li><a href="/about-ual/work-at-ual/">Work At UAL</a></li><li><a href="/about-ual/support-our-creative-future/">Support Our Creative Future</a></li><li><a href="/about-ual/strategy-governance/">Strategy &amp; Governance</a></li><li><a href="/about-ual/press-office/">Press Office</a></li><li><a href="/about-ual/awarding-body/">UAL Awarding Body</a></li><li><a href="/about-ual/diversity/">Diversity</a></li><li><a href="/about-ual/departments/">Departments</a></li><li><a href="/about-ual/contact-ual/">Contact UAL</a></li>
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
        <a href="#" class="megamenu_drop needsclick search-icon icon-search"></a>
        <!-- Begin Item -->
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
          <div class="dd-menu-dropdown-wrapper">
          <div class="d-course-finder-menu-panel row">
            <div class="row relative">
              <form class="d-search-input-form"  method="" action="http://search.arts.ac.uk/s/search.html">
              <input class="course-finder-txt-input" type="text" required accesskey="q" value="" name="query" placeholder="Enter your search here">
                <input type="hidden" value="simple" name="form">
                <input type="hidden" value="website" name="collection">
                   <input type="submit" name="submit-site-search" class="go-search-button" value="Search"/>
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
<?php
if ($header != false) { ?> 
<div class="header-panel bg-gray-bg">
    <div class="header-wrapper">
  <div class="row">
          <!-- navigation object : Breadcrumbs --><div class="breadcrumbs"><a href="/">University of the Arts London</a><a href="/demo/">demo</a><a href="/demo/research/">Research</a><a href="/demo/research/staff-profiles/">Staff Profiles</a><a href="/demo/research/staff-profiles/john-doe/">John Doe</a></div>
    <div class="page-title">
      <h1><!-- navigation object : Section name -->John Doe</h1>
    </div>
  </div>  
    </div>
</div>
<?php } ?>

 <!-- section name -->
<!--<div class="content-wrapper">
  <div class="row">
    <div class="d5-d16">
      <h1>John Doe</h1>
    </div>
  </div>
  </div>-->
<!-- Add banner here -->
<div class="content-wrapper">

  <!-- Home page slider include -->
  
  
  <?php 

  if (($currentSectionID !== '33986') && ($currentSectionID !== '37512') && ($currentSectionID !== '37851') && ($currentSectionID !== '37508')) { ?>
  
    <div class="row">
      
      <nav role="navigation" class="sidebar">


	        <?php
	        // Dont show for Business and Innovation and show for all other sections
	        	if (($currentSectionID !== '35311') && ($currentSectionID !==  '42813') && ($currentSectionID !==  '44824') && ($currentSectionID !==  '44684') && ($currentSectionID !==  '44849') && ($currentSectionID !==  '44435') && ($currentSectionID !==  '44851') ) { ?>
	        <!-- navigation object : Left navigation -->
			<!-- navigation object : Include Course Dropdown -->
			
			<?php                                                                                                                                                                                          		                                                               if ($navDropdown !== TRUE) { ?>
	        <ul>
	          <li class="menu-heading"><?php echo $menuHeading; ?></li>
	          
	        </ul>
        <?php }  ?>
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

  <?php } ?><div class="row">
	<div class="l-content  block  __text">
          	
          	
		<p class="no-pad"><strong>Professor of Art History</strong></p>
<p class="pad-top-1x"><strong>Camberwell College of Arts</strong></p>
<p><a href="mailto:john.doe@arts.ac.uk">john.doe@arts.ac.uk</a></p>
	</div>
</div><div class="row">
	<div class="l-content  block  __text">
          	
          	
		<h2 class="size-h3">Research interests</h2>
<p>Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla.</p>
	</div>
</div><div class="row">
  <div class="accordion">

    
      
      <div id="st-accordion" class="st-accordion">
        <ul class="accordion-list">

        <!-- navigation object : Accordion item --><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Biography</h3><div class="st-arrow icon icon-plus-circled"></div></a>
		<div class="st-content">
                  	
			<p>Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
<p>Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Donec sed odio dui.</p>
<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Research statement</h3><div class="st-arrow icon icon-plus-circled"></div></a>
		<div class="st-content">
                  	
			<p>Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
<p>Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Donec sed odio dui.</p>
<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Current students & thesis titles</h3><div class="st-arrow icon icon-plus-circled"></div></a>
		<div class="st-content">
                  	
			<p>Angela&nbsp;Hodgson-Teall, (Co-Supervisor),&nbsp;<em>Drawing on the Nature of Empathy.</em></p>
                        
		</div>
</li><li class="accordion-list-item">
  <a class="accordion-list-anchor" href=""><h3 class="size-h4">Completed students & thesis titles</h3><div class="st-arrow icon icon-plus-circled"></div></a>
		<div class="st-content">
                  	
			<p>Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
<p>Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Donec sed odio dui.</p>
<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        
		</div>
</li>
    
        </ul>
      </div>
  </div>
</div><?php 

	if(class_exists('ResearchOutputs') != true) {

	class ResearchOutputs {
		
		public $xml;
		public $firstName;
		public $lastName;
		public $url;
		
		/**
		 * [__construct This returns the firstName and lastName in the object]
		 *
		 * @param string  $firstName [set the firstName for the RSS feed URL]
		 * @param string  $lastName [set the lastName for the RSS feed URL]
		 */
		public function __construct( $firstName = "", $lastName = "" ) {
			$this->firstName = $firstName;
			$this->lastName = $lastName;

			//$this->array = $array;
			
			$this->url = "http://ualresearchonline.arts.ac.uk/cgi/search/advanced/export_kultur_MediaRSS2.xml?screen=Public%3A%3AEPrintSearch&_action_export=1&output=MediaRSS2&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cbestoutputs%3Abestoutputs%3AALL%3AEQ%3ATRUE%7Ccreators_name%3Acreators_name%3AALL%3AIN%3A".$lastName."%2C+".$firstName."%7C-%7Ceprint_status%3Aeprint_status%3AALL%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AALL%3AEX%3Ashow&n=";
			$t = $this->url;
		}
		
		public function __destruct() {
			unset( $this->array);
		}
				
		public function outputsDatesCache($firstName="", $lastName=""){
		    $cache_file = "/web/sites/t4www/www.arts.ac.uk/output-".$firstName."-".$lastName.".txt";
		    $cache_outofdate = "-1 day"; // Minimum interval to update the cache file    
		    
		    // TRY AND GET THE LIVE DATA
		    // --------------------------------------

			$ch = curl_init("http://ualresearchonline.arts.ac.uk/cgi/search/advanced/export_kultur_MediaRSS2.xml?screen=Public%3A%3AEPrintSearch&_action_export=1&output=MediaRSS2&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cbestoutputs%3Abestoutputs%3AALL%3AEQ%3ATRUE%7Ccreators_name%3Acreators_name%3AALL%3AIN%3A".$lastName."%2C+".$firstName."%7C-%7Ceprint_status%3Aeprint_status%3AALL%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AALL%3AEX%3Ashow&n="); 
			
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
		        return 'ERROR';
		    }
		}
		
		public function returnXml() {
echo '<!-- DEBUG: start returnXML -->';
			$this->xml = @simplexml_load_string($this->outputsDatesCache($this->firstName, $this->lastName));
			$result = $this->xml;
			
//			echo $this->url;
//			var_dump($this->xml);

echo '<!-- DEBUG: returnXML successful -->';
			return $this->xml;
		}
		
		public function returnErrors() {
			if(isset($_GET['errors'])){
				ini_set('display_errors',1); 
				ini_set('error_reporting', E_ALL); 
				error_reporting(E_ALL);
			}
		}
		
		public function do_item_loop($item) { 
		$image = $item->children('media', true);
		$image_link = $image['content'];		
		$image_src = "http://ualresearchonline.arts.ac.uk".$image->content->attributes();
		$bg_img = "<div class=\"center-cropped\" style=\"background-image: url(".$image_src.")\"><img src=".$image_src." /></div>";
		$desc = $item->description;
		
		?>
			<div class='owl-item'>	
			<?php echo($bg_img); ?>
			<h4><a href="<?php if ($item->link != '') { echo $item->link; } ?>"><?php if ($item->title != '') { echo $item->title; } ?></a></h4>
			<p><?php 
			// try to match our pattern
			preg_match_all("/\([1-2][0-9][0-9][0-9]\)/", $desc, $matches);
			// loop through the matches with foreach
			foreach($matches[0] as $value)
			{
				echo $value;
			}
			?></p>
			</div>
		<?php
		}

		public function do_output() {
			$xml = $this->xml;
				foreach( $xml->channel->item as $item ) 
				{ 
					$this->do_item_loop($item); 
				} 
			}
		}
	}

?>



<h2>Research Outputs</h2>
<p>The following research outputs are for Helen Storey.</p> 


<?php

$test = new ResearchOutputs('Helen','Storey');
$test->returnXml();
$test->do_output();

?><?php 

// we use these variables to check what type of slider is being created, and then output correctly
$slider_container_state = 'open';
$selected_width = 'slider-8';


if ($slider_container_state == 'open') { // open the slider 

  if ($selected_width == 'slider-8') { ?>

    <div class="row">
      <div class="l-content">

  <?php } ?>

        <div class="row slider-container <?php if ($selected_width == "full-grid-overflow") { echo "overflow"; } ?>">
          <!--  optional slider heading -->
          <h2>Gallery</h2>  
          <?php if ($selected_width == "slider-3-14") { ?><div class="slider-3-14"> <?php } ?>
          <div class="royalSlider rsDefault block <?php if ($selected_width != "slider-3-14") { echo $selected_width; } ?>" data-slider-auto-play="" <?php 
            switch ($selected_width) {
              case "slider-12":
                echo "data-slider-item-width='948' data-slider-item-height='474'";
                break;
              case "slider-8":
                echo "data-slider-item-width='653' data-slider-item-height='327'";
                break;
              case "full-grid-width":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "full-grid-overflow":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "slider-3-14":
                echo "data-slider-item-width='948' data-slider-item-height='830'";
                break;  
              default:
                echo "";
            } ?>> 
              
<?php } else { // close the slider ?>        
          
          </div> 
          <?php if ($selected_width == "slider-3-14") { ?></div><?php } ?>
        </div><!-- end row div -->

  <?php if ($selected_width == 'slider-8') { ?>

      </div>
    </div>

  <?php }  
} ?><figure>

  <?php if (environment() != 'live') { ?>

    <img src="http://www.arts.ac.uk/media/arts/research/research-staff/Carole-Collet-Suicidal-Textiles1112x696.jpg" alt="Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper." class="rsImg" />

  <?php } else { ?>
    
    <img data-src="http://app.resrc.it/o=80/<?php echo siteURL(); ?>http://www.arts.ac.uk/media/arts/research/research-staff/Carole-Collet-Suicidal-Textiles1112x696.jpg" alt="Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper." class="rsImg resrc" />
  <?php }
  
  $call_to_action_switch = "";

  if ($call_to_action_switch != "") { ?>

    <div class="call-to-action">
      <a href="" title=""></a>
    </div>

  <?php } ?>

  <div class="credits">Image Credit here</div>
  
  <figcaption class="rsCaption"><span><p>Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper.</p></span></figcaption>
  
</figure><figure>

  <?php if (environment() != 'live') { ?>

    <img src="http://www.arts.ac.uk/media/arts/research/images/Tom-Hunter-Jack-shall-have-Jill-(1).JPG" alt="Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper." class="rsImg" />

  <?php } else { ?>
    
    <img data-src="http://app.resrc.it/o=80/<?php echo siteURL(); ?>http://www.arts.ac.uk/media/arts/research/images/Tom-Hunter-Jack-shall-have-Jill-(1).JPG" alt="Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper." class="rsImg resrc" />
  <?php }
  
  $call_to_action_switch = "";

  if ($call_to_action_switch != "") { ?>

    <div class="call-to-action">
      <a href="" title=""></a>
    </div>

  <?php } ?>

  <div class="credits">Image Credit Here</div>
  
  <figcaption class="rsCaption"><span><p>Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper.</p></span></figcaption>
  
</figure><?php 

// we use these variables to check what type of slider is being created, and then output correctly
$slider_container_state = 'close';
$selected_width = 'slider-8';


if ($slider_container_state == 'open') { // open the slider 

  if ($selected_width == 'slider-8') { ?>

    <div class="row">
      <div class="l-content">

  <?php } ?>

        <div class="row slider-container <?php if ($selected_width == "full-grid-overflow") { echo "overflow"; } ?>">
          <!--  optional slider heading -->
            
          <?php if ($selected_width == "slider-3-14") { ?><div class="slider-3-14"> <?php } ?>
          <div class="royalSlider rsDefault block <?php if ($selected_width != "slider-3-14") { echo $selected_width; } ?>" data-slider-auto-play="" <?php 
            switch ($selected_width) {
              case "slider-12":
                echo "data-slider-item-width='948' data-slider-item-height='474'";
                break;
              case "slider-8":
                echo "data-slider-item-width='653' data-slider-item-height='327'";
                break;
              case "full-grid-width":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "full-grid-overflow":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "slider-3-14":
                echo "data-slider-item-width='948' data-slider-item-height='830'";
                break;  
              default:
                echo "";
            } ?>> 
              
<?php } else { // close the slider ?>        
          
          </div> 
          <?php if ($selected_width == "slider-3-14") { ?></div><?php } ?>
        </div><!-- end row div -->

  <?php if ($selected_width == 'slider-8') { ?>

      </div>
    </div>

  <?php }  
} ?><div class="row">
  <div class="link-list-three-col">
    
    <h2>Other resources</h2>
      
      <div class="links-container l-content-full-width block  __media  three-up">
        <ul class="link-list">
		<!-- navigation object : Three Col Link List Item --><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="">http://www.arts.ac.uk/url</a>
</li><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="http://www.arts.ac.uk/url">http://www.arts.ac.uk/url</a>
</li><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="http://www.arts.ac.uk/url">http://www.arts.ac.uk/url</a>
</li><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="http://www.arts.ac.uk/url">http://www.arts.ac.uk/url</a>
</li><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="http://www.arts.ac.uk/url">http://www.arts.ac.uk/url</a>
</li><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="http://www.arts.ac.uk/url">http://www.arts.ac.uk/url</a>
</li><li class="link-list-item">
  <p>Description Text here Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> 
  <a href="http://www.arts.ac.uk/url">http://www.arts.ac.uk/url</a>
</li>
        
        </ul>
      </div>
  </div>
</div><style>

@media only screen and (min-width: 960px) {
  /* line 324, ../styles/components/_blocks.scss */
  .three-up li.link-list-item:nth-child(3n+1) {
    clear: left;
  }
}

/* line 304, ../styles/components/_blocks.scss */
.three-up .link-list-item {
  padding-top: 0.75em;
  border-bottom: 1px dotted black;
}


/* temporarily resize the width of the accordion on this page to content width */
.accordion {
  clear: left;
  width: 65.54132%;
}

.accordion .st-content p, 
.accordion .st-content h3,  
.accordion .st-content h4, 
.accordion .st-content blockquote {
   width: 100%;
}

/* temporarily change the color of accordion background */
.accordion-list-item {
   overflow: hidden;
   background-color: white;
   border-bottom: 1px dotted black;
   margin-bottom: 1px;
   padding: 0;
}

.accordion-list li:first-child {
   border-top: 1px dotted black;
}

</style>	
      </div>
  </div>
</div>



<!-- navigation object : College Footer Include -->
<!-- navigation object : Main Footer Include --><!-- start footer -->
<footer class='global-footer row'>
  <div class="footer-wrapper">
    <div class="row">
      <div class='footer-links'>
        <ul class='footer-col-1'>
          <li>
            <a href='/accessibility/'>Accessibility</a>
          </li>
          <li>
            <a href='/about-ual/strategy-governance/public-information/freedom-of-information/'>Freedom of Information</a>
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
            <a href='/about-ual/strategy-governance/public-information/charitable-status/'>Charitable Status</a>
          </li>
          <li>
            <a href='/about-ual/support-our-creative-future/'>Give to UAL</a>
          </li>
          <li>
            <a href='/about-ual/work-at-ual/'>Work at UAL</a>
          </li>
          <li>
            <a href='/feedback-form/'>Feedback</a>
          </li>
        </ul>

        <ul class='footer-col-3'>
          <li>
            <a href='http://showtime.arts.ac.uk/'>Showtime</a>
          </li>
          <li>
            <a href='http://my.arts.ac.uk/'>MyArts Staff</a>
          </li>
          <li>
            <a href='http://my.arts.ac.uk/student/'>MyArts Student</a>
          </li>
          <li>
            <a href='http://www.suarts.org/'>Students' Union</a>
          </li>
        </ul>

        <ul class="social-links">
          <h3>Connect with UAL:</h3>
          <li><a href="https://twitter.com/UniArtsLondon" title="UAL on Twitter"><span class="footer-ico icon-twitter"></span></a></li> 
          <li><a href="https://www.facebook.com/UniversityoftheArtsLondon" title="UAL on Facebook"><span class="footer-ico icon-facebook"></span></a></li>
          <li><a href="http://www.youtube.com/user/universityartslondon" title="UAL on YouTube"><span class="footer-ico icon-youtube"></span></a></li>
          <!--<li><a href="#" title="UAL on Flickr"><span class="footer-ico icon-flickr"></span></a></li>-->
        </ul>
      </div>


      
      <div class="row">
        <div class='copyright'>
          <p>&copy; <?php echo date("Y") ?> University of the Arts London All Rights Reserved</p>
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
          <li>Channel base description: This channel is used to publish the UAL website.</li>
          <li>Channel base id: 18</li>
          <li>Channel base name: UAL Website</li>
          <li>Page created : Wed 23 Oct 2013 10:17:07</li>
          <li>Page modified : Fri 8 Nov 2013 11:26:37</li>
          <?php $i = 0; ?>
          <li>Section id : 49900</li>
      </ul>
        <!-- end debug -->
    </div>

</footer>
<div class="credits-btn"><a href="#" class="show-credits"><span class="icon-picture"></span></a></div>
<!-- Include js scripts -->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>

<script src="http://use.resrc.it/"></script>

<!--<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/resrc-0.6.1.min.js"></script>-->

  <!-- fastClick -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/fastclick.js"></script>

<!-- jquery.fitvids-ck.js -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/jquery.fitvids-ck.js"></script>
 
<!-- reView script - used for LazyLoading with ReSRC.it -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/jquery.review-1.0.0.min.js"></script>


<!-- navigation object : Javascript include 
-->
  


<!-- Mega Menu Plugins -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/megamenu_plugins.js"></script>
<!-- Mega Menu Script -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/megamenu-ck.js"></script>

<!-- Scripts -->
<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/script.js"></script>

<!--<script type="text/javascript" src="http://www.arts.ac.uk/media/beta/beta-assets/js/script-1.js"></script>-->

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
<?php
if (!isset($shortCourse)) { $shortCourse = FALSE; }
if ($shortCourse == TRUE) { ?>
<script type="text/javascript" src="https://arts.accessplanit.com/accessplan/config/arts/scripts/website.js"></script>
<script type="text/javascript" src="http://arts.accessplanit.com/accessplan/config/arts/scripts/popup.js"></script>
<?php } ?>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32658704-1']);
  _gaq.push(['_setDomainName', 'arts.ac.uk']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>