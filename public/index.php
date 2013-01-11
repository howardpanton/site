<?php

		$root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require_once "/$root/_system/Templater.php";

    /*Here we setup the most simple usage of the template*/

    $page = new Templater("/$root/_templates/main.tpl.php");    // Loading the template file
    /*Setting variables using the 2 methods*/
    $page->title = "Home Page";
    /* Load the current directory into an array*/
		$files1 = m();
		/* Load the array into an object to be used by the tempalte file*/
		$page->menu = $files1;

    /* Load the body text into a variable*/
    $body = <<<BODY
 	  <section class="row">
	
		<!-- Slideshow using side navigation -->
		
			<div class="rslides_container">
	 	      <ul class="rslides" id="slider3">
	 	        <li><img src="http://placehold.it/1600x450&text=[img1]" alt="" /></li>
	 	        <li><img src="http://placehold.it/1600x450&text=[img2]" alt="" /></li>
	 	        <li><img src="http://placehold.it/1600x450&text=[img3]" alt="" /></li>
	 	      </ul> 
			</div>
			
			<!-- Excerpt Information -->
			
			<section class="row">
				<div class="four columns">
					<img src="http://placehold.it/400x200&text=[image]" alt="" />
					<h4>Heading Section 1</h4>
					<p>I'm a brief description for section 1. If you want to know more you should 
						click the link below.</p>
						<p><a href="#">Click Me <i class="icon-chevron-right"></i></a>
				</div>
				<div class="four columns">
					<img src="http://placehold.it/400x200&text=[image]" alt="" />
					<h4>Heading Section 2</h4>
					<p>I'm a brief description for section 2. If you want to know more you should 
						click the link below.</p>
						<p><a href="#">Click Me <i class="icon-chevron-right"></i></a>
				</div>	
				<div class="four columns">
					<img src="http://placehold.it/400x200&text=[image]" alt="" />
					<h4>Heading Section 3</h4>
					<p>I'm a brief description for section 3. If you want to know more you should 
						click the link below.</p>
						<p><a href="#">Click Me <i class="icon-chevron-right"></i></a>
				</div>
				
				<div class="four columns">
					<img src="http://placehold.it/400x200&text=[image]" alt="" />
					<h4>Heading Section 4</h4>
					<p>I'm a brief description for section 4. If you want to know more you should 
						click the link below.</p>
						<p><a href="#">Click Me <i class="icon-chevron-right"></i></a>
				</div>
			</section>
			
			
			<!-- Bottom Section -->
			<div class="row">
			<!-- Callout Container -->
				<section class="ten columns">
					<div class="callout row">
						<div class="six columns">
							<h1>Callout Header</h1>
							<h4>I'm a callout subtitle or description text</h4>
						</div>
						<div class="nine columns alt-spacing">
			    			<p>This is dummy text and is not meant to be read. Epsum factorial non deposit quid pro quo hic escorol. Olypian quarrels et gorilla congolium</p>
			     			<a href="#">Read More <i class="icon-chevron-right"></i></a>
						</div>
					</div>
				</section>	
	
	  		<!-- Get In Touch -->
	
				<section class="six columns">
					<h1>Get in Touch</h1>
					<hr>
					<a href="#" class="button large row">Call To Action</a>
					<a href="#" class="button large row">Call To Action</a>
				</section>
		<!-- End Of Get In Touch -->	
			</div>
 	  </section>
	  <!-- End of Bottom Section -->
BODY;

    $page->set("body", $body);
    /*Outputting the data to the end user*/
    $page->publish();