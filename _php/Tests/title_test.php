<?php 
// Requires:
// https://github.com/facebook/php-webdriver
?>
<?php
//error_reporting(E_ALL);

  require "./lib/__init__.php";
  
  //Input capablities
  $caps = array(
    "browser" => "Safari",
    "browser_version" => "6.0",
    "os" => "OS X",
    "os_version" => "Lion",
    "browserstack.debug" => "true"    
  );
  
  $web_driver = new WebDriver("https://howardpanton:tfZyVxt7SkOg3IFcLpr8@hub.browserstack.com/wd/hub", $caps);
  $web_driver->get("http://beta.arts.ac.uk/student-jobs-and-careers/");
  print $web_driver->getTitle();

  $element = $web_driver->findElement(WebDriverBy::name("q"));
  if($element) {
      $element->sendKeys("Browserstack");
      $element->submit();
  }
  print "\n" . $web_driver->getTitle();
  $web_driver->quit();
?>