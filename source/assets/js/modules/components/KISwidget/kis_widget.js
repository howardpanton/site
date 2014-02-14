/*
    -------------------------------------------------------------
        kisWidget()

        detect and load KIS Widget
    -------------------------------------------------------------
*/

function kisWidget() {
    if ($('.kis-widget').length > 0) {
      (function (d) {
      "use strict";
      var widgetScript = d.createElement('script');
      widgetScript.id = 'unistats-widget-script';
      widgetScript.src = '//widget.unistats.ac.uk/js/unistats.widget.js';
      var scriptTags = d.getElementsByTagName('script')[0];
      if (d.getElementById('unistats-widget-script')) {  return; }
        scriptTags.parentNode.insertBefore(widgetScript, scriptTags);
      } (document));
    }
}
