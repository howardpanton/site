/*
		-------------------------------------------------------------
				shortCourseFilters()

				filtrify and jPages set up for short courses section

		-------------------------------------------------------------
*/

function shortCourseFilters() {

		if ($('#container').length > 0) {
				$.when(
					$.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/filtrify.min.js' ),
					$.getScript( 'http://d27lwoqz7s24cy.cloudfront.net/assets/js/jPages.min.js' ),
					$.Deferred(function( deferred ){
							$( deferred.resolve );
					})
				).done(function(){
					$(function() {

					var container = $("#container"),
							pagination = $("#pagination");

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

					$.filtrify("container", "placeHolder", {
							block : "data-original",
							callback : function() {
									destroyPagination();
									setPagination();
							}
					});
				});
				});

				if(!$("html").hasClass("desktop")) {
					$("#placeHolder").prependTo(".content");
				}
		}

}
