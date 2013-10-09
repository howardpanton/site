<div class="row">
    <div class="l-content expandable-content">
        <t4 type="content" name="Component ID" output="selective-output" modifiers="" format="<a id='$value' class='in-page-link'></a>"  />
        <h2 id="<t4 type="content" name="Link ID" output="normal" modifiers=""  />"><t4 type="content" name="Heading" output="normal" modifiers=""  /></h2>
        <t4 type="content" name="Teaser text" output="selective-output" modifiers="" format="<p>$value</p>" />
        <div class="expanded-content">
        <t4 type="content" name="Full text" output="normal" modifiers="nav_sections"  />
        <p><a href ="#" class="button-link hide-content"><span class="hide-descriptive-text">This will reveal more about: <t4 type="content" name="Heading" output="normal" modifiers=""  /></span>
        <?php 
            $var = '<t4 type="content" name="Show Less button text" output="normal" modifiers=""  />'; 
            if (!empty($var)) {?>
                <t4 type="content" name="Show Less button text" output="normal" modifiers=""  />
            <?php } else { ?>
            Show less
            <?php } ?>
            </a></p>
        </div>
        <p><a href ="#" class="button-link show-more"><span class="hide-descriptive-text">This will show less about: <t4 type="content" name="Heading" output="normal" modifiers=""  /></span>

    <?php 
        $var = '<t4 type="content" name="Show More button text" output="normal" modifiers=""/>'; 
        if (!empty($var)) {?>
            <t4 type="content" name="Show More button text" output="normal" modifiers=""  />
        <?php } else { ?>
        Show more
        <?php } ?>
    </a></p>
    </div>
</div>