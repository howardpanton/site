<?php
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

			$name = trim($name);
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

			echo '<pre>';
			var_dump($sorted);
			echo '</pre>';

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

					$temp_letter = $item['letter'];
					$counter++;

				} // end foreach ?>

			</div><!-- .row -->
		<?php
		} 

	} // AZ Class declaration

} // end check if class_exists

?>