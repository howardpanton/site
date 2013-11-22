<?php
$container_state = '<t4 type="content" name="Do you want to open or close the list?" output="normal" modifiers=""  />';
if ($container_state == 'open') {
?>
	<div class="row">
		<div>
			<h2>News</h2>
		</div>
	</div>
	<div class="row"><!-- same as existing image-list-with-text but uses H3 for item title -->
		<div class="l-content-d3-d14 news-feed">
			<ul>

<?php } else { ?>

	      	</ul>
	    </div>
	</div><!-- .row -->

<?php } ?>