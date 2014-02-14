<?php 

if (!isset($old_section_title)) { $old_section_title = ''; }
$current_section_title = "<t4 type="navigation" id="49"/>";


// this conditional prevents the list from pulling back more than the first media block instance in a child section
if ($current_section_title != $old_section_title) {

	// Create a array object from Site Manager inputs
	$profile_array[] = array( 
	  "title" => "<t4 type="navigation" id="49"/>", 
	  "section_link" => "<t4 type="navigation" id="21"/>",
	  "teaser" => "<t4 type="navigation" id="4249" />"
	);

	$old_section_title = $current_section_title; 
}
?>