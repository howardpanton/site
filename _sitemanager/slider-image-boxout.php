<div class="slide">
	<figure>
		<?php if (environment() != 'live') { ?>
			<img src="<t4 type="content" name="Slider image" output="normal" modifiers="" formatter="path/*" />" alt="<t4 type="content" name="Slider image - alt text" output="normal" modifiers="" />" />
		<?php } else { ?>
			<img data-src="http://app.resrc.it/http://www.arts.ac.uk<t4 type="content" name="Slider image" output="normal" modifiers="" formatter="image/path" />" alt="<t4 type="content" name="Slider image - alt text" output="normal" modifiers="" />" class="resrc" />
  		<?php } ?>
		<t4 type="content" name="Image Credit" output="selective-output" modifiers="" format="<div class=&quot;credits&quot;>$value</div>"  />
	</figure>
	<div class="box-text aligncenter centered">
		<h3>
		<?php 
		$section_link = '<t4 type="content" name="Slide Section Link" output="normal" />';
		if ($section_link != '') { ?>
			<a href="<t4 type="content" name="Slide Section Link" output="normal" modifiers="nav_sections" />"><t4 type="content" name="Slide Title" output="normal" modifiers="" /></a>
		<?php } else { ?>
			<t4 type="content" name="Slide Title" output="normal" modifiers="" />
		<?php } ?>
		</h3>
		<t4 type="content" name="Slide Text" output="normal" modifiers="nav_sections" />
	</div>
</div>