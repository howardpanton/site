// Styling fixes for IE 8
// lack of CSS support nth-child() problem : use jquery .eq() selector instead

// Note: jquery .eq() selector starts from 0
// So .eq(1) would select the second instance of an element on the page


(function( $ ){

	$(document).ready(function($){

		var isMob = $("html").hasClass("mobile");
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

		// *------------------------------------------*\
		//     Mobile View
		// \*-----------------------------------------*/

		if (isMob) {

			// not sure we need to add this? because we are stacking galleries on mobile?
			// $(".__gallery.three-up").each(function(i) {
			// 		$(this).each('.li', function(indexInArray, valueOfElement){
		//   			if ((indexInArray % 3) === 0) { $(this).css('margin-right', '0'); }
			// 		});
			// });
			//

		} //end isMob

		// *------------------------------------------*\
		//     Tablet View
		// \*-----------------------------------------*/

		if (isTab) {
			// two-up - core styles - Tablet View
			$( ".two-up li").eq(1).css( {
										 "display": "block",
										 "float": "left",
										 "margin-left": "52.71783%",
										 "margin-right": "-100%",
											 "width": "47.28217%"
										});

			// Tablet - .four-up li(2n) {
			$(".four-up li").eq(1).css( {
										"display": "block",
										"float": "left",
										"margin-left": "52.71783%",
										"margin-right": "-100%",
										"width": "47.28217%"
										});


			// Tablet - .four-up li(3n) {
			$(".four-up li").eq(2).css( {
										"display": "block",
										"float": "left",
										"margin-left": "0%",
										"margin-right": "-100%",
										"width": "47.28217%",
										"clear": "left"
										});

			// Tablet - .four-up li(4n) {
			$(".four-up li").eq(3).css( {"display": "block",
										 "float": "left",
										 "margin-left": "52.71783%",
										 "margin-right": "-100%",
										 "width": "47.28217%",
										 "clear": "left"
										});
			$(".four-up li").filter(":odd").css( { "margin-right": "0" });


			// Lists
			$(".lists .list").eq(1).css( { "margin-right": "0" });
			$(".lists .list").eq(3).css( { "margin-right": "0" });
			$(".lists .list").eq(5).css( { "margin-right": "0" });

			// article-listing-main-article-left
			$(".article-listing-main-article-left ul").eq(1).css( { "margin-right": "0" });

			// highlight block 2up
			$(".highlight-block-2-up li").eq(1).css( { "margin-right": "0" });

			// highlight homepage block 2up
			$(".highlight-homepage-block-2-up li").eq(1).css( { "margin-right": "0" });

			//.image-block-2-up
			$(".image-block-2-up li").eq(1).css( { "margin-right": "0" });

		} //end isTabView

		// *------------------------------------------*\
		//     Desktop Styling fixes
		// \*-----------------------------------------*/

		if (isDesk) {
			// Desktop View - two-up-full
			$( ".two-up-full li").eq(1).css( {
																			"display": "block",
																			"float": "left",
																			"margin-left": "51.41355%",
																			"margin-right": "-100%",
																			"width": "48.53437%"
																			});

			// Desktop View - two-up.l-content
			$( ".two-up.l-content li").eq(1).css( {
												"display": "block",
												"float": "left",
												"margin-left": "52.57549%",
												"margin-right": "-100%",
													"width": "47.42451%"
														});

			// Desktop View - .two-up.l-content-full-width, .two-up#container
			$( ".two-up.l-content-full-width li").eq(1).css( {
													"display": "block",
													"float": "left",
													"margin-left": "51.68801%",
													"margin-right": "-100%",
														"width": "48.31199%"
															});
			$(".two-up#container li").eq(1).css( {
										"display": "block",
										"float": "left",
										"margin-left": "51.68801%",
										"margin-right": "-100%",
										"width": "48.31199%"
												});

			// Desktop View - .two-up.l-content-half-width
			$( ".two-up.l-content-half-width ul").eq(1).css( {
														"display": "block",
														"float": "left",
														"margin-left": "51.68801%",
														"margin-right": "-100%",
															"width": "48.31199%"
														});

			// Desktop - .three-up.l-content-full-width li
			$( ".three-up.l-content-full-width li").eq(1).css( {
															"display": "block",
															"float": "left",
															"margin-left": "34.45868%",
															"margin-right": "-100%",
																"width": "31.08265%"
																});
			// Desktop - .three-up#container li
			$( ".three-up#container li").eq(1).css( {
													"display": "block",
													"float": "left",
													"margin-left": "34.45868%",
													"margin-right": "-100%",
														"width": "31.08265%"
													});

			// Desktop - .three-up.l-content-full-width li
			$( ".three-up.l-content-full-width li").eq(2).css( {
													"display": "block",
													"float": "left",
													"margin-left": "68.91735%",
													"margin-right": "-100%",
														"width": "31.08265%"
													});

			// Desktop - .three-up#container li
			$( ".three-up#container li").eq(2).css( {
											"display": "block",
											"float": "left",
											"margin-left": "68.91735%",
											"margin-right": "-100%",
											"width": "31.08265%"
											});

			// Desktop - .four-up-full li(2) {
			$(".four-up-full li").eq(1).css( {
										"display": "block",
										"float": "left",
										"margin-left": "25.89636%",
										"margin-right": "-100%",
										"width": "23.01718%"
										});

			// Desktop - .four-up-full li(3)
			$(".four-up-full li").eq(2).css( {
										"display": "block",
											"float": "left",
											"margin-left": "51.41355%",
											"margin-right": "-100%",
											"width": "23.01718%"
										});

			// Desktop - .four-up-full li(4)
			$(".four-up-full li").eq(3).css( {
										"display": "block",
											"float": "left",
											"margin-left": "76.93073%",
											"margin-right": "-100%",
											"width": "23.01718%"
										});

			// Desktop .four-up.l-content-full-width li (2n)
			$(".four-up.l-content-full-width li").eq(1).css( {
													"display": "block",
														"float": "left",
														"margin-left": "25.89636%",
														"margin-right": "-100%",
														"width": "23.01718%"
													});

			// Desktop  .four-up#container li (2n)
			$(".four-up#container li").eq(1).css( {
											"display": "block",
												"float": "left",
												"margin-left": "25.89636%",
												"margin-right": "-100%",
												"width": "23.01718%"
											});

			// Desktop .four-up.l-content-full-width li (3n)
			$(".four-up.l-content-full-width li").eq(2).css( {
																			"display": "block",
																			"float": "left",
																			"margin-left": "51.41355%",
																			"margin-right": "-100%",
																			"width": "23.01718%"
			});

			// Desktop  .four-up#container li (3n)
			$(".four-up#container li").eq(2).css( {
																			"display": "block",
																			"float": "left",
																			"margin-left": "51.41355%",
																			"margin-right": "-100%",
																			"width": "23.01718%"
			});

			// Desktop .four-up.l-content-full-width li (4n)
			$(".four-up.l-content-full-width li").eq(3).css( {
																			"display": "block",
																			"float": "left",
																			"margin-left": "76.93073%",
																			"margin-right": "-100%",
																			"width": "23.01718%"
			});

			// Desktop  .four-up#container li (4n)
			$(".four-up#container li").eq(3).css( {
																			"display": "block",
																			"float": "left",
																			"margin-left": "76.93073%",
																			"margin-right": "-100%",
																			"width": "23.01718%"
			});

			// Desktop - Research Profiles link list
			$('.link-list').each(function(i) {
					$(this).children('li:nth-child(3n)').next().css('clear','left');
			});

			// Lightbox galleries
			$(".__gallery.three-up").each(function(i) {
						$(this).children('li:nth-child(3n)').css('margin-right','0');
			});

			$(".__gallery.four-up").each(function(i) {
					$(this).children('li:nth-child(4n)').css('margin-right','0');
			});

			// CSM feature Wall
			$(".__feature-wall li").eq(2).css( {
																				"width": "50%",
																				"float": "left"
																				 });
			$(".__feature-wall li").eq(5).css( {
																				"width": "50%",
																				"float": "left"
																				 });

			// Lists
			$(".lists .list").eq(1).css( { "margin-right": "0" });
			$(".lists .list").eq(3).css( { "margin-right": "0" });
			$(".lists .list").eq(5).css( { "margin-right": "0" });

			// highlight block 2up
			$(".highlight-block-2-up li").eq(1).css( { "margin-right": "0" });

			// highlight homepage block 2up
			$(".highlight-homepage-block-2-up li").eq(1).css( {
																			"width": "48.55966%",
																			"clear": "none",
																			"float": "left",
																			"margin-left": "0",
																			"margin-right": "0"
																												});

			// highlight block 3up
			$(".highlight-block-3-up li").eq(2).css( { "margin-right": "0" });

			// highlight-box-2
			$(".highlight-box-2 li").eq(1).css( { "margin-right": "0" });

			// highlight-box-3
			$(".highlight-box-3 li").eq(2).css( { "margin-right": "0" });
			$(".highlight-box-3 li").eq(5).css( { "margin-right": "0" });

			//.image-block-2-up
			$(".image-block-2-up li").eq(1).css( { "margin-right": "0" });
			$(".image-block-2-up .within-content li").eq(1).css( { "margin-right": "0" });

			// article-listing-main-article-left
			$(".article-listing-main-article-left ul").eq(1).css( { "margin-right": "0" });

			// College Footer icons
			$(".footer-block .icons li").eq(2).css( { "margin-right": "0" });

			// two-column-text
			$(".two-column-text li").filter(":odd").css( { "margin-right": "0" });

		} //end isDeskView

	}); // end documentReady

})( jQuery );





// (function( $ ){

//   $(document).ready(function($){

//     var isMob = $("html").hasClass("mobile");
//     var isTab = $("html").hasClass("tablet");
//     var isDesk = $("html").hasClass("desktop");

//     // *------------------------------------------*\
//     //     Styles applied to all screen widths
//     // \*-----------------------------------------*/

//     // jquery filter(:even) is zero based, so this will select odd rows of the table
//     $( "table tr").filter(":even").css({"background-color": "#e9e9e9" });
//     $( ".accordion-list .st-content table tr").filter(":odd").css({"background-color": "white" });

//     // filtrify styles .csm ul.ft-menu > li.ft-field
//     $( ".csm ul.ft-menu > li.ft-field").eq(0).css( { "margin-bottom": "24px" });
//     // Store CSS classes in Array for matching later
//     var Class;

//       Class =
//                 [ ".two-up",
//                   ".two-up-full",
//                   ".two-up.l-content",
//                   ".two-up.l-content-full-width",
//                   ".two-up#container",
//                   ".two-up.l-content-half-width ",
//                   ".three-up.l-content-full-width",
//                   ".three-up#container",
//                   ".four-up-full",
//                   ".four-up.l-content-full-width",
//                   ".four-up",
//                   ".four-up#container",
//                   ".four-up.l-content-full-width",
//                   ".four-up#container",
//                   ".lists",
//                   ".link-list",
//                   ".__gallery.three-up",
//                   ".__gallery.four-up",
//                   ".__feature-wall",
//                   ".article-listing-main-article-left",
//                   ".highlight-block-2-up",
//                   ".highlight-block-3-up",
//                   ".highlight-homepage-block-2-up",
//                   ".image-block-2-up",
//                   ".image-block-2-up .within-content",
//                   ".article-listing-main-article-left",
//                   ".footer-block .icons",
//                   ".two-column-text"
//                 ];
// // Store CSS properties in JSON objects for quicker access
// var styles =
// {
//       "global": {
//         "display": "block",
//         "float": "left",
//         "margin-right": "-100%"
//       },
//       "style_1": {
//         "margin-left": "52.71783%",
//         "width": "47.28217%"
//       },
//       "clear" : {
//         "clear": "left"
//       },
//       "margin" : {
//         "margin-right": 0
//       },
//       "style_2": {
//         "margin-left": "51.41355%",
//         "width": "48.53437%"
//       },
//       "style_3": {
//         "margin-left": "52.57549%",
//         "width": "47.42451%"
//       },
//       "style_4": {
//         "margin-left": "51.68801%",
//         "width": "48.31199%"
//       },
//       "style_5": {
//         "margin-left": "34.45868%",
//         "width": "31.08265%"
//       },
//       "style_6": {
//         "margin-left": "68.91735%",
//         "width": "31.08265%"
//       },
//       "style_7": {
//         "margin-left": "25.89636%",
//         "width": "23.01718%"
//       },
//       "style_8": {
//         "margin-left": "51.41355%",
//         "width": "23.01718%"
//       },
//       "style_9": {
//         "margin-left": "76.93073%",
//         "width": "23.01718%"
//       },
//       "style_10": {
//         "float": "left",
//         "width": "50%"
//       },
//       "style_11": {
//         "width": "48.55966%",
//         "clear": "none",
//         "float": "left",
//         "margin-left": "0",
//         "margin-right": "0"
//       },
//       "style_12": {
//         "width": "47.28217%",
//         "clear": "left",
//         "float": "left",
//         "margin-left": "0",
//         "margin-right": "-100%"
//       }
// };

// // Run check for Desktop instances
// if (isTab) {
//   for (var i = 0; i < Class.length; i++) {
//           if ($(Class[i]).length > 0) {
//           // Each statement
//           $(Class[i]).each(function(i) {
//             switch (Class[i]) {
//               case ".two-up":
//                 var Css = $.extend({}, styles.global, styles.style_1);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".four-up":
//                 var Css = $.extend({}, styles.global, styles.style_1);
//                 var Css_2 = $.extend({}, styles.global, styles.style_12);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                       $(this).children('li').eq(2).css(Css);
//                       $(this).children('li').eq(3).css(Css);
//                       $(this).children('li').filter(":odd").css(styles.margin);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".lists":
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(styles.margin);
//                       $(this).children('li').eq(3).css(styles.margin);
//                       $(this).children('li').eq(5).css(styles.margin);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".article-listing-main-article-left":
//               case ".highlight-block-2-up":
//               case ".highlight-homepage-block-2-up":
//               case ".image-block-2-up":
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).eq(1).css(styles.margin);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//                 default:
//                  console.log("Nothing here");
//                 break;
//               }

//       });
//     };
//   };
// }


// // Run check for Desktop instances
// if (isDesk) {
//   for (var i = 0; i < Class.length; i++) {
//           if ($(Class[i]).length > 0) {
//           // Each statement
//           $(Class[i]).each(function(i) {
//             switch (Class[i]) {
//               case ".two-up-full ul":
//                 var Css = $.extend({}, styles.global, styles.style_2);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".two-up.l-content ul":
//                 var Css = $.extend({}, styles.global, styles.style_3);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".two-up.l-content-full-width ul":
//               case ".two-up#container ul":
//               case ".two-up.l-content-half-width ul":
//                 var Css = $.extend({}, styles.global, styles.style_4);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".three-up.l-content-full-width ul":
//               case ".three-up#container ul":
//                 var Css = $.extend({}, styles.global, styles.style_5);
//                 var Css_2 = $.extend({}, styles.global, styles.style_6);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                       $(this).children('li').eq(2).css(Css_2);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//               case ".four-up-full ul":
//               case ".four-up.l-content-full-width ul":
//               case ".four-up#container ul":
//                 var Css = $.merge(styles.global, styles.style_7);
//                 var Css_2 = $.merge(styles.global, styles.style_8);
//                 var Css_3 = $.merge(styles.global, styles.style_9);
//                 $(Class[i] + " ul").each(function(i) {
//                       $(this).children('li').eq(1).css(Css);
//                       $(this).children('li').eq(2).css(Css_2);
//                       $(this).children('li').eq(3).css(Css_3);
//                 });
//                 console.log("Updated " + Class[i]);
//                 break;
//                 default:
//                  console.log("Nothing here");
//                               break;
//               }

//       });
//     };
//   };
// }
