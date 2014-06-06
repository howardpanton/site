(function( $ ){

	$(document).ready(function($){

				var isTab = $("html").hasClass("tablet");
				var isDesk = $("html").hasClass("desktop");

				// *------------------------------------------*\
				//     Styles applied to all screen widths
				// \*-----------------------------------------*/

				// jquery filter(:even) is zero based, so this will select odd rows of the table
				$( "table tr").filter(":even").css({"background-color": "#e9e9e9" });
				$( ".accordion-list .st-content table tr").filter(":odd").css({"background-color": "white" });

				// filtrify styles .csm ul.ft-menu > li.ft-field
				$( ".csm ul.ft-menu > li.ft-field").eq(0).css( { "margin-bottom": "24px" });
				// Store CSS classes in Array for matching later
				var Class;

					Class =
										[ ".two-up",
											".two-up-full",
											".two-up.l-content",
											".two-up.l-content-full-width",
											".two-up#container",
											".two-up.l-content-half-width ",
											".three-up.l-content-full-width",
											".three-up#container",
											".four-up-full",
											".four-up.l-content-full-width",
											".four-up",
											".four-up#container",
											".four-up.l-content-full-width",
											".four-up#container",
											".lists",
											".link-list",
											".__gallery.three-up",
											".__gallery.four-up",
											".__feature-wall",
											".article-listing-main-article-left",
											".highlight-block-2-up",
											".highlight-block-3-up",
											".highlight-homepage-block-2-up",
											".image-block-2-up",
											".image-block-2-up .within-content",
											".article-listing-main-article-left",
											".footer-block .icons",
											".two-column-text"
										];
		// Store CSS properties in JSON objects for quicker access
		var styles =
		{
					"global": {
						"display": "block",
						"float": "left",
						"margin-right": "-100%"
					},
					"style_1": {
						"margin-left": "52.71783%",
						"width": "47.28217%"
					},
					"clear" : {
						"clear": "left"
					},
					"margin" : {
						"margin-right": 0
					},
					"style_2": {
						"margin-left": "51.41355%",
						"width": "48.53437%"
					},
					"style_3": {
						"margin-left": "52.57549%",
						"width": "47.42451%"
					},
					"style_4": {
						"margin-left": "51.68801%",
						"width": "48.31199%"
					},
					"style_5": {
						"margin-left": "34.45868%",
						"width": "31.08265%"
					},
					"style_6": {
						"margin-left": "68.91735%",
						"width": "31.08265%"
					},
					"style_7": {
						"margin-left": "25.89636%",
						"width": "23.01718%"
					},
					"style_8": {
						"margin-left": "51.41355%",
						"width": "23.01718%"
					},
					"style_9": {
						"margin-left": "76.93073%",
						"width": "23.01718%"
					},
					"style_10": {
						"float": "left",
						"width": "50%"
					},
					"style_11": {
						"width": "48.55966%",
						"clear": "none",
						"float": "left",
						"margin-left": "0",
						"margin-right": "0"
					},
					"style_12": {
						"width": "47.28217%",
						"clear": "left",
						"float": "left",
						"margin-left": "0",
						"margin-right": "-100%"
					}
		};

		// Run check for Desktop instances
		if (isTab) {
			for ( var i = 0; i < Class.length; i++) {
							if ($(Class[i]).length > 0) {
							// Each statement
							$(Class[i]).each(function() {
								switch (Class[i]) {
									case ".two-up":
										var Css = $.extend({}, styles.global, styles.style_1);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
										});
										break;
									case ".four-up":
										Css = $.extend({}, styles.global, styles.style_1);
										var Css_2 = $.extend({}, styles.global, styles.style_12);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
													$(this).children('li').eq(2).css(Css);
													$(this).children('li').eq(3).css(Css);
													$(this).children('li').filter(":odd").css(styles.margin);
										});
										break;
									case ".lists":
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(styles.margin);
													$(this).children('li').eq(3).css(styles.margin);
													$(this).children('li').eq(5).css(styles.margin);
										});
										break;
									case ".article-listing-main-article-left":
									case ".highlight-block-2-up":
									case ".highlight-homepage-block-2-up":
									case ".image-block-2-up":
										$(Class[i] + " ul").each(function() {
													$(this).eq(1).css(styles.margin);
										});
										break;
										default:
										console.log("Nothing here");
										break;
									}

					});
				}
			}
		}


		// Run check for Desktop instances
		if (isDesk) {
			for (var i = 0; i < Class.length; i++) {
							if ($(Class[i]).length > 0) {
							// Each statement
							$(Class[i]).each(function() {
								switch (Class[i]) {
									case ".two-up-full":
										var Css = $.extend({}, styles.global, styles.style_2);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
										});
										break;
									case ".two-up.l-content":
										Css = $.extend({}, styles.global, styles.style_3);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
										});
										break;
									case ".two-up.l-content-full-width":
									case ".two-up#container":
									case ".two-up.l-content-half-width":
										Css = $.extend({}, styles.global, styles.style_4);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
										});
										break;
									case ".three-up.l-content-full-width":
									case ".three-up#container":
										Css = $.extend({}, styles.global, styles.style_5);
										var Css_2 = $.extend({}, styles.global, styles.style_6);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
													$(this).children('li').eq(2).css(Css_2);
										});
										break;
									case ".four-up-full":
									case ".four-up.l-content-full-width":
									case ".four-up#container":
										Css =  $.extend({}, styles.global, styles.style_7);
										Css_2 =  $.extend({}, styles.global, styles.style_8);
										var Css_3 =  $.extend({}, styles.global, styles.style_9);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
													$(this).children('li').eq(2).css(Css_2);
													$(this).children('li').eq(3).css(Css_3);
										});
										break;
									case ".link-list":
										Css =  $.extend({}, styles.clear);
										Css_2 =  $.extend({}, styles.margin);
										$(Class[i] + " ul").each(function() {
													$(this).children('li:nth-child(3n)').css(Css);
													$(this).children('li').eq(1).css(Css_2);
													$(this).children('li').eq(3).css(Css_2);
													$(this).children('li').eq(5).css(Css_2);
										});
										break;
									case ".__gallery.three-up":
										Css =  $.extend({}, styles.margin);
										$(Class[i] + " ul").each(function() {
													$(this).children('li:nth-child(3n)').css(Css);
										});
										break;
									case ".__gallery.four-up":
										Css =  $.extend({}, styles.margin)
										$(Class[i] + " ul").each(function() {
													$(this).children('li:nth-child(4n)').css(Css);
										});
										break;
									case ".highlight-block-2-up":
									case ".highlight-box-2":
									case ".image-block-2-up":
									case ".image-block-2-up .within-content":
									case ".article-listing-main-article-left":
										Css =  $.extend({}, styles.margin);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
										});
										break;
									case ".highlight-block-3-up":
									case ".highlight-box-3":
									case ".footer-block .icons":
										Css =  $.extend({}, styles.margin);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(2).css(Css);
										});
										break;
									case ".highlight-box-3":
										Css =  $.extend({}, styles.margin);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(5).css(Css);
										});
										break;
									case ".highlight-homepage-block-2-up":
										Css =  $.extend({}, styles.style_11);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').eq(1).css(Css);
										});
										break;
									case ".two-column-text":
										Css =  $.extend({}, styles.margin);
										$(Class[i] + " ul").each(function() {
													$(this).children('li').filter(":odd").css(Css);
										});
										break;
									}

					});
				}
			}
		}

	}); // end documentReady

})( jQuery );
