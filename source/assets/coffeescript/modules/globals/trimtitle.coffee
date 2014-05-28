###
    -------------------------------------------------------------
        trimTitle()

        will format a title (string) to max number of characters, specified

				returns a trimmed title with "..." added to the end
    -------------------------------------------------------------
###

@trimTitle = (title, maxLength) ->
	if title.length > maxLength
		title = title.substring(0,maxLength) + "..."
	else title = title

	return title
