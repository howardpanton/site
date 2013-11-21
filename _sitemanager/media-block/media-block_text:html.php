<?php 
  // clear existing variables
  $video_url = "";
  $media_block_type = "";

  $image_or_video = "<t4 type="content" name="Image or video?" output="normal" modifiers="" />";
  $media_width = "<t4 type="content" name="Media Width" output="normal" modifiers=""  />";
  $media_file_url = "<t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />";
  $video_url = "<t4 type="content" name="Video URL" output="normal" modifiers="" />";
  $aside_text = "<t4 type="content" name="Aside Text" output="normal" modifiers="htmlentities" />";
  $feed_text = "<t4 type="content" name="Add Feed to Aside" output="normal" modifiers=""  />";

  if ($image_or_video == "video" || $video_url != "") {
    $media_type = "video";
  } else {
    $media_type = "image";
  }

  if ($aside_text != "") {
    $media_block_type = "__with-aside";
  }
  
  if ($feed_text == "yes") {
    $media_block_type = "__with-aside";
  }

  // YOUTUBE
  if (strpos($video_url,"youtu") !== false) { // this allows for short URL and standard watch= URL
      $video_type = "youtube";
      if (strpos($video_url,"=") !== false) { // uses standard watch= URL
        $url_bits = explode('=', $video_url);
        $video_id = $url_bits[1];
      } else {
        $url_bits = explode('/', $video_url);
        $video_id = $url_bits[3];
      }
  }

  // VIMEO
  if (strpos($video_url,"vimeo") !== false) {
      $video_type = "vimeo";
      $url_bits = explode('/', $video_url);
      $video_id = $url_bits[3];
  }

  ?>

  <div class="row">
    <div class="l-content-full-width  block  __media  <?php echo $media_block_type; ?>">
      <t4 type="content" name="Component ID" output="selective-output" modifiers="" format="<a id=&quot;$value&quot; class=&quot;in-page-link&quot;></a>"  />
        <t4 type="content" name="Heading" output="selective-output" modifiers="" format="<h2>$value</h2>" />
          <div class="row">
            <?php if ($media_block_type == "__with-aside" || $media_width == "content") { ?>
            <div class="l-content">
            <?php } ?>  

            <?php if ($media_type == "video") { ?>

              <div class="video-container">

              <?php if ($video_url != "") { // this is an embed of some kind
                
                if ($video_type == "youtube") { ?>
                
                <iframe src="//www.youtube.com/embed/<?php echo $video_id; ?>" frameborder="0" allowfullscreen></iframe>            
            
                <?php } else { // Vimeo embed ?>

                <iframe src="//player.vimeo.com/video/<?php echo $video_id; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                
                <?php } 
                
              } else { // this is an MP4 ?>

                <video src="<?php if (environment() == 'live') { echo siteURL(); } ?><t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />" style="width:100%;height:100%;"></video>

              <?php } // end if has video url ?>

              <t4 type="content" name="Image Caption" output="selective-output" modifiers="" format="<div class=&quot;caption&quot;><span>$value</span></div>" />

              </div><!-- .video-container -->

            <?php } // end if is video

            // check that an image has been uploaded
            if ($media_type == "image" && $media_file_url != "") {
            ?>

            <figure>
              <?php if (environment() != "live") { ?>
                <img src="<t4 type="content" name="Media" output="normal" modifiers="medialibrary" formatter="image/path" />" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers="" />" />

              <?php } else { ?>
    
                <img data-src="http://app.resrc.it/o=80/<?php echo siteURL(); ?><t4 type="content" name="Media" output="normal" modifiers="" formatter="image/path" />" alt="<t4 type="content" name="Image ALT text" output="normal" modifiers="" />" class="rsImg resrc" />

              <?php } ?>

              <t4 type="content" name="Image Caption" output="selective-output" modifiers="" format="<figcaption><span>$value</span></figcaption> " />
              
              <t4 type="content" name="Image Credit" output="selective-output" modifiers="" format="<div class=&quot;credits&quot;>$value</div>"  />
            </figure>

            <?php } ?>

            <div class="__text">      

              <t4 type="content" name="Title" output="selective-output" modifiers="" format="<h3>$value</h3>" />
              
              <t4 type="content" name="Teaser Text" output="selective-output" modifiers="" format="<p class=&quot;leader&quot;>$value</p>" />
                  
              <t4 type="content" name="Main Text" output="normal" modifiers="nav_sections"  />
              
              <t4 type="content" name="Button Link Text" output="selective-output" modifiers="" process-format="true" format="<p><a href=&quot;<t4 type=&quot;content&quot; name=&quot;Button Section Link&quot; output=&quot;normal&quot; modifiers=&quot;&quot;  /><t4 type=&quot;content&quot; name=&quot;Button Link (external)&quot; output=&quot;normal&quot; modifiers=&quot;&quot;  />&quot; title=&quot;<t4 type=&quot;content&quot; name=&quot;Button Link Title&quot; output=&quot;normal&quot; modifiers=&quot;&quot;  />&quot; class=&quot;button-link&quot;><span class=&quot;hide-descriptive-text&quot;>Follow this link to go to more information about</span>$value</a></p>" />
            </div><!-- .__text -->
       
          <?php if ($media_block_type == "__with-aside" || $media_width == "content") { ?>
          </div><!-- .l-content -->
          <?php } ?>  

          <!-- aside -->
          <t4 type="content" name="Aside Text" output="selective-output" modifiers="nav_sections" format="<aside>$value</aside>"  />
          <!-- end aside -->
      <?php if ($feed_text == "yes") : ?>
          <aside>
          <!-- navigation object : LCC Home Page Feed -->
          <t4 type="navigation" id="4529"/>       </aside>
      <?php endif ?>
        
        </div><!-- .row --> 

    </div><!-- end __media -->
  </div>
