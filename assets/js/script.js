
//  Make loging safe for all browsers
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};


// This script is an IIFE (Immediately Invoked Function Expression) that passes 
// jQuery in to avoid conflict with other libraries.

// IMPORTANT - READ THIS FIRST
// This script is run as soon as it is loaded, so should only be included at the base of the required page.


(function($) 
{ 
  /***********************************************/
  //  CONSTANTS
  //  Use upper case variable names to declare
  //  constants such as configuration paths, scoped to this
  //  closure and available to all methods.
  //  Separate words with underscores.
  /***********************************************/
  
  var CONSTANT_NAME = 'A constant, available to all methods of this closure.';
  

  /***********************************************/
  //  VARS
  //  Use lower case variable names to declare
  //  variables that are scoped to this
  //  closure and available to all methods.
  //  Use camel case to separate words.
  /***********************************************/
  
  var instanceVariable = 'An instance variable, available to all methods of this closure.'; 
  
  
  /***********************************************/
  //  INIT
  //  This function will be called upon load, so call
  //  any initialastion functions here. 
  /***********************************************/
  
  this.init = function()
  { 
    getData();  
  }();


  /***********************************************/
  //  EXAMPLE METHODS
  /***********************************************/ 
  
  // get some data
  function getData()
  {
    // define a local variable
    var localVariable = 'A local variable, scoped to this method.';
    console.log(localVariable);

    // access some instance variables
    console.log(CONSTANT_NAME);
    console.log(instanceVariable);

    // call a method - maybe an ajax call?
    onData('onData: I was called from on getData.');
  }
  
  // on data return
  function onData(data)
  {     
    // log out some data
    console.log(data);
    
    // get the body with jQuery, do something with it.
    $('body').each(function (){
      log(this);
    })
  }
  
    
})(jQuery);


  function checkWindowSize() {
    var width = $(window).width(),
    new_class = width > 850 ? 'gDesktop' :
                width > 600 ? 'gTablet' :
                width < 600 ? 'gmobile' :
                width > 1289 ? 'gDesktop' : '';

    $(document.body).removeClass('gDesktop gTablet gmobile').addClass(new_class);
}

function menuToggle() {
$('.menu-toggle').toggle(function() {
 $('.main-menu').slideDown(1000, 'swing', function() {
    // Animation complete.
  });

}, function() {

  $('.main-menu').slideUp(1000, 'swing', function() {
    $(this).removeAttr("style");
  });


});

}



$('.top-bar .span').toggle(function() {
var t = $(this).next('ul');
t.css('visibility', 'visible');
t.removeClass('is-removed-mobile');
//l = t.find('li');
//l.show();
console.log("ive been clicked off");
}, function() {
var t = $(this).next('ul');
t.css('visibility', 'hidden');
t.addClass('is-removed-mobile');
//l = t.find('li');
l.hide();

});



$(function(){


    var config = {    
         sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
         interval: 50,  // number = milliseconds for onMouseOver polling interval    
         over: doOpen,   // function = onMouseOver callback (REQUIRED)    
         timeout: 50,   // number = milliseconds delay before onMouseOut    
         out: doClose    // function = onMouseOut callback (REQUIRED)    
    };
    
    function doOpen() {
        if ($(window).width() > 850) {
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
        }
    }
 
    function doClose() {
        if ($(window).width() > 850) {
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
        }
    }

    $("ul.dropdown li").hoverIntent(config);
    
    $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");


});

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

$(window).resize(function () {
    waitForFinalEvent(function(){
      //alert('Resize...');
      //
      checkWindowSize();
       $('.main-menu').removeAttr("style");
    }, 500, "some unique string");
});


menuS = $('nav.sidebar').html();

b = $('.secondary-menu-mobile');

b.prepend(menuS);

c = b.find('ul li:first-child');

d = c.nextAll();

d.hide();

e = $('.secondary-menu-mobile span a');

e.toggle(function() {
 d.show();

}, function() {

d.hide();


});

// Nav test

var f = $('.submenu > div');
f.hide();

$('.new-main-menu li a').click(function() {

var _clicked = $(this);
var j = $('.submenu > div.menu-active:visible');

 if (j.length > 0) {
  console.log(j.length);
  var r = j.attr('data-menu');
  var l = $('li').find("[data-item='"+ r +"']");
  l.parent().removeClass('menu-active');
  j.hide();

    if (_clicked.parent().hasClass('menu-active')) {
alert('yes');
  _clicked.parent('li').removeClass('menu-active');
  var t = _clicked.attr('data-item');
  var g = $('div').find("[data-menu='"+ t +"']");
  g.removeClass('menu-active');
  g.slideUp();

    } else {
  var t = _clicked.attr('data-item');
  _clicked.parent('li').addClass('menu-active');
  var g = $('div').find("[data-menu='"+ t +"']");
  // alert(g);
  console.log(j);
  g.addClass('menu-active');
  g.fadeIn();

    };
}

else if (_clicked.parent().hasClass('menu-active')) {

  _clicked.parent('li').removeClass('menu-active');
  var t = _clicked.attr('data-item');
  var g = $('div').find("[data-menu='"+ t +"']");
  g.removeClass('menu-active');
  g.slideUp();


// else if (j.length > 0) {
//   console.log(j.length);
//   var r = j.attr('data-menu');
//   var l = $('li').find("[data-item='"+ r +"']");
//   l.parent().removeClass('menu-active');
//   j.hide();
//   var g = $('div').find("[data-menu='"+ t +"']");
//   // alert(g);
//   console.log(j);
//   g.addClass('menu-active');
//   g.fadeIn();

} else {
_clicked.parent('li').addClass('menu-active');
var t = _clicked.attr('data-item');
  var g = $('div').find("[data-menu='"+ t +"']");
  // alert(g);
  console.log(j);
  g.addClass('menu-active');
  g.slideDown();

};


// }, function() {
//     $(this).parent('li').removeClass('active');
//   var t = $(this).attr('data-item');
// var g = $('div').find("[data-menu='"+ t +"']");
// g.removeClass('active');
// g.slideUp();

});



console.log(c);
//checkWindowSize();
//dropMenu();
menuToggle();
