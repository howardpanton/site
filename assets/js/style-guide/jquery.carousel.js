var addEvent=function(){return document.addEventListener?function(a,c,d){if(a&&a.nodeName||a===window)a.addEventListener(c,d,!1);else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}:function(a,c,d){if(a&&a.nodeName||a===window)a.attachEvent("on"+c,function(){return d.call(a,window.event)});else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}}();

function getElem(e) {
    var elem,
        evt = e ? e:event;
    if (evt.srcElement) {
        elem = evt.srcElement;
    } else {
        elem = evt.target;
    }
    return elem;
}

function ajax(url, callback) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.responseText) {
                callback();
            }
        }
    }
    xhr.open('get', url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send();
}

if (window.HTMLElement) {
window.Pointer=function(a,b,c){function v(a){i.cssText=a}function w(a,b){return v(l.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.5.3",e={},f=b.documentElement,g="pointer",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n={},o={},p=[],q=p.slice,r,s=function(a,c,d,e){var h,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),k.appendChild(j);return h=["&#173;","<style>",a,"</style>"].join(""),k.id=g,(l?k:m).innerHTML+=h,m.appendChild(k),l||(m.style.background="",f.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if(typeof b!="function")throw new TypeError;var c=q.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(q.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(q.call(arguments)))};return d});var A=function(c,d){var f=c.join(""),g=d.length;s(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9},g,d)}([,["@media (",l.join("touch-enabled),("),g,")","{#touch{top:9px;position:absolute}}"].join("")],[,"touch"]);m.touch=function(){return e.touch};for(var B in m)u(m,B)&&(r=B.toLowerCase(),e[r]=m[B](),p.push((e[r]?"":"no-")+r));return v(""),h=j=null,e._version=d,e._prefixes=l,e.testStyles=s,e}(this,this.document),function(a){function c(a,b,c,d){this.x=a,this.y=b,this.type=c,this.identifier=d}function e(a){a.target.mouseEvent=a}function f(a){a.target.mouseEvent=null}function g(a){a.target.touchList=a.targetTouches}function h(){var a=[];if(this.touchList)for(var e=0;e<this.touchList.length;e++){var f=this.touchList[e],g=new c(f.pageX,f.pageY,d.TOUCH,f.identifier);a.push(g)}return this.mouseEvent&&a.push(new c(this.mouseEvent.pageX,this.mouseEvent.pageY,d.MOUSE,b)),a}function i(a,b,c){var d=document.createEvent("Event");d.initEvent(a,!0,!0);for(var e in c)d[e]=c[e];b.dispatchEvent(d)}function j(a){e(a);var b={pointerType:"mouse",getPointerList:h.bind(this),originalEvent:a};i("pointerdown",a.target,b)}function k(a){a.target.mouseEvent&&e(a);var b={pointerType:"mouse",getPointerList:h.bind(this),originalEvent:a};i("pointermove",a.target,b)}function l(a){f(a);var b={pointerType:"mouse",getPointerList:h.bind(this),originalEvent:a};i("pointerup",a.target,b)}function m(a){g(a);var b={pointerType:"touch",getPointerList:h.bind(this),originalEvent:a};i("pointerdown",a.target,b)}function n(a){g(a);var b={pointerType:"touch",getPointerList:h.bind(this),originalEvent:a};i("pointermove",a.target,b)}function o(a){g(a);var b={pointerType:"touch",getPointerList:h.bind(this),originalEvent:a};i("pointerup",a.target,b)}function p(a){f(a)}function q(a){log("pointerdown")}function r(a){log("pointermove")}function s(a){log("pointerup")}function t(a){a.isPointerEmitter||(u()?(a.addEventListener("touchstart",m),a.addEventListener("touchmove",n),a.addEventListener("touchend",o)):v()?(a.addEventListener("MSPointerDown",q),a.addEventListener("MSPointerMove",r),a.addEventListener("MSPointerUp",s)):(a.addEventListener("mousedown",j),a.addEventListener("mousemove",k),a.addEventListener("mouseup",l),a.addEventListener("mouseout",p)),a.isPointerEmitter=!0)}function u(){return Pointer.touch}function v(){return!1}function w(a,b){var c=a.prototype.addEventListener;a.prototype.addEventListener=function(a,d,e){b.call(this,a,d,e),c.call(this,a,d,e)}}function x(a,b,c){a.indexOf("pointer")===0&&t(this)}var b=31337,d={TOUCH:"touch",MOUSE:"mouse"};navigator.userAgent.match(/Firefox/)?(w(HTMLDivElement,x),w(HTMLCanvasElement,x)):w(HTMLElement,x),a._createCustomEvent=i,a._augmentAddEventListener=w,a.PointerTypes=d}(window),function(a){function b(a,b,c){if(a.indexOf("gesture")===0){var d=Gesture._gestureHandlers[a];d?d(this):console.error("Warning: no handler found for {{evt}}.".replace("{{evt}}",a))}}navigator.userAgent.match(/Firefox/)?(window._augmentAddEventListener(HTMLDivElement,b),window._augmentAddEventListener(HTMLCanvasElement,b)):window._augmentAddEventListener(HTMLElement,b),a.Gesture=a.Gesture||{},a.Gesture._gestureHandlers=a.Gesture._gestureHandlers||{}}(window),function(a){function c(a){var c=new Date;if(c-this.lastDownTime<b){this.lastDownTime=0;var d={};window._createCustomEvent("gesturedoubletap",a.target,d)}this.lastDownTime=c}function d(a){a.addEventListener("pointerdown",c)}var b=300;a.Gesture._gestureHandlers.gesturedoubletap=d}(window),function(a){function d(a){this.x=a.x,this.y=a.y}function e(a){clearTimeout(this.longPressTimer),a.getPointerList().length===1&&(a.target.longpressInitPosition=new d(a.getPointerList()[0]),this.longPressTimer=setTimeout(function(){payload={},window._createCustomEvent("gesturelongpress",a.target,payload)},b))}function f(a){if(a.pointerType===PointerTypes.MOUSE)clearTimeout(this.longPressTimer);else if(a.getPointerList().length===1){var b=a.target.longpressInitPosition;b&&b.calculateDistance(a.getPointerList()[0])>c&&clearTimeout(this.longPressTimer)}}function g(a){clearTimeout(this.longPressTimer)}function h(a){a.addEventListener("pointerdown",e),a.addEventListener("pointermove",f),a.addEventListener("pointerup",g)}var b=600,c=5;d.prototype.calculateDistance=function(a){var b=this.x-a.x,c=this.y-a.y;return Math.sqrt(b*b+c*c)},a.Gesture._gestureHandlers.gesturelongpress=h}(window),function(a){function c(a,b){this.p1=a,this.p2=b}function d(a){var b=a.getPointerList();b.length==2&&(a.target.scaleReferencePair=new c(b[0],b[1]))}function e(a){var d=a.getPointerList();if(d.length==2&&a.target.scaleReferencePair){var e=new c(d[0],d[1]),f=e.scaleSince(a.target.scaleReferencePair);if(Math.abs(1-f)>b){var g={scale:f};window._createCustomEvent("gesturescale",a.target,g)}}}function f(a){a.target.scaleReferencePair=null}function g(a){a.addEventListener("pointerdown",d),a.addEventListener("pointermove",e),a.addEventListener("pointerup",f)}var b=.2;c.prototype.span=function(){var a=this.p1.x-this.p2.x,b=this.p1.y-this.p2.y;return Math.sqrt(a*a+b*b)},c.prototype.scaleSince=function(a){return this.span()/a.span()},a.Gesture._gestureHandlers.gesturescale=g}(window);
}

// Carousel
(function() {
  if (document.querySelector) {
    function loadCarousel() {
      if ('ontouchstart' in document.documentElement || 'msPointerEnabled' in window.navigator) {
        carouselOuter.className += ' touch';
      }
      var size = getSize(),
        animationComplete;
      carouselOuter.className += ' is-loaded';
      positionSlides();
      addEvent(window, 'resize', function() {
        positionSlides();
        previous = size;
        size = getSize();
        updateImageSizes(size, previous);
      });
      ajax('carousel.html?size='+sizes[size], function() {
        carousel.innerHTML += xhr.responseText;
        slides = getSlides();
        imgs = carousel.querySelectorAll('img');
        positionSlides();
        updateImageSizes(size, 0);
        touchSlides();
        createControls();
      });
    }
      function positionSlides() {
        winWidth = document.body.offsetWidth;
        slideWidth = slides[0].offsetWidth;
        // margin = slideWidth*0.0125;
        margin = slideWidth*0;
        var centerCalc = winWidth * 0.5 - slideWidth * 0.5;
        for (var i=0,len=slides.length;i<len;++i) {
          var position;
          if (i+1 == len && len > 2) {
            position = centerCalc - slideWidth - margin;
          } else {
            position =  centerCalc + (slideWidth+margin)*i;
          }
          slides[i].style.left = position + 'px';
        }
      }
      function getSize() {
        var size;
        if (slideWidth <= 367) size = 0;
        else if (slideWidth <= 550) size = 1;
        else size = 2;
        return size;
      }
      function updateImageSizes(size, previous) {
        if (size > previous) {
          for (var i=0,len=imgs.length;i<len;++i) {
              updateImage(imgs[i], size, previous);
          }
        }
      }
      function updateImage(img, size, previous) {
        if (img.src.indexOf('/'+sizes[size]+'/') === -1) {
          var newimg = new Image();
          addEvent(newimg, 'load', function(e) {
            img.src = newimg.src;
          });
          newimg.src = img.src.replace('/'+sizes[previous]+'/', '/'+sizes[size]+'/');
        }
      }
      function touchSlides() {
        var touchstartX,
          touchactive,
          touchshift;
        addEvent(carousel, 'pointerdown', function(e) {
          startHandler(e);
        });
        addEvent(carouselOuter, 'pointermove', function(e) {
          moveHandler(e);
        });
        addEvent(window, 'pointerup', function(e) {
          endHandler(e);
        });
        addEvent(carousel, 'mouseout', function(e) {
          endHandler(e);
        });
        function startHandler(e) {
          touchstartX = (e.originalEvent.pageX)? e.originalEvent.pageX : e.originalEvent.touches[0].pageX;
          touchactive = true;
          touchshift = 0;
        }
        function moveHandler(e) {
          if (touchactive) {
            var touchX = (e.originalEvent.pageX)? e.originalEvent.pageX : e.originalEvent.touches[0].pageX;
            touchshift = touchX - touchstartX;
            if (touchshift >= 10 || touchshift <= -10) {
              transform(touchshift + 'px');
              e.preventDefault();
            }
          }
        }
        function endHandler(e) {
          if (touchactive) {
            touchactive = false;
            var threshold = slideWidth * 0.1;
            if (touchshift > threshold) {
              changeSlide('prev', touchshift);
            } else if (touchshift < -threshold) {
              transform(touchshift+'px');
                changeSlide('next');
            } else {
              transform(touchshift+'px');
              changeSlide();
            }
          }
        }
        addEvent(carousel, 'mousedown', function(e) {
          e.preventDefault();
        });
        addEvent(carousel, 'click', function(e) {
          if (touchshift >= 10 || touchshift <= -10) {
            e.preventDefault();
          }
        });
      }
      function createControls() {
        var prev = document.createElement('a'),
          next = document.createElement('a');
        prev.className = 'control prev icon-black-bg-button-prev';
        // prev.innerHTML = '<span>&lt;</span>';
        next.className = 'control next icon-black-bg-button-next';
        // next.innerHTML = '<span>&gt;</span>';
        prev.href = next.href = '#';
        addEvent(carouselOuter, 'click', function(e) {
          var elem = getElem(e);
          if (elem.tagName == 'SPAN') {
            elem = elem.parentNode;
          }
          if (elem.tagName == 'A' && elem.className.indexOf('control') !== -1) {
            direction = (elem.className.indexOf('next') !== -1)? 'next' : 'prev';
            changeSlide(direction);
            e.preventDefault();
          }
        });
        carouselOuter.appendChild(prev);
        carouselOuter.appendChild(next);
      }
      function changeSlide(direction, start) {
        if (carousel.className.indexOf('animate') != -1) {
          clearTimeout('animationComplete');
          carousel.className = carousel.className.replace(' animate', '');
          transform(0);
        }
        var position = -slideWidth-margin;
        if (direction == 'next') {
          carousel.className += ' animate';
          transform(position + 'px');
        } else if (direction == 'prev') {
          slides.unshift(slides.pop());
          positionSlides();
          if (start) {
            position += start;
          }
          transform(position + 'px');
          setTimeout(function() {
            carousel.className += ' animate';
            transform(0);
          }, 1);
        } else {
          carousel.className += ' animate';
          transform(0);
        }
        clearTimeout('animationComplete');
        animationComplete = setTimeout(function() {
          carousel.className = carousel.className.replace(' animate', '');
          if (direction == 'next') {
            slides.push(slides.shift());
            positionSlides();
            transform(0);
          }
        }, 750);
      }
      function transform(x) {
        carousel.style.left = x;
      }
      function getSlides() {
        var obj = carousel.querySelectorAll('li'),
          slides = [];
        for (var i = obj.length >>> 0; i--;) { 
          slides[i] = obj[i];
        }
        return slides;
      }
      var carouselOuter = document.querySelector('.carousel');
      if (carouselOuter && window.XMLHttpRequest) {
        var carousel = carouselOuter.querySelector('.slides'),
          slides = getSlides(),
          imgs,
          winWidth,
          slideWidth = slides[0].offsetWidth,
          // margin = slideWidth*0.0125,
          margin = slideWidth*0,
          sizes = ['s', 'm', 'l']
          size = 0;
        loadCarousel();
      }
  }
})();
