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
	$title = "Digital Photography - Tuesdays (Term Time)"; 
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
$currentSectionID = "46980";
$levelThreeID = "35289";

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

<body class="<?php echo $collegeClass . ' ' . $sectionClass; ?>  browse-sc">
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
          <!-- navigation object : Breadcrumbs --><div class="breadcrumbs"><a href="/">University of the Arts London</a><a href="/csm/">Central Saint Martins</a><a href="/csm/courses/">Courses</a><a href="/csm/courses/short-courses/">Short Courses</a><a href="/csm/courses/short-courses/browse-short-courses/">Browse Short Courses</a><a href="/csm/courses/short-courses/browse-short-courses/media-arts/">Media Arts</a><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/">Evening and Weekend</a><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/">Photography</a><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography---tuesdays-term-time/">Digital Photography - Tuesdays (Term Time)</a></div>
    <div class="page-title">
      <h1><!-- navigation object : Section name -->Digital Photography - Tuesdays (Term Time)</h1>
    </div>
  </div>  
    </div>
</div>
<?php } ?>

 <!-- section name -->
<!--<div class="content-wrapper">
  <div class="row">
    <div class="d5-d16">
      <h1>Digital Photography - Tuesdays (Term Time)</h1>
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
			<?php
$navDropdown = TRUE; ?>

<div class="dd-menu siblings">
  <div class="js-dd-menu dd-menu-heading">
    <h3 class="dd-menu-title">In this section</h3>
    <div class="dd-menu-arrow"><span class="js-dd-menu-icon icon icon-down-open-big"></span></div>
  </div>
  <ul class="js-dd-menu-list"><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/advanced-retouching-with-photoshop-weekend-term-time/">Advanced Retouching with Photoshop Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/alternative-photographic-processes-term-time/">Alternative Photographic Processes (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/art-of-snapshot-photography-term-time/">Art of Snapshot Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/beginners-photography-term-time/">Beginners Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/beginners-photography---film--darkroom-term-time/">Beginners Photography - Film &amp; Darkroom (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/cameraless-photography-term-time/">Cameraless Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/cameras-rediscovered-weekend-term-time/">Cameras Rediscovered Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/creative-digital-photography-term-time/">Creative Digital Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/creative-writing-and-photography-in-london-weekend-term-time/">Creative Writing and Photography in London Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-imaging-for-photographers-weekend-term-time/">Digital Imaging for Photographers Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography---intermediate-term-time/">Digital Photography - Intermediate (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography---saturdays-term-time/">Digital Photography - Saturdays (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography---tuesdays-term-time/">Digital Photography - Tuesdays (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography---wednesdays-term-time/">Digital Photography - Wednesdays (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography-and-photoshop-term-time/">Digital Photography and Photoshop (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography-and-photoshop---saturdays-term-time/">Digital Photography and Photoshop - Saturdays (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/digital-photography-weekend-term-time/">Digital Photography Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/documentary-photography-daytime-gmt---online-term-time/">Documentary Photography Daytime GMT - Online (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/improve-your-photography-term-time/">Improve Your Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/improve-your-photography-daytime-gmt---online-term-time/">Improve your Photography Daytime GMT - Online (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/improve-your-photography-evening-gmt---online-term-time/">Improve your Photography Evening GMT - Online (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/introduction-to-photography-evening-gmt---online-term-time/">Introduction To Photography Evening GMT - Online (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/marketing-and-promotion-for-photographers-term-time/">Marketing and Promotion for Photographers (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photographers-london-term-time/">Photographers' London (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photographing-london-life-weekend-course-term-time/">Photographing London Life Weekend Course (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography-for-photographers-term-time/">Photography for Photographers (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography-portfolio-term-time/">Photography Portfolio (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography-portfolio-review-weekend-term-time/">Photography Portfolio Review Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography--self-directed-projects-term-time/">Photography &ndash; Self-Directed Projects (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography-art-and-architecture-term-time/">Photography, Art and Architecture (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography-digital-film-and-archiving-term-time/">Photography, Digital, Film and Archiving (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photography-traditional-and-contemporary-practice-term-time/">Photography, Traditional and Contemporary Practice (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/photojournalism-weekend-term-time/">Photojournalism Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/picture-research-skills-term-time/">Picture Research Skills (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/portrait-photography---thursdays-term-time/">Portrait Photography - Thursdays (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/portrait-photography---tuesdays--term-time/">Portrait Photography - Tuesdays  (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/reportage-photography-term-time/">Reportage Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/still-life-photography-term-time/">Still Life Photography (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/studio-photography-weekend-term-time/">Studio Photography Weekend (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/travel-photography-people-and-places-term-time/">Travel Photography, People and Places (Term Time)</a></li><li><a href="/csm/courses/short-courses/browse-short-courses/media-arts/evening-and-weekend/photography/wet-plate-collodion-photography-weekend-term-time/">Wet Plate Collodion Photography Weekend (Term Time)</a></li></ul>
</div>
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

  <?php } ?><?php
if (!isset($shortEnv)) { $shortEnv = FALSE; }
if ($shortEnv == TRUE) { 
$test = new ShortCourse('DIGITAaJ47','csm');
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
	          			<h2>Short Course Links</h2>
	          			<ul>
<li><a href="/csm/courses/short-courses/">Short course homepage</a></li>
<li><a href="/csm/courses/short-courses/available-courses-starting-soon/">Available short courses starting soon</a></li>
<li><a href="/csm/courses/short-courses/information-and-help/how-to-book-short-courses/">How to book</a></li>
<li><a href="/csm/courses/short-courses/information-and-help/frequently-asked-questions/">Frequently asked questions</a></li>
<li><a href="/csm/courses/short-courses/information-and-help/immigration-guidance/">Immigration and visa guidance</a></li>
<li><a href="/csm/courses/short-courses/information-and-help/">Information and help</a></li>
<li><a href="/csm/courses/short-courses/short-stay-accommodation/">Short stay accommodation</a></li>
<li><a href="/csm/courses/short-courses/information-and-help/information-for-prospective-agents/">Information for agents</a></li>
<li><a href="/csm/courses/short-courses/bespoke-training/">Bespoke Training</a></li>
</ul>
	          		</div>
	          		<aside>
                                  	<!-- KIS Widget -->
	          			
	          		</aside>
	          	</div>
	        </div>
	    </div>
    </div><!-- .content-wrapper -->
</div><!-- .panel -->
<div class="content-wrapper">
	<div class="row">
  		<div class="content">
         

<!-- insert nav object for gallery -->


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

$xml = @simplexml_load_string(courseDatesCache('DIGITAaJ47', 'csm'));

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

<div id="glance" class="course-tab mootabs_panel section-red">

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

  <div class="course-image section-solid-red">
        
    </div>    
            <?php   
} //End of Image
?>

    <div id="glancecontent" class="course-tab-content">
<?php echo $xml->course->description;?>



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
<div id="materials" class="course-tab mootabs_panel section-red">
<div id="materialscontent" class="course-tab-wrapper">
<?php echo $xml->course->materials;?>
</div>
</div><!--materials -->

  <?php 
  $csm = ('csm');
    if ( $csm <> 'csm' ) {
      // Dates content generated for non-CSM courses
    ?>
    
      <div id="course-booking" class="course-tab mootabs_panel section-red">
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
      </div>
  </div>
</div>



<!-- navigation object : College Footer Include --><?php 
$icon_1_type = "facebook"; 
$icon_2_type = "twitter"; 
$icon_3_type = "youtube"; 

$icon_1_url = "https://www.facebook.com/pages/Short-Courses-at-Central-Saint-Martins/174051032615950"; 
$icon_2_url = "http://twitter.com/csm_news"; 
$icon_3_url = "http://www.youtube.com/user/artslondoncsm"; 

$icon_array = array(
  array(
    "type" => $icon_1_type,
    "url" => $icon_1_url,
    ),
  array(
    "type" => $icon_2_type,
    "url" => $icon_2_url
    ),
  array(
    "type" => $icon_3_type,
    "url" => $icon_3_url
    )
  );
?>

<footer class="college-footer row ">
  <div class="footer-wrapper">
    <div class="footer-block left">
                  
      <h3 class='size-h2'>Contact Us</h3>
      <!-- see http://html5doctor.com/microformats/ -->
      <ul class="vcard">
        <li class="no-bullet">
          <a class="fn org url" href="/csm/" title="Contact information for Central Saint Martins
"><span class="organization-name">Central Saint Martins
</span></a>
        </li>
        <li>
        <span class="adr">
          <span class="street-address">Short Course Office<br/>Granary Building</span>, <span class='locality'>1 Granary Square</span>,<br>
          <span class="region">King's Cross, London</span> <span class="postal-code">N1C 4AA</span> <span class='country'>UK</span>
          <br>
        </span>
        </li>
        <li><span class="tel">Telephone: <span class="value">+44 (0)20 7514 7015</span></span></li>
        <li><a href="mailto:shortcourse@csm.arts.ac.uk">shortcourse@csm.arts.ac.uk</a></li>
        
      </ul>
    </div>
    <div class="footer-block middle">
      <h3 class='size-h2'>Download</h3>
      <ul>
<li><a href="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/arts/colleges/csm/courses/short-courses/Christmas_Autumn_Schedule-Sheet.pdf" target="_blank">CSM Short Course Schedule 2013 [PDF 70KB]&zwnj;</a></li>
</ul>
<ul>
<li><a href="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/arts/colleges/csm/courses/short-courses/dual-city-courses/documents/CSM-Full-Time_Portfolio_Preparation_2013-14.pdf" target="_blank">CSM Portfolio Preparation Guide 2013-14 [PDF 2.9MB]&zwnj;</a></li>
</ul>
<ul>
<li><a href="http://www.arts.ac.ukhttp://www.arts.ac.uk/media/arts/study-at-ual/international/study-abroad--exchanges/documents/UAL-Study-Abroad-2013-14.pdf" target="_blank">UAL Study Abroad Brochure 2013-14 (PDF 5.4MB)</a></li>
</ul>
    </div>
    <div class="footer-block right">
      <h3 class='size-h2'>Connect</h3>
        <ul class="icons no-bullet">
          <?php foreach( $icon_array as $icon ) { 
          
            if ($icon['url'] == "") { continue; }
          
            switch ($icon['type']) {
              case "facebook":
                $icon_classname = "icon-facebook-circled";
                //$icon_ascii = "0xe815";
                break;
              case "twitter":
                $icon_classname = "icon-twitter-circled";    
                //$icon_ascii = "0xe831";                
                break;
              case "flickr":
                $icon_classname = "icon-flickr-circled";   
                break;
              case "youtube":
                $icon_classname = "icon-youtube";
                break;
              case "full-grid-width": // what's this ?
                //$icon_ascii = "&#62211;"; 
              break;

            } ?>
            <li>
              <a href="<?php echo $icon['url']; ?>" class="<?php echo $icon['type']; ?>">
                <span class="<?php echo $icon_classname; ?>"></span>
              </a>
            </li>
          <?php
          } ?> 
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
          <li>Page created : Fri 30 Aug 2013 11:08:04</li>
          <li>Page modified : Thu 12 Sep 2013 12:52:13</li>
          <?php $i = 0; ?>
          <li>Section id : 46980</li>
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