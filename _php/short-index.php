<?php $shortEnv = TRUE ; ?>  <?php
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
                    echo "<img data-src=\"http://app.resrc.it/http://beta.arts.ac.uk"  . $this->array[$i]['image'] . "\" alt=\"Image Alt\" class=\"resrc\">";
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
                $this->array[$i]['section_link'];
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

  ?>
  
<?php

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
		 * [split_name - extract the Surname from title field]
		 */
		public function split_name($name) {

			$pos = strrpos($name, ' ');

			if ($pos === false) {
				$surname = $name;
			}

			$firstname = substr($name, 0, $pos + 1);
			$surname = substr($name, $pos);
			
			return trim($surname);
			
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

				$surname = $this->split_name($item['title']);

				foreach($item as $key=>$value){ 
					$enhancedItemArray[$key] = $value;
					$enhancedItemArray['surname'] = $surname;
					$enhancedItemArray['letter'] = $surname[0];
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
		public function do_output() {
			
			$enhanced = $this->enhance_arrays();

			$sorted = $this->alpha_sort_array($enhanced, 'surname');

			?>
			<div class="row">
				
					<?php	
					$temp_letter = '';
					$counter = 1;
					$item_count = sizeof($sorted);

					foreach ($sorted as $item) { 

						if ( $item['letter'] != $temp_letter ) { 

							if ($counter > 1) { ?>	

										</ul>
									</div><!-- .l-content -->
								</div><!-- .row -->	

							<?php } ?>

								<div class="row  az-group" data-group="<?php echo $item['letter']; ?>">
									<h2 class="az-letter"><?php echo $item['letter']; ?></h2>
									<div class="image-list-with-text-content  l-content">
										<ul>

						<?php }

						$this->do_item_loop($item);

						if ($counter == $item_count) { ?>

										</ul>
									</div><!-- .l-content -->
								</div><!-- .row -->	
						<?php
						}

						$temp_letter = $item['letter'];
						$counter++;

					} // end foreach ?>

			</div><!-- .row -->
		<?php
		} 

	} // AZ Class declaration

	


} // end check if class_exists

?><?php 

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
	$title = "Alternative Photographic Printing"; 
	if (!empty($title)) {
  
  	echo "<title>" . $title.  " - University of Arts London</title>";
  
	} else {
  
  	echo "<title> University of Arts London</title>";
  
	}
    
    ?>
    <meta charset='utf-8'>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'>
    <!--<meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible"'>-->
    
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
    <meta content='on' http-equiv='cleartype'>
    <meta content='University of Arts London, Web Team' name='author'>
    <!-- Meta description tag -->
    <meta name="description" content="Short course in Alternative Photographic Printing from Camberwell College of Arts London." />

    
<!-- For all browsers old file <link rel="stylesheet" type="text/css" media="screen" href="/media/beta/beta-assets/screen.css" />-->
    
<!-- screen.css -->
    
<link rel="stylesheet" type="text/css" media="screen" href="/media/beta/beta-assets/css/screen.css" />
   
<!-- fonts.css -->
<link rel="stylesheet" type="text/css" media="" href="/media/beta/beta-assets/fonts.css" />
    
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
       
  </head>

<?php 
// By default, sections have H1 headings
$header = true;
$currentSectionID = "44830";
$levelThreeID = "35288";

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

<body class="<?php echo $collegeClass . ' ' . $sectionClass; ?> ">
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
                        <li><a href="/study-at-ual/courses/">Courses</a></li><li><a href="/study-at-ual/international/">International</a></li><li><a href="/study-at-ual/open-days/">Open Days</a></li><li><a href="/study-at-ual/apply/">Apply</a></li><li><a href="/study-at-ual/enrol/">Enrol</a></li><li><a href="/study-at-ual/tuitions-fees/">Tuition Fees</a></li><li><a href="/study-at-ual/scholarships-bursaries-and-loans/">Scholarships, Bursaries &amp; Loans</a></li><li><a href="/study-at-ual/financial-advice/">Financial Advice</a></li><li><a href="/study-at-ual/student-support/">Student Support</a></li><li><a href="/study-at-ual/library-services/">Library Services</a></li><li><a href="/study-at-ual/learning-and-teaching/">Learning &amp; Teaching</a></li><li><a href="/study-at-ual/term-dates/">Term Dates</a></li><li><a href="/study-at-ual/academic-regulations/">Academic Regulations</a></li><li><a href="/study-at-ual/accommodation/">Accommodation</a></li><li><a href="/study-at-ual/students-union/">Students' Union</a></li><li><a href="/study-at-ual/facilities/">Facilities</a></li><li><a href="/study-at-ual/widening-participation/">Widening Participation</a></li>
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
                    <li><a href="/about-ual/news/">News</a></li><li><a href="/about-ual/events-and-calendar/">Events &amp; Calendar</a></li><li><a href="/about-ual/collections-and-galleries/">Collections &amp; Galleries</a></li><li><a href="/about-ual/ual-showroom/">UAL Showroom</a></li><li><a href="/about-ual/work-at-ual/">Work At UAL</a></li><li><a href="/about-ual/support-our-creative-future/">Support Our Creative Future</a></li><li><a href="/about-ual/strategy-governance/">Strategy and Governance</a></li><li><a href="/about-ual/press-office/">Press Office</a></li><li><a href="/about-ual/awarding-body/">UAL Awarding Body</a></li><li><a href="/about-ual/diversity/">Diversity</a></li><li><a href="/about-ual/departmental-pages/">Departmental Pages</a></li><li><a href="/about-ual/contact-ual/">Contact UAL</a></li><li><a href="/about-ual/give-to-ual/">Give to UAL</a></li>
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
        <a href="#" class="megamenu_drop needsclick search-icon icon-search"></a>
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
<?php
if ($header != false) { ?> 
<div class="header-panel bg-gray-bg">
    <div class="header-wrapper">
  <div class="row">
          <!-- navigation object : Breadcrumbs --><div class="breadcrumbs"><a href="/">Beta Home</a><a href="/camberwell/courses/">Courses</a><a href="/camberwell/courses/short-courses/">Short Courses</a><a href="/camberwell/courses/short-courses/browse-short-courses/">Browse Short Courses</a><a href="/camberwell/courses/short-courses/browse-short-courses/search-by-subject/">Search By Subject</a><a href="/camberwell/courses/short-courses/browse-short-courses/search-by-subject/../photography/">Photography</a><a href="/camberwell/courses/short-courses/browse-short-courses/search-by-subject/../photography/alternative-photographic-printing/">Alternative Photographic Printing</a></div>
    <div class="page-title">
      <h1><!-- navigation object : Section name -->Alternative Photographic Printing</h1>
    </div>
  </div>  
    </div>
</div>
<?php } ?>

 <!-- section name -->
<!--<div class="content-wrapper">
  <div class="row">
    <div class="d5-d16">
      <h1>Alternative Photographic Printing</h1>
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
	        if ($currentSectionID !== '35311') { ?>
	        <!-- navigation object : Left navigation -->
			<!-- navigation object : Include Course Dropdown -->
			
			<?php if ($navDropdown !== TRUE) { ?>
	        <ul>
	          <li class="menu-heading"><?php echo $menuHeading; ?></li>
	          
	        </ul>
			<?php } ?>
	        <?php } 

	        // Only show for Business and Innovation
	        if ($currentSectionID == '35311') { ?>
	          <ul>
	            <li><a href="#link-one">Working with our students</a>
	            <li><a href="#link-two">Working with our staff</a>
	            <li><a href="#link-three">Working with our communities</a>
	            <li><a href="#link-four">Education, skills and qualifications</a>
	            <li><a href="#link-five">Events and Conferences</a>
	            <li><a href="#link-six">Mentoring and Networks</a>
	            <li><a href="#link-seven">Supporting Our Students</a>
	          </ul>
	        <?php } ?>

      </nav>
      <div role="main" class="content">

  <?php } ?><?php if (!isset($shortEnv)) { $shortEnv = FALSE; } ?>
<?php if ($shortEnv == TRUE) { 
$test = new ShortCourse('ALTERNl7oC','');
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

$xml = @simplexml_load_string(courseDatesCache('ALTERNl7oC', ''));

?>
	<ul id="tab-buttons" class="mootabs_title">
    <li title="glance"><a href="#glance">At a Glance</a></li>
    <li title="materials"><a href="#materials">Materials</a></li>
          
          	<?php 
	$csm = ('');
		if ( $csm <> 'csm' ) {
			?>
    <li title="course-booking"><a href="#course-booking">Dates &amp; Prices</a></li>
          	<?php 	
			}  // End of Dates and Prices tab
			?>
</ul>

<div id="glance" class="course-tab mootabs_panel section-">

<div id="course-info-wide">
    <h3><?php echo $xml->course["label"];?></h3>

          	<?php 
	$csm = ('');
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
	$csm = ('');
		if ( $csm <> 'csm' ) {
?>

	<div class="course-image section-solid-">
        <img  src="/camberwell/courses/short-courses/browse-short-courses/search-by-subject/../photography/alternative-photographic-printing/Alternative-printing.jpg"  width="110"  height="110"  alt=""  />
    </div>    
          	<?php 	
} //End of Image
?>

    <div id="glancecontent" class="course-tab-content">
<?php echo $xml->course->description;?>



          	<?php 
	$csm = ('');
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
	$csm = ('');
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
<div id="materials" class="course-tab mootabs_panel section-">
<div id="materialscontent" class="course-tab-wrapper">
<?php echo $xml->course->materials;?>
</div>
</div><!--materials -->

	<?php 
	$csm = ('');
		if ( $csm <> 'csm' ) {
			// Dates content generated for non-CSM courses
		?>
		
			<div id="course-booking" class="course-tab mootabs_panel section-">
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
<?php } ?>		</div>
	</div>
</div>



<!-- navigation object : College Footer Include --><?php 
$icon_1_type = "facebook"; 
$icon_2_type = "twitter"; 
$icon_3_type = "flickr"; 

$icon_1_url = "https://www.facebook.com/CamberwellUAL"; 
$icon_2_url = "https://twitter.com/CamberwellUAL"; 
$icon_3_url = "http://www.flickr.com/photos/camberwell-ual/"; 

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
                  
      <h3 class='size-h2'>Contact</h3>
      <!-- see http://html5doctor.com/microformats/ -->
      <ul class="vcard">
        <li class="no-bullet">
          <a class="fn org url" href="/camberwell/" title="Contact information for Camberwell College of Art"><span class="organization-name">Camberwell College of Art</span></a>
        </li>
        <li>
        <span class="adr">
          <span class="street-address">45 - 65 Peckham Road</span>, 
          <span class="region">London</span> <span class="postal-code">SE5 8UF</span> <span class='country'>UK</span>
          <br>
        </span>
        </li>
        <li><span class="tel">Telephone: <span class="value">+44 (0)20 7514 6302</span></span></li>
        <li><a href="info@camberwell.arts.ac.uk">info@camberwell.arts.ac.uk</a></li>
      </ul>
    </div>
    <div class="footer-block middle">
      <h3 class='size-h2'>Order a prospectus</h3>
      <p><span>Camberwell, Chelsea and Wimbledon&nbsp;</span><span>2014-15</span>&nbsp;prospectus:</p>
<ul class="no-bullet">
<li><a href="/media/beta/beta-colleges/beta-camberwell/documents/Camberwell-Chelsea-Wimbledon-2014-15-prospectus.pdf">Download [PDF, 69.8 MB]</a></li>
<li>Request a hard copy</li>
</ul>
<p><span>Chelsea, Camberwell and Wimbledon short course brochure:</span></p>
<ul class="no-bullet">
<li><a href="/media/beta/beta-colleges/beta-camberwell/documents/Camberwell-Chelsea-Wimbledon-Short-Course-brochure-2013-2014.pdf">Download [PDF, 4.9 MB]</a></li>
<li>Request a hard copy</li>
</ul>
    </div>
    <div class="footer-block right">
      <h3 class='size-h2'>Follow</h3>
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
            <a href='/about-ual/support-our-creative-future/'>Give to UAL</a>
          </li>
          <li>
            <a href='/about-ual/work-at-ual/'>Work at UAL</a>
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
        </ul>

        <ul class="social-links">
          <h3>Connect with UAL:</h3>
          <li><a href="https://twitter.com/UniArtsLondon" title="UAL on Twitter"><span class="footer-ico icon-twitter"></span></a></li> 
          <li><a href="https://www.facebook.com/UniversityoftheArtsLondon" title="UAL on Facbook"><span class="footer-ico icon-facebook"></span></a></li>
          <li><a href="http://www.youtube.com/user/universityartslondon" title="UAL on YouTube"><span class="footer-ico icon-youtube"></span></a></li>
          <li><a href="#" title="UAL on Flickr"><span class="footer-ico icon-flickr"></span></a></li>
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
          <li>Channel base description: This channel is used to publish the BETA UAL Website.</li>
          <li>Channel base id: 18</li>
          <li>Channel base name: Beta UAL Website</li>
          <li>Page created : Thu 15 Aug 2013 11:20:22</li>
          <li>Page modified : Mon 19 Aug 2013 01:25:39</li>
          <?php $i = 0; ?>
          <li>Section id : 44830</li>
      </ul>
        <!-- end debug -->
    </div>

</footer>
<div class="credits-btn"><a href="#" class="show-credits">Show Credits</a></div>
<!-- Include js scripts -->


  <script>
    if (typeof jQuery == 'undefined') {
        document.write(unescape("%3Cscript src='/media/beta/beta-assets/js/jquery-1.8.2.min.js' type='text/javascript'%3E%3C/script%3E"));
    }
  </script>

<script>
    Modernizr.Detectizr.detect({detectScreen:false});
  </script>
 <script src="http://use.resrc.it/js/resrc-0.6.1.min.js"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>


 



<!-- Fastclick js -->
<script type="text/javascript" src="/media/beta/beta-assets/fastclick.js"></script>

<!--[if (lt IE 9) & (!IEMobile)]>
	<script type="text/javascript" src="/media/beta/beta-assets/respond.js"></script>
<![endif]-->


<!-- jquery.fitvids-ck.js -->
<script type="text/javascript" src="/media/beta/beta-assets/js/jquery.fitvids-ck.js"></script>
 
<!-- reView script - used for LazyLoading with ReSRC.it -->
<script type="text/javascript" src="/media/beta/beta-assets/jquery.review-1.0.0.min.js"></script>


<!-- navigation object : Javascript include -->
<script>
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
  


<!-- Mega Menu Plugins -->
<script type="text/javascript" src="/media/beta/beta-assets/js/megamenu_plugins.js"></script>
<!-- Mega Menu Script -->
<script type="text/javascript" src="/media/beta/beta-assets/js/megamenu-ck.js"></script>

<!-- Scripts -->
<!-- <script type="text/javascript" src="/media/beta/beta-assets/script.js"></script> -->

<script type="text/javascript" src="/media/beta/beta-assets/js/t4-script-ck.js"></script>

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