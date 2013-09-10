<?php 

// we use these variables to check what type of slider is being created, and then output correctly
$slider_container_state = '<t4 type="content" name="Do you want to open or close slider?" output="normal" modifiers=""  />';
$selected_width = '<t4 type="content" name="Slider width" output="normal" modifiers=""  />';


if ($slider_container_state == 'open') { // open the slider 

  if ($selected_width == 'slider-8') { ?>

    <div class="row">
      <div class="l-content">

  <?php } ?>

        <div class="row slider-container <?php if ($selected_width == "full-grid-overflow") { echo "overflow"; } ?>">
          <!--  optional slider heading -->
          <t4 type="content" name="Slider Heading" output="selective-output" modifiers="" format="<h2>$value</h2>" />  
          <?php if ($selected_width == "slider-3-14") { ?><div class="slider-3-14"> <?php } ?>
          <div class="royalSlider rsDefault block <?php if ($selected_width != "slider-3-14") { echo $selected_width; } ?>" data-slider-auto-play="<t4 type="content" name="Slider auto-play" output="normal" modifiers=""  />" <?php 
            switch ($selected_width) {
              case "slider-12":
                echo "data-slider-item-width='948' data-slider-item-height='474'";
                break;
              case "slider-8":
                echo "data-slider-item-width='653' data-slider-item-height='327'";
                break;
              case "full-grid-width":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "full-grid-overflow":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "slider-3-14":
                echo "data-slider-item-width='948' data-slider-item-height='830'";
                break;  
              default:
                echo "";
            } ?>> 
              
<?php } else { // close the slider ?>        
          
          </div> 
          <?php if ($selected_width == "slider-3-14") { ?></div><?php } ?>
        </div><!-- end row div -->

  <?php if ($selected_width == 'slider-8') { ?>

      </div>
    </div>

  <?php }  
} ?>