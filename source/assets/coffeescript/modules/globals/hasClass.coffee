###
		-------------------------------------------------------------
			Javascript hasClass function - can use instead of jquery .hasClass

			Example use:

			JS:

			var element = document.getElementById('element');
			if ( hasClass(element, "class_one") ) {
					// Do stuff here
			}

			Coffeescript:

			element = document.getElementById("element")
			if hasClass(element, "class_one")
				console.log "do something here"
				console.log "do something else here"
		-------------------------------------------------------------
###

@hasClass = (el, clss) ->
	el.className and new RegExp("(^|\\s)" + clss + "(\\s|$)").test(el.className)
