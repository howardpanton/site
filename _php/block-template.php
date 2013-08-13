<?php 

// Create a array object from Site Manager inputs
$array_<t4 type="content" name="Select Row" output="normal" modifiers=""  />[] = array( 
"heading" => "<t4 type="content" name="Heading" output="selective-output" modifiers="" format="$value"  />", 
"title" => "<t4 type="content" name="Title" output="selective-output" modifiers="" format="$value"  />", 
"section_link" => "<t4 type="content" name="Section Link" output="linkurl" modifiers="nav_sections"  />", 
"external_link" => "<t4 type="content" name="External Link" output="selective-output" modifiers="" format="$value"  />", 
"link_title" => "<t4 type="content" name="Link Title" output="selective-output" modifiers="" format="$value"  />",
"media" => "<t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />", 
"video-url" => "<t4 type="content" name="Video URL" output="normal" modifiers=""  />", 
"image" => "<t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />", 
"credit" => "<t4 type="content" name="Image Credit" output="selective-output" modifiers="" format="$value"  />", 
"figcaption" => "<t4 type="content" name="Image Caption" output="selective-output" modifiers="" format="$value"  />", 
"text" => "<t4 type="content" name="Teaser Text" output="selective-output" modifiers="" format="$value"  />", 
"button_link_text" => "<t4 type="content" name="Button Link Text" output="selective-output" modifiers="" format="$value"  />"
);

// Check whether option has been checked then create a new object
$last = "<t4 type="content" name="Check last element" output="normal" modifiers=""  />";

// Check if yes
if ($last == "Yes") {
	
	// Create new object for blocks
	$block_<t4 type="content" name="Select Row" output="normal" modifiers=""  /> = new Block($array_<t4 type="content" name="Select Row" output="normal" modifiers=""  />, "<t4 type="content" name="Block Style" output="normal" modifiers=""  />", "<t4 type="content" name="Media Width" output="normal" modifiers=""  />", "<t4 type="content" name="Heading" output="normal" modifiers=""  />" );
	$block_<t4 type="content" name="Select Row" output="normal" modifiers=""  />->set_block_output();
}

?>