/*
    -------------------------------------------------------------
        dev debug tools show hide
    -------------------------------------------------------------
*/

// function debugSwitch() {

//     $('#debug').hide();

//     $('.debug-toggle').click(function(e) {
//       $('#debug').toggle();
//       e.preventDefault();
//     });

// }

/* debug panel
---------------------------------------------------------------------------------------- //// */
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
