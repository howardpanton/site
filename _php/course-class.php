<?php

if(class_exists('Block') != true) 
{
	
	class Course {
    		// Create course object
    		public function __construct(Array $properties = array()) {
      		foreach($properties as $key => $value) {
        		$this->{$key} = $value;
      		}
    		}
	}

}

?>

<?php
// Instantiante Array

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

  
$course = new Course($courses);

// output course array in JSON
echo json_encode($course);