###
		-------------------------------------------------------------
			functions to use when working with JSON data
		-------------------------------------------------------------
###


#### example getObjects(json, name, "wimbledon")    this will return any matches from json for an name of wimbledon

###

	found = getObjects(js, 'name' , 'Central Saint Martins')
	if (found.length > 0)
	  console.log(found[0].id)

###

# return an array of objects according to key, value, or key and value matching
@getObjects = (obj, key, val) ->
  objects = []
  for i of obj
    continue  unless obj.hasOwnProperty(i)
    if typeof obj[i] is "object"
      objects = objects.concat(getObjects(obj[i], key, val))

    #if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
    else if i is key and obj[i] is val or i is key and val is "" #
      objects.push obj

    #only add if the object is not already in the array
    else objects.push obj  if objects.lastIndexOf(obj) is -1  if obj[i] is val and key is ""
  objects
