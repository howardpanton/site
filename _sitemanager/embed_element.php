<?php 
$element_width = "<t4 type="content" name="Element width" output="normal" modifiers=""  />";
$aside = "<t4 type="content" name="Aside" output="normal" modifiers="htmlentities"  />";
?>

<div class="row">

<?php if ($element_width == 'content') { ?>

	<div class="l-content  block  block-item">

<?php } else { ?>

	<div class="l-content-full-width  block">

<?php } ?>

	<t4 type="content" name="Code" output="normal" modifiers=""  />

	</div>

	<?php if ($element_width == 'content' && $aside != '') { ?>

	<aside class="<t4 type="content" name="Background color (Aside)" output="normal" modifiers=""  />">
		<t4 type="content" name="Aside" output="normal" modifiers="nav_sections"  />
	</aside>
          
	<?php } ?>

</div>
