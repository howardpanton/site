<?php
// check whether class exists
if(class_exists('LeftRight') != true) 
{

  class LeftRight {

		public $array; // list item to go left or right 
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


		
		public function do_item_loop($item) {
		?>
			<div class="block-item">
			  <figure>
			    <img src="http://placehold.it/300x300&text=THUMBNAIL" alt="">
			    <div class="credits"><?php if ($item['credit'] != '') { echo $item['credit']; } ?></div>
			  </figure>
			  <div class="text">
			    <p><a href="<?php echo $item['section_link']; ?>" title=""><?php if ($item['heading'] != '') { echo $item['heading']; } ?></a></p>
				<?php if ($item['text'] != '') { echo "<p>" . $item['text'] . "</p>"; } ?>
			    <?php if ($item['side'] != '') { echo $item['side']; } ?>
				</div>
			</div>			
			
		<?php 	
		}



		/**
		 * [do_output output the content for the blocks]
		 */
		public function do_output() {
		?>
		
			<div class="row">
			  <div class="l-content-full-width block __media">
			    <h2>Left or Right</h2>				      		  <div class="l-content-d5-d10">
				  	<?php
						foreach ($this->array as $item) {
						if($item['side'] == 'Left') {
							$this->do_item_loop($item);
						}
					}
					?>
				  </div>
				  <div class="l-content-d11-d16">
					<?php
						foreach ($this->array as $item) {
						if($item['side'] == 'Right') {
							$this->do_item_loop($item);
						}
					}
					?>
				  </div>
			  </div> <!-- .l-content-full-width -->
			</div> <!-- .row -->
		
		<?php
		}

	} // LeftRight Class declaration

} // end check if class_exists

?>


<?php 

$course_array[] = array( 
"section_link" => "http://www.google.com",
"heading" => "Fine Art",
"credit" => "Credit will go here if using student work", 
"text" => "This will be the list of FINE ART courses.",
"side" => "Right"
);

$course_array[] = array( 
"section_link" => "http://www.google.com",
"heading" => "Journalism",
"credit" => "Credit will go here if using student work", 
"text" => "This will be the list of JOURNALISM courses.",
"side" => "Right"
);

$course_array[] = array( 
"section_link" => "http://www.google.com",
"heading" => "Photography",
"credit" => "Credit will go here if using student work", 
"text" => "This will be the list of PHOTOGRAPHY courses.",
"side" => "Left"
);

$course_array[] = array( 
"section_link" => "http://www.google.com",
"heading" => "Textile Design",
"credit" => "Credit will go here if using student work", 
"text" => "This will be the list of TEXTILE DESIGN courses.",
"side" => "Left"
);

$course_array[] = array( 
"section_link" => "http://www.google.com",
"heading" => "Graphic Design",
"credit" => "Credit will go here if using student work", 
"text" => "This will be the list of GRAPHIC DESIGN courses.",
"side" => "Right"
);

// Create new object for blocks
$course_list = new LeftRight($course_array);
$course_list->do_output();

?>
	