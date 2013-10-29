<figure>

  <?php if (environment() != 'live') { ?>

    <img src="<t4 type="content" name="Slider image" output="normal" modifiers="" formatter="image/path" />" alt="<t4 type="content" name="Slider image - alt text" output="normal" modifiers="" />" class="rsImg" />

  <?php } else { ?>
    
    <img data-src="http://app.resrc.it/http://beta.arts.ac.uk<t4 type="content" name="Slider image" output="normal" modifiers="" formatter="image/path" />" alt="<t4 type="content" name="Slider image - alt text" output="normal" modifiers="" />" class="rsImg resrc" />

  <?php }
  
  $call_to_action_switch = "<t4 type="content" name="Slider image - call to action" output="normal" modifiers="" />";

  if ($call_to_action_switch != "") { ?>

    <div class="call-to-action">
      <a href="<t4 type="content" name="Slider image - call to action section link" output="linkurl" modifiers="nav_sections" /><t4 type="content" name="Slider image - call to action link (external)" output="normal" modifiers="" />" title=""><t4 type="content" name="Slider image - call to action" output="normal" modifiers="" /></a>
    </div>

  <?php } ?>

  <t4 type="content" name="Image Credit" output="selective-output" modifiers="" format="<div class=&quot;credits&quot;>$value</div>"  />
  
  <figcaption class="rsCaption"><t4 type="content" name="Slider image caption" output="selective-output" modifiers="" format="<span>$value</span>" /></figcaption>
  
</figure>
