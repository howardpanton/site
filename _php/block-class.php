<!-- php block class -->
<?php
if(class_exists('Block') != true) 
{

class Block {
	
	public $environment;	
	public $layout;
	public $panel;
	public static $template;
	public static $component;
	public $content_style;
	public $component_start;
	public $component_end;
	public static $heading;
	public static $title;
	public static $link_title; 
	public static $section_link; 
	public static $external_link; 
	public static $image;
	public static $credit;
	public static $figcaption;
	public static $text;
	public static $arr;
	public static $items;
	
    public function __construct(Array $array = array(), $template = "default", $component = "default", $heading = "default") {
	
		self::$arr = $array;
		self::$items = count($array);
		self::$template = $template;
		self::$component = $component;
		self::$heading = $heading;

	 }
	
	public static function environment() {

		$uri = $_SERVER['REQUEST_URI'];

		if (strpos($uri, 'phppreview') !== false) {
			$environment = 'cms';
		} else {
			$environment = 'live';
		}

		return $environment;
	}

	public static function template() {
		
		switch (self::$template) {
		    case "two-up":
		        $layout = "two-up";
		        break;
		    case "three-up":
		        $layout = "three-up";
		        break;
		    case "four-up":
		        $layout = "four-up";
		        break;

		    default:
		       $layout = "default";
		}
		return $layout;
	}
	
	public static function component() {
		
		switch (self::$component) {
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
	
  	public static function set_component_start() {
		$template = self::template();
		$b = self::component();
		$t = self::$template;
		if ($t == "four-up") {
			$component_four_up = "</div>";
		}
    		$component_start = "<div class=\"row\">";
        	$component_start .= "<div class=\"" . $b . " block  __media  " .  $template  . "\">";
		if ($t == "four-up") {
			echo $component_four_up;
		}
			echo $component_start;
 	}

	public static function set_component_end() {
		$t = self::$template;
		if ($t == "four-up") {
			$component_four_up_end = "<div class=\"row\">";
			$component_four_up_end .= "<div role=\"main\" class=\"content\">";
		}
	    $component_end = "</div> <!-- end image-block -->";
		$component_end .= "</div> <!-- end row -->";
	 	echo $component_end;
		if ($t == "four-up") {
			echo $component_four_up_end;

		}
	}
	
	public static function set_block_output($string) { 
		$e = self::environment();
		$a = self::$arr; 
		$h = self::$heading;
		self::set_component_start();
		if	($string ==  "two-up" || "three-up" || "four-up" ) {
			if	(!$h == "") {
				echo  "<h2>" . $h . "</h2>";
			}
			echo "<ul>"; 
			for ($i = 0; $i < count($a); $i++) {
				$d = count($a); 
				if ($i < $d) { 
				
				echo "<li>";

					echo "<figure class=\"feature\">";
						if	(!$a[$i]['section_link'] == "") {
							echo "<a href=\""  . $a[$i]['section_link'] . "\"title=\"" . $a[$i]['link_title'] . "\">" ;
						}
						if	(!$a[$i]['image'] == "") {
							// If we're working in the CMS, reveal the original upload
							if ($e == 'cms') {
								echo "<img src=\""  . $a[$i]['image'] . "\" alt=\"Image Alt\">";
							} else { // otherwise, load a resrc'd image
								echo "<img data-src=\"http://app.resrc.it/"  . $a[$i]['image'] . "\" alt=\"Image Alt\" class=\"resrc\">";
							}
						}
							echo "</a>";
						if	(!$a[$i]['credit'] == "") {
							echo "<div class=\"credits\">" . $a[$i]['credit'] . "</div>";
						}
						if	(!$a[$i]['figcaption'] == "") {
							echo "<figcaption>" . $a[$i]['figcaption'] . "</figcaption>";				
						}
					echo "</figure>";
					if	(!$a[$i]['title'] == "") {
						echo "<h3><a href=\""  . $a[$i]['section_link'] . "\" title=\"". $a[$i]['link_title'] . "\">" . $a[$i]['title'] . "</a></h3>";
					}
					if	(!$a[$i]['text'] == "") {
						echo "<p>" .  $a[$i]['text'] . "</p>";
					}
					if	(!$a[$i]['external_link'] == "") {
						echo "<p><a href=\"" . $a[$i]['external_link']  . "\" class=\"button-link\"><span class=\"hide-descriptive-text\">Follow this link to go to more information about</span>" . $a[$i]['button_link_text'] . "Optional button</a></p>";
					}
				echo "</li>";
				
					 } 				

				} 
				echo "</ul>"; 
			} 
	
		self::set_component_end();
	} 

	
	public function Output() {
		$template = self::template();
		
		switch ($template) {
		    case "two-up":
		        self::set_block_output('two-up');
		        break;
		    case "three-up":
		        self::set_block_output('three-up');
		        break;
		    case "four-up":
		        self::set_block_output('four-up');
		        break;
		}

	}
	
} // Block Class declaration

} // end check if class_exists

?>