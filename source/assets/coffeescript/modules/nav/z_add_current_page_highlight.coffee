#
#    -------------------------------------------------------------
#        addCurrentPageHighlight()
#
#        This function will add a class of .currentPage to any links
#        to the current page - used for CSS highlighting in main nav
#
#        It will also add a class of .active-parent for any top level site
#        section navigation links that are parents of the current page
#
#        Example:
#        if someone was viewing this page:
#
#        http://www.arts.ac.uk/research/research-staff/
#
#        In the main navigation the top level "research" link in the megamenu
#        would have a class of .active-parent added to it and the links on the page
#        which point to the "research-staff" page would have .current-page
#        class added to them
#
#    -------------------------------------------------------------
#


@addCurrentPageHighlight = ->

	curr_pathname = location.pathname
	pathArray = curr_pathname.split("/")

	_site_section = pathArray[1]

	# add current page highlighting to links on pages apart from ual homepage
	if (!$('body').is('.ual.home'))
		$("a[href$='" + curr_pathname + "']").addClass "current-page"

		addActiveParentClass(_site_section)
	return true


@addActiveParentClass = (_top_level_section) ->

	_college_urls = ["csm","fashion","lcc","camberwell","chelsea","wimbledon"]

	# add active parent class to parent site section if current page in the global nav
	$('#global-nav a.current-page').each (index, element) =>
		_this = $(element)
		if (!_this.hasClass('megamenu_drop'))
			_this.closest('.menu-btn').addClass('active-parent')

	# active parent highlighting for pages further down the tree than the megamenu
	_site_sections = $('#global-nav li.menu-btn')

	_site_sections.each (index, element) =>
		_this = $(element)

		# highlighting for UAL pages
		if (_this.attr('data-site-section') is _top_level_section )
			_this.addClass 'active-parent'

	# highlighting for college sections tab
	if ( ( $.inArray( _top_level_section, _college_urls ) isnt -1 ))
		$('#global-nav li.menu-btn[data-site-section="colleges"]').addClass('active-parent')

	return true


