<?php 
$image_type = "<t4 type="content" name="Gallery image type" output="normal" modifiers=""  />";
$thumbnail = "<t4 type="content" name="Gallery thumbnail" output="normal" modifiers="" formatter="image/path" />";
?>
<li>
	<?php if ($image_type == 'lightbox') { ?>
		<a class="no-border" href="http://app.resrc.it/s=w930/o=80/http://beta.arts.ac.uk<t4 type="content" name="Gallery lightbox image" output="normal" modifiers="" formatter="image/path" />" title="<t4 type="content" name="Image caption" output="normal" modifiers=""  />" >
		<?php // if the user has uploaded a thumbnail, use that
		if ($thumbnail != '') { ?>
			
			<img src="<?php echo $thumbnail; ?>" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers=""  />">

		<?php } else { // otherwise generate a resrc'd image crop ?>

			<img data-src="http://app.resrc.it/C=W300,H300,XOF50,YOF20/http://beta.arts.ac.uk<t4 type="content" name="Gallery lightbox image" output="normal" modifiers="" formatter="image/path" />" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers=""  />" class="resrc" />

		<?php } ?>

		</a>
	<?php
	} else { // standard content gallery item with link ?>
		<a class="no-border" href="<t4 type="content" name="Section content link" output="linkurl" modifiers="nav_sections"  />">
			<?php // if the user has uploaded a thumbnail, use that
			if ($thumbnail != '') { ?>

				<img src="<?php echo $thumbnail; ?>" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers=""  />">
			
			<?php } else { // otherwise use a placeholder ?>

				<t4 type="navigation" id="4309" />

			<?php } ?>

		</a>
	<?php } ?>
    
	<t4 type="content" name="Section content link" output="selective-output" modifiers="" process-format="true" format="<h3 class=&quot;size-h5&quot;><a href=&quot;<t4 type=&quot;content&quot; name=&quot;Section content link&quot; output=&quot;linkurl&quot; modifiers=&quot;nav_sections&quot;  />&quot; title=&quot;&quot;><t4 type=&quot;content&quot; name=&quot;Section content link&quot; output=&quot;linktext&quot; modifiers=&quot;&quot;  /></a></h3>" />	       
	  		
</li>