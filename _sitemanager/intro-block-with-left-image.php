<?php 
$section_link = "<t4 type="content" name="Section content link" output="linkurl" modifiers="nav_sections" />"; 
$heading = "<t4 type="content" name="Heading" output="normal" modifiers="" />";
$optional_feed = "<t4 type="content" name="Optional Feed URI" output="normal" modifiers=""  />";
?>

<div class="row">
	<div class="intro-block-with-left-image">
	<?php if ($heading != "") { ?>
		<div class="row">
			<header>
				<h2>
				<?php if ($section_link != "") { ?>
					<a href="<t4 type="content" name="Section content link" output="linkurl" modifiers="nav_sections" />">
						<t4 type="content" name="Heading" output="normal" modifiers="" />
					</a>
				<?php } ?>
				</h2>
			</header>
		</div>
	<?php } ?>
		<div class="row">
			<div class="left-col">
				<figure>
					<?php if (environment() != 'live') { ?>
					<img src="<t4 type="content" name="Image" output="normal" modifiers=""  formatter="image/path" />" alt="<t4 type="content" name="Image alt" output="normal" modifiers="striptags,htmlentities" />" />
					<?php } else { ?>
					<img src="http://app.resrc.it/<?php echo siteURL(); ?><t4 type="content" name="Image" output="normal" modifiers=""  formatter="image/path" />" alt="<t4 type="content" name="Image alt" output="normal" modifiers="striptags,htmlentities" />" />
					<?php } ?>
					  
					<t4 type="content" name="Image Credit" output="selective-output" modifiers="" format="<div class=&quot;credits&quot;>$value</div>" />
					<figcaption><t4 type="content" name="Image caption" output="normal" modifiers="nav_sections" /></figcaption>
				</figure>
			</div>
			<div class="right-col">
				<p class="leader"><t4 type="content" name="Leading text" output="normal" modifiers="" /></p>
				<t4 type="content" name="Body text" output="normal" modifiers="nav_sections" />
				<?php if ($optional_feed != "") { ?>
				<p>Latest updates:</p>
				<ul>
        			<t4 type="data-obj" for-each="item" formatter="text/output" rss-url="$template.optional feed uri$" max-number="3" method="rss" />
        		</ul>
				<?php } ?>
			</div>
		</div>
	</div>
</div>