###
		-------------------------------------------------------------
				enableSelectBoxes()

				UAL formatting for select boxes
		-------------------------------------------------------------
###

if $(".js-select-box").length > 0

		$(".js-select-box").each ->

				# cache selectors
				js_select_box = $(this)
				js_select_list = js_select_box.find("ul")
				js_select_first_item = js_select_list.find("li").first()
				js_select_first_item_val = js_select_first_item.find("a").html()

				# set the title to the _start_val
				js_select_box.find(".select-box-title").html js_select_first_item_val

				# set the value of the input to the data-sb-value attribute
				$(".js-select-box-value").attr "value", js_select_box.find(".select-box-option:first").attr("data-sb-value")

				# toggle the list if you click the title or arrow
				js_select_box.find(".select-box-title,.select-box-arrow").click (e) ->

						e.preventDefault()
						js_select_list.toggle()

				# when clicking an option in the list, set the input value and the title text
				js_select_list.find("li").click (e) ->

						e.preventDefault()
						js_select_list.hide()
						$(".js-select-box-value").attr "value", $(this).attr("data-sb-value")
						js_select_box.find(".select-box-title").html $(this).find("a").html()
