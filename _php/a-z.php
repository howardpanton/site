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

?>