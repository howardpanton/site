/* ///Custom HTML5 Video Script hand-coded by Grant Geard https://github.com/grantgeard /// */


(function (window, undefined) {

	"use strict";

	var document = window.document,
		utils = {
			addListener: null // addListener(elm, type, fn)
		},
		container = {
			elm: document.getElementById("videoContainer"),
			dimensions: {
				height: null,
				width: null
			}
		},
		video = {
			aspectRatio: 1.78,
			height: null,
			width: null,
			offsetX: null,
			offsetY: null
		},
		videoElm,
		resizeVideo,
		measure,
		init;

	resizeVideo = function resizeVideo() {

		console.log('resizeVideo running');

		// Set size
		videoElm.style.width = video.width + "px";
		videoElm.style.height = video.height + "px";

		// Center
		videoElm.style.marginTop = video.offsetY + "px";
		videoElm.style.marginLeft = video.offsetX + "px";
	};

	measure = function measure() {



		// Get current dimensions
		container.dimensions.height = container.elm.offsetHeight;
		container.dimensions.width = container.elm.offsetWidth;
		video.height = container.dimensions.height;
		video.width = container.dimensions.height * video.aspectRatio;

		// Ensure video takes up full width
		if (video.width < container.dimensions.width) {
			video.width = container.dimensions.width;
		}

		// Maintain aspect ratio
		if (video.height < (video.width / video.aspectRatio)) {
			video.height = video.width / video.aspectRatio;
		}

		// Get margin values to center video
		video.offsetY = video.height / 2 * -1;
		video.offsetX = video.width / 2 * -1;

		resizeVideo();
	};

	init = (function init(){

		var setUtils,
			setVideoElm;

		// Init-time branching for cross browser utilities
		setUtils = (function setUtils(){

			// DOM events (current browsers and IE<9)
			if (window.addEventListener !== undefined) {
				utils.addListener = function addListener(elm, type, fn) {
					elm.addEventListener(type, fn, false);
				};
			} else if (window.attachEvent !== undefined) {
				utils.addListener = function addListener(elm, type, fn) {
					elm.attachEvent("on" + type, fn);
				};
			} else {
				throw new Error("Unsupported browser: unable to assign DOM events.")
			}
		}());

		// Init-time branching for video source
		setVideoElm = (function setVideoElm() {

			var container,
				objElm;

			// Check for canvas support
			// Set target to HTML5 video or Flash
			//if (Modernizr.canvas) {
				console.log('supports canvas');
				videoElm = document.getElementById("backgroundVideo");
			// } else {
			// 	container = document.getElementById("backgroundVideo");
			// 	objElm = container.getElementsByTagName("OBJECT");
			// 	videoElm = objElm[0];
			// }
		}());

		// Resize the video with window
		utils.addListener(window, "resize", function(){
			measure();
		});

		measure();

	}());

}(window));
