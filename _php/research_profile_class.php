	<!-- php research profile class -->
	<?php
	// check whether class exists
	if(class_exists('Profile') != true) 
	{
		/**
		 * 2, 3, 4 up Block class for building block object from an array
		 */
		class Profile {

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

				echo '<pre>';
				//var_dump($array);
				echo '</pre>';

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



			/**
			 * [do_output output the content for the blocks]
			 */
			public function do_output() {
				
				$enhanced = $this->enhance_arrays();

				$sorted = $this->alpha_sort_array($enhanced, 'surname');
				
				//echo '<pre>';
				//var_dump($sorted);
				//echo '</pre>';

				foreach ($sorted as $item) { ?>

					<li class="row">
						<figure>
							<a href="<?php echo $item['section_link']; ?>" title=""><img src="http://placehold.it/300x300&text=THUMBNAIL" alt="Image Alt"></a>
						</figure>
						<div class="text">
							<h3 class="size-h5"><a href="<?php echo $item['section_link']; ?>" title=""><?php echo $item['title']; ?></a></h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nulla turpis, ullamcorper congue pharetra sit amet, varius sit amet diam. Sed bibendum porttitor mattis. Phasellus nisl mi, gravida in porta nec, hendrerit quis arcu. (max XX words)</p>
						</div>
					</li>

				<?php	
				}

				
	
			}


			

		} // Profile Class declaration

		


	} // end check if class_exists

	?>