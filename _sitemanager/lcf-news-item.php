<li class="row">
	<figure>
		<a href="<t4 type="content" name="Section Link" output="linkurl" modifiers="nav_sections"  /><t4 type="content" name="External Link" output="normal" modifiers=""  />">
			<?php if (environment() != "live") { ?>
				<img src="<t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers="" />" />
			<?php } else { ?>
				<img data-src="http://app.resrc.it/o=80/<?php echo siteURL(); ?><t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />" class="rsImg resrc" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers="" />" />
			<?php } ?>
		</a>
		<t4 type="content" name="Image Credit" output="selective-output" modifiers="" format="<div class=&quot;credits&quot;>$value</div>"  />
	</figure>
	<div class="text">
		<h3><a href="<t4 type="content" name="Section Link" output="linkurl" modifiers="nav_sections"  /><t4 type="content" name="External Link" output="normal" modifiers=""  />"><t4 type="content" name="Title" output="normal" modifiers=""  /></a></h3>
		<p><t4 type="content" name="Teaser Text" output="normal" modifiers=""  /></p>
	</div>
</li>