/**
* 
Takes anchors with an href to a detail element and toggles the detail's visibility.
* For styling hooks, expandable also adds some css classes:
*	.expandable to the link
*	.expandable_details to the target element
*	.expanded to the target element when it's expanded.
* 
* 
* @example
* // add a target element id to the link's href.
* <a class="expandable" href="#my_target_element">see more</a>

* // add an associating id to the target element
* <p id="my_target_element">more content...</p>
* 
* usage:
*
* $('a.expandable').expandable(); - expand/collapse the link being clicked
* or
* $('a.expandable').expandable(true); - collapse other $('a.expandable') not being clicked
*
* NOTE: do not call $(some css path).expandable(true) more than once on a page
*
* IE 7 ajax: $($trigger.attr('href')) will not return the DOM element correctly.  needs to get the substring after the '#' of $trigger.attr('href') to make it work.
*
* More Documentation here: http://web5.me/jquery/plugins/expandable/expandable.documentation.html
*/

(function ($) {
    'use strict';

	$.fn.expandable = function (collapse_others, callback) {
		var expandable_items = this, class_expanded = 'expanded', class_expandable = 'expandable', class_expandable_details = 'expandable_details';
		return this.each(function () {
			var $trigger = $(this).addClass(class_expandable),
				http_str = $trigger.attr('href'), hash_str = http_str.substring(http_str.indexOf('#')), 
				$details = $(hash_str).addClass(class_expandable_details).hide();

			$trigger.bind('click', function (e) {

				var this_item = this;

				$details.slideToggle('fast', function () {
					var is_visible = $(this).is(':visible');
					$(this).toggleClass(class_expanded, is_visible);
					$(this_item).toggleClass(class_expanded, is_visible);
					if (typeof callback === 'function') callback()
				});

				if (collapse_others) {
					expandable_items.each(function() {
						var detail_href = $(this).attr('href'),
						detail_item = detail_href.substring(detail_href.indexOf('#'));
						if ( this_item !== this ) {
							$(this).removeClass(class_expanded);
							$(detail_item).removeClass(class_expanded);
							$(detail_item).slideUp('fast');
						}
					});
				}

				e.preventDefault();
			});
		});
	};
}(jQuery));

