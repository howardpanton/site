###
    -------------------------------------------------------------
        Format date (crop long date & time into shorter date)
    -------------------------------------------------------------
###

@formatDateUAL = ->
    $(".date").each (i, element) ->
        str = $(this).text()
        if (str.indexOf(",") != -1)
            $(this).text(str.substring(5,16))

$(document).ready ->
    if $(".date").length > 0
        formatDateUAL()



###
    -------------------------------------------------------------
        getMonthName()
        returns the name of month as a string for a number is passed in to the function

        Eg.   getMonthName(4, "short")

        will return the string "Apr"
    -------------------------------------------------------------
###

@getMonthName = (month_number, format = "short") ->

  month_name = ''
  monthsOfYear = []

  shortMonthsInYear = [
    "Jan"
    "Feb"
    "Mar"
    "Apr"
    "May"
    "Jun"
    "Jul"
    "Aug"
    "Sep"
    "Oct"
    "Nov"
    "Dec"
  ]

  longMonthsInYear = [
    "January"
    "February"
    "March"
    "April"
    "May"
    "June"
    "July"
    "August"
    "September"
    "October"
    "November"
    "December"
  ]

  switch format
    when "short"
      monthsOfYear = shortMonthsInYear
    when "long"
      monthsOfYear = longMonthsInYear

  month_num = parseInt(month_number)

  if (month_num > 0) and (month_num < 13)
    #subtract 1 from the month number because month arrays are zero based
    m = month_num - 1
    return monthsOfYear[m]
  else
    return ""

  return month_name
