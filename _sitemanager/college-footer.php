<?php 
$icon_1_type = "<t4 type='content' name='Social Media Link 1 Type' output='normal' modifiers=''  />"; 
$icon_2_type = "<t4 type='content' name='Social Media Link 2 Type' output='normal' modifiers=''  />"; 
$icon_3_type = "<t4 type='content' name='Social Media Link 3 Type' output='normal' modifiers=''  />"; 

$icon_1_url = "<t4 type='content' name='Social Media Link 1 URL' output='normal' modifiers=''  />"; 
$icon_2_url = "<t4 type='content' name='Social Media Link 2 URL' output='normal' modifiers=''  />"; 
$icon_3_url = "<t4 type='content' name='Social Media Link 3 URL' output='normal' modifiers=''  />"; 

$icon_array = array(
  array(
    "type" => $icon_1_type,
    "url" => $icon_1_url,
    ),
  array(
    "type" => $icon_2_type,
    "url" => $icon_2_url
    ),
  array(
    "type" => $icon_3_type,
    "url" => $icon_3_url
    )
  );
?>

<footer class="college-footer row ">
  <div class="footer-wrapper">
    <div class="footer-block left">
                  
      <t4 type="content" name="Left Column Title" output="selective-output" modifiers="" format="<h3 class='size-h2'>$value</h3>" />
      <!-- see http://html5doctor.com/microformats/ -->
      <ul class="vcard">
        <li class="no-bullet">
          <a class="fn org url" href="<t4 type="navigation" id="4329" />" title="Contact information for <t4 type='content' name='College Name' output='normal' modifiers='' />"><span class="organization-name"><t4 type="content" name="College Name" output="normal" modifiers=""  /></span></a>
        </li>
        <li>
        <span class="adr">
          <span class="street-address"><t4 type="content" name="Street address line 1" output="normal" modifiers=""  /><t4 type="content" name="Street address line 2" output="selective-output" modifiers="" format="<br/>$value" /></span>, <t4 type="content" name="Address locality" output="selective-output" modifiers="" format="<span class='locality'>$value</span>,<br>" />
          <span class="region"><t4 type="content" name="Address region" output="normal" modifiers=""  /></span> <span class="postal-code"><t4 type="content" name="Postcode" output="normal" modifiers=""  /></span> <t4 type="content" name="Country" output="selective-output" modifiers="" format="<span class='country'>$value</span>" />
          <br>
        </span>
        </li>
        <t4 type="content" name="Telephone number" output="selective-output" modifiers="" format="<li><span class=&quot;tel&quot;>Telephone: <span class=&quot;value&quot;>$value</span></span></li>"  />
        <t4 type="content" name="Email Address" output="selective-output" modifiers="" format="<li><a href=&quot;$value&quot;>$value</a></li>" />
        <t4 type="content" name="Contact Section Link" output="selective-output" modifiers="nav_sections" format="<li>$value</li>" />
      </ul>
    </div>
    <div class="footer-block middle">
      <t4 type="content" name="Middle Column Title" output="selective-output" modifiers="" format="<h3 class='size-h2'>$value</h3>" />
      <t4 type="content" name="Middle Column Content" output="normal" modifiers=""  />
    </div>
    <div class="footer-block right">
      <t4 type="content" name="Right Column Title" output="selective-output" modifiers="" format="<h3 class='size-h2'>$value</h3>" />
        <ul class="icons no-bullet">
          <?php foreach( $icon_array as $icon ) { 
          
            if ($icon['url'] == "") { continue; }
          
            switch ($icon['type']) {
              case "facebook":
                $icon_classname = "icon-facebook-circled";
                //$icon_ascii = "0xe815";
                break;
              case "twitter":
                $icon_classname = "icon-twitter-circled";    
                //$icon_ascii = "0xe831";                
                break;
              case "flickr":
                $icon_classname = "icon-flickr-circled";   
                break;
              case "youtube":
                $icon_classname = "icon-youtube";
                break;
              case "full-grid-width": // what's this ?
                //$icon_ascii = "&#62211;"; 
              break;

            } ?>
            <li>
              <a href="<?php echo $icon['url']; ?>" class="<?php echo $icon['type']; ?>">
                <span class="<?php echo $icon_classname; ?>"></span>
              </a>
            </li>
          <?php
          } ?> 
        </ul>
    </div>
  </div>
</footer>