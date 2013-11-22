/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.9
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

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
;/**
 * jQuery ReVIEW
 * An ultra lightweight jQuery / Zepto plugin for lazy loading elements
 * https://github.com/resrcit/ReVIEW
 *
 * Licensed under the MIT license.
 * Copyright 2013 Dominic Fee
 * http://www.resrc.it
 */

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
})(window.jQuery || window.Zepto);;/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 */
 
/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);
;/*! Hammer.JS - v1.0.6dev - 2013-09-26
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
    'use strict';

/**
 * Hammer
 * use this to create instances
 * @param   {HTMLElement}   element
 * @param   {Object}        options
 * @returns {Hammer.Instance}
 * @constructor
 */
var Hammer = function(element, options) {
    return new Hammer.Instance(element, options || {});
};

// default settings
Hammer.defaults = {
    // add styles and attributes to the element to prevent the browser from doing
    // its native behavior. this doesnt prevent the scrolling, but cancels
    // the contextmenu, tap highlighting etc
    // set to false to disable this
    stop_browser_behavior: {
		// this also triggers onselectstart=false for IE
        userSelect: 'none',
		// this makes the element blocking in IE10 >, you could experiment with the value
		// see for more options this issue; https://github.com/EightMedia/hammer.js/issues/241
        touchAction: 'none',
		touchCallout: 'none',
        contentZooming: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0,0,0,0)'
    }

    // more settings are defined per gesture at gestures.js
};

// detect touchevents
Hammer.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

// dont use mouseevents on mobile devices
Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && window.navigator.userAgent.match(Hammer.MOBILE_REGEX);

// eventtypes per touchevent (start, move, end)
// are filled by Hammer.event.determineEventTypes on setup
Hammer.EVENT_TYPES = {};

// direction defines
Hammer.DIRECTION_DOWN = 'down';
Hammer.DIRECTION_LEFT = 'left';
Hammer.DIRECTION_UP = 'up';
Hammer.DIRECTION_RIGHT = 'right';

// pointer type
Hammer.POINTER_MOUSE = 'mouse';
Hammer.POINTER_TOUCH = 'touch';
Hammer.POINTER_PEN = 'pen';

// touch event defines
Hammer.EVENT_START = 'start';
Hammer.EVENT_MOVE = 'move';
Hammer.EVENT_END = 'end';

// hammer document where the base events are added at
Hammer.DOCUMENT = window.document;

// plugins namespace
Hammer.plugins = {};

// if the window events are set...
Hammer.READY = false;

/**
 * setup events to detect gestures on the document
 */
function setup() {
    if(Hammer.READY) {
        return;
    }

    // find what eventtypes we add listeners to
    Hammer.event.determineEventTypes();

    // Register all gestures inside Hammer.gestures
    for(var name in Hammer.gestures) {
        if(Hammer.gestures.hasOwnProperty(name)) {
            Hammer.detection.register(Hammer.gestures[name]);
        }
    }

    // Add touch events on the document
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect);
    Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect);

    // Hammer is ready...!
    Hammer.READY = true;
}

/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 * @param   {HTMLElement}       element
 * @param   {Object}            [options={}]
 * @returns {Hammer.Instance}
 * @constructor
 */
Hammer.Instance = function(element, options) {
    var self = this;

    // setup HammerJS window events and register all gestures
    // this also sets up the default options
    setup();

    this.element = element;

    // start/stop detection option
    this.enabled = true;

    // merge options
    this.options = Hammer.utils.extend(
        Hammer.utils.extend({}, Hammer.defaults),
        options || {});

    // add some css to the element to prevent the browser from doing its native behavoir
    if(this.options.stop_browser_behavior) {
        Hammer.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior);
    }

    // start detection on touchstart
    Hammer.event.onTouch(element, Hammer.EVENT_START, function(ev) {
        if(self.enabled) {
            Hammer.detection.startDetect(self, ev);
        }
    });

    // return instance
    return this;
};


Hammer.Instance.prototype = {
    /**
     * bind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    on: function onEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.addEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * unbind events to the instance
     * @param   {String}      gesture
     * @param   {Function}    handler
     * @returns {Hammer.Instance}
     */
    off: function offEvent(gesture, handler){
        var gestures = gesture.split(' ');
        for(var t=0; t<gestures.length; t++) {
            this.element.removeEventListener(gestures[t], handler, false);
        }
        return this;
    },


    /**
     * trigger gesture event
     * @param   {String}      gesture
     * @param   {Object}      [eventData]
     * @returns {Hammer.Instance}
     */
    trigger: function triggerEvent(gesture, eventData){
        // optional
        if(!eventData) {
            eventData = {};
        }
      
        // create DOM event
        var event = Hammer.DOCUMENT.createEvent('Event');
        event.initEvent(gesture, true, true);
        event.gesture = eventData;

        // trigger on the target if it is in the instance element,
        // this is for event delegation tricks
        var element = this.element;
        if(Hammer.utils.hasParent(eventData.target, element)) {
            element = eventData.target;
        }

        element.dispatchEvent(event);
        return this;
    },


    /**
     * enable of disable hammer.js detection
     * @param   {Boolean}   state
     * @returns {Hammer.Instance}
     */
    enable: function enable(state) {
        this.enabled = state;
        return this;
    }
};


/**
 * this holds the last move event,
 * used to fix empty touchend issue
 * see the onTouch event for an explanation
 * @type {Object}
 */
var last_move_event = null;


/**
 * when the mouse is hold down, this is true
 * @type {Boolean}
 */
var enable_detect = false;


/**
 * when touch events have been fired, this is true
 * @type {Boolean}
 */
var touch_triggered = false;


Hammer.event = {
    /**
     * simple addEventListener
     * @param   {HTMLElement}   element
     * @param   {String}        type
     * @param   {Function}      handler
     */
    bindDom: function(element, type, handler) {
        var types = type.split(' ');
        for(var t=0; t<types.length; t++) {
            element.addEventListener(types[t], handler, false);
        }
    },


    /**
     * touch events with mouse fallback
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Function}      handler
     */
    onTouch: function onTouch(element, eventType, handler) {
		var self = this;

        this.bindDom(element, Hammer.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
            var sourceEventType = ev.type.toLowerCase();

            // onmouseup, but when touchend has been fired we do nothing.
            // this is for touchdevices which also fire a mouseup on touchend
            if(sourceEventType.match(/mouse/) && touch_triggered) {
                return;
            }

            // mousebutton must be down or a touch event
            else if( sourceEventType.match(/touch/) ||   // touch events are always on screen
                sourceEventType.match(/pointerdown/) || // pointerevents touch
                (sourceEventType.match(/mouse/) && ev.which === 1)   // mouse is pressed
            ){
                enable_detect = true;
            }

            // mouse isn't pressed
            else if(sourceEventType.match(/mouse/) && ev.which !== 1) {
                enable_detect = false;
            }


            // we are in a touch event, set the touch triggered bool to true,
            // this for the conflicts that may occur on ios and android
            if(sourceEventType.match(/touch|pointer/)) {
                touch_triggered = true;
            }

            // count the total touches on the screen
            var count_touches = 0;

            // when touch has been triggered in this detection session
            // and we are now handling a mouse event, we stop that to prevent conflicts
            if(enable_detect) {
                // update pointerevent
                if(Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
                // touch
                else if(sourceEventType.match(/touch/)) {
                    count_touches = ev.touches.length;
                }
                // mouse
                else if(!touch_triggered) {
                    count_touches = sourceEventType.match(/up/) ? 0 : 1;
                }

                // if we are in a end event, but when we remove one touch and
                // we still have enough, set eventType to move
                if(count_touches > 0 && eventType == Hammer.EVENT_END) {
                    eventType = Hammer.EVENT_MOVE;
                }
                // no touches, force the end event
                else if(!count_touches) {
                    eventType = Hammer.EVENT_END;
                }

                // store the last move event
                if(count_touches || last_move_event === null) {
                    last_move_event = ev;
                }

                // trigger the handler
                handler.call(Hammer.detection, self.collectEventData(element, eventType, self.getTouchList(last_move_event, eventType), ev));

                // remove pointerevent from list
                if(Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
                    count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
                }
            }

            //debug(sourceEventType +" "+ eventType);

            // on the end we reset everything
            if(!count_touches) {
                last_move_event = null;
                enable_detect = false;
                touch_triggered = false;
                Hammer.PointerEvent.reset();
            }
        });
    },


    /**
     * we have different events for each device/browser
     * determine what we need and set them in the Hammer.EVENT_TYPES constant
     */
    determineEventTypes: function determineEventTypes() {
        // determine the eventtype we want to set
        var types;

        // pointerEvents magic
        if(Hammer.HAS_POINTEREVENTS) {
            types = Hammer.PointerEvent.getEvents();
        }
        // on Android, iOS, blackberry, windows mobile we dont want any mouseevents
        else if(Hammer.NO_MOUSEEVENTS) {
            types = [
                'touchstart',
                'touchmove',
                'touchend touchcancel'];
        }
        // for non pointer events browsers and mixed browsers,
        // like chrome on windows8 touch laptop
        else {
            types = [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'];
        }

        Hammer.EVENT_TYPES[Hammer.EVENT_START]  = types[0];
        Hammer.EVENT_TYPES[Hammer.EVENT_MOVE]   = types[1];
        Hammer.EVENT_TYPES[Hammer.EVENT_END]    = types[2];
    },


    /**
     * create touchlist depending on the event
     * @param   {Object}    ev
     * @param   {String}    eventType   used by the fakemultitouch plugin
     */
    getTouchList: function getTouchList(ev/*, eventType*/) {
        // get the fake pointerEvent touchlist
        if(Hammer.HAS_POINTEREVENTS) {
            return Hammer.PointerEvent.getTouchList();
        }
        // get the touchlist
        else if(ev.touches) {
            return ev.touches;
        }
        // make fake touchlist from mouse position
        else {
            ev.indentifier = 1;
            return [ev];
        }
    },


    /**
     * collect event data for Hammer js
     * @param   {HTMLElement}   element
     * @param   {String}        eventType        like Hammer.EVENT_MOVE
     * @param   {Object}        eventData
     */
    collectEventData: function collectEventData(element, eventType, touches, ev) {

        // find out pointerType
        var pointerType = Hammer.POINTER_TOUCH;
        if(ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) {
            pointerType = Hammer.POINTER_MOUSE;
        }

        return {
            center      : Hammer.utils.getCenter(touches),
            timeStamp   : new Date().getTime(),
            target      : ev.target,
            touches     : touches,
            eventType   : eventType,
            pointerType : pointerType,
            srcEvent    : ev,

            /**
             * prevent the browser default actions
             * mostly used to disable scrolling of the browser
             */
            preventDefault: function() {
                if(this.srcEvent.preventManipulation) {
                    this.srcEvent.preventManipulation();
                }

                if(this.srcEvent.preventDefault) {
                    this.srcEvent.preventDefault();
                }
            },

            /**
             * stop bubbling the event up to its parents
             */
            stopPropagation: function() {
                this.srcEvent.stopPropagation();
            },

            /**
             * immediately stop gesture detection
             * might be useful after a swipe was detected
             * @return {*}
             */
            stopDetect: function() {
                return Hammer.detection.stopDetect();
            }
        };
    }
};

Hammer.PointerEvent = {
    /**
     * holds all pointers
     * @type {Object}
     */
    pointers: {},

    /**
     * get a list of pointers
     * @returns {Array}     touchlist
     */
    getTouchList: function() {
        var self = this;
        var touchlist = [];

        // we can use forEach since pointerEvents only is in IE10
        Object.keys(self.pointers).sort().forEach(function(id) {
            touchlist.push(self.pointers[id]);
        });
        return touchlist;
    },

    /**
     * update the position of a pointer
     * @param   {String}   type             Hammer.EVENT_END
     * @param   {Object}   pointerEvent
     */
    updatePointer: function(type, pointerEvent) {
        if(type == Hammer.EVENT_END) {
            this.pointers = {};
        }
        else {
            pointerEvent.identifier = pointerEvent.pointerId;
            this.pointers[pointerEvent.pointerId] = pointerEvent;
        }

        return Object.keys(this.pointers).length;
    },

    /**
     * check if ev matches pointertype
     * @param   {String}        pointerType     Hammer.POINTER_MOUSE
     * @param   {PointerEvent}  ev
     */
    matchType: function(pointerType, ev) {
        if(!ev.pointerType) {
            return false;
        }

        var types = {};
        types[Hammer.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == Hammer.POINTER_MOUSE);
        types[Hammer.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == Hammer.POINTER_TOUCH);
        types[Hammer.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == Hammer.POINTER_PEN);
        return types[pointerType];
    },


    /**
     * get events
     */
    getEvents: function() {
        return [
            'pointerdown MSPointerDown',
            'pointermove MSPointerMove',
            'pointerup pointercancel MSPointerUp MSPointerCancel'
        ];
    },

    /**
     * reset the list
     */
    reset: function() {
        this.pointers = {};
    }
};


Hammer.utils = {
    /**
     * extend method,
     * also used for cloning when dest is an empty object
     * @param   {Object}    dest
     * @param   {Object}    src
	 * @parm	{Boolean}	merge		do a merge
     * @returns {Object}    dest
     */
    extend: function extend(dest, src, merge) {
        for (var key in src) {
			if(dest[key] !== undefined && merge) {
				continue;
			}
            dest[key] = src[key];
        }
        return dest;
    },


    /**
     * find if a node is in the given parent
     * used for event delegation tricks
     * @param   {HTMLElement}   node
     * @param   {HTMLElement}   parent
     * @returns {boolean}       has_parent
     */
    hasParent: function(node, parent) {
        while(node){
            if(node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },


    /**
     * get the center of all the touches
     * @param   {Array}     touches
     * @returns {Object}    center
     */
    getCenter: function getCenter(touches) {
        var valuesX = [], valuesY = [];

        for(var t= 0,len=touches.length; t<len; t++) {
            valuesX.push(touches[t].pageX);
            valuesY.push(touches[t].pageY);
        }

        return {
            pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
            pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
        };
    },


    /**
     * calculate the velocity between two points
     * @param   {Number}    delta_time
     * @param   {Number}    delta_x
     * @param   {Number}    delta_y
     * @returns {Object}    velocity
     */
    getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
        return {
            x: Math.abs(delta_x / delta_time) || 0,
            y: Math.abs(delta_y / delta_time) || 0
        };
    },


    /**
     * calculate the angle between two coordinates
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    angle
     */
    getAngle: function getAngle(touch1, touch2) {
        var y = touch2.pageY - touch1.pageY,
            x = touch2.pageX - touch1.pageX;
        return Math.atan2(y, x) * 180 / Math.PI;
    },


    /**
     * angle to direction define
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {String}    direction constant, like Hammer.DIRECTION_LEFT
     */
    getDirection: function getDirection(touch1, touch2) {
        var x = Math.abs(touch1.pageX - touch2.pageX),
            y = Math.abs(touch1.pageY - touch2.pageY);

        if(x >= y) {
            return touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
        }
        else {
            return touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
        }
    },


    /**
     * calculate the distance between two touches
     * @param   {Touch}     touch1
     * @param   {Touch}     touch2
     * @returns {Number}    distance
     */
    getDistance: function getDistance(touch1, touch2) {
        var x = touch2.pageX - touch1.pageX,
            y = touch2.pageY - touch1.pageY;
        return Math.sqrt((x*x) + (y*y));
    },


    /**
     * calculate the scale factor between two touchLists (fingers)
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    scale
     */
    getScale: function getScale(start, end) {
        // need two fingers...
        if(start.length >= 2 && end.length >= 2) {
            return this.getDistance(end[0], end[1]) /
                this.getDistance(start[0], start[1]);
        }
        return 1;
    },


    /**
     * calculate the rotation degrees between two touchLists (fingers)
     * @param   {Array}     start
     * @param   {Array}     end
     * @returns {Number}    rotation
     */
    getRotation: function getRotation(start, end) {
        // need two fingers
        if(start.length >= 2 && end.length >= 2) {
            return this.getAngle(end[1], end[0]) -
                this.getAngle(start[1], start[0]);
        }
        return 0;
    },


    /**
     * boolean if the direction is vertical
     * @param    {String}    direction
     * @returns  {Boolean}   is_vertical
     */
    isVertical: function isVertical(direction) {
        return (direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN);
    },


    /**
     * stop browser default behavior with css props
     * @param   {HtmlElement}   element
     * @param   {Object}        css_props
     */
    stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_props) {
        var prop,
            vendors = ['webkit','khtml','moz','Moz','ms','o',''];

        if(!css_props || !element.style) {
            return;
        }

        // with css properties for modern browsers
        for(var i = 0; i < vendors.length; i++) {
            for(var p in css_props) {
                if(css_props.hasOwnProperty(p)) {
                    prop = p;

                    // vender prefix at the property
                    if(vendors[i]) {
                        prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                    }

                    // set the style
                    element.style[prop] = css_props[p];
                }
            }
        }

        // also the disable onselectstart
        if(css_props.userSelect == 'none') {
            element.onselectstart = function() {
                return false;
            };
        }
        
        // and disable ondragstart
        if(css_props.userDrag == 'none') {
            element.ondragstart = function() {
                return false;
            };
        }
    }
};


Hammer.detection = {
    // contains all registred Hammer.gestures in the correct order
    gestures: [],

    // data of the current Hammer.gesture detection session
    current: null,

    // the previous Hammer.gesture session data
    // is a full clone of the previous gesture.current object
    previous: null,

    // when this becomes true, no gestures are fired
    stopped: false,


    /**
     * start Hammer.gesture detection
     * @param   {Hammer.Instance}   inst
     * @param   {Object}            eventData
     */
    startDetect: function startDetect(inst, eventData) {
        // already busy with a Hammer.gesture detection on an element
        if(this.current) {
            return;
        }

        this.stopped = false;

        this.current = {
            inst        : inst, // reference to HammerInstance we're working for
            startEvent  : Hammer.utils.extend({}, eventData), // start eventData for distances, timing etc
            lastEvent   : false, // last eventData
            name        : '' // current gesture we're in/detected, can be 'tap', 'hold' etc
        };

        this.detect(eventData);
    },


    /**
     * Hammer.gesture detection
     * @param   {Object}    eventData
     */
    detect: function detect(eventData) {
        if(!this.current || this.stopped) {
            return;
        }

        // extend event data with calculations about scale, distance etc
        eventData = this.extendEventData(eventData);

        // instance options
        var inst_options = this.current.inst.options;

        // call Hammer.gesture handlers
        for(var g=0,len=this.gestures.length; g<len; g++) {
            var gesture = this.gestures[g];

            // only when the instance options have enabled this gesture
            if(!this.stopped && inst_options[gesture.name] !== false) {
                // if a handler returns false, we stop with the detection
                if(gesture.handler.call(gesture, eventData, this.current.inst) === false) {
                    this.stopDetect();
                    break;
                }
            }
        }

        // store as previous event event
        if(this.current) {
            this.current.lastEvent = eventData;
        }

        // endevent, but not the last touch, so dont stop
        if(eventData.eventType == Hammer.EVENT_END && !eventData.touches.length-1) {
            this.stopDetect();
        }

        return eventData;
    },


    /**
     * clear the Hammer.gesture vars
     * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
     * to stop other Hammer.gestures from being fired
     */
    stopDetect: function stopDetect() {
        // clone current data to the store as the previous gesture
        // used for the double tap gesture, since this is an other gesture detect session
        this.previous = Hammer.utils.extend({}, this.current);

        // reset the current
        this.current = null;

        // stopped!
        this.stopped = true;
    },


    /**
     * extend eventData for Hammer.gestures
     * @param   {Object}   ev
     * @returns {Object}   ev
     */
    extendEventData: function extendEventData(ev) {
        var startEv = this.current.startEvent;

        // if the touches change, set the new touches over the startEvent touches
        // this because touchevents don't have all the touches on touchstart, or the
        // user must place his fingers at the EXACT same time on the screen, which is not realistic
        // but, sometimes it happens that both fingers are touching at the EXACT same time
        if(startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
            // extend 1 level deep to get the touchlist with the touch objects
            startEv.touches = [];
            for(var i=0,len=ev.touches.length; i<len; i++) {
                startEv.touches.push(Hammer.utils.extend({}, ev.touches[i]));
            }
        }

        var delta_time = ev.timeStamp - startEv.timeStamp,
            delta_x = ev.center.pageX - startEv.center.pageX,
            delta_y = ev.center.pageY - startEv.center.pageY,
            velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y);

        Hammer.utils.extend(ev, {
            deltaTime       : delta_time,

            deltaX          : delta_x,
            deltaY          : delta_y,

            velocityX       : velocity.x,
            velocityY       : velocity.y,

            distance        : Hammer.utils.getDistance(startEv.center, ev.center),
            angle           : Hammer.utils.getAngle(startEv.center, ev.center),
            interimAngle    : this.current.lastEvent && Hammer.utils.getAngle(this.current.lastEvent.center, ev.center),
            direction       : Hammer.utils.getDirection(startEv.center, ev.center),
            interimDirection: this.current.lastEvent && Hammer.utils.getDirection(this.current.lastEvent.center, ev.center),

            scale           : Hammer.utils.getScale(startEv.touches, ev.touches),
            rotation        : Hammer.utils.getRotation(startEv.touches, ev.touches),

            startEvent      : startEv
        });

        return ev;
    },


    /**
     * register new gesture
     * @param   {Object}    gesture object, see gestures.js for documentation
     * @returns {Array}     gestures
     */
    register: function register(gesture) {
        // add an enable gesture options if there is no given
        var options = gesture.defaults || {};
        if(options[gesture.name] === undefined) {
            options[gesture.name] = true;
        }

        // extend Hammer default options with the Hammer.gesture options
        Hammer.utils.extend(Hammer.defaults, options, true);

        // set its index
        gesture.index = gesture.index || 1000;

        // add Hammer.gesture to the list
        this.gestures.push(gesture);

        // sort the list by index
        this.gestures.sort(function(a, b) {
            if (a.index < b.index) {
                return -1;
            }
            if (a.index > b.index) {
                return 1;
            }
            return 0;
        });

        return this.gestures;
    }
};


Hammer.gestures = Hammer.gestures || {};

/**
 * Custom gestures
 * ==============================
 *
 * Gesture object
 * --------------------
 * The object structure of a gesture:
 *
 * { name: 'mygesture',
 *   index: 1337,
 *   defaults: {
 *     mygesture_option: true
 *   }
 *   handler: function(type, ev, inst) {
 *     // trigger gesture event
 *     inst.trigger(this.name, ev);
 *   }
 * }

 * @param   {String}    name
 * this should be the name of the gesture, lowercase
 * it is also being used to disable/enable the gesture per instance config.
 *
 * @param   {Number}    [index=1000]
 * the index of the gesture, where it is going to be in the stack of gestures detection
 * like when you build an gesture that depends on the drag gesture, it is a good
 * idea to place it after the index of the drag gesture.
 *
 * @param   {Object}    [defaults={}]
 * the default settings of the gesture. these are added to the instance settings,
 * and can be overruled per instance. you can also add the name of the gesture,
 * but this is also added by default (and set to true).
 *
 * @param   {Function}  handler
 * this handles the gesture detection of your custom gesture and receives the
 * following arguments:
 *
 *      @param  {Object}    eventData
 *      event data containing the following properties:
 *          timeStamp   {Number}        time the event occurred
 *          target      {HTMLElement}   target element
 *          touches     {Array}         touches (fingers, pointers, mouse) on the screen
 *          pointerType {String}        kind of pointer that was used. matches Hammer.POINTER_MOUSE|TOUCH
 *          center      {Object}        center position of the touches. contains pageX and pageY
 *          deltaTime   {Number}        the total time of the touches in the screen
 *          deltaX      {Number}        the delta on x axis we haved moved
 *          deltaY      {Number}        the delta on y axis we haved moved
 *          velocityX   {Number}        the velocity on the x
 *          velocityY   {Number}        the velocity on y
 *          angle       {Number}        the angle we are moving
 *          direction   {String}        the direction we are moving. matches Hammer.DIRECTION_UP|DOWN|LEFT|RIGHT
 *          distance    {Number}        the distance we haved moved
 *          scale       {Number}        scaling of the touches, needs 2 touches
 *          rotation    {Number}        rotation of the touches, needs 2 touches *
 *          eventType   {String}        matches Hammer.EVENT_START|MOVE|END
 *          srcEvent    {Object}        the source event, like TouchStart or MouseDown *
 *          startEvent  {Object}        contains the same properties as above,
 *                                      but from the first touch. this is used to calculate
 *                                      distances, deltaTime, scaling etc
 *
 *      @param  {Hammer.Instance}    inst
 *      the instance we are doing the detection for. you can get the options from
 *      the inst.options object and trigger the gesture event by calling inst.trigger
 *
 *
 * Handle gestures
 * --------------------
 * inside the handler you can get/set Hammer.detection.current. This is the current
 * detection session. It has the following properties
 *      @param  {String}    name
 *      contains the name of the gesture we have detected. it has not a real function,
 *      only to check in other gestures if something is detected.
 *      like in the drag gesture we set it to 'drag' and in the swipe gesture we can
 *      check if the current gesture is 'drag' by accessing Hammer.detection.current.name
 *
 *      @readonly
 *      @param  {Hammer.Instance}    inst
 *      the instance we do the detection for
 *
 *      @readonly
 *      @param  {Object}    startEvent
 *      contains the properties of the first gesture detection in this session.
 *      Used for calculations about timing, distance, etc.
 *
 *      @readonly
 *      @param  {Object}    lastEvent
 *      contains all the properties of the last gesture detect in this session.
 *
 * after the gesture detection session has been completed (user has released the screen)
 * the Hammer.detection.current object is copied into Hammer.detection.previous,
 * this is usefull for gestures like doubletap, where you need to know if the
 * previous gesture was a tap
 *
 * options that have been set by the instance can be received by calling inst.options
 *
 * You can trigger a gesture event by calling inst.trigger("mygesture", event).
 * The first param is the name of your gesture, the second the event argument
 *
 *
 * Register gestures
 * --------------------
 * When an gesture is added to the Hammer.gestures object, it is auto registered
 * at the setup of the first Hammer instance. You can also call Hammer.detection.register
 * manually and pass your gesture object as a param
 *
 */

/**
 * Hold
 * Touch stays at the same place for x time
 * @events  hold
 */
Hammer.gestures.Hold = {
    name: 'hold',
    index: 10,
    defaults: {
        hold_timeout	: 500,
        hold_threshold	: 1
    },
    timer: null,
    handler: function holdGesture(ev, inst) {
        switch(ev.eventType) {
            case Hammer.EVENT_START:
                // clear any running timers
                clearTimeout(this.timer);

                // set the gesture so we can check in the timeout if it still is
                Hammer.detection.current.name = this.name;

                // set timer and if after the timeout it still is hold,
                // we trigger the hold event
                this.timer = setTimeout(function() {
                    if(Hammer.detection.current.name == 'hold') {
                        inst.trigger('hold', ev);
                    }
                }, inst.options.hold_timeout);
                break;

            // when you move or end we clear the timer
            case Hammer.EVENT_MOVE:
                if(ev.distance > inst.options.hold_threshold) {
                    clearTimeout(this.timer);
                }
                break;

            case Hammer.EVENT_END:
                clearTimeout(this.timer);
                break;
        }
    }
};


/**
 * Tap/DoubleTap
 * Quick touch at a place or double at the same place
 * @events  tap, doubletap
 */
Hammer.gestures.Tap = {
    name: 'tap',
    index: 100,
    defaults: {
        tap_max_touchtime	: 250,
        tap_max_distance	: 10,
		tap_always			: true,
        doubletap_distance	: 20,
        doubletap_interval	: 300
    },
    handler: function tapGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END && ev.srcEvent.type != 'touchcancel') {
            // previous gesture, for the double tap since these are two different gesture detections
            var prev = Hammer.detection.previous,
				did_doubletap = false;

            // when the touchtime is higher then the max touch time
            // or when the moving distance is too much
            if(ev.deltaTime > inst.options.tap_max_touchtime ||
                ev.distance > inst.options.tap_max_distance) {
                return;
            }

            // check if double tap
            if(prev && prev.name == 'tap' &&
                (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval &&
                ev.distance < inst.options.doubletap_distance) {
				inst.trigger('doubletap', ev);
				did_doubletap = true;
            }

			// do a single tap
			if(!did_doubletap || inst.options.tap_always) {
				Hammer.detection.current.name = 'tap';
				inst.trigger(Hammer.detection.current.name, ev);
			}
        }
    }
};


/**
 * Swipe
 * triggers swipe events when the end velocity is above the threshold
 * @events  swipe, swipeleft, swiperight, swipeup, swipedown
 */
Hammer.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
        // set 0 for unlimited, but this can conflict with transform
        swipe_min_touches  : 1,
        swipe_max_touches  : 1,
        swipe_velocity     : 0.7
    },
    handler: function swipeGesture(ev, inst) {
        if(ev.eventType == Hammer.EVENT_END) {
            // max touches
            if(inst.options.swipe_max_touches > 0 &&
                ev.touches.length < inst.options.swipe_min_touches &&
                ev.touches.length > inst.options.swipe_max_touches) {
                return;
            }

            // when the distance we moved is too small we skip this gesture
            // or we can be already in dragging
            if(ev.velocityX > inst.options.swipe_velocity ||
                ev.velocityY > inst.options.swipe_velocity) {
                // trigger swipe events
                inst.trigger(this.name, ev);
                inst.trigger(this.name + ev.direction, ev);
            }
        }
    }
};


/**
 * Drag
 * Move with x fingers (default 1) around on the page. Blocking the scrolling when
 * moving left and right is a good practice. When all the drag events are blocking
 * you disable scrolling on that area.
 * @events  drag, drapleft, dragright, dragup, dragdown
 */
Hammer.gestures.Drag = {
    name: 'drag',
    index: 50,
    defaults: {
        drag_min_distance : 10,
        // Set correct_for_drag_min_distance to true to make the starting point of the drag
        // be calculated from where the drag was triggered, not from where the touch started.
        // Useful to avoid a jerk-starting drag, which can make fine-adjustments
        // through dragging difficult, and be visually unappealing.
        correct_for_drag_min_distance : true,
        // set 0 for unlimited, but this can conflict with transform
        drag_max_touches  : 1,
        // prevent default browser behavior when dragging occurs
        // be careful with it, it makes the element a blocking element
        // when you are using the drag gesture, it is a good practice to set this true
        drag_block_horizontal   : false,
        drag_block_vertical     : false,
        // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
        // It disallows vertical directions if the initial direction was horizontal, and vice versa.
        drag_lock_to_axis       : false,
        // drag lock only kicks in when distance > drag_lock_min_distance
        // This way, locking occurs only when the distance has become large enough to reliably determine the direction
        drag_lock_min_distance : 25
    },
    triggered: false,
    handler: function dragGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // max touches
        if(inst.options.drag_max_touches > 0 &&
            ev.touches.length > inst.options.drag_max_touches) {
            return;
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.drag_min_distance &&
                    Hammer.detection.current.name != this.name) {
                    return;
                }

                // we are dragging!
                if(Hammer.detection.current.name != this.name) {
                    Hammer.detection.current.name = this.name;
                    if (inst.options.correct_for_drag_min_distance) {
                        // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
                        // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
                        // It might be useful to save the original start point somewhere
                        var factor = Math.abs(inst.options.drag_min_distance/ev.distance);
                        Hammer.detection.current.startEvent.center.pageX += ev.deltaX * factor;
                        Hammer.detection.current.startEvent.center.pageY += ev.deltaY * factor;

                        // recalculate event data using new start point
                        ev = Hammer.detection.extendEventData(ev);
                    }
                }

                // lock drag to axis?
                if(Hammer.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance<=ev.distance)) {
                    ev.drag_locked_to_axis = true;
                }
                var last_direction = Hammer.detection.current.lastEvent.direction;
                if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
                    // keep direction on the axis that the drag gesture started on
                    if(Hammer.utils.isVertical(last_direction)) {
                        ev.direction = (ev.deltaY < 0) ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
                    }
                    else {
                        ev.direction = (ev.deltaX < 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
                    }
                }

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                // trigger normal event
                inst.trigger(this.name, ev);

                // direction event, like dragdown
                inst.trigger(this.name + ev.direction, ev);

                // block the browser events
                if( (inst.options.drag_block_vertical && Hammer.utils.isVertical(ev.direction)) ||
                    (inst.options.drag_block_horizontal && !Hammer.utils.isVertical(ev.direction))) {
                    ev.preventDefault();
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Transform
 * User want to scale or rotate with 2 fingers
 * @events  transform, pinch, pinchin, pinchout, rotate
 */
Hammer.gestures.Transform = {
    name: 'transform',
    index: 45,
    defaults: {
        // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
        transform_min_scale     : 0.01,
        // rotation in degrees
        transform_min_rotation  : 1,
        // prevent default browser behavior when two touches are on the screen
        // but it makes the element a blocking element
        // when you are using the transform gesture, it is a good practice to set this true
        transform_always_block  : false
    },
    triggered: false,
    handler: function transformGesture(ev, inst) {
        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(Hammer.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name +'end', ev);
            this.triggered = false;
            return;
        }

        // atleast multitouch
        if(ev.touches.length < 2) {
            return;
        }

        // prevent default when two fingers are on the screen
        if(inst.options.transform_always_block) {
            ev.preventDefault();
        }

        switch(ev.eventType) {
            case Hammer.EVENT_START:
                this.triggered = false;
                break;

            case Hammer.EVENT_MOVE:
                var scale_threshold = Math.abs(1-ev.scale);
                var rotation_threshold = Math.abs(ev.rotation);

                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(scale_threshold < inst.options.transform_min_scale &&
                    rotation_threshold < inst.options.transform_min_rotation) {
                    return;
                }

                // we are transforming!
                Hammer.detection.current.name = this.name;

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name +'start', ev);
                    this.triggered = true;
                }

                inst.trigger(this.name, ev); // basic transform event

                // trigger rotate event
                if(rotation_threshold > inst.options.transform_min_rotation) {
                    inst.trigger('rotate', ev);
                }

                // trigger pinch event
                if(scale_threshold > inst.options.transform_min_scale) {
                    inst.trigger('pinch', ev);
                    inst.trigger('pinch'+ ((ev.scale < 1) ? 'in' : 'out'), ev);
                }
                break;

            case Hammer.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name +'end', ev);
                }

                this.triggered = false;
                break;
        }
    }
};


/**
 * Touch
 * Called as first, tells the user has touched the screen
 * @events  touch
 */
Hammer.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
        // call preventDefault at touchstart, and makes the element blocking by
        // disabling the scrolling of the page, but it improves gestures like
        // transforming and dragging.
        // be careful with using this, it can be very annoying for users to be stuck
        // on the page
        prevent_default: false,

        // disable mouse events, so only touch (or pen!) input triggers events
        prevent_mouseevents: false
    },
    handler: function touchGesture(ev, inst) {
        if(inst.options.prevent_mouseevents && ev.pointerType == Hammer.POINTER_MOUSE) {
            ev.stopDetect();
            return;
        }

        if(inst.options.prevent_default) {
            ev.preventDefault();
        }

        if(ev.eventType ==  Hammer.EVENT_START) {
            inst.trigger(this.name, ev);
        }
    }
};


/**
 * Release
 * Called as last, tells the user has released the screen
 * @events  release
 */
Hammer.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
        if(ev.eventType ==  Hammer.EVENT_END) {
            inst.trigger(this.name, ev);
        }
    }
};



    // Based off Lo-Dash's excellent UMD wrapper (slightly modified) - https://github.com/bestiejs/lodash/blob/master/lodash.js#L5515-L5543
    // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // define as an anonymous module
        define(function() {
            return Hammer;
        });
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
    } else if(typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Hammer;
    } else {
        window.Hammer = Hammer;
    }

})(this);;// Item Name : Responsive Mega Menu Complete Set
// Item URI : http://codecanyon.net/item/mega-menu-complete-set/152825
// Author URI : http://codecanyon.net/user/Pixelworkshop/
// Version : 3.3



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

                var menuItemElement = $(menuItem).add(menuItemFlyOut);
                var menuDropDownElement = $(menuDropDown).add(menuItemFlyOutDropDown);

                // fix to be able to remove the #_ at the end of each link URL (found in the forum for the megaMenu)
                // this should fix the jump to top of page when search icon is clicked on the menu in mobile view
                $(menuItemLink).click(function(event) {
                    event.preventDefault();
                    window.location.hash = this.hash;
                });

                if (("ontouchstart" in document.documentElement) && (settings.menu_responsive === 1)) {

                    if ($(window).width() < 960) {
                    	console.log("load mobile nav");
                        $(menuDropDown).css({'top':'auto'}).hide();
                        $(menuItemFlyOutDropDown).css({'left':'0', 'top':'0'}).hide();
                        $(menuItem).hide(0);
                        $(menuButton).show(0);

                    } else {
                        megaMenuDropDownPosition();
                    }

                    $(menuButton).children('a').hammer().on('tap', function (event) {
                        $(menuItem).not(":eq(0)").toggle(0);
                        // hide site search when menu icon is clicked
                        $('.m-site-search-block').removeClass('show');
                        // $('.m-site-search-link').removeClass('dark-gray-bg');
                     
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

                    // mobile menu icon show hide menu
                    $(menuButton).children('a').click(function () {

                        $(menuButton).toggleClass('megamenu_button_active');
                        $(menuItem).not(":eq(0)").toggle(0);
                        // hide site search when menu icon is clicked
                        $('.m-site-search-block').removeClass('show');
                        // $('.m-site-search-link').removeClass('dark-gray-bg');
                        
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

                       
                        case 'open_close_slide':
                        var menuEffectShow = 'slideDown',
                            menuEffectHide = 'fadeOut';
                            break;
                       

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

        // we use 945 instead of 960 as a value to compare to allow for 15px sidebar
        if ((_innerW < 945) && (settings.menu_responsive === 1)) {
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


    // --------------------------------------------------
    // Window resize function with delay to improve performance

    var resizeTimer; // Set resizeTimer to empty so it resets on page load

    function resizeFunction() {
		$('.megamenu li+li').hide(); // hide the menu on window resize
        megaMenuDropDownPosition(); // calculate the position of the megamenu
    }

    // On resize, run the function and reset the timeout
    // 250 is the delay in milliseconds. Change as you see fit.
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFunction, 250);
    });

    resizeFunction();


})(jQuery);



// *-----------------------------------------*\
//     * University of the Arts London
//     * Script.js
//     * Authors: Howard Panton, Matt Wisbey,
//     Pete Richardson, Alastair Mucklow
//     Updated Tuesday 08 October 2013 14:49pm
// \*-----------------------------------------*/

// enable caching for GetScript calls
jQuery.ajaxSetup({
  cache: true
});


jQuery.fn.extend({
  scrollToMe: function () {
  var x = jQuery(this).offset().top - 100;
  jQuery('html,body').animate({scrollTop: x}, 500);
}});

// --------------------------------------------------


// add indexOf for IE8 compatibility
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}



jQuery(".date").each(function (i, element) {
  str = jQuery( this ).text();
  if (str.indexOf(",") != -1) {
    jQuery(this).text(str.substring(5,16));
  }
});

// toggle site search on mobile & tablet menu 
$('.m-site-search-link').click(function(e) {
	// $(this).toggleClass('dark-gray-bg');
	$('.m-site-search-block').toggleClass('show');
	
	// make sure that the main menu dropdowns also closed if site search is clicked
	$('.megamenu li+li').hide();
	

});

// position prev and next navigation buttons for OwlCarousel
// function positionOwlCarouselNav() {
//   // getMax height of images in carousel  // currently this will only work on one instance of owlCarousel
//   var maxImgHeight = Math.max.apply(null, jQuery(".owl-carousel img.lazyOwl").map(function() {
//       return $(this).height();
//   }));
//   // calculate slider controls position from top of slider container
//   var distFromTop = ( ((maxImgHeight / 2) - 16) + 12);  // 16px is half height of navcontrol buttons , 12px is top margin
//   // set position of slider nav buttons from top 
//   jQuery(".owl-prev, .owl-next").css("top", distFromTop);
// }


  var Link_col = jQuery(".college-nav").find("li").slice(3, 6);
  var Link_study_1 = jQuery(".study-nav").find("li").slice(6, 11);
  var Link_study_2 = jQuery(".study-nav").find("li").slice(11, 16);
  var Link_study_3 = jQuery(".study-nav").find("li").slice(16, 19);
  var Link_student = jQuery(".student-nav").find("li").slice(3, 4);
  var Link_alumni = jQuery(".alumni-nav").find("li").slice(4, 6);
  var Link_about = jQuery(".about-nav").find("li").slice(6, 11);
  var Link_about_1 = jQuery(".about-nav").find("li").slice(11, 16);
  var Link_about_2 = jQuery(".about-nav").find("li").slice(16, 19);
  var Link_industry = jQuery('.industry-nav').find("li").slice(4,7);


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
  //console.log(Link_study_3);

  jQuery( ".college-nav" ).append("<ul class=\"subnav-2 region\">");
  jQuery('.college-nav .subnav-2').prepend(Link_col);

  jQuery( ".study-nav" ).append("<ul class=\"subnav-2 pad-top-6x region\">");
  jQuery('.study-nav .subnav-2').prepend(Link_study_1);
  jQuery( ".study-nav" ).append("<ul class=\"subnav-3 pad-top-6x region\">");
  jQuery('.study-nav .subnav-3').prepend(Link_study_2);
  jQuery( ".study-nav" ).append("<ul class=\"subnav-4 pad-top-6x region\">");
  jQuery('.study-nav .subnav-4').prepend(Link_study_3);


  jQuery( ".student-nav" ).append("<ul class=\"subnav-2 region pad-top-6x region\">");
  jQuery('.student-nav .subnav-2').prepend(Link_student);

  jQuery( ".alumni-nav" ).append("<ul class=\"subnav-2 region pad-top-6x region\">");
  jQuery('.alumni-nav .subnav-2').prepend(Link_alumni);
  

  jQuery( ".about-nav" ).append("<ul class=\"subnav-2 pad-top-6x region\">");
  jQuery('.about-nav .subnav-2').prepend(Link_about);

  jQuery( ".about-nav" ).append("<ul class=\"subnav-3 pad-top-6x region\">");
  jQuery('.about-nav .subnav-3').prepend(Link_about_1);

    jQuery( ".about-nav" ).append("<ul class=\"subnav-4 pad-top-6x region\">");
  jQuery('.about-nav .subnav-4').prepend(Link_about_2);

  jQuery( ".industry-nav" ).append("<ul class=\"subnav-2 no-pad-top region\">");
  jQuery('.industry-nav .subnav-2').prepend(Link_industry);

function checkWindowSize() {
  var width = jQuery(window).width(),
  new_class = width > 959 ? 'gDesktop' :
              width > 599 ? 'gTablet' :
              width < 600 ? 'gMobile' :
              width > 1289 ? 'gDesktop' : '';

  jQuery(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_class);
}

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

// enables UAL themed select boxes
function enableSelectBoxes() {
  
  jQuery('.js-select-box').each(function() {
    var _start_val = jQuery(this).children('ul.js-select-box-list').children('li.select-box-option:first').children('a').html();
    jQuery(this).children('div').children('h3.selected').html(_start_val);
    jQuery('input.js-select-box-value').attr('value',jQuery(this).children('ul.js-select-box-list').children('li.select-box-option:first').attr('data-sb-value'));

    jQuery(this).children('div').children('h3.selected,div.select-box-arrow').click(function(event) {
      event.preventDefault();
      if(jQuery(this).parent().parent().children('ul.js-select-box-list').css('display') == 'none'){
        jQuery(this).parent().parent().children('ul.js-select-box-list').css('display', 'block');
      }
      else
      {
        jQuery(this).parent().parent().children('ul.js-select-box-list').css('display', 'none');
      }
    });

    jQuery(this).find('li.select-box-option').click(function(event){
      event.preventDefault();
      jQuery(this).parent().css('display','none');
      jQuery('input.js-select-box-value').attr('value',jQuery(this).attr('data-sb-value'));
      var _test = 'the select option is :' + jQuery(this).attr('data-sb-value');
      jQuery(this).parent().parent().children('div').children('h3.selected').html(jQuery(this).children('a'));
      jQuery(this).parent().parent().scrollToMe();
    });
  });
}


/////////////////////
// ON DOCUMENT READY 
/////////////////////
jQuery(document).ready(function(){

  checkWindowSize();

  // detect and handle breadcrumbs
  jQuery('.breadcrumbs').find('a').last().hide();

  // to remove all breadcrumb items after the fifth on short course pages
  jQuery('.browse-sc').find('.breadcrumbs').find('a:gt(4)').remove();


  // Accessible skip-to-content link:  
  // Enable a link to the page title if one exists.
  // If not, then enable a link to the first content-wrapper div to skip the main navigation on screen readerss

  if ( jQuery('.page-title').length > 0) {
    jQuery('.page-title').first().attr('id', 'skip-to-here');
  }
  else {
    jQuery('.content-wrapper').first().attr('id', 'skip-to-here');
  }
   
//////////////////////
// MOBILE SIDEBAR SCRIPT (populate mobile and tablet menu)
/////////////////////


  var _sb_lth = jQuery('.sidebar').length;
  var _has_heading = jQuery('.sidebar').find('.menu-heading').length;
  //&& _has_heading > 0
  if ((_sb_lth > 0) ) {
    var _no_of_li_items = jQuery(".sidebar li").size();

    // If there's more than one item in the left sidebar, then build the mobile sidebar
    if (_no_of_li_items > 1) {
      var _menuHtml = jQuery('.sidebar').html();
      var _sideBarTitle = jQuery('.sidebar li').first();
      var _mobMenuButton = "<div class='mob-sb-dd-title'>" + _sideBarTitle.text() + "</div>" + '<a href="#" class="show-mob-sidebar"></a>';
      var _mobMenuContent;


      if (_has_heading > 0) {
        _mobMenuContent = _mobMenuButton + _menuHtml;
      }
      else {
        _mobMenuContent = _menuHtml;
      }

      // create mobile sidebar div and add it to the main content div
      jQuery('<div id="mobile-sidebar" class="mobile-sidebar d-hide"></div>').prependTo('.content');

      // populate the mobile menu with the same content as the desktop sidebar nav & add menu button
      jQuery('#mobile-sidebar').html(_mobMenuContent);

      jQuery('.show-mob-sidebar').click(function(e) {
        e.preventDefault();
        _clicked = jQuery(this);
        
        if (_clicked.hasClass('active')) {
          _clicked.closest(jQuery('#mobile-sidebar')).find(jQuery('ul')).slideUp();
          _clicked.removeClass('active');
        }
        else {
        _clicked.closest(jQuery('#mobile-sidebar')).find(jQuery('ul')).slideDown();
        // update the menu button and set class to active
        _clicked.addClass('active');
        }
      });

      // check if first item is "In This Section" which shouldn't be added as a link to the mob sidebar
      if (_sideBarTitle.text().toLowerCase() == 'in this section') {
      
        // hide "In This Section" in the sidebar dropdown
        jQuery('#mobile-sidebar li').first().remove();
      }
      // if not, it must be a college - so replace text with "college homepage"
      else {
        jQuery('#mobile-sidebar li a').first().text('College Homepage');
      }
    }
  } // end


// LazyLoading with ReSRC.it images
  if (jQuery('.resrc').length > 0) {
    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.review.min.js', function() {
      jQuery('.resrc').review({
          callback: function() {
            resrc.resrc(this);
        }
      });
    });
  }

  // check for selectboxes on the page
  if (jQuery('.select-box').length > 0) {
    // enable custom styled selectboxes
    enableSelectBoxes();
  
  }

  // check for regular blockquotes on the page - 
  // we insert a span at the beginning of the element to show a background image sprite 
  if (jQuery('blockquote').length > 0 ) {
    
    jQuery('blockquote').each(function() {
        jQuery(this).prepend('<span></span>');
    });


  
  }

  // check for large blockquotes on the page - 
  // - insert a span at the beginning to show large blockquote img (sprite)
  if (jQuery('.pull-quote').length > 0) {

    jQuery('.pull-quote').each(function() {
      jQuery(this).prepend('<span></span>');
    });


  }


  // focus highlighting for course search and site search input box
  if (jQuery('.search-input-wrap').length > 0) {

      jQuery('#finder-search-input').focus(function () {
        jQuery('#finder-search-input').parent().parent().addClass('search-gray-border');
      });
   
  }

 
  // NICE IMAGE LOADING
  
  /* 
  * Not part of MixItUp, but this is a great lightweight way 
  *   to gracefully fade-in images with CSS3 after they have loaded
  */
  
  function imgLoaded(img){
    jQuery(img).parent().addClass('loaded');
  }

if (jQuery('#container').length > 0) {
  jQuery.when(
      jQuery.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js' ),
      jQuery.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js' ),
      jQuery.Deferred(function( deferred ){
          jQuery( deferred.resolve );
      })
  ).done(function(){
    // initialise skrollr to handle movement of the circles
      jQuery(function() {

      var container = jQuery("#container"),
          pagination = jQuery("#pagination");

  function setPagination () {
        pagination.jPages({
            containerID : "container",
            perPage : 24,
            midRange : 1,
            previous : "←",
            next : "→",
            direction : "auto",
            animation : "fadeInUp"
 
        });
    }

    function destroyPagination () {
        pagination.jPages("destroy");
    }

    setPagination();

    jQuery.filtrify("container", "placeHolder", {
        block : "data-original",
        callback : function() {
            destroyPagination();
            setPagination();
        }
    });
  });
  });

  if(!jQuery("body").hasClass("gDesktop")) {
    jQuery("#placeHolder").prependTo(".content");
  }

}

  // fade in button when user scrolls down the page
  jQuery(window).scroll(function() {
    if(jQuery("body").hasClass("gDesktop")) {
    if (jQuery(this).scrollTop() > 450) {
      jQuery('.back-to-top').fadeIn(200);
    } else {
      jQuery('.back-to-top').fadeOut(200);
      }
    }
  });


  // scroll to the top of the page when the button is clicked
  jQuery('.back-to-top').click(function(e){
    e.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, 300);
  });
  
  // detect slider component
  
  if (jQuery('.js-carousel').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.bxslider.min.js', function() {

      jQuery.each(jQuery('.js-carousel'), function() {

        var _this = jQuery(this);
        var _wrapper = _this.closest('.bx-wrapper'); // the .bx-wrapper container div

        // get the individual slide width from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the width to 0 - i.e. max-width
        var _itemWidth = (_this.data('carousel-item-width') > 0) ? _this.data('carousel-item-width') : 0;
        // set the minimum number of slides before it starts to be responsive
        var _itemMinSlides = (_this.data('carousel-min-slides') > 0) ? _this.data('carousel-min-slides') : 0;
        // get the margin between slides from the data-slider-item-margin value in the HTML. If there's nothing set in the data-attribute, set the margin to 0
        var _itemMargin = (_this.data('carousel-item-margin') > 0) ? _this.data('carousel-item-margin') : 0;
        // slider instances always show next/prev controls, unless data-controls is false          
        var _controlsOpt = true;
        _controlsOpt = _this.data('controls');
        // slider instances do not show a pager, unless data-pager is true          
        var _pagerOpt = (_this.data('pager')) ? _this.data('pager') : false;
        
        _this.bxSlider({
          slideWidth: _itemWidth,
          minSlides: _itemMinSlides,
          maxSlides: 10,
          slideMargin: _itemMargin,
          moveSlides: 1,
          controls: _controlsOpt,
          captions: true,
          pager: _pagerOpt,
          onSliderLoad: function(currentIndex) {
            if (_this.data('counter')) {
              jQuery(_this).closest('.bx-wrapper').find('.bx-controls').prepend('<div class="bx-counter"><span class="bx-index">' + (currentIndex+1) + '</span>/<span class="bx-total">' + _this.getSlideCount() + '</span></div>');
            }
          },
          onSlideAfter: function(jQueryslideElement, oldIndex, newIndex) {
            if (_this.data('counter')) {
              jQuery(_this).closest('.bx-wrapper').find('.bx-index').text(newIndex+1);
            }
          }
        });
      });
    });

  }
  
  // detect slider component
  if (jQuery('.royalSlider').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.royalslider.min.js', function() {

      jQuery.each(jQuery('.royalSlider'), function() {

        var _this = jQuery(this);

        // get the individual slide width and height from the data-slider-item-width value in the HTML. If there's nothing set in the data-attribute, set the dimensions to sensible defaults
        var _itemWidth = (_this.data('slider-item-width') > 0) ? _this.data('slider-item-width') : 930;
        var _itemHeight = (_this.data('slider-item-height') > 0) ? _this.data('slider-item-height') : 465;
        var _itemAutoPlay = (_this.data('slider-auto-play') === true) ? _this.data('slider-auto-play') : false;

        _this.royalSlider({
          arrowsNav: true,
          fadeinLoadedSlide: false,
          arrowsNavAutoHide: false,
          controlNavigation: 'none',
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
  }


 


// Owl slider (research profiles)
if (jQuery('.owl-carousel').length > 0) {
   // test comment for invalidation 22
  jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/owl.carousel.js" , function() {
     jQuery('.owl-carousel').each(function() {
        jQuery(this).owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 3,	
        itemsDesktop : [1280, 3], // items between 1000px and 901px
        itemsTablet: [959, 2], // items between 
        itemsMobile : [599, 1], // itemsMobile disabled - inherit from items
        lazyLoad : true,
        pagination: false,
        navigation : true,
        navigationText : ["<i class='icon-left-open-big'></i>", "<i class='icon-right-open-big'></i>"],
        afterAction : function(elem){
          positionOwlCarouselNav();
        },

        afterUpdate: function(elem){
          positionOwlCarouselNav();
        },
      });

    });

    // get number of items in each owl-carousel and output pagination to each item in the carousel
    jQuery(".owl-carousel").each(function() {
        var total_items = jQuery('.item', this).length;
        // console.log("the number of items is: " + total_items);
        jQuery(".item-description", this).append(function(i) {
             return $("<span />", {text: i+1 + ' of ' + total_items });
         });
    });

  });
}

  ///////////////////////
  /////// accreditation
  ///////////////////////

  // Show image credits button fixed to the right of the screen on Desktop only
  
if (jQuery('.credits').length > 0) {


      //only show credits on desktop 
      if (jQuery('body').hasClass('gDesktop')) {
        jQuery('.credits-btn').addClass("show");
        
        jQuery('.show-credits').click(function(event) {
          event.preventDefault();
        
          var c = jQuery(this);
          if (c.hasClass('active') ) {
            c.removeClass('active').attr('title','Show image credits');
            jQuery('.credits').fadeOut();
          } else {
            c.addClass('active').attr('title','Hide image credits');
            jQuery('.credits').fadeIn();
          }
        });
      }
  
  }

function resetSpinners() {
      // check if there are any other open accordion items, and close them if so
      jQuery( ".accordion-list-item" ).each(function (e) {
        var _li_item = jQuery(this);
        if ( _li_item.hasClass('st-open') ) {
            _li_item.find('.st-arrow').rotate({animateTo:0, center: ["50%", "50%"] });
        }
      });
    }

// detect accordion component
if (jQuery('.accordion').length > 0) {

    jQuery.when(
        jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.accordion-ck.js" ),
        jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.easing.1.3-ck.js" ),
        jQuery.getScript( "http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery-rotate-ck.js" ),
        jQuery.Deferred(function( deferred ){
            jQuery( deferred.resolve );
        })
    ).done(function(){

        //place your code here, the scripts are all loaded
        jQuery('#st-accordion').accordion({
            oneOpenedItem: true
        });

    });

    jQuery(".accordion-list-anchor").on("click", ".size-h4", function(event){
        event.preventDefault();
        var circle = (jQuery(this).next('.st-arrow'));
        var accordion = (jQuery(this).parent().parent());
        var elem = (jQuery(this).parent().next('.st-content'));
              resetSpinners();
              // jQuery(this).scrollToMe(); // scroll to the clicked elem
              if (!elem.is(':visible'))  {
                circle.rotate({animateTo:135});
               } else {
                circle.rotate({animateTo:0, center: ["50%", "50%"], });
              }
    });

    jQuery(".st-arrow").on("click", function(e){
      e.preventDefault();
      resetSpinners();
      var _icon = jQuery(this);
      var _st = jQuery(this).parent().parent();

      if (!_st.hasClass('st-open'))  {
        _icon.rotate({animateTo:135});
      } else {
        _icon.rotate({animateTo:0, center: ["50%", "50%"], });
      }

    });
}



// detect dropdown menu button used in forms or in page for drop menus
if (jQuery('.dd-menu').length > 0) {

    jQuery(".js-dd-menu").click(function (event){
       event.preventDefault();
       var _d = jQuery(this);
       var _d_menu = _d.parent();
       
       if (_d_menu.hasClass('active')) {
          _d_menu.find('.js-dd-menu-icon');
          _d_menu.find('.js-dd-menu-list').slideUp('fast', function() {
            _d_menu.removeClass('active');
         });
       }
       else {
          _d_menu.find('.js-dd-menu-icon');
          _d_menu.find('.js-dd-menu-list').slideDown('fast', function() {
            _d_menu.addClass('active');
         });
       }
    });
}

// detect search filters on page
if (jQuery('.search-filters').length > 0) {
   //allow expand and close for search filters
  jQuery('.filter-heading').click(function(event) {
    event.preventDefault();
    var c = jQuery(this);
    
    //process click event if the heading is not set to not-active
    if (!c.hasClass('not-active')){

      if (c.parent().hasClass('active') ) {
        c.parent().removeClass('active');
      }
      else {
        c.parent().addClass('active');
      }
    }
  });
}

// Showtime JSON loader
if (jQuery('.showtime-json').length){

  // with a lightbox use-case, Magnific is a dependency. The .lightbox call further down shouldn't fire, since the Showtime lightbox only functions inside the getJSON.
  jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox.js', function() {

    var outputNode = jQuery('.showtime-json');

    jQuery.each(outputNode, function(i) {
      
      var _node = '';  
      _node = jQuery(this);

      var feedUrl = _node.data('url');
      // set a feed limit (this only works for Profiles, for Student we have to set the limit via a counter)
      var limit = _node.data('limit');


      jQuery.getJSON( feedUrl + '&limit=' + limit + '&callback=?', function(data) {
           
         var string = '';
         var media = '';
         var studentName = '';
         var profileUrl = '';
         var counter = 0;
                 
         if (data.data.Student) { // this is a single Showtime profile
           profileUrl = data.data.Student.Student.profileurl;
           studentName = data.data.Student.Student.firstName + ' ' + data.data.Student.Student.lastName;
           media = data.data.Student.Media;
         }
         
         if (data.data.Profiles) { // this is a group of objects in Showtime
           media = data.data.Profiles;
         }
        
        jQuery.each(media, function(i, item) {

          if (counter < limit) {
              profileImg = item.thumb.split('gallery');
              item.profileImg = profileImg[0] + 'profile.jpg';
              item.zoomImg = profileImg[0] + 'screen.jpg';

            if (item.profileName) { //group
              profileUrl = 'http://showtime.arts.ac.uk/' + item.profileName;
              studentName = item.fullName;
            }
           
           string = '<li><a class="zoom no-border" href= "' + item.zoomImg + '" title="' + studentName + '" data-profile-url="' + profileUrl + '" style="background-image: url('+item.profileImg+')"></a></li>';

            
           _node.append(string);

           counter++;

          } else {
           return false;
          }

        }); // end each loop
         
        jQuery('.zoom').magnificPopup({
          type: 'image',
          image: {
            titleSrc: function(item) {
              return item.el.attr('title') + ' - <a class="no-border" href="' + item.el.data('profile-url') + '">View profile</a>';
            }
          },
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          }
        });

      }); // end getJSON loop

    }); // end each loop

  }); // end getScript loop
  
}


// detect lightbox component
if (jQuery('.js-lightbox').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/magnific-lightbox-ck.js', function() {

        // initialise the magnific lightbox
        jQuery('.js-lightbox').each(function() {
          jQuery(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
              tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
          });
        });

    });
}



// show/hide the relevant buttons for browsers that have JS enabled
jQuery(".expanded-content").hide();
jQuery(".show-more").show();

// handle "Show More" button click
jQuery(".show-more").click(function(e){
  e.preventDefault();
  var _clicked = jQuery(this);
  _clicked.closest(".expandable-content").find(".expanded-content").slideDown();
  _clicked.hide();
});

// handle "Show Less" button click
jQuery(".hide-content").click(function(e){
  e.preventDefault();
  var _clicked = jQuery(this);

  var parent = _clicked.closest(".expandable-content");
  jQuery(".expanded-content",parent).hide();
  jQuery(parent).find(".show-more").show();
  parent.scrollToMe(); // make sure the that page scrolls back after hiding the expanded content
});


  //---------------------------------------
  //  Audio Player - based on code from http://bit.ly/12I3B79
  //---------------------------------------


  if (jQuery('audio').length > 0) {

    jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/audioplayer.js', function() {

        jQuery('audio').each(function() {
          jQuery(this).audioPlayer();
        });

    });


  }

  //---------------------------------------
  //  Google Maps  
  //---------------------------------------

  if (jQuery('#map_canvas').length > 0) {


    // if accomodation map
    if (jQuery('.accomodation-map').length > 0) {

        jQuery.getScript('http://artslondon.github.io/beta/assets/js/maps/accomodation.js', function() {

          window.onload = loadMap();

        });
    }

  }

  //---------------------------------------
  //  Tabs on desktop, accordion on mobile
  //---------------------------------------

  if (jQuery('.tabs-container').length > 0) {

      jQuery(".tab_content").hide();
      jQuery(".tab_content:first").show();
      // update icon for first tab item (it's opened on start by default)
      jQuery(".tab_drawer_heading:first").children('span').removeClass('icon-plus').addClass('icon-right-open-mini');
      /* if in tab mode */
      jQuery("ul.tabs li").click(function() {

        jQuery(".tab_content").hide();
        var activeTab = jQuery(this).attr("rel");
        jQuery("#"+activeTab).show();

        jQuery("ul.tabs li").removeClass("active");
        jQuery(this).addClass("active");

        jQuery(".tab_drawer_heading").removeClass("d_active");
        jQuery(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");

      });

      /* if in drawer mode */
      jQuery(".tab_drawer_heading").click(function() {

        // close any open tabs on click and reset to a down icon
        jQuery(".tab_content").hide();

        var d_activeTab = jQuery(this).attr("rel");
        jQuery("#"+d_activeTab).show();

        jQuery(".tab_drawer_heading").removeClass('d_active').children('span').removeClass('icon-right-open-mini').addClass('icon-plus');
          jQuery(this).addClass("d_active").children('span').removeClass('icon-plus').addClass('icon-right-open-mini');

        jQuery("ul.tabs li").removeClass("active");
        jQuery("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
        jQuery(this).scrollToMe();
      });
    }

// End tabs to accordion 

if (jQuery('.__media').length > 0) {
  jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/jquery.fitvids.min.js', function() {
    jQuery('.__media').fitVids();
  });
}


if (jQuery('video').length > 0) {

  jQuery.getScript('http://d27lwoqz7s24cy.cloudfront.net/assets/js/media-element.min.js', function() {

    jQuery('video').mediaelementplayer({
      //pluginPath: 'http://artslondon.github.io/beta/assets/js/libs/'
      pluginPath: 'http://beta.arts.ac.uk/media/beta/beta-assets/plugins/'
    });


  });

}


// KIS WIDGET
if (jQuery('.kis-widget').length > 0) {
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

// add class to remove standard list bullets for PDF download lists
$('aside li a[href$=".pdf"], .l-content li a[href$=".pdf"]').parent().addClass('no-bullet');

// add class to remove standard list bullets for DOC download lists
$('aside li a[href$=".doc"], .l-content li a[href$=".doc"]').parent().addClass('no-bullet');

  // Creating custom :external selector
  jQuery.expr[':'].external = function(obj){
      return (obj.hostname != location.hostname);
  };

  // Add 'external' CSS class to all external links
  jQuery('.l-content a:external.button-link, aside a:external').addClass('external').each(function() {
    jQuery(this).attr("title", jQuery(this).attr("title") + " - external link");
});




jQuery('#debug').hide();
jQuery('.debug-toggle').click(function(e) {
  jQuery('#debug').toggle();
  e.preventDefault();
});


jQuery('.lcf').find('h2').wrapInner('<span />');

//jQuery('.lcf').find('.__media').find('h2').wrapInner('<span />');



}); // end document ready



/* 
jQuery.fitHeights by Paravel™

Author: Dave Rupert
Author URL: http://daverupert.com/
Based on: https://github.com/filamentgroup/jQuery-Equal-Heights 

//  example initialise code
//
//   jQuery(window).load(function(){
//      // jQuery(groupOfItems).fitHeights(); 
//      jQuery('ul li').fitHeights();
//    });
*/
(function(){
  
  jQuery.fn.fitHeights = function() {
    
    var items = jQuery(this);
    function setHeights() {
      
      var currentTallest = 0;
  
      items.css({ 'min-height' : currentTallest });  // unset min-height to get actual new height

      // right now this causes a noticeable shift in height on resize. workarounds?
      
      items.each(function(){
        
        if( jQuery(this).height() > currentTallest ) { currentTallest = jQuery(this).height(); }
      });
      items.css({ 'min-height' : currentTallest });
    }
    
    setHeights();
    jQuery(window).on('resize', setHeights);
    return this;
  };
})(jQuery);

// initialise
jQuery(window).load(function(){
  
  if (jQuery('.related-content').length > 0) {
    jQuery('.related-content ul li').fitHeights();
  }

  if (jQuery('.highlight-box-3').length > 0) {
    jQuery('.highlight-box-3 ul li').fitHeights();
  }
  
  if (jQuery('body').is('.chelsea, .camberwell, .wimbledon')) {
    jQuery('.two-up ul li').fitHeights();
    jQuery('.three-up ul li').fitHeights();
  }
  
  if (jQuery('body').is('.ual')) {
    jQuery('.cta .two-up-full ul li').fitHeights();
    jQuery('.st-cp .two-up-full ul li').fitHeights();
    jQuery('.news .four-up-full ul li').fitHeights();
    jQuery('.fe .four-up-full ul li').fitHeights();
  }

  if (jQuery('.__gallery').length > 0) {
    jQuery('.__gallery').each( function() {
      jQuery(this).find('li').fitHeights();
    });
  }

  if (jQuery('.owl-carousel').length > 0) {
  	positionOwlCarouselNav(); 
  }

});


// Check to see whether Aside has content if not remove
if ($('aside.kiswidget').length > 0) {
	var k = $('aside.kiswidget');

	if ($(k).html().trim()) {
	} else {
		k.remove();
	}
}

// // Fix iOS re-orient problem when changing from portrait to landscape mode
// // The script below will make sure that the screen width is updated correctly 
// window.document.addEventListener('orientationchange', function() {
//   var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
//   var viewportmeta = document.querySelector('meta[name="viewport"]');
//   if (iOS && viewportmeta) {
//     if (viewportmeta.content.match(/width=device-width/)) {
//       viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=1');
//     }
//     viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=' + window.innerWidth);
//   }
//   // If you want to hide the address bar on orientation change, uncomment the next line
//   window.scrollTo(0, 0);
// }, false);
