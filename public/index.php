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
            <header>
                <p>HEADER</p>
            </header>

            <div class="page_nav fl">
                <p>PAGE NAV</p>
            </div>

        <div class="content">
            <p>MAIN CONTENT</p>
            
            <div class="box1 fl">
                <p>box1</p>
            </div>

            <div class="box6 fl">
                <p>box6</p>
            </div>

            <div class="box6 fl">
                <p>box6</p>
            </div>

            <div class="box6 fl">
                <p>box6</p>
            </div>

            <div class="box6 fl">
                <p>box6</p>
            </div>

            <div class="box4 fl">
                <p>box4</p>
            </div>

            <div class="box4 fl">
                <p>box4</p>
            </div>

            <div class="box4 fl">
                <p>box4</p>
            </div>

            <div class="box5 fl">
                <p>box5</p>
            </div>

            <div class="box5 fl">
                <p>box5</p>
            </div>

            <div class="box4 fl">
                <p>box4</p>
            </div>

            <div class="box3 fl">
                <p>box3</p>
            </div>

            <div class="box3 fl">
                <p>box3</p>
            </div>

            <div class="box2 fl">
                <p>box2</p>
            </div>

            <div class="clear">
                <p>RELATED CONTENT</p>
            </div>

            <div class="box4 fl">
                <p>box4</p>
            </div>
            <div class="box4 fl">
                <p>box4</p>
            </div>
            <div class="box4 fl">
                <p>box4</p>
            </div>
            <div class="box4 fl">
                <p>box4</p>
            </div>
            <div class="box4 fl">
                <p>box4</p>
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