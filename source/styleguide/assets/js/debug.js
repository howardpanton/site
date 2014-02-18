// Gridset Overlay JS

gs = {

  init: function () {
    
    if (window.location.href.match('gridset=show')) gs.show();
  
    gs.bind(document, 'keydown', function (e) { 
    
      if (!e) var e = window.event;
    
      if(e.metaKey || e.ctrlKey) {
        
        switch (e.which || e.keyCode) {
          case 71:
          
            var gw = document.getElementById('gridsetoverlaywrap');
          
            if (!gw) gs.show();
            else gs.remove(gw);
            
            gs.prevent(e);
            break;
            
        }
        
      }
    
    
    });
  
  },
  
  remove: function (gw) {
  
    document.body.removeChild(gw);
    
    if(window.detachEvent) window.detachEvent('onresize', gs.width);
    else window.removeEventListener('resize', gs.width, false);
  
  },
  
  width: function () {
    
    var swv = document.getElementById('gridscreenwidthval');
    if (swv) swv.innerHTML = window.innerWidth + 'px';
    
  },

  show: function () {
  
    var p = ['d','t','m'],
      c = [16,8,4],
      w = [960,600,320],
      b = document.getElementsByTagName('body')[0],
      gw = '<div id="gridwrap"><div id="gridscreenwidthwrap"><p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p></div><div id="gridoverlay" class="content-wrapper">',
    
      k = 0, breaks = '',
      
      styles = '<style id="gridsetoverlaystyles" type="text/css">#gridsetoverlaywrap{position:static;}#gridwrap{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;pointer-events:none;font-family:Helvetica, Arial, sans-serif !important;}#gridoverlay{position:relative;height:100%;overflow:hidden !important;background:none !important;}#gridoverlay div{display:block;position:static;height:100%;color:#bcbcff;}#gridoverlay .gridset{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.7;}#gridoverlay .gridset div{text-align:left;font-size:10px !important;border-right:1px solid #bcbcff;border-left:1px solid #bcbcff;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}#gridoverlay div small{width:100%;display:block;text-align:center;color:#7D80DB;font-weight:700 !important;border-bottom:1px solid #bcbcff;border-top:1px solid #bcbcff;padding-top:0 !important;background-color:rgb(240,240,255) !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;}#gridoverlay .gridset:nth-child(2) div{border-style:dashed;padding-top:23px;}#gridoverlay .gridset:nth-child(2) small{border-style:dashed;}#gridoverlay .gridset:nth-child(3) div{border-style:dotted;padding-top:45px;}#gridoverlay .gridset:nth-child(3) small{border-style:dotted;}#gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{display:block !important;width:100% !important;position:absolute !important;bottom:0 !important;left:0 !important;height:30px !important;border-top:1px solid #7D80DB !important;opacity:0.7 !important;background-color:rgb(240,240,255) !important;}#gridscreenwidth{display:block !important;width:100% !important;text-align:center !important;font-size:12px !important;line-height:1 !important;padding-top:8px !important;font-family:Helvetica, Arial, sans-serif !important; margin: 0 !important;color:#7D80DB !important;}@media only screen and (max-width:599px) {#gridsetoverlaywrap [class*=m1],#gridsetoverlaywrap [class*=m2],#gridsetoverlaywrap [class*=m3],#gridsetoverlaywrap [class*=m4],#gridsetoverlaywrap .m-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=m1]{width:22.02041184971098%;margin-left:0%;}#gridsetoverlaywrap [class*=m2]{width:22.191112716763005%;margin-left:25.770411849711%;}#gridsetoverlaywrap [class*=m3]{width:22.191112716763005%;margin-left:51.711524566474%;}#gridsetoverlaywrap [class*=m4]{width:22.191112716763005%;margin-left:77.652637283237%;}#gridsetoverlaywrap .m-hide{display:none !important;}}@media only screen and (min-width:600px) and (max-width:959px) {#gridsetoverlaywrap [class*=t1],#gridsetoverlaywrap [class*=t2],#gridsetoverlaywrap [class*=t3],#gridsetoverlaywrap [class*=t4],#gridsetoverlaywrap [class*=t5],#gridsetoverlaywrap [class*=t6],#gridsetoverlaywrap [class*=t7],#gridsetoverlaywrap [class*=t8],#gridsetoverlaywrap .t-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=t1]{width:9.39731821738436%;margin-left:0%;}#gridsetoverlaywrap [class*=t2]{width:8.931335492754616%;margin-left:13.397318217384%;}#gridsetoverlaywrap [class*=t3]{width:8.931335492754616%;margin-left:26.328653710139%;}#gridsetoverlaywrap [class*=t4]{width:8.931335492754616%;margin-left:39.259989202894%;}#gridsetoverlaywrap [class*=t5]{width:8.931335492754616%;margin-left:52.191324695648%;}#gridsetoverlaywrap [class*=t6]{width:8.931335492754616%;margin-left:65.122660188403%;}#gridsetoverlaywrap [class*=t7]{width:8.931335492754616%;margin-left:78.053995681157%;}#gridsetoverlaywrap [class*=t8]{width:8.931335492754616%;margin-left:90.985331173912%;}#gridsetoverlaywrap .t-hide{display:none !important;}}@media only screen and (min-width:960px) {#gridsetoverlaywrap [class*=d1],#gridsetoverlaywrap [class*=d2],#gridsetoverlaywrap [class*=d3],#gridsetoverlaywrap [class*=d4],#gridsetoverlaywrap [class*=d5],#gridsetoverlaywrap [class*=d6],#gridsetoverlaywrap [class*=d7],#gridsetoverlaywrap [class*=d8],#gridsetoverlaywrap [class*=d9],#gridsetoverlaywrap [class*=d10],#gridsetoverlaywrap [class*=d11],#gridsetoverlaywrap [class*=d12],#gridsetoverlaywrap [class*=d13],#gridsetoverlaywrap [class*=d14],#gridsetoverlaywrap [class*=d15],#gridsetoverlaywrap [class*=d16],#gridsetoverlaywrap .d-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=d1]{width:4.258475401666784%;margin-left:0%;}#gridsetoverlaywrap [class*=d2]{width:3.8792960843333257%;margin-left:6.7584754016668%;}#gridsetoverlaywrap [class*=d3]{width:3.8792960843333257%;margin-left:13.137771486%;}#gridsetoverlaywrap [class*=d4]{width:3.8792960843333257%;margin-left:19.517067570333%;}#gridsetoverlaywrap [class*=d5]{width:3.8792960843333257%;margin-left:25.896363654667%;}#gridsetoverlaywrap [class*=d6]{width:3.8792960843333257%;margin-left:32.275659739%;}#gridsetoverlaywrap [class*=d7]{width:3.8792960843333257%;margin-left:38.654955823333%;}#gridsetoverlaywrap [class*=d8]{width:3.8792960843333257%;margin-left:45.034251907667%;}#gridsetoverlaywrap [class*=d9]{width:3.8792960843333257%;margin-left:51.413547992%;}#gridsetoverlaywrap [class*=d10]{width:3.8792960843333257%;margin-left:57.792844076333%;}#gridsetoverlaywrap [class*=d11]{width:3.8792960843333257%;margin-left:64.172140160667%;}#gridsetoverlaywrap [class*=d12]{width:3.8792960843333257%;margin-left:70.551436245%;}#gridsetoverlaywrap [class*=d13]{width:3.8792960843333257%;margin-left:76.930732329333%;}#gridsetoverlaywrap [class*=d14]{width:3.8792960843333257%;margin-left:83.310028413667%;}#gridsetoverlaywrap [class*=d15]{width:3.8792960843333257%;margin-left:89.689324498%;}#gridsetoverlaywrap [class*=d16]{width:3.8792960843333257%;margin-left:96.068620582333%;}#gridsetoverlaywrap .d-hide{display:none !important;}}</style>';

            
    while (p[k]) {
    
      var hides = '', 
        l = 0;
    
      if (w[k] != breaks && k == 0) gw += '<div>';
      else if (w[k] != breaks) gw += '</div><div>';
    
      while (p[l]) {
    
        if (l != k && w[l] != w[k]) hides += p[l] + '-hide ';
        l++;      
    
      }
    
      gw += '<div class="gridset ' + hides + '"><div class="'+p[k]+'1"><small>'+p[k]+'1</small></div>';
    
      var i = 1;
    
      while (i++ < c[k]) gw += '<div class="'+p[k]+i+'"><small>'+p[k]+i+'</small></div>';
    
      gw += '</div>';
    
      if (k == w.length - 1) gw += '</div>';
    
      breaks = w[k];
    
      k++;
    
    }
    
    gw += '</div></div>';
    
    var newgw = document.createElement('div');
    
    newgw.id = 'gridsetoverlaywrap';
    
    newgw.innerHTML = gw + styles;
    
    b.appendChild(newgw);
    
    gs.width();
    gs.bind(window, 'resize', gs.width);
  
  },
  
  bind : function (t, e, f) {
    
    if (t.attachEvent) t.attachEvent('on' + e, f);
    else t.addEventListener(e, f, false);
  
  },
  
  prevent : function (e) {
  
    if (e.preventDefault) e.preventDefault();
    else event.returnValue = false;
  
  }


};

gs.init();


/**
 * hashgrid (jQuery version, adapters are on the way)
 * http://github.com/dotjay/hashgrid
 * Version 8, 06 Oct 2012
 * Written by Jon Gibbins
 *
 * Contibutors:
 * James Aitken, http://loonypandora.co.uk/
 * Tom Arnold, http://www.tomarnold.de/
 * Sean Coates, http://seancoates.com/
 * Phil Dokas, http://jetless.org/
 * Andrew Jaswa, http://andrewjaswa.com/
 * Callum Macrae, http://lynx.io/
 */

/**
 * @license Copyright 2011 Analog Coop Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Usage
 *
 * // The basic #grid setup looks like this
 * var grid = new hashgrid();
 *
 * // But there are a whole bunch of additional options you can set
 * var grid = new hashgrid({
 *     id: 'mygrid',            // set a custom id for the grid container
 *     modifierKey: 'alt',      // optional 'ctrl', 'alt' or 'shift'
 *     showGridKey: 's',        // key to show the grid
 *     holdGridKey: 'enter',    // key to hold the grid in place
 *     foregroundKey: 'f',      // key to toggle foreground/background
 *     jumpGridsKey: 'd',       // key to cycle through the grid classes
 *     numberOfGrids: 2,        // number of grid classes used
 *     classPrefix: 'myclass',  // prefix for the grid classes
 *     cookiePrefix: 'mygrid'   // prefix for the cookie name
 * });
 */


/**
 * Make sure we have the library
 * TODO: Use an adapter
 */
if (typeof jQuery == "undefined") {
  //alert("Hashgrid: jQuery not loaded. Make sure it's linked to your pages.");
}


/**
 * hashgrid overlay
 * @constructor
 */
var hashgrid = function(set) {

  var options = {
      id: 'grid',             // id for the grid container
      modifierKey: null,      // optional 'ctrl', 'alt' or 'shift'
      showGridKey: 'h',       // key to show the grid
      holdGridKey: 'h',       // key to hold the grid in place
      foregroundKey: 'f',     // key to toggle foreground/background
      jumpGridsKey: 'j',      // key to cycle through the grid classes
      numberOfGrids: 1,       // number of grid classes used
      classPrefix: 'grid-',   // prefix for the grid classes
      cookiePrefix: 'hashgrid'// prefix for the cookie name
    },
    alreadyDown,
    classNumber = 1,
    gridLines,
    gridWidth,
    i,
    line,
    lineHeight,
    numGridLines,
    overlay,
    overlayCookie,
    overlayEl,
    overlayOn = false,
    overlayVert,
    overlayZState = 'B',
    overlayZBackground = -1,
    overlayZForeground = 9999,
    pageHeight,
    setKey,
    state,
    sticky = false,
    top;

  // Apply options
  if (typeof set == 'object') {
    for (setKey in set) {
      options[setKey] = set[setKey];
    }
  }
  else if (typeof set == 'string') {
    options.id = set;
  }

  // Remove any conflicting overlay
  if ($('#' + options.id).length > 0) {
    $('#' + options.id).remove();
  }

  // Create overlay, hidden before adding to DOM
  overlayEl = $('<div></div>');
  overlayEl
    .attr('id', options.id)
    .css({
      display: 'none',
      pointerEvents: 'none'
    });
  $("body").prepend(overlayEl);
  overlay = $('#' + options.id);

  // Unless a custom z-index is set, ensure the overlay will be behind everything
  if (overlay.css('z-index') == 'auto') overlay.css('z-index', overlayZBackground);

  // Override the default overlay height with the actual page height
  pageHeight = parseFloat($(document).height());
  overlay.height(pageHeight);

  // Add the first grid line so that we can measure it
  overlay.append('<div id="' + options.id + '-horiz" class="horiz first-line">');

  // Position off-screen and display to calculate height
  top = overlay.css("top");
  overlay.css({
    top: '-999px',
    display: 'block'
  });

  // Calculate the number of grid lines needed
  line = $('#' + options.id + '-horiz');
  lineHeight = line.outerHeight();

  // Hide and reset top
  overlay.css({
    display: 'none',
    top: top
  });

  // Break on zero line height
  if (lineHeight <= 0) {
    return false;
  }

  // Add the remaining grid lines
  numGridLines = Math.floor(pageHeight / lineHeight);
  gridLines = '';

  for (i = numGridLines - 1; i >= 1; i--) {
    gridLines += '<div class="horiz"></div>';
  }
  overlay.append(gridLines);

  // vertical grid
  overlay.append($('<div class="vert-container"></div>'));
  overlayVert = overlay.children('.vert-container');
  gridWidth = overlay.width();
  overlayVert.css({width: gridWidth, position: 'absolute', top: 0});
  overlayVert.append('<div class="vert first-line">&nbsp;</div>');

  // 30 is an arbitrarily large number...
  // can't calculate the margin width properly
  gridLines = '';
  for (i = 0; i < 30; i++) {
    gridLines += '<div class="vert">&nbsp;</div>';
  }
  overlayVert.append(gridLines);
  overlayVert.children()
    .height(pageHeight)
    .css({ display: 'inline-block' });

  // Check for saved state
  overlayCookie = readCookie(options.cookiePrefix + options.id);
  if (typeof overlayCookie == 'string') {
    state = overlayCookie.split('-');
    state[2] = Number(state[2]);
    if ((typeof state[2] == 'number') && !isNaN(state[2])) {
      classNumber = state[2].toFixed(0);
      overlay.addClass(options.classPrefix + classNumber);
    }
    if (state[1] == 'F') {
      overlayZState = 'F';
      overlay.css('z-index', overlayZForeground);
    }
    if (state[0] == '1') {
      overlayOn = true;
      sticky = true;
      showOverlay();
    }
  }
  else {
    overlay.addClass(options.classPrefix + classNumber);
  }

  // Keyboard controls
  $(document).bind('keydown', keydownHandler);
  $(document).bind('keyup', keyupHandler);

  /**
   * Helpers
   */

  function getModifier(e) {
    if (options.modifierKey == null) return true; // Bypass by default
    var m = true;
    switch(options.modifierKey) {
      case 'ctrl':
        m = (e.ctrlKey ? e.ctrlKey : false);
        break;

      case 'alt':
        m = (e.altKey ? e.altKey : false);
        break;

      case 'shift':
        m = (e.shiftKey ? e.shiftKey : false);
        break;
    }
    return m;
  }

  function getKey(e) {
    var k = false, c = (e.keyCode ? e.keyCode : e.which);
    // Handle keywords
    if (c == 13) k = 'enter';
    // Handle letters
    else k = String.fromCharCode(c).toLowerCase();
    return k;
  }

  function saveState() {
    createCookie(options.cookiePrefix + options.id, (sticky ? '1' : '0') + '-' + overlayZState + '-' + classNumber, 1);
  }

  function showOverlay() {
    overlay.show();
    overlayVert.css({width: overlay.width()});
    // hide any vertical blocks that aren't at the top of the viewport
    overlayVert.children('.vert').each(function () {
      var vCol = $(this);
      vCol.css('display','inline-block');
      if (vCol.offset().top > vCol.parent().offset().top) {
        vCol.hide();
      }
    });
  }

  /**
   * Event handlers
   */

  alreadyDown = {};

  function keydownHandler(e) {
    var k,
      m,
      source = e.target.tagName.toLowerCase();

    if ((source == 'input') || (source == 'textarea') || (source == 'select')) {
      return true;
    }

    m = getModifier(e);
    if (!m) {
      return true;
    }

    k = getKey(e);
    if (!k) {
      return true;
    }

    if (alreadyDown[k]) {
      return true;
    }
    alreadyDown[k] = true;

    switch(k) {
      case options.showGridKey:
        if (!overlayOn) {
          showOverlay();
          overlayOn = true;
        }
        else if (sticky) {
          overlay.hide();
          overlayOn = false;
          sticky = false;
          saveState();
        }
        break;
      case options.holdGridKey:
        if (overlayOn && !sticky) {
          // Turn sticky overlay on
          sticky = true;
          saveState();
        }
        break;
      case options.foregroundKey:
        if (overlayOn) {
          // Toggle sticky overlay z-index
          if (overlay.css('z-index') == overlayZForeground) {
            overlay.css('z-index', overlayZBackground);
            overlayZState = 'B';
          }
          else {
            overlay.css('z-index', overlayZForeground);
            overlayZState = 'F';
          }
          saveState();
        }
        break;
      case options.jumpGridsKey:
        if (overlayOn && (options.numberOfGrids > 1)) {
          // Cycle through the available grids
          overlay.removeClass(options.classPrefix + classNumber);
          classNumber++;
          if (classNumber > options.numberOfGrids) classNumber = 1;
          overlay.addClass(options.classPrefix + classNumber);
          showOverlay();
          if (/webkit/.test( navigator.userAgent.toLowerCase() )) {
            forceRepaint();
          }
          saveState();
        }
        break;
    }

    return true;
  }

  function keyupHandler(e) {
    var k,
      m = getModifier(e);

    if (!m) {
      return true;
    }

    k = getKey(e);
    alreadyDown[k] = false;

    if (k && (k == options.showGridKey) && !sticky) {
      overlay.hide();
      overlayOn = false;
    }

    return true;
  }

  /**
   * Cookie functions
   *
   * By Peter-Paul Koch:
   * http://www.quirksmode.org/js/cookies.html
   */
  function createCookie(name, value, days) {
    var date,
      expires = "";

    if (days) {
      date = new Date();
      date.setTime( date.getTime() + (days*24*60*60*1000) );
      expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var c,
      ca = document.cookie.split(';'),
      i = 0,
      len = ca.length,
      nameEQ = name + "=";

    for (; i < len; i++) {
      c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  /**
   * Forces a repaint (because WebKit has issues)
   * http://www.sitepoint.com/forums/showthread.php?p=4538763
   * http://www.phpied.com/the-new-game-show-will-it-reflow/
   */
  function forceRepaint() {
    var ss = document.styleSheets[0];
    try {
      ss.addRule('.xxxxxx', 'position: relative');
      ss.removeRule(ss.rules.length - 1);
    } catch(e) {}
  }

  return {};
};


/**
 * You can call hashgrid from your own code, but it's loaded here as
 * an example for your convenience.
 */
$(document).ready(function() {

  var grid = new hashgrid({
    numberOfGrids: 2
  });

});


/* debug panel
---------------------------------------------------------------------------------------- //// */
/* jslint fragment: true, es5: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
/**
  @namespace The root global variable to rule them all.
*/
var sb = (function(){"use strict";
  /**
   * Creates namespaced objects inside the root 'sb' namespace.
   * @param {string} name The name of the object to create, dot delimited.
   * @returns {Object} The object literal within the namespace.
   * 
   * @example
   * sb.namespace("tracking.events");
   * sb.tracking.events; <== Object {}
   */
  function namespace(name){
    var self = this,
        levels = name.split(".");
    for (var i = 0, len = levels.length; i < len; i++){
      if(typeof self[levels[i]] === 'undefined'){
        self[levels[i]] = {};
      }
      self = self[levels[i]];
    }

    return self;
  }

  return {
    namespace: namespace
  };
}());


(function (rwd, $) {
    'use strict';

  rwd.detectBoxSizing = function () {
    Modernizr.addTest('boxsizing', function() {
      return Modernizr.testAllProps('boxSizing') && (document.documentMode === undefined || document.documentMode > 7);
    });
  };

  rwd.detectNthChild = function () {
      Modernizr.addTest('nthchild', function () {
          function isSelectorSupported(sel) {
              var el = document.createElement('div'),
          bool;
              el.setAttribute('id', 'nthchild');
              el.innerHTML = '<style>' + sel + '{}</style>';
              document.body.appendChild(el);
              bool = document.styleSheets[0].cssRules !== undefined && !!el.lastChild.sheet.cssRules[0];
              document.body.removeChild(el);
              return bool;
          }

          return isSelectorSupported(':nth-child(2n)');
      });
  };

  rwd.fixBoxSizing = function () {
    if (!Modernizr.boxsizing) {
      $('.region').wrapInner('<div class="region-wrap"></div>');
      $('.blocks > li').wrapInner('<div class="blocks-wrap"></div>');
    }
  };

  rwd.fixIE7Grid = function () {
    var $html = $('html');

    if ($html.hasClass('ie7')) {
      $html.find('.region:last-child').not('.region-centered').addClass('region-last');
    }
  };

  rwd.fixiOSOrientation = function () {
      /*! A fix for the iOS orientationchange zoom bug.
     Script by @scottjehl, rebound by @wilto.
     MIT License.
    */

      // https://github.com/scottjehl/iOS-Orientationchange-Fix
      // 20120622 version

      // This fix addresses an iOS bug, so return early if the UA claims it's something else.
      var ua = navigator.userAgent;

      if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf('AppleWebKit') > -1)) {
          return;
      }

      if (!document.querySelector) { return; }

      var meta = document.querySelector('meta[name=viewport]'),
            initialContent = meta && meta.getAttribute('content'),
            disabledZoom = initialContent + ',maximum-scale=1',
            enabledZoom = initialContent + ',maximum-scale=10',
            enabled = true,
            x,
            y,
            z,
            aig;

      if (!meta) { return; }

      var restoreZoom = function () {
          meta.setAttribute('content', enabledZoom);
          enabled = true;
      }

      var disableZoom = function () {
          meta.setAttribute('content', disabledZoom);
          enabled = false;
      }

      var checkTilt = function (e) {
          aig = e.accelerationIncludingGravity;
          x = Math.abs(aig.x);
          y = Math.abs(aig.y);
          z = Math.abs(aig.z);

          // If portrait orientation and in one of the danger zones
          if (!window.orientation && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
              if (enabled) {
                  disableZoom();
              }
          } else if (!enabled) {
              restoreZoom();
          }
      }

      window.addEventListener('orientationchange', restoreZoom, false);
      window.addEventListener('devicemotion', checkTilt, false);
  };

  rwd.fixNthChild = function () {
      if (Modernizr.nthchild) { return; }

      var endClass = 'blocks-end',
      startClass = 'blocks-start',
      updateNthChild = function () {
          var blocksEnd = false,
          blocksStart = false;

          if (rwd.matchViewport('M')) {
              blocksEnd = '.blocks-two-up > li:nth-child(2n),' +
            '.blocks-three-up > li:nth-child(3n),' +
            '.blocks-four-up > li:nth-child(4n),' +
            '.blocks-five-up > li:nth-child(5n),' +
            '.blocks-six-up > li:nth-child(6n)';
              blocksStart = '.blocks-two-up > li:nth-child(2n+1),' +
            '.blocks-three-up > li:nth-child(3n+1),' +
            '.blocks-four-up > li:nth-child(4n+1),' +
            '.blocks-five-up > li:nth-child(5n+1),' +
            '.blocks-six-up > li:nth-child(6n+1)';
          } else if (rwd.matchViewport('S')) {
              blocksEnd = '.blocks-two-up > li:nth-child(2n),' +
            '.blocks-three-up > li:nth-child(3n),' +
            '.blocks-four-up > li:nth-child(2n),' +
            '.blocks-five-up > li:nth-child(3n),' +
            '.blocks-six-up > li:nth-child(3n)';
              blocksStart = '.blocks-two-up > li:nth-child(2n+1),' +
            '.blocks-three-up > li:nth-child(3n+1),' +
            '.blocks-four-up > li:nth-child(2n+1),' +
            '.blocks-five-up > li:nth-child(3n+1),' +
            '.blocks-six-up > li:nth-child(3n+1)';
          } else if (rwd.matchViewport('XS')) {
              blocksEnd = '.blocks-four-up > li:nth-child(2n),' +
            '.blocks-five-up > li:nth-child(2n),' +
            '.blocks-six-up > li:nth-child(2n)';
              blocksStart = '.blocks-four-up > li:nth-child(2n+1),' +
            '.blocks-five-up > li:nth-child(2n+1),' +
            '.blocks-six-up > li:nth-child(2n+1)';
          }

          $('.blocks > li').removeClass(startClass).removeClass(endClass);

          if (blocksStart) {
              $(blocksStart).addClass(startClass);
          }

          if (blocksEnd && $('html').hasClass('ie7')) {
              $(blocksEnd).addClass(endClass);
          }
      };

      rwd.onDelayedResize(updateNthChild, true);
  };

  rwd.fontSize = parseInt($('html').css('font-size').replace('px', ''), 10);

  rwd.matchViewport = function (value) {
      if (!value || !rwd.mediaQueries[value]) { return false; }

      value = rwd.mediaQueries[value].query;

      if (window.matchMedia && window.matchMedia('only all').matches) {
          return window.matchMedia(value).matches ? true : false;
      } else {
          return (
          (value.indexOf('min-width') > 0 && rwd.viewportWidth() / rwd.fontSize >= value.replace('(min-width:', '').replace('em)', '')) ||
          (value.indexOf('min-height') > 0 && rwd.viewportHeight() / rwd.fontSize >= value.replace('(min-height:', '').replace('em)', ''))
        ) ? true : false;
      }
  };

  rwd.mediaQueries = {
      'XXS': { 'query': '(min-width:15em)' },   // 240px
      'XS': { 'query': '(min-width:20em)' },    // 320px
      'S': { 'query': '(min-width:30em)' },   // 480px
      'M': { 'query': '(min-width:37.5em)' },     // 600px
      'L': { 'query': '(min-width:48.0625em)' },  // 769px
      'XL': { 'query': '(min-width:62em)' },    // 992px
      'XXL': { 'query': '(min-width:64em)' },     // 1024px
      'High-DPI': { 'query': '(-moz-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)' },
      'Max-768': { 'query': '(max-device-width:768px)' }
  };

  rwd.onDelayedResize = function (callback, fireNow) {
      if (typeof callback !== 'function' || typeof fireNow !== 'boolean') { return; }

      if (fireNow) { callback(); }

    var delay = (function () {
        var timer = 0;

        return function (callback, ms) {
          clearTimeout(timer);
          timer = setTimeout(callback, ms || 250);
        };
      }());

    $(window).resize(function () {
      delay(callback);
    });
  };

  rwd.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  };

  rwd.viewportWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
  };

  $(function () {
    rwd.detectBoxSizing();
    rwd.detectNthChild(); 
    rwd.fixBoxSizing();
    rwd.fixIE7Grid();
    rwd.fixiOSOrientation();
    rwd.fixNthChild();
  });
}(window.sb.rwd = window.sb.rwd || {}, jQuery));


(function (debug, $) {
  var self = debug.debugPanel = {};

  self.init =  function () {
    this.container = $('#debug_panel');
    this.bindEvents();
  };

  self.bindEvents = function () {
    $(document.body).on('click', '#logo', $.proxy(this.logoClick, this));
    this.container.on('click', '#debug_close', $.proxy(this.closeClick, this));
  };

  self.closeClick = function (e) {
    e.preventDefault();
    this.container.toggle();
  };

  self.logoClick = function (e) {
    if (e.shiftKey) {
      e.preventDefault();
      this.container.toggle();
    }
  };

  $(function () {
    debug.debugPanel.init();
  });
}(window.sb.debug = window.sb.debug || {}, jQuery));


(function (debug, $) {
 // 'use strict';

  debug.config = {
    baselineAdjust: 0,
    gridColumns: 16,
    lineHeight: function () {
      var value = $('body').css('line-height');
      return (value.indexOf('px') > -1) ? value.replace('px', '') : value * sb.rwd.fontSize;
    }
  };
  debug.buildPanel = function () {
    $('<div id="debug-panel">' +
      '<button class="debug-view" data-close="&times;">&curren;</button>' +
      '<ul>' +
      '<li><button data-option="background">Background</button></li>' +
      '<li><button data-option="baseline">Baseline</button></li>' +
      '<li><button data-option="boxes">Boxes</button></li>' +
      '<li><button data-option="grid">Grid</button></li>' +
      '<li><button data-option="windowSize">Window Size</button></li>' +
      '</ul>' +
      '</div>').appendTo('body');

    var $panel = $('#debug-panel');

    debug.buildButtons.options($panel);
    debug.buildButtons.view($panel);
  };

  debug.buildButtons = {
    options: function ($panel) {
      var $optionButtons = $panel.find('[data-option]'),
        optionsArray = [];

      $.each($optionButtons, function (index, value) {
        optionsArray.push($(value).attr('data-option'));
      });

      /* ---- option buttons ---- */
      $optionButtons.on('click', function () {
        var $input = $(this),
          $option = $input.attr('data-option');

        if ($input.hasClass('on')) {
          debug[$option].off();
          $input.removeClass('on');

          if (Modernizr.localstorage) {
            localStorage.removeItem('debug-' + $option);
          }
        } else {
          debug[$option].on();
          $input.addClass('on');

          if (Modernizr.localstorage) {
            localStorage.setItem('debug-' + $option, true);
          }
        }
      });

      if (Modernizr.localstorage) {
        $.each(optionsArray, function (index, value) {
          if (localStorage.getItem('debug-' + value) === 'true') {
            $optionButtons.filter('[data-option="' + value + '"]').trigger('click');
          }
        });
      }
    },
    view: function ($panel) {
      var $viewButton = $panel.find('button.debug-view'),
        closePanel = function () {
          $panel.removeClass('open');
          $viewButton.html($viewButton.attr('data-open'));
          $(document).off('click.debugPanel');
        },
        openPanel = function () {
          $panel.addClass('open');
          $viewButton.html($viewButton.attr('data-close'));

          $(document).on('click.debugPanel', function (e) {
            if ($(e.target).parents().filter($panel).length !== 1) {
              closePanel();
            }
          });
        };

      $viewButton.attr('data-open', $viewButton.html());

      $viewButton.on('click', function () {
        if ($panel.hasClass('open')) {
          closePanel();
        } else {
          openPanel();
        }

        return false;
      });
    }
  };

  debug.background = {
    off: function () {
      $('html').removeClass('debug');
    },

    on: function () {
      $('html').addClass('debug');
    }
  };

  debug.baseline = {
    off: function () {
      $('#debug-baseline').remove();
    },

    on: function () {
      var config = debug.config,
        baselineHeight = 0.375,
        baselineLength = $(document).height() / 6,
        i,
        output = [];
      console.log($(document).height());
      for (i = 0; i <= baselineLength; i++) {
        output.push('<li style="height:' + baselineHeight + 'em"></li>');
      }

      $('body').append('<ol id="debug-baseline" style="top:' + config.baselineAdjust + 'px">' + output.join('') + '</ol>');
    }
  };

  debug.boxes = {
    off: function () {
      $('.debug-number').remove();

      $.each($('.debug-box'), function (index, value) {
        var $debugBox = $(value);
        $debugBox.contents().appendTo($debugBox.parent());
        $debugBox.remove();
      });
    },

    on: function () {
      $.each($('.block').not('#debug-grid .block, .block .block'), function (index, value) {
        $(value).wrapInner('<div class="debug-box"></div>');
        $(value).find('.debug-box').append('<div class="debug-number">' + (index + 1) + '</div>');
      });
    }
  };

  debug.grid = {
    off: function () {
      var gw = document.getElementById('gridsetoverlaywrap');
      gs.remove(gw);
      console.log("hide");
    },

    on: function () {
      gs.show();
    }
  };

  debug.windowSize = {
    off: function () {
      $('#debug-size').remove();
    },

    on: function () {
      $('body').append('<div id="debug-size"></div>');

      var $debugSize = $('#debug-size'),
        content = [],
        rwd = sb.rwd,
        mediaQueries = rwd.mediaQueries,
        updateSize = function () {
          $debugSize.find('span').html(rwd.viewportWidth() + ' &times; ' + rwd.viewportHeight());

          $.each(mediaQueries, function (index, value) {
            var result = rwd.matchViewport(index);
            $debugSize.find('.' + index).removeClass('' + !result).addClass('' + result);
          });
        };

      content.push('<span>?</span>');
      content.push('<table>');
      if (window.matchMedia('only all').matches === false) content.push('<tr class="polyfill true"><td colspan="3">polyfilled</td></tr>');
      content.push('<tr class="none true"><td colspan="3">no active media queries</td></tr>');

      $.each(mediaQueries, function (index, value) {
        var query = value.query,
          pixelWidth,
          tr;

        if (query.indexOf('min-width') > 0 && query.indexOf('em') > 0) {
          var newStr = query.replace('(min-width:', '').replace('em)', '');
          pixelWidth = Math.round(query.replace('(min-width:', '').replace('em)', '') * sb.rwd.fontSize * 100000) / 100000;
        }

        tr = '<tr class="' + index + '">' +
            '<th>' + index + '</th>' +
            '<td>' + query + '</td>' +
            '<td>' + ((pixelWidth) ? pixelWidth + 'px' : '') + '</td>' +
          '</tr>';

        content.push(tr);
      });

      content.push('</table>');

      content.push('<button class="close">&times;</button>');

      $debugSize.html(content.join(''));

      $debugSize.find('.close').on('click', function () {
        $('#debug-panel').find('button[data-option="windowSize"]').trigger('click');
      });

      updateSize();

      $(window).resize(function () {
        updateSize();
      });
    }
  };

  $(debug.buildPanel);
}(window.sb.debug = window.sb.debug || {}, jQuery));


