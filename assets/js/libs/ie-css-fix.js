// Styling fixes for IE 8 
// lack of CSS support nth-child() problem : use jquery .eq() selector instead

// Note: jquery .eq() selector starts from 0
// So .eq(1) would select the second instance of an element on the page


// (function( $ ){
	
// 	$(document).ready(function($){
		
		function checkWindowSize() {
		  var width = $(window).width(),
		  new_class = width > 959 ? 'gDesktop' :
		              width > 599 ? 'gTablet' :
		              width < 600 ? 'gMobile' :
		              width > 1289 ? 'gDesktop' : '';

		  $(document.body).removeClass('gDesktop gTablet gMobile').addClass(new_class);
		}

		checkWindowSize();

		var isMob = $(document.body).hasClass("gMobile");
		var isTab = $(document.body).hasClass("gTablet");
		var isDesk = $(document.body).hasClass("gDesktop");
		
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
			$( ".three-up.l-content-full-width li:eq(1),.three-up.l-content-full-width li:eq(4),.three-up.l-content-full-width li:eq(7),.three-up.l-content-full-width li:eq(10),.three-up.l-content-full-width li:eq(13)")
														.css( {
																	"display": "block",
																	"float": "left",
																	"margin-left": "34.45868%",
																	"margin-right": "-100%",
																	"width": "31.08265%"
																});

			// Desktop - .three-up.l-content-full-width li
			$( ".three-up.l-content-full-width li:eq(2),.three-up.l-content-full-width li:eq(5),.three-up.l-content-full-width li:eq(8),.three-up.l-content-full-width li:eq(11),.three-up.l-content-full-width li:eq(14)")
													.css( {
														"display": "block",
														"float": "left",
														"margin-left": "68.91735%",
														"margin-right": "-100%",
														"width": "31.08265%"
													});

			// Desktop - .three-up#container li		2nd									
			$( ".three-up#container li:eq(1),.three-up#container li:eq(4),.three-up#container li:eq(7),.three-up#container li:eq(10),.three-up#container li:eq(13)")
													.css( {
														"display": "block",
														"float": "left",
														"margin-left": "34.45868%",
														"margin-right": "-100%",
	    											"width": "31.08265%"
													});

			// Desktop - .three-up#container li  3rd
			$( ".three-up#container li:eq(2),.three-up#container li:eq(5),.three-up#container li:eq(8),.three-up#container li:eq(11),.three-up#container li:eq(14)")
										.css( {
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
	
// 	}); // end documentReady

// })( jQuery );



