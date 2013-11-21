<!-- Used in:
-
- Media Block
- Text Block
- Text Block with Aside
- Panorama: HTML
-  
- See also:
- Content Gallery Image (which uses the same code in a text/html formatter)
-
-->  
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
      <figure><img class="m-hide resrc" data-src="http://app.resrc.it/<?php if (environment() == 'live') { echo siteURL(); } ?><?php echo $thumbnail_media_path; ?>"></figure>
    <?php } // otherwise, if an image has been uploaded to the main image field, display that using resrc.it
    elseif ($media_path != '' && $image_or_video == 'image') { ?>
      <figure><img class="m-hide resrc" data-src="http://app.resrc.it/C=SQ/C=W75P,H75P,XOF50,YOF20/S=W300/<?php if (environment() == 'live') { echo siteURL(); } ?><?php echo $media_path; ?>"></figure>
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