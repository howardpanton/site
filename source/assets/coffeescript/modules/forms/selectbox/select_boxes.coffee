###
    -------------------------------------------------------------
        enableSelectBoxes()

        UAL formatting for select boxes
    -------------------------------------------------------------
###


if $(".select-box").length > 0

    $(".js-select-box").each ->

        _start_val = $(this).children("ul.js-select-box-list").children("li.select-box-option:first").children("a").html()

        $(this).children("div").children("h3.selected").html _start_val

        $("input.js-select-box-value").attr "value", $(this).children("ul.js-select-box-list").children("li.select-box-option:first").attr("data-sb-value")

        $(this).children("div").children("h3.selected,div.select-box-arrow").click (event) ->

            event.preventDefault()

            if $(this).parent().parent().children("ul.js-select-box-list").css("display") is "none"
                $(this).parent().parent().children("ul.js-select-box-list").css "display", "block"
            else
                $(this).parent().parent().children("ul.js-select-box-list").css "display", "none"

        $(this).find("li.select-box-option").click (event) ->
            event.preventDefault()
            $(this).parent().css "display", "none"
            $("input.js-select-box-value").attr "value", $(this).attr("data-sb-value")
            $(this).parent().parent().children("div").children("h3.selected").html $(this).children("a")
            # $(this).parent().parent().scrollToMe()











# enableSelectBoxes = ->

#     $(".js-select-box").each ->

#         _start_val = $(this).children("ul.js-select-box-list").children("li.select-box-option:first").children("a").html()

#         $(this).children("div").children("h3.selected").html _start_val

#         $("input.js-select-box-value").attr "value", $(this).children("ul.js-select-box-list").children("li.select-box-option:first").attr("data-sb-value")

#         $(this).children("div").children("h3.selected,div.select-box-arrow").click (event) ->

#             event.preventDefault()

#             if $(this).parent().parent().children("ul.js-select-box-list").css("display") is "none"
#                 $(this).parent().parent().children("ul.js-select-box-list").css "display", "block"
#             else
#                 $(this).parent().parent().children("ul.js-select-box-list").css "display", "none"

#         $(this).find("li.select-box-option").click (event) ->
#             event.preventDefault()
#             $(this).parent().css "display", "none"
#             $("input.js-select-box-value").attr "value", $(this).attr("data-sb-value")
#             $(this).parent().parent().children("div").children("h3.selected").html $(this).children("a")
#             # $(this).parent().parent().scrollToMe()


# # Check if there are any selectBoxes on the page,
# # Run enableSelectBoxes function if so
# $(document).ready ->
#     if $(".select-box").length > 0
#         enableSelectBoxes




