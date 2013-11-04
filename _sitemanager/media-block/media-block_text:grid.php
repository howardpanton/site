<?php 
// formatter for displaying list children at a parent level, in a content grid
if (!isset($old_section_title)) { $old_section_title = ''; }
$media_path = '';
$thumbnail_media_path = "<t4 type="content" name="Optional Thumbnail" output="normal" modifiers="" formatter="image/path" />";
$current_section_title = "<t4 type="navigation" id="49"/>";
$image_or_video = "<t4 type="content" name="Image or video?" output="normal" modifiers="" />";

// this conditional prevents the list from pulling back more than the first media block instance in a child section
if ($current_section_title != $old_section_title) {

  $media_path = "<t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />";
?>

<li data-tag="<t4 type="navigation" id="4149" />">
  <a class="no-border" href="<t4 type="navigation" id="21"/>" title="">
    <?php // if user has specified a thumbnail, use that 
    if ($thumbnail_media_path != '') { ?>
    	<figure><img class="m-hide" src="<?php echo $thumbnail_media_path; ?>" alt=""></figure>
    <?php } // otherwise, if an image has been uploaded to the main image field, display that using resrc.it
    elseif ($media_path != '' && $image_or_video == 'image') { ?>
    	<figure><img class="m-hide resrc" data-src="http://app.resrc.it/S=W600/C=W300,H300,XOF50,YOF20/http://beta.arts.ac.uk<?php echo $media_path; ?>" alt=""></figure>
    <?php } // finally, if no other image is available, display a placeholder
    else { ?>
      <t4 type="navigation" id="4309" />
    <?php } ?>
  </a>
  <h3 class="size-h5"><a href="<t4 type="navigation" id="21"/>" title=""><t4 type="navigation" id="49"/></a></h3>
  <?php // use the metadata intro to show a teaser
  $teaser = "<t4 type="navigation" id="4249" />";
  if ($teaser != '') { echo "<p>" . $teaser . "</p>"; } 
  ?>      
</li>

<?php 
  $old_section_title = $current_section_title; 
}

?>