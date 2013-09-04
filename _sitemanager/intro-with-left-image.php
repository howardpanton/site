<?php 
$section_link = "<t4 type="content" name="Section content link" output="linkurl" modifiers="nav_sections" />"; 
$heading = "<t4 type="content" name="Heading" output="normal" modifiers="" />";
?>

<div class="row intro-block-with-left-image">
	<?php if ($heading != "") { ?>
		<header><h2>
		<?php if ($section_link != "") { ?>
			<a href="<t4 type="content" name="Section content link" output="linkurl" modifiers="nav_sections" />">
				<t4 type="content" name="Heading" output="normal" modifiers="" />
			</a>
		<?php } ?>
	</h2></header>
	<?php } ?>
	<div class="">
		<figure class="l-content-d5-d10">
			<img src="<t4 type="content" name="Image" output="normal" modifiers=""  formatter="image/path" />" alt="<t4 type="content" name="Image alt" output="normal" modifiers="striptags,htmlentities" />" />
			<figcaption><t4 type="content" name="Image caption" output="normal" modifiers="" /></figcaption>
		</figure>
		<div class="l-content-d11-d16">
                  <p class="leader"><t4 type="content" name="Leading text" output="normal" modifiers="" /></p>
                  <t4 type="content" name="Body text" output="normal" modifiers="" />
		</div>
	</div>
</div>