/*!Updated: 19-03-2014, 9:57:43 AM */

/*! Hammer.JS - v1.0.2 - 2013-02-27
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(t){"use strict";function e(){if(!n.READY){n.event.determineEventTypes();for(var t in n.gestures)n.gestures.hasOwnProperty(t)&&n.detection.register(n.gestures[t]);n.event.onTouch(document,n.EVENT_MOVE,n.detection.detect),n.event.onTouch(document,n.EVENT_END,n.detection.endDetect),n.READY=!0}}var n=function(t,e){return new n.Instance(t,e||{})};n.defaults={stop_browser_behavior:{userSelect:"none",touchCallout:"none",touchAction:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},n.HAS_POINTEREVENTS=navigator.msPointerEnabled,n.HAS_TOUCHEVENTS="ontouchstart"in t,n.EVENT_TYPES={},n.DIRECTION_DOWN="down",n.DIRECTION_LEFT="left",n.DIRECTION_UP="up",n.DIRECTION_RIGHT="right",n.POINTER_MOUSE="mouse",n.POINTER_TOUCH="touch",n.EVENT_START="start",n.EVENT_MOVE="move",n.EVENT_END="end";var i=navigator.userAgent;n.STOP_MOUSEEVENTS=n.HAS_TOUCHEVENTS&&i.match(/(like mac os x.*mobile.*safari)|android|blackberry/i),n.plugins={},n.READY=!1,n.Instance=function(t,i){var r=this;return e(),this.element=t,this.enabled=!0,this.options=n.utils.extend(n.utils.extend({},n.defaults),i||{}),this.options.stop_browser_behavior&&n.utils.stopDefaultBrowserBehavior(this),n.event.onTouch(t,n.EVENT_START,function(t){r.enabled&&n.detection.startDetect(r,t)}),this},n.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=document.createEvent("Event");return n.initEvent(t,!0,!0),n.gesture=e,this.element.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var r=null,s=!1,o=!1;n.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,i){var a=this;this.bindDom(t,n.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();u.match(/mouse/)&&n.STOP_MOUSEEVENTS||(u.match(/start|down|move/)&&(1===c.which||u.match(/touch/)||c.pointerType&&c.pointerType==c.MSPOINTER_TYPE_TOUCH)&&(s=!0),u.match(/touch|pointer/)&&(o=!0),!s||o&&u.match(/mouse/)||(n.HAS_POINTEREVENTS&&e!=n.EVENT_END&&n.PointerEvent.updatePointer(e,c),e===n.EVENT_END&&null!==r?c=r:r=c,i.call(n.detection,a.collectEventData(t,e,c)),n.HAS_POINTEREVENTS&&e==n.EVENT_END&&n.PointerEvent.updatePointer(e,c)),u.match(/up|cancel|end/)&&(s=!1,o=!1,r=null,n.PointerEvent.reset()))})},determineEventTypes:function(){var t;t=n.HAS_POINTEREVENTS?["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],n.EVENT_TYPES[n.EVENT_START]=t[0],n.EVENT_TYPES[n.EVENT_MOVE]=t[1],n.EVENT_TYPES[n.EVENT_END]=t[2]},getTouchList:function(t){return n.HAS_POINTEREVENTS?n.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,i){var r=this.getTouchList(i,e),s=n.POINTER_TOUCH;return(i.type.match(/mouse/)||i.poinerType&&i.pointerType===i.MSPOINTER_TYPE_MOUSE)&&(s=n.POINTER_MOUSE),{center:n.utils.getCenter(r),timestamp:i.timestamp||(new Date).getTime(),target:i.target,touches:r,eventType:e,pointerType:s,srcEvent:i,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return n.detection.stopDetect()}}}},n.PointerEvent={pointers:{},getTouchList:function(){var t=this.pointers,e=[];return Object.keys(t).sort().forEach(function(n){e.push(t[n])}),e},updatePointer:function(t,e){t==n.EVENT_END?delete this.pointers[e.pointerId]:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e)},reset:function(){this.pointers={}}},n.utils={extend:function(t,e){for(var n in e)t[n]=e[n];return t},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var i=Math.abs(t.pageX-e.pageX),r=Math.abs(t.pageY-e.pageY);return i>=r?t.pageX-e.pageX>0?n.DIRECTION_LEFT:n.DIRECTION_RIGHT:t.pageY-e.pageY>0?n.DIRECTION_UP:n.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==n.DIRECTION_UP||t==n.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t){var e,n=["webkit","khtml","moz","ms","o",""],i=t.options.stop_browser_behavior,r=t.element;if(i&&r.style){for(var s=0;n.length>s;s++)for(var o in i)i.hasOwnProperty(o)&&(e=o,n[s]&&(e=n[s]+e.substring(0,1).toUpperCase()+e.substring(1)),r.style[e]=i[o]);"none"==i.userSelect&&(r.onselectstart=function(){return!1})}}},n.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:n.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,i=this.gestures.length;i>n;n++){var r=this.gestures[n];if(!this.stopped&&e[r.name]!==!1&&r.handler.call(r,t,this.current.inst)===!1){this.stopDetect();break}}this.current&&(this.current.lastEvent=t)}},endDetect:function(t){this.detect(t),this.stopDetect()},stopDetect:function(){this.previous=n.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var i=0,r=t.touches.length;r>i;i++)e.touches.push(n.utils.extend({},t.touches[i]))}var s=t.timestamp-e.timestamp,o=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=n.utils.getVelocity(s,o,a);return n.utils.extend(t,{deltaTime:s,deltaX:o,deltaY:a,velocityX:c.x,velocityY:c.y,distance:n.utils.getDistance(e.center,t.center),angle:n.utils.getAngle(e.center,t.center),direction:n.utils.getDirection(e.center,t.center),scale:n.utils.getScale(e.touches,t.touches),rotation:n.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var e=t.defaults||{};return e[t.name]===void 0&&(e[t.name]=!0),n.utils.extend(n.defaults,e),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},n.gestures=n.gestures||{},n.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case n.EVENT_START:clearTimeout(this.timer),n.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==n.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case n.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case n.EVENT_END:clearTimeout(this.timer)}}},n.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==n.EVENT_END){var i=n.detection.previous;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n.detection.current.name=i&&"tap"==i.name&&t.timestamp-i.lastEvent.timestamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance?"doubletap":"tap",e.trigger(n.detection.current.name,t)}}},n.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==n.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},n.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1},triggered:!1,handler:function(t,e){if(n.detection.current.name!=this.name&&this.triggered)return e.trigger(this.name+"end",t),this.triggered=!1,void 0;if(!(e.options.drag_max_touches>0&&t.touches.length>e.options.drag_max_touches))switch(t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:if(t.distance<e.options.drag_min_distance&&n.detection.current.name!=this.name)return;n.detection.current.name=this.name;var i=n.detection.current.lastEvent.direction;e.options.drag_lock_to_axis&&i!==t.direction&&(t.direction=n.utils.isVertical(i)?0>t.deltaY?n.DIRECTION_UP:n.DIRECTION_DOWN:0>t.deltaX?n.DIRECTION_LEFT:n.DIRECTION_RIGHT),this.triggered||(e.trigger(this.name+"start",t),this.triggered=!0),e.trigger(this.name,t),e.trigger(this.name+t.direction,t),(e.options.drag_block_vertical&&n.utils.isVertical(t.direction)||e.options.drag_block_horizontal&&!n.utils.isVertical(t.direction))&&t.preventDefault();break;case n.EVENT_END:this.triggered&&e.trigger(this.name+"end",t),this.triggered=!1}}},n.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,e){if(n.detection.current.name!=this.name&&this.triggered)return e.trigger(this.name+"end",t),this.triggered=!1,void 0;if(!(2>t.touches.length))switch(e.options.transform_always_block&&t.preventDefault(),t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:var i=Math.abs(1-t.scale),r=Math.abs(t.rotation);if(e.options.transform_min_scale>i&&e.options.transform_min_rotation>r)return;n.detection.current.name=this.name,this.triggered||(e.trigger(this.name+"start",t),this.triggered=!0),e.trigger(this.name,t),r>e.options.transform_min_rotation&&e.trigger("rotate",t),i>e.options.transform_min_scale&&(e.trigger("pinch",t),e.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case n.EVENT_END:this.triggered&&e.trigger(this.name+"end",t),this.triggered=!1}}},n.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1},handler:function(t,e){e.options.prevent_default&&t.preventDefault(),t.eventType==n.EVENT_START&&e.trigger(this.name,t)}},n.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==n.EVENT_END&&e.trigger(this.name,t)}},t.Hammer=n,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return n})})(window),function(t){Hammer.event.bindDom=function(e,n,i){t(e).on(n,function(t){var e=t.originalEvent;e.pageX||(e.pageX=t.pageX,e.pageY=t.pageY),e.target||(e.target=t.target),e.button&&(e.which=e.button),e.preventDefault||(e.preventDefault=t.preventDefault),e.stopPropagation||(e.stopPropagation=t.stopPropagation),i.call(this,e)})},Hammer.Instance.prototype.on=function(e,n){return t(this.element).on(e,n)},Hammer.Instance.prototype.off=function(e,n){return t(this.element).off(e,n)},Hammer.Instance.prototype.trigger=function(e,n){return t(n.srcEvent.target).trigger({type:e,gesture:n})},t.fn.hammer=function(e){return this.each(function(){var n=t(this),i=n.data("hammer");i?i&&e&&Hammer.utils.extend(i.options,e):n.data("hammer",Hammer(this,e||{}))})}}(jQuery);
/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
	case 'select':
		return true;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	if (this.deviceIsIOS && targetElement.setSelectionRange) {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	// If the touch has moved, cancel the click tracking
	if (this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	if ((/Chrome\/[0-9]+/).test(navigator.userAgent)) {

		// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && metaViewport.content.indexOf('user-scalable=no') !== -1) {
				return true;
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}
(function ($) {
    $.fn.review = function () {
        var options = $.extend({threshold: 0, callback: function () {
            }}, arguments[0] || {}),
            $w = $(window),
            th = options.threshold,
            element = this,
            inView,
            isElementInView;
        this.one("reviewElement", function () {
            options.callback.call(this);
        });
        function reviewElement() {
            isElementInView = element.filter(function () {

                /**
                 * Hat tip to https://github.com/luis-almeida/unveil
                 * for adapting his inview window calculations
                 */

                var $e = $(this),
                    wo = $w.offset() ? $w.offset().top : 0,
                    wlo = $w.offset() ? $w.offset().left : 0,
                    wt = $w.scrollTop() + wo,
                    wlt = $w.scrollLeft() + wlo,
                    wb = wt + $w.height(),
                    wlb = wlt + $w.width(),
                    et = $e.offset().top,
                    el = $e.offset().left,
                    eb = et + $e.height(),
                    elb = el + $e.width();
                return eb >= wt - th && et <= wb + th && elb >= wlt - th && el <= wlb + th;
            });
            inView = isElementInView.trigger("reviewElement");
            element = element.not(inView);
        }

        $w.scroll(reviewElement);
        $w.resize(reviewElement);
        reviewElement();
        return this;
    };
})(window.jQuery || window.Zepto); (function(){
  
  $.fn.fitHeights = function() {
    
    var items = $(this);
    function setHeights() {
      
      var currentTallest = 0;
  
      items.css({ 'min-height' : currentTallest });  // unset min-height to get actual new height

      // right now this causes a noticeable shift in height on resize. workarounds?
      
      items.each(function(){
        
        if( $(this).height() > currentTallest ) { currentTallest = $(this).height(); }
      });

      items.css({ 'min-height' : currentTallest });
    
    }
    
    setHeights();
    $(window).on('resize', setHeights);
    return this;
  };
})(jQuery);// Item Name : Responsive Mega Menu Complete Set
// Item URI : http://codecanyon.net/item/mega-menu-complete-set/152825
// Author URI : http://codecanyon.net/user/Pixelworkshop/
// Version : 3.3


/* Megamenu Code - 21 Feb 2014 */

(function ($) {

    var settings = {
        menu_speed_show:200, // Time (in milliseconds) to show a drop down
        menu_speed_hide:100, // Time (in milliseconds) to hide a drop down
        menu_speed_delay:0, // Time (in milliseconds) before showing a drop down
        menu_effect:'click_fade', // Drop down effect, choose between 'hover_fade', 'hover_slide', 'click_fade', 'click_slide', 'open_close_fade', 'open_close_slide'
        menu_click_outside:0, // Clicks outside the drop down close it (1 = true, 0 = false)
        menu_show_onload:0, // Drop down to show on page load (type the number of the drop down, 0 for none)
        menu_responsive:1, // 1 = Responsive, 0 = Not responsive
        hoverIntentConfig:{ // HoverIntent Configuration
            sensitivity:2, // number = sensitivity threshold (must be 1 or higher)
            interval:100, // number = milliseconds for onMouseOver polling interval
            over:megaMenuOver, // function = onMouseOver callback (REQUIRED)
            timeout:200, // number = milliseconds delay before onMouseOut
            out:megaMenuOut // function = onMouseOut callback (REQUIRED)
        }
    };

    var methods = {

        init:function (options) {

            settings = $.extend(1, settings, options);

            return this.each(function () {

                var megaMenu = $(this),
                    menuItem = $(megaMenu).children('li'),
                    menuItemLink = $(menuItem).children('.megamenu_drop'),
                    menuDropDown = $(menuItem).find('.dropdown_container, .dropdown_fullwidth'),
                    menuItemFlyOut = $(menuItem).find('.dropdown_parent'),
                    menuItemFlyOutLink = $(menuItemFlyOut).children('a'),
                    menuItemFlyOutDropDown = $(menuItemFlyOut).find('.dropdown_flyout_level'),
                    menuButton = $('.megamenu_button');

                menuItemElement = $(menuItem).add(menuItemFlyOut);
                menuDropDownElement = $(menuDropDown).add(menuItemFlyOutDropDown);

                // fix to be able to remove the #_ at the end of each link URL (found in the forum for the megaMenu)
                // this should fix the jump to top of page when search icon is clicked on the menu in mobile view
                $(menuItemLink).click(function(event) {
                    event.preventDefault();
                    window.location.hash = this.hash;
                });

                if (("ontouchstart" in document.documentElement) && (settings.menu_responsive === 1)) {

                    if ($(window).innerWidth() < 960) {
                        $(menuDropDown).css({'top':'auto'}).hide();
                        $(menuItemFlyOutDropDown).css({'left':'0', 'top':'0'}).hide();
                        $(menuItem).hide(0);
                        $(menuButton).show(0);

                    } else {
                        megaMenuDropDownPosition();
                    }

                    $(menuButton).children('a').hammer().on('tap', function (event) {
                        $(menuItem).not(":eq(0)").toggle(0);
                    });

                    $(menuItemElement).toggleClass('noactive');

                    // Event attached to the link instead of the LI element
                    // to prevent the drop down from being closed if a touch
                    // event occurs within its area.

                    //mobile and tablet handler when top level menu items are clicked
                    $(menuItemLink).hammer().on('tap', function (event) {
                        event.preventDefault();
                        var $this = $(this);
                        var $thisParentItem = $this.closest(menuItem);
                        $thisParentItem.toggleClass('active noactive')
                            .find(menuDropDown).toggle(0);

                        // No chaining here, the horizontal and vertical
                        // versions don't use the exact same structure.
                        $this.parent(menuItem).siblings().addClass('noactive').removeClass('active')
                            .find(menuDropDown).hide(0);
                        return false;
                    });

                    $(menuItemFlyOutLink).hammer().on('tap', function () {
                        var $this = $(this);
                        $this.parent(menuItemFlyOut)
                            .toggleClass('active noactive')
                            .find(menuItemFlyOutDropDown).first()
                            .toggle(0);
                        $this.parent(menuItemFlyOut).siblings().addClass('noactive').removeClass('active')
                            .find(menuItemFlyOutDropDown).hide(0);
                        $this.parent(menuItemFlyOut).siblings()
                            .find(menuItemFlyOut).addClass('noactive').removeClass('active');
                        return false;
                    });

                    $(document).hammer().on('tap', function () {
                        $(menuItemElement).addClass('noactive');
                        $(menuDropDownElement).hide(0);
                    });
                    $(megaMenu).hammer().on('tap', function (event) {
                        event.stopPropagation();
                    });
                    $(window).bind('orientationchange', function () {
                        $(menuItemElement).addClass('noactive');
                        $(menuDropDownElement).hide(0);
                    });

                    return;

                } else {

                    megaMenuDropDownPosition();

                    $(window).resize(function() {
                        megaMenuDropDownPosition();
                    });
                    // mobile menu icon show hide menu
                    $(menuButton).children('a').click(function () {

                        $(menuButton).toggleClass('megamenu_button_active');
                        $(menuItem).not(":eq(0)").toggle(0);

                    });

                    if (settings.menu_click_outside === 1) {

                        $(document).click(function () {
                            $(menuItemElement).removeClass('active');
                            $(menuDropDownElement).hide(0);
                        });
                        $(megaMenu).click(function (event) {
                            event.stopPropagation();
                        });
                    }

                    switch (settings.menu_effect) {

                        // case 'open_close_fade':
                        // var menuEffectShow = 'fadeToggle',
                        //     menuEffectHide = 'fadeOut';
                        //     break;
                        case 'open_close_slide':
                        var menuEffectShow = 'slideDown',
                            menuEffectHide = 'fadeOut';
                            break;
                        // case 'open_close_toggle':
                        // var menuEffectShow = 'toggle',
                        //     menuEffectHide = 'fadeOut';
                        //     break;

                    }

                    switch (settings.menu_effect) {

                        case 'hover_fade':
                        case 'hover_slide':
                        case 'hover_toggle':
                        case 'click_fade':
                        case 'click_slide':
                        case 'click_toggle':
                            $(menuItem).hoverIntent(settings.hoverIntentConfig);
                            $(menuItemFlyOut).hoverIntent(settings.hoverIntentConfig);
                            break;

                        case 'open_close_fade':
                        case 'open_close_slide':
                        case 'open_close_toggle':

                            $('.megamenu > li:nth-child(' + settings.menu_show_onload + ')')
                                .find(menuDropDown).show()
                                .closest(menuItem).toggleClass('active');


                            $(menuItem).unbind('mouseenter mouseleave').bind('click', function(event) {
                                //event.preventDefault();
                                var $this = $(this);
                                var dd = $this.find(menuDropDown);
                                var _clickedNode = event.target.nodeName;

                                // confirm("clicked node was:" + _clickedNode);
                                // only handle the closing and hiding of dropdown menu if clicking a link
                                if ($(event.target).hasClass("megamenu_drop"))  {

                                    // check if another list item is already open
                                    if ($this.siblings().hasClass('active')) {

                                        // confirm("another menu item is already open");
                                        $this.siblings().removeClass('active');
                                        $this.siblings().find(menuDropDown).hide();
                                        $this.toggleClass('active');
                                        dd.show();
                                    }
                                    else {
                                        $this.siblings().removeClass('active');
                                        $this.toggleClass('active');

                                        if ($this.hasClass('active') ){
                                            dd.slideDown();
                                        }
                                        else {
                                            dd.slideUp();
                                        }

                                    }
                                }


                            });

                            $(menuItemFlyOut).unbind('mouseenter mouseleave').click(function () {

                                var $this = $(this);
                                $this.siblings().removeClass('active')
                                    .find(menuItemFlyOutDropDown)[menuEffectHide](settings.menu_speed_hide);
                                $this.siblings().find('li').removeClass('active');
                                $this.toggleClass('active')
                                    .find(menuItemFlyOutDropDown).first()
                                    .delay(settings.menu_speed_delay)[menuEffectShow](settings.menu_speed_show)
                                    .click(function (event) {
                                        event.stopPropagation();
                                    });

                            });

                            break;


                    }
                }
            }); // End each

        },

        update:function (options) {
            settings = $.extend(1, settings, options);
        }
    };

    $.fn.megaMenuCompleteSet = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('No found method ' + method);
        }

    };


    function megaMenuOver() {

        var $this = $(this),
            dropDownMega = $('.dropdown_container, .dropdown_fullwidth', $this),
            dropDownFlyOutLevel = $this.children('.dropdown_flyout_level');

        dropDownMega = $(dropDownMega).add(dropDownFlyOutLevel);

        switch (settings.menu_effect) {
            case 'hover_fade':
                $(dropDownMega).fadeIn(settings.menu_speed_show);
                // console.log('test');
                break;
            case 'hover_slide':
                $(dropDownMega).slideDown(settings.menu_speed_show);
                break;
            case 'hover_toggle':
                $(dropDownMega).show(settings.menu_speed_show);
                break;
            case 'click_fade':
                $this.click(function () {
                    $(dropDownMega).fadeIn(settings.menu_speed_show);
                });
                break;
            case 'click_slide':
                $this.click(function () {
                 $(dropDownMega).slideDown(settings.menu_speed_show);
                });
                break;
            case 'click_toggle':
                $this.click(function () {
                    $(dropDownMega).show(settings.menu_speed_show);
                });
                break;

        }

    }

    function megaMenuOut() {

        var $this = $(this),
            dropDownMega = $('.dropdown_container, .dropdown_fullwidth, .dropdown_flyout_level', $this);

        switch (settings.menu_effect) {
            case 'hover_fade':
            case 'click_fade':
                $(dropDownMega).fadeOut(settings.menu_speed_hide);
                break;
            case 'hover_slide':
            case 'click_slide':
                $(dropDownMega).slideUp(settings.menu_speed_hide);
                break;
            case 'hover_toggle':
            case 'click_toggle':
                $(dropDownMega).toggle(settings.menu_speed_hide);
                break;

        }

    }

    function megaMenuDropDownPosition() {

        // This part uses CSS so the drop downs remain opened when using the effects
        // 'open_close_fade', 'open_close_slide' and 'open_close_fade'.
        // Without those top and left values, the drop downs would be hidden
        // when not hovered.

        // get width of page -- used to set the width of the menu dropdowns a
        var _innerW = $('body').innerWidth();

        if ((_innerW < 960) && (settings.menu_responsive === 1)) {
            $('.megamenu').children('li').hide(0);
            $('.dropdown_container, .dropdown_fullwidth').css({
                'left':'0',
                'top':'auto',
                'width': _innerW
                }).hide();
            $('.dropdown_first').css({'left':'0'}).hide();
            $('.dropdown_flyout_level, .dropdown_flyout_level_left').css({'left':'0', 'top':'0'}).hide();
            $('.megamenu_button').show(0);
        }

        else {
            $('.dropdown_container').css({'left':'auto', 'top':'auto'}).hide();
            $('.dropdown_fullwidth').css({'left':'-1px', 'top':'auto'}).hide();

            var _nav_wrap = document.getElementById('global-nav'),
                x_pos;

            // get x-position (distance from left side of screen) of navigation
            x_pos = _nav_wrap.getBoundingClientRect().left;

            // set negative left margin to push the menu dropdown to the left edge of the screen
            var _l_margin = ("-" + x_pos + "px");

            $('.dropdown_fullwidth').css({
                    'position':'absolute',
                    'left':'0',
                    'right':'0',
                    'width' : _innerW, // set dropdown to full screen width
                    'top':'36px',
                    'margin-left': _l_margin // push dropdown to the left side of screen
            });

            $('.dropdown_flyout_level').css({'left':'95%', 'top':'-21px'}).hide();
            $('.dropdown_flyout_level_left').css({'left':'-108%', 'right':'100%'}).hide();
            $('.megamenu').children('li').show(0);
            $('.megamenu_button').hide(0);
        }

        $('.megamenu_container_vertical').find('.dropdown_container, .dropdown_fullwidth').css({'top':'0'});

    }


})(jQuery);
(function() {
  var kisWidget;

  kisWidget = function() {
    return (function(d) {
      "use strict";
      var scriptTags, widgetScript;
      widgetScript = d.createElement("script");
      widgetScript.id = "unistats-widget-script";
      widgetScript.src = "//widget.unistats.ac.uk/js/unistats.widget.js";
      scriptTags = d.getElementsByTagName("script")[0];
      if (d.getElementById("unistats-widget-script")) {
        return;
      }
      return scriptTags.parentNode.insertBefore(widgetScript, scriptTags);
    })(document);
  };

  $(document).ready(function() {
    if ($(".kis-widget").length > 0) {
      return kisWidget();
    }
  });

}).call(this);

(function() {
  var initAccordion, resetSpinners;

  resetSpinners = function() {
    return $(".accordion-list-item").each(function(e) {
      var _li_item;
      _li_item = $(this);
      if (_li_item.hasClass("st-open")) {
        return _li_item.find(".st-arrow").rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
  };


  /*
      -------------------------------------------------------------
          initAccordion()
  
          Load accordion script and handle clicks
      -------------------------------------------------------------
   */

  initAccordion = function() {
    $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js"), $.Deferred(function(deferred) {
      return $(deferred.resolve);
    })).done(function() {
      return $("#st-accordion").accordion({
        oneOpenedItem: true
      });
    });
    $(".accordion-list-anchor").on("click", ".size-h4", function(event) {
      var accordion, circle, elem;
      event.preventDefault();
      circle = $(this).next(".st-arrow");
      accordion = $(this).parent().parent();
      elem = $(this).parent().next(".st-content");
      resetSpinners();
      if (!elem.is(":visible")) {
        return circle.rotate({
          animateTo: 135
        });
      } else {
        return circle.rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
    return $(".st-arrow").on("click", function(e) {
      var _icon, _st;
      e.preventDefault();
      resetSpinners();
      _icon = $(this);
      _st = $(this).parent().parent();
      if (!_st.hasClass("st-open")) {
        return _icon.rotate({
          animateTo: 135
        });
      } else {
        return _icon.rotate({
          animateTo: 0,
          center: ["50%", "50%"]
        });
      }
    });
  };

  $(document).ready(function() {
    if ($(".accordion").length > 0) {
      return initAccordion();
    }
  });

}).call(this);

(function() {
  var initTabsAccordion;

  initTabsAccordion = function() {
    $(".tab_content").hide();
    $(".tab_content:first").show();
    $("ul.tabs li").click(function() {
      var activeTab;
      $(".tab_content").hide();
      activeTab = $(this).attr("rel");
      $("#" + activeTab).show();
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");
      $(".tab_drawer_heading").removeClass("d_active");
      $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
    });
    return $(".tab_drawer_heading").click(function() {
      var d_activeTab;
      $(".tab_content").hide();
      d_activeTab = $(this).attr("rel");
      $("#" + d_activeTab).show();
      $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
      $("ul.tabs li").removeClass("active");
      $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });
  };

  $(document).ready(function() {
    if ($(".tabs-container").length > 0) {
      return initTabsAccordion();
    }
  });

}).call(this);

(function() {
  var initAudio;

  initAudio = function() {
    jQuery.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js", function() {
      $("audio").each(function() {
        return $(this).audioPlayer();
      });
    });
  };

  $(document).ready(function() {
    if ($("audio").length > 0) {
      return initAudio();
    }
  });

}).call(this);

(function() {
  var initCarousel;

  initCarousel = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js", function() {
      return $.each($(".js-carousel"), function() {
        var _controlsOpt, _itemMargin, _itemMinSlides, _itemWidth, _pagerOpt, _this, _wrapper;
        _this = $(this);
        _wrapper = _this.closest(".bx-wrapper");
        _itemWidth = (_this.data("carousel-item-width") > 0 ? _this.data("carousel-item-width") : 0);
        _itemMinSlides = (_this.data("carousel-min-slides") > 0 ? _this.data("carousel-min-slides") : 0);
        _itemMargin = (_this.data("carousel-item-margin") > 0 ? _this.data("carousel-item-margin") : 0);
        _controlsOpt = true;
        _controlsOpt = _this.data("controls");
        _pagerOpt = (_this.data("pager") ? _this.data("pager") : false);
        return _this.bxSlider({
          slideWidth: _itemWidth,
          minSlides: _itemMinSlides,
          maxSlides: 10,
          slideMargin: _itemMargin,
          moveSlides: 1,
          controls: _controlsOpt,
          captions: true,
          pager: _pagerOpt,
          onSliderLoad: function(currentIndex) {
            if (_this.data("counter")) {
              return $(_this).closest(".bx-wrapper").find(".bx-controls").prepend("<div class=\"bx-counter\"><span class=\"bx-index\">" + (currentIndex + 1) + "</span>/<span class=\"bx-total\">" + _this.getSlideCount() + "</span></div>");
            }
          },
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            if (_this.data("counter")) {
              return $(_this).closest(".bx-wrapper").find(".bx-index").text(newIndex + 1);
            }
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".js-carousel").length > 0) {
      return initCarousel();
    }
  });

}).call(this);

(function() {
  var initDropdownBtn;

  initDropdownBtn = function() {
    return $(".js-dd-menu").click(function(event) {
      var _d, _d_menu;
      event.preventDefault();
      _d = $(this);
      _d_menu = _d.parent();
      if (_d_menu.hasClass("active")) {
        _d_menu.find(".js-dd-menu-icon");
        return _d_menu.find(".js-dd-menu-list").slideUp("fast", function() {
          return _d_menu.removeClass("active");
        });
      } else {
        _d_menu.find(".js-dd-menu-icon");
        return _d_menu.find(".js-dd-menu-list").slideDown("fast", function() {
          return _d_menu.addClass("active");
        });
      }
    });
  };

  $(document).ready(function() {
    if ($(".dd-menu").length > 0) {
      return initDropdownBtn();
    }
  });

}).call(this);

(function() {
  var expCB;

  expCB = function() {
    $(".expanded-content").hide();
    $(".show-more").show();
    $(".show-more").click(function(e) {
      var _clicked;
      e.preventDefault();
      _clicked = $(this);
      _clicked.closest(".expandable-content").find(".expanded-content").slideDown();
      return _clicked.hide();
    });
    return $(".hide-content").click(function(e) {
      var parent, _clicked;
      e.preventDefault();
      _clicked = $(this);
      parent = _clicked.closest(".expandable-content");
      $(".expanded-content", parent).hide();
      $(parent).find(".show-more").show();
      return parent.scrollToMe();
    });
  };

  $(document).ready(function() {
    if ($(".expanded-content").length > 0) {
      return expCB();
    }
  });

}).call(this);

(function() {
  var initLightbox;

  initLightbox = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", function() {
      return $(".js-lightbox").each(function() {
        return $(this).magnificPopup({
          delegate: "a",
          type: "image",
          tLoading: "Loading image #%curr%...",
          mainClass: "mfp-img-mobile",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
          },
          image: {
            tError: "<a href=\"%url%\">The image #%curr%</a> could not be loaded."
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".js-lightbox").length > 0) {
      return initLightbox();
    }
  });

}).call(this);

(function() {
  var initOwlCarousel;

  initOwlCarousel = function() {
    jQuery.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/owl.carousel.js", function() {
      $(".owl-carousel").each(function() {
        $(this).owlCarousel({
          items: 3,
          itemsDesktop: [1280, 3],
          itemsTablet: [959, 2],
          itemsMobile: [599, 1],
          lazyLoad: true,
          pagination: false,
          navigation: true,
          navigationText: ["<i class='icon-left-open-big'></i>", "<i class='icon-right-open-big'></i>"]
        });
      });
      $(".owl-carousel").each(function() {
        var total_items;
        total_items = $(".item", this).length;
        $(".item-description", this).append(function(i) {
          return $("<span />", {
            text: i + 1 + " of " + total_items
          });
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".owl-carousel").length > 0) {
      return initOwlCarousel();
    }
  });

}).call(this);

(function() {
  var initSlider;

  initSlider = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js", function() {
      return $.each($(".royalSlider"), function() {
        var _itemAutoPlay, _itemHeight, _itemWidth, _this;
        _this = $(this);
        _itemWidth = (_this.data("slider-item-width") > 0 ? _this.data("slider-item-width") : 930);
        _itemHeight = (_this.data("slider-item-height") > 0 ? _this.data("slider-item-height") : 465);
        _itemAutoPlay = (_this.data("slider-auto-play") === true ? _this.data("slider-auto-play") : false);
        return _this.royalSlider({
          arrowsNav: true,
          fadeinLoadedSlide: false,
          arrowsNavAutoHide: false,
          controlNavigation: "none",
          loop: true,
          autoScaleSlider: true,
          autoScaleSliderWidth: _itemWidth,
          autoScaleSliderHeight: _itemHeight,
          imageScalePadding: 0,
          globalCaption: true,
          keyboardNavEnabled: true,
          autoPlay: {
            enabled: _itemAutoPlay,
            pauseOnHover: true
          }
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".royalSlider").length > 0) {
      return initSlider();
    }
  });

}).call(this);

(function() {
  var searchFilters;

  searchFilters = function() {
    return $(".filter-heading").click(function(event) {
      var c;
      event.preventDefault();
      c = $(this);
      if (!c.hasClass("not-active")) {
        if (c.parent().hasClass("active")) {
          return c.parent().removeClass("active");
        } else {
          return c.parent().addClass("active");
        }
      }
    });
  };

  $(document).ready(function() {
    if ($(".search-filters").length > 0) {
      return searchFilters();
    }
  });

}).call(this);

(function() {
  var searchFocusHighlight;

  searchFocusHighlight = function() {
    return $("#finder-search-input").focus(function() {
      return $("#finder-search-input").parent().parent().addClass("search-gray-border");
    });
  };

  $(document).ready(function() {
    if ($(".search-input-wrap").length > 0) {
      return searchFocusHighlight();
    }
  });

}).call(this);

(function() {
  var initFitVids;

  initFitVids = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids-ck.js", function() {
      return $(".__media").fitVids();
    });
  };

  $(document).ready(function() {
    if ($(".__media").length > 0) {
      return initFitVids();
    }
  });

}).call(this);

(function() {
  var checkForVideo;

  checkForVideo = function() {
    return $.getScript("https://raw.github.com/johndyer/mediaelement/master/build/mediaelement-and-player.js", function() {
      return $("video").mediaelementplayer({
        pluginPath: "http://d27lwoqz7s24cy.cloudfront.net/assets/swf/"
      });
    });
  };

  $(document).ready(function() {
    if ($("video").length > 0) {
      return checkForVideo();
    }
  });

}).call(this);

(function() {
  var debugSwitch;

  debugSwitch = function() {
    $("#debug").hide();
    return $(".debug-toggle").click(function(e) {
      $("#debug").toggle();
      return e.preventDefault();
    });
  };

  $(document).ready(function() {
    return debugSwitch;
  });

}).call(this);

(function() {
  this.getEventsFeed = function() {
    return $.getJSON("http://events.arts.ac.uk/apex/eventsfeed?callback=?", function(data) {
      var count, output;
      output = "<ul class=\"cf\">";
      count = 6;
      $.each(data, function(i, item) {
        var events;
        if (i < count) {
          events = data.Events[i];
          return output += "<li><p>" + events.id + "</p></li>";
        }
      });
      output += "</ul></div>";
      $(".events-feed").html(output);
    });
  };

  $(document).ready(function() {
    if ($(".events-feed").length > 0) {
      return $.each($(".events-feed"), function() {
        return getEventsFeed();
      });
    }
  });

}).call(this);

(function() {
  this.getNewsFeed = function(college, feed_id) {
    var blog_url, feed_url;
    feed_url = "http://blogs.arts.ac.uk/" + college + "/api/get_recent_posts/?callback=?&count=6&include=title,url,attachments";
    blog_url = "http://blogs.arts.ac.uk/" + college;
    return $.getJSON(feed_url, function(data) {
      var count, output;
      output = "<div class=\"feed-comp\"> <ul class=\"cf\">";
      count = 6;
      $.each(data.posts, function(i, item) {
        var length, news, short_title, title;
        if (i < count) {
          news = data.posts[i];
          length = 60;
          title = news.title;
          if (title.length > length) {
            short_title = title.substring(0, length) + "...";
          } else {
            short_title = title;
          }
          return output += "<li> <div class=\"feed-image\"> <div class=\"center-cropped\" style=\"background-image: url(" + news.attachments[0].url + ")\"> <img src=\"" + news.attachments[0].url + "\"> </div> </div> <div class=\"title\"> <a href=\"" + news.url + "\" tite=\"" + news.title + "\">" + short_title + "</a> </div> </li>";
        }
      });
      output += "</ul> <p class=\"view-all\"><a href=\"" + blog_url + "\" class=\"button-link\" title=\"\"><span class=\"hide-descriptive-text\">View all</span>View all</a></p></div>";
      $(".news-feed-" + feed_id).html(output);
    });
  };

}).call(this);


/*
    -------------------------------------------------------------
        enableSelectBoxes()

        UAL formatting for select boxes
    -------------------------------------------------------------
 */

(function() {
  if ($(".select-box").length > 0) {
    $(".js-select-box").each(function() {
      var _start_val;
      _start_val = $(this).children("ul.js-select-box-list").children("li.select-box-option:first").children("a").html();
      $(this).children("div").children("h3.selected").html(_start_val);
      $("input.js-select-box-value").attr("value", $(this).children("ul.js-select-box-list").children("li.select-box-option:first").attr("data-sb-value"));
      $(this).children("div").children("h3.selected,div.select-box-arrow").click(function(event) {
        event.preventDefault();
        if ($(this).parent().parent().children("ul.js-select-box-list").css("display") === "none") {
          return $(this).parent().parent().children("ul.js-select-box-list").css("display", "block");
        } else {
          return $(this).parent().parent().children("ul.js-select-box-list").css("display", "none");
        }
      });
      return $(this).find("li.select-box-option").click(function(event) {
        event.preventDefault();
        $(this).parent().css("display", "none");
        $("input.js-select-box-value").attr("value", $(this).attr("data-sb-value"));
        return $(this).parent().parent().children("div").children("h3.selected").html($(this).children("a"));
      });
    });
  }

}).call(this);


/*
    -------------------------------------------------------------
        checkWindowSize() function
          Adds width classes to <body> tag.
          Used for tablet, desktop, mobile styling
    -------------------------------------------------------------
 */

(function() {
  var checkWindowSize;

  checkWindowSize = function() {
    var new_body_class, width;
    width = $(window).width();
    switch (width) {
      case width > 959:
        new_body_class = 'gDesktop';
        break;
      case width > 599:
        new_body_class = 'gTablet';
        break;
      case width < 600:
        new_body_class = 'gMobile';
        break;
      default:
        new_body_class = '';
    }
    return $(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_body_class);
  };

  $(document).ready(function() {
    return checkWindowSize();
  });

}).call(this);


/*
    -------------------------------------------------------------
       Enable caching of getScript calls
    -------------------------------------------------------------
 */

(function() {
  jQuery.ajaxSetup({
    cache: true
  });

}).call(this);


/*
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
 */

(function() {
  var formatDateUAL;

  formatDateUAL = function() {
    return $(".date").each(function(i, element) {
      var str;
      str = $(this).text();
      if (str.indexOf(",") !== -1) {
        return $(this).text(str.substring(5, 16));
      }
    });
  };

  $(document).ready(function() {
    if ($(".date").length > 0) {
      return formatDateUAL();
    }
  });

}).call(this);

(function() {
  var imageCredits;

  imageCredits = function() {
    if ($("body").hasClass("gDesktop")) {
      $(".credits-btn").addClass("show");
      return $(".show-credits").click(function(event) {
        var c;
        event.preventDefault();
        c = $(this);
        if (c.hasClass("active")) {
          c.removeClass("active").attr("title", "Show image credits");
          return $(".credits").fadeOut();
        } else {
          c.addClass("active").attr("title", "Hide image credits");
          return $(".credits").fadeIn();
        }
      });
    }
  };

  $(document).ready(function() {
    if ($(".credits").length > 0) {
      return imageCredits();
    }
  });

}).call(this);


/*
    -------------------------------------------------------------
        add indexOf support for IE8 compatibility

          Used to reformat dates within feeds
    -------------------------------------------------------------
 */

(function() {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
      var from, len;
      len = +this.length || 0;
      from = Number(arguments_[1]) || 0;
      from = (from < 0 ? Math.ceil(from) : Math.floor(from));
      if (from < 0) {
        from += len;
      }
      while (from < len) {
        if (from in this && this[from] === elt) {
          return from;
        }
        from++;
      }
      return -1;
    };
  }

}).call(this);

(function() {
  var getLCFJobsFeed;

  getLCFJobsFeed = function() {
    return $.getJSON("http://my.lcffirstmove.co.uk/jobs.json?callback=?", function(data) {
      var count, months, output;
      output = "<div class=\"table-container padded\"><table class=\"data-table\"><thead><tr><th>Title</th><th>Location</th><th>Salary</th><th>Closing date</th></tr></thead><tbody>";
      count = 10;
      months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      $.each(data, function(i, item) {
        var dt, job, job_date, old_salary, salary;
        if (i < count) {
          job = data[i];
          salary = "";
          old_salary = job.salary;
          if (old_salary === null) {
            salary = job.salary_range.description;
          } else {
            salary = old_salary;
          }
          job_date = job.closes_on;
          dt = new Date(job_date);
          output += "<tr>" + "<td><a href=\"http://my.lcffirstmove.co.uk/jobs/" + job.id + "\">" + job.job_title + "</a></td>" + "<td>" + job.region + "</td>" + "<td>" + salary + "</td>" + "<td>" + dt.getDate() + " " + months[dt.getMonth()] + "</td>" + "</tr>";
        }
      });
      output += "</tbody></table></div>";
      $("#lcf-jobs").html(output);
    });
  };

  $(document).ready(function() {
    if ($("#lcf-jobs").length > 0) {
      return getLCFJobsFeed();
    }
  });

}).call(this);


/*
    -------------------------------------------------------------
        .back-to-top
          Scroll to the top of the page
          when a link with .back-to-top class clicked

          On desktop the button will fade in when the user
          scrolls down the page
    -------------------------------------------------------------
 */

(function() {
  var backToTop, checkScrollPos;

  checkScrollPos = function() {
    if ($("body").hasClass("gDesktop")) {
      if ($(this).scrollTop() > 450) {
        return $(".back-to-top").fadeIn(200);
      } else {
        return $(".back-to-top").fadeOut(200);
      }
    }
  };

  backToTop = function() {
    $(window).scroll(checkScrollPos());
    return $("back-to-top").click(function(event) {
      event.preventDefault();
      return $("html, body").animate({
        scrollTop: 0
      }, 300);
    });
  };

  $(document).ready(function() {
    return backToTop();
  });

}).call(this);

(function() {
  var breadcrumbs;

  breadcrumbs = function() {
    $(".breadcrumbs").find("a").last().hide();
    return $(".browse-sc").find(".breadcrumbs").find("a:gt(4)").remove();
  };

  $(document).ready(function() {
    return breadcrumbs();
  });

}).call(this);

(function() {
  var formatMainNavDDCols;

  formatMainNavDDCols = function() {
    var Link_about, Link_about_1, Link_about_2, Link_alumni, Link_col, Link_industry, Link_student, Link_study_1, Link_study_2, Link_study_3;
    Link_col = $(".college-nav").find("li").slice(3, 6);
    Link_study_1 = $(".study-nav").find("li").slice(6, 11);
    Link_study_2 = $(".study-nav").find("li").slice(11, 16);
    Link_study_3 = $(".study-nav").find("li").slice(16, 19);
    Link_student = $(".student-nav").find("li").slice(3, 4);
    Link_alumni = $(".alumni-nav").find("li").slice(4, 6);
    Link_about = $(".about-nav").find("li").slice(6, 11);
    Link_about_1 = $(".about-nav").find("li").slice(11, 16);
    Link_about_2 = $(".about-nav").find("li").slice(16, 19);
    Link_industry = $(".industry-nav").find("li").slice(4, 7);
    Link_col.remove();
    Link_study_1.remove();
    Link_study_2.remove();
    Link_study_3.remove();
    Link_student.remove();
    Link_alumni.remove();
    Link_about.remove();
    Link_about_1.remove();
    Link_about_2.remove();
    Link_industry.remove();
    $(".college-nav").append("<ul class=\"subnav-2 region\">");
    $(".college-nav .subnav-2").prepend(Link_col);
    $(".study-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".study-nav .subnav-2").prepend(Link_study_1);
    $(".study-nav").append("<ul class=\"subnav-3 pad-top-6x region\">");
    $(".study-nav .subnav-3").prepend(Link_study_2);
    $(".study-nav").append("<ul class=\"subnav-4 pad-top-6x region\">");
    $(".study-nav .subnav-4").prepend(Link_study_3);
    $(".student-nav").append("<ul class=\"subnav-2 region pad-top-6x region\">");
    $(".student-nav .subnav-2").prepend(Link_student);
    $(".alumni-nav").append("<ul class=\"subnav-2 region pad-top-6x region\">");
    $(".alumni-nav .subnav-2").prepend(Link_alumni);
    $(".about-nav").append("<ul class=\"subnav-2 pad-top-6x region\">");
    $(".about-nav .subnav-2").prepend(Link_about);
    $(".about-nav").append("<ul class=\"subnav-3 pad-top-6x region\">");
    $(".about-nav .subnav-3").prepend(Link_about_1);
    $(".about-nav").append("<ul class=\"subnav-4 pad-top-6x region\">");
    $(".about-nav .subnav-4").prepend(Link_about_2);
    $(".industry-nav").append("<ul class=\"subnav-2 no-pad-top region\">");
    return $(".industry-nav .subnav-2").prepend(Link_industry);
  };

  $(document).ready(function() {
    return formatMainNavDDCols();
  });

}).call(this);

(function() {
  var buildMobileSidebar;

  buildMobileSidebar = function() {
    var _has_heading, _menuHtml, _mobMenuButton, _mobMenuContent, _no_of_li_items, _sb_lth, _sideBarTitle;
    _sb_lth = $(".sidebar").length;
    _has_heading = $(".sidebar").find(".menu-heading").length;
    if (_sb_lth > 0) {
      _no_of_li_items = $(".sidebar li").size();
      if (_no_of_li_items > 1) {
        _menuHtml = $(".sidebar").html();
        _sideBarTitle = $(".sidebar li").first();
        _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + "<a href=\"#\" class=\"show-mob-sidebar\"></a>";
        _mobMenuContent = void 0;
        if (_has_heading > 0) {
          _mobMenuContent = _mobMenuButton + _menuHtml;
        } else {
          _mobMenuContent = _menuHtml;
        }
        $("<div id=\"mobile-sidebar\" class=\"mobile-sidebar d-hide\"></div>").prependTo(".content");
        $("#mobile-sidebar").html(_mobMenuContent);
        $(".show-mob-sidebar").click(function(e) {
          var _clicked;
          e.preventDefault();
          _clicked = $(this);
          if (_clicked.hasClass("active")) {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideUp();
            return _clicked.removeClass("active");
          } else {
            _clicked.closest($("#mobile-sidebar")).find($("ul")).slideDown();
            return _clicked.addClass("active");
          }
        });
        if (_sideBarTitle.text().toLowerCase() === "in this section") {
          return $("#mobile-sidebar li").first().remove();
        } else {
          return $("#mobile-sidebar li a").first().text("College Homepage");
        }
      }
    }
  };

  $(document).ready(function() {
    return buildMobileSidebar();
  });

}).call(this);

(function() {


}).call(this);

(function() {
  var skipToContent;

  skipToContent = function() {
    if ($(".page-title").length > 0) {
      return $(".page-title").first().attr("id", "skip-to-here");
    } else {
      return $(".content-wrapper").first().attr("id", "skip-to-here");
    }
  };

  $(document).ready(function() {
    return skipToContent();
  });

}).call(this);

(function() {
  var shortCourseFilters;

  shortCourseFilters = function() {
    if ($("#container").length > 0) {
      $.when($.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js"), $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js"), $.Deferred(function(deferred) {
        $(deferred.resolve);
      })).done(function() {
        $(function() {
          var container, destroyPagination, pagination, setPagination;
          setPagination = function() {
            pagination.jPages({
              containerID: "container",
              perPage: 24,
              midRange: 1,
              previous: "←",
              next: "→",
              direction: "auto",
              animation: "fadeInUp"
            });
          };
          destroyPagination = function() {
            pagination.jPages("destroy");
          };
          container = $("#container");
          pagination = $("#pagination");
          setPagination();
          $.filtrify("container", "placeHolder", {
            block: "data-original",
            callback: function() {
              destroyPagination();
              setPagination();
            }
          });
        });
      });
      if (!$("body").hasClass("gDesktop")) {
        $("#placeHolder").prependTo(".content");
      }
    }
  };

  $(document).ready(function() {
    if ($("#container").length > 0) {
      return shortCourseFilters;
    }
  });

}).call(this);

(function() {
  var showtimeJSONloader;

  showtimeJSONloader = function() {
    return $.getScript("http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js", function() {
      var outputNode;
      outputNode = $(".showtime-json");
      return $.each(outputNode, function(i) {
        var feedUrl, limit, _node;
        _node = "";
        _node = $(this);
        feedUrl = _node.data("url");
        limit = _node.data("limit");
        return $.getJSON(feedUrl + "&limit=" + limit + "&callback=?", function(data) {
          var counter, media, profileUrl, string, studentName;
          string = "";
          media = "";
          studentName = "";
          profileUrl = "";
          counter = 0;
          if (data.data.Student) {
            profileUrl = data.data.Student.Student.profileurl;
            studentName = data.data.Student.Student.firstName + " " + data.data.Student.Student.lastName;
            media = data.data.Student.Media;
          }
          if (data.data.Profiles) {
            media = data.data.Profiles;
          }
          $.each(media, function(i, item) {
            var profileImg;
            if (counter < limit) {
              profileImg = item.thumb.split("gallery");
              item.profileImg = profileImg[0] + "profile.jpg";
              item.zoomImg = profileImg[0] + "screen.jpg";
              if (item.profileName) {
                profileUrl = "http://showtime.arts.ac.uk/" + item.profileName;
                studentName = item.fullName;
              }
              string = "<li><a class=\"zoom no-border\" href= \"" + item.zoomImg + "\" title=\"" + studentName + "\" data-profile-url=\"" + profileUrl + "\" style=\"background-image: url(" + item.profileImg + ")\"></a></li>";
              _node.append(string);
              return counter++;
            } else {
              return false;
            }
          });
          return $(".zoom").magnificPopup({
            type: "image",
            image: {
              titleSrc: function(item) {
                return item.el.attr("title") + " - <a class=\"no-border\" href=\"" + item.el.data("profile-url") + "\">View profile</a>";
              }
            },
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1]
            }
          });
        });
      });
    });
  };

  $(document).ready(function() {
    if ($(".showtime-json").length > 0) {
      return showtimeJSONloader();
    }
  });

}).call(this);


/*
    -------------------------------------------------------------
        Blockquotes:
          If there are blockquotes or pull-quotes on the page,
          add a <span> to the top of the element
    -------------------------------------------------------------
 */

(function() {
  if ($("blockquote").length > 0) {
    $("blockquote").each(function() {
      return $(this).prepend('<span></span>');
    });
  }

  if ($(".pull-quote").length > 0) {
    $(".pull-quote").each(function() {
      return $(this).prepend('<span></span>');
    });
  }

}).call(this);

(function() {
  var externalLinks;

  externalLinks = function() {
    jQuery.expr[":"].external = function(obj) {
      return obj.hostname !== location.hostname;
    };
    return $(".l-content a:external.button-link, aside a:external").addClass("external").each(function() {
      return $(this).attr("title", $(this).attr("title") + "(external link)");
    });
  };

  $(document).ready(function() {
    return externalLinks();
  });

}).call(this);

(function() {
  $("aside li a[href$=\".pdf\"], .l-content li a[href$=\".pdf\"]").parent().addClass("no-bullet");

  $("aside li a[href$=\".doc\"], .l-content li a[href$=\".doc\"]").parent().addClass("no-bullet");

}).call(this);

(function() {
  var typographyMods;

  typographyMods = function() {
    return $(".lcf").find("h2").wrapInner("<span />");
  };

  $(document).ready(function() {
    return typographyMods();
  });

}).call(this);

(function() {
  $(document).ready(function() {});

}).call(this);

(function() {
  var addMarker, loadMapsScript;

  window.loadMap = function() {
    var gJson, i, initialLocation, map, mapOptions;
    gJson = [];
    initialLocation = new google.maps.LatLng(mapConfig.initLat, mapConfig.initLng);
    mapOptions = {
      zoom: mapConfig.zoom,
      center: initialLocation
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    for (i in json) {
      addMarker(json[i], map);
    }
  };

  addMarker = function(data, map) {
    var marker;
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lng),
      map: map,
      title: data.name
    });
  };

  loadMapsScript = function() {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=loadMap";
    document.body.appendChild(script);
  };

  $(window).load(function() {
    if ($(".related-content").length > 0) {
      $(".related-content ul li").fitHeights();
    }
    if ($(".highlight-box-3").length > 0) {
      $(".highlight-box-3 ul li").fitHeights();
    }
    if ($("body").is(".chelsea, .camberwell, .wimbledon")) {
      $(".two-up ul li").fitHeights();
      $(".three-up ul li").fitHeights();
    }
    if ($("body").is(".ual")) {
      $(".cta .two-up-full ul li").fitHeights();
      $(".st-cp .two-up-full ul li").fitHeights();
      $(".news .four-up-full ul li").fitHeights();
      $(".fe .four-up-full ul li").fitHeights();
    }
    if ($(".__gallery").length > 0) {
      $(".__gallery").each(function() {
        return $(this).find("li").fitHeights();
      });
    }
    if ($("#map-canvas").length > 0) {
      return loadMapsScript();
    }
  });

}).call(this);
