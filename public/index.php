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
<div class="container">
      <h1>[UAL_Homepage]</h1>

    <div class="feature_content">
        <div class="span8">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span1">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span1">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span1">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span1">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span4">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span4">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span4">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span2">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span4">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>
        <div class="span4">
            <h2>Title</h2>
                <p>Subtitle</p>
        </div>  
    </div>


        </div>

            <footer>
                <p>FOOTER</p>
            </footer>


        </div>


BODY;

    $page->set("body", $body);
    /*Outputting the data to the end user*/
    $page->publish();