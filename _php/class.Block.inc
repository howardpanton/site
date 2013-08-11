<?php
/**
 * 2, 3, 4 up Block
 */
class Block {
	// Block layout, content or featured
	// Block template, 2up, 3up or 4up
	public $template;
	public $component;
	public $heading;
	public $array;
	public $items;

	/**
	 * [__construct description]
	 *
	 * @param array   $array     [description]
	 * @param string  $template  [description]
	 * @param string  $component [description]
	 * @param string  $heading   [description]
	 */
	public function __construct( array $array = array(), $template = "default", $component = "default", $heading = "default" ) {
		$this->array = $array;
		$this->items = count( $this->array );
		$this->template = $template;
		$this->component = $component;
		$this->heading = $heading;
	}
	/**
	 * [__destruct description]
	 */
	public function __destruct() {
		unset( $this->array );
	}

	/**
	 * [set_component_start description]
	 */
	public function set_component_start() {
		if  ( $this->template == "four-up" ) :
			$compenent_four_up = "</div>";
		endif;
		$component_start = "<div class=\"row\">";
		$component_start .= "<div class=\"" . $this->component . " block  __media  " .  $this->template  . "\">";
		if ( $t == "four-up" ) :
			print $compenent_four_up;
		endif;
		print $component_start;
	}

	/**
	 * [set_component_end description]
	 */
	public function set_component_end() {
		if ( $this->template == "four-up" ) {
			$compenent_four_up_end = "<div class=\"row\">";
			$compenent_four_up_end .= "<div role=\"main\" class=\"content\">";
		}
		$component_end = "</div> <!-- end image-block -->";
		$component_end .= "</div> <!-- end row -->";
		print $component_end;
		if ( $this->template == "four-up" ) {
			print $compenent_four_up_end;

		}
	}

	/**
	 * [set_block_output description]
	 */
	public function set_block_output() {
		$this->set_component_start();
		if ( !$this->heading == "" ) :
			print  "<h2>" . $this->heading . "</h2>";
		endif;
		print "<ul>";
		for ( $i = 0; $i < count( $this->array ); $i++ ) {

			echo "<li>";
			echo "<figure class=\"feature\">";
			if ( !$this->array[$i]['section_link'] == "" ) {
				echo "<a href=\""  . $this->array[$i]['section_link'] . "\"title=\"" . $this->array[$i]['link_title'] . "\">" ;
			}
			if ( !$this->array[$i]['image'] == "" ) {
				echo "<img src=\""  . $this->array[$i]['image'] . "\" alt=\"Image Alt\">";
			}
			echo "</a>";
			if ( !$this->array[$i]['credit'] == "" ) {
				echo "<div class=\"credits\">" . $this->array[$i]['credit'] . "</div>";
			}
			if ( !$this->array[$i]['figcaption'] == "" ) {
				echo "<figcaption>" . $this->array[$i]['figcaption'] . "</figcaption>";
			}
			echo "</figure>";
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


}
?>
