# temporary scripts to test content grouping logic for GTM



# see GTM for updated version of the code below

# metas = document.getElementsByTagName("meta")
# i = 0
# while i < metas.length
#   if (metas[i].getAttribute("name") is "page_type") and (metas[i].getAttribute("content") is "course_page")
#     console.log "you are viewing a " + metas[i].getAttribute("content")

#     # find the course-level
#     c = 0
#     while c < metas.length
#       console.log "the course level is: " + metas[c].getAttribute("content")  if metas[c].getAttribute("name") is "level"
#       c++
#   i++




# @js_indexOf = (array, item) ->
#   i = 0

#   while i < array.length
#     return i  if array[i] is item
#     i++
#   -1



# # temporary scripts to test content grouping logic for GTM

# curr_pathname = location.pathname

# pathArray = curr_pathname.split("/")

# found_course = false;

# last_url_folder = pathArray[pathArray.length - 2]

# course_type_URLs = [ "undergraduate",
# 										 "postgraduate",
# 										 "further-education",
# 										 "foundation-diploma-art-design",
# 										 "foundation",
# 										 "short-courses",
# 										 "integrated-masters",
# 										 "orientation-courses",
# 										 "summer-study-abroad",
# 										 "study-abroad"
# 										]


# # If current page is inside /courses/ folder and /courses/ is not the last part of the url
# if ( ( js_indexOf(pathArray, "courses") isnt -1 ) and last_url_folder isnt "courses")

# 	page_title_elem = document.getElementsByTagName("title")[0].innerHTML

# 	page_title_elem = page_title_elem.split("-")

# 	course_title = page_title_elem[0]

# 	college = page_title_elem[1]

# 	for _course_url in course_type_URLs
# 		if ( ( js_indexOf(pathArray, _course_url) isnt -1 ) and (last_url_folder isnt _course_url) )

# 			found_course = true
# 			console.log "you are viewing a " + _course_url + " page: " + course_title + " for " + college
# 			return _course_url

# 	# foundation-diploma-art-design course doesn't follow the same url structure as other courses, so handle differently
# 	if (last_url_folder is "foundation-diploma-art-design")
# 		found_course = true
# 		_course_url = "foundation"
# 		console.log "you are viewing a foundation course page: " + course_title + " for " + college


# 	if found_course
# 		console.log "This is a course page"
# 		return _course_url


