<?php 
$current_section_title = '<t4 type="navigation" id="49"/>';
$image_or_video = '<t4 type="content" name="Image or video?" output="normal" modifiers="" />';
$media_path = '<t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />';
?>

<li>
  <a class="no-border" href="<t4 type="navigation" id="21"/>" title="">
    <?php if ($media_path != '' && $image_or_video == 'image') { ?>
    <img class="m-hide" data-src="http://app.resrc.it/<?php echo $media_path; ?>" alt="">
    <?php } else { ?>
    <img class="m-hide" src="http://placehold.it/320x320&text=Media block grid view" alt="">
    <?php } ?>
  </a>
  <h3 class="size-h5"><a href="<t4 type="navigation" id="21"/>" title=""><t4 type="content" name="Name" output="normal" modifiers="" /></a></h3>
</li>