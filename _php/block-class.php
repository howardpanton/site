<!-- php block class -->
<?php
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

		/**
		 * [set_component_start output opening div]
		 */
		public function set_component_start() {
			
			if  ( $this->template == "four-up" ) {
				$compenent_four_up = "</div>";
			}

			$component_start = "<div class=\"row\">";
			$component_start .= "<div class=\"" . $this->component . " block  __media  " .  $this->template  . "\">";
			
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
									echo "<img data-src=\"http://app.resrc.it/"  . $this->array[$i]['image'] . "\" alt=\"Image Alt\" class=\"resrc\">";
								}

					echo "</a>";
					if ( !$this->array[$i]['credit'] == "" ) {
						echo "<div class=\"credits\">" . $this->array[$i]['credit'] . "</div>";
					}

					if ( !$this->array[$i]['figcaption'] == "" ) {
						echo "<figcaption>" . $this->array[$i]['figcaption'] . "</figcaption>";
					}

					echo "</figure>";

				}
				// end image

				if ( !$this->array[$i]['title'] == "" ) {
					echo "<h3><a href=\""  . $this->array[$i]['section_link'] . "\" title=\"". $this->array[$i]['link_title'] . "\">" . $this->array[$i]['title'] . "</a></h3>";
				}

				if ( !$this->array[$i]['text'] == "" ) {
					echo "<p>" .  $this->array[$i]['text'] . "</p>";
				}

				if ( !$this->array[$i]['external_link'] == "" ) {
					echo "<p><a href=\"" . $this->array[$i]['external_link']  . "\" class=\"button-link\"><span class=\"hide-descriptive-text\">Follow this link to go to more information about</span>" . $this->array[$i]['button_link_text'] . "Optional button</a></p>";
				}

				echo "</li>";

			}

			echo "</ul>";


			$this->set_component_end();
		}


	} // Block Class declaration


} // end check if class_exists

?>