#
#    -------------------------------------------------------------
#        getLCFJobsFeed()
#
#        Display feed of jobs from my.lcffirstmove.co.uk
#    -------------------------------------------------------------
#
getLCFJobsFeed = ->

  $.getJSON "http://my.lcffirstmove.co.uk/jobs.json?callback=?", (data) ->
    output = "<div class=\"table-container padded\"><table class=\"data-table\"><thead><tr><th>Title</th><th>Location</th><th>Salary</th><th>Closing date</th></tr></thead><tbody>"
    count = 10
    months = [
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
    $.each data, (i, item) ->
        if i < count
            job = data[i]
        
            # salaries
            salary = ""
            old_salary = job.salary
            if old_salary is null
              salary = job.salary_range.description
            else
              salary = old_salary
            
            # date
            job_date = job.closes_on
            dt = new Date(job_date)
            output += "<tr>" + "<td><a href=\"http://my.lcffirstmove.co.uk/jobs/" + job.id + "\">" + job.job_title + "</a></td>" + "<td>" + job.region + "</td>" + "<td>" + salary + "</td>" + "<td>" + dt.getDate() + " " + months[dt.getMonth()] + "</td>" + "</tr>"
        return

    
    #console.log(data[i]);
    output += "</tbody></table></div>"
    $("#lcf-jobs").html output
    return

$(document).ready ->
    # detect jobs-list component
    if $("#lcf-jobs").length > 0
      getLCFJobsFeed()
