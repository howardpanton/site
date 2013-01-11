<?php
  /* If true, doesn't throw an exception when short tags are disabled. Simply modify the default function value
   * to $suppress_shorttag_error=TRUE if you don't want to use short tags. */
  $shorttag_suppress_errors=FALSE;

  $root = realpath($_SERVER["DOCUMENT_ROOT"]);
  
  /**
   * Templating function. See example.php for usage.
   * 
   * @param $file Template file to load, omitting .php extension
   * @param $v Array of variables for use in the template (Example: <?=$v['example_param']?>)
   * @param $prefix Template directory prefix. (optional)
   * @param $suppress_shorttag_error 
   * 
   * @throws Exception $e If the template file is not found.
   */
  function t($file, $v = array(), $prefix= "/$root/_templates/")
  {   
    ob_start();
    
    if(file_exists($prefix.$file.'.tpl.php'))
      include($prefix.$file.'.tpl.php');
    else
      throw new Exception('Template file '. $prefix . $file .'.tpl.php does not exist.');
    
    return ob_get_clean();
  }
  
  /**
   * Tests if short tags are enabled.
   */
  if(!ini_get('short_open_tag') && !$shorttag_suppress_errors)
  {
    throw new Exception('PHP short tags are disabled, please set the short_open_tag directive to "On" in your php.ini');
  }


function curPageURL() {
 $pageURL = 'http';
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 }
 return $pageURL;
}

function breadcrumbs($separator = ' &raquo; ', $home = 'Home') {
    $path = array_filter(explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));
    $base = 'http'. '://' . $_SERVER['HTTP_HOST'] . '/';
    $breadcrumbs = Array("<a href=\"$base\">$home</a>");
    foreach ($path AS $x => $crumb) {
        $title = ucwords(str_replace(Array('.php', '_', '-'), Array('', ' ', ' '), $crumb));
        $breadcrumbs[] = "<a href=\"$base$crumb\">$title</a>";  
        $base = $base.$crumb.'/';
    }
    return implode($separator, $breadcrumbs);
}