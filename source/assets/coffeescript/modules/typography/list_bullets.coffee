#
#    -------------------------------------------------------------
#        Remove standard list bullets for PDF download lists
#    -------------------------------------------------------------
#

    # add class to remove standard list bullets for PDF download lists
    $("aside li a[href$=\".pdf\"], .l-content li a[href$=\".pdf\"]").parent().addClass "no-bullet"

    # add class to remove standard list bullets for DOC download lists
    $("aside li a[href$=\".doc\"], .l-content li a[href$=\".doc\"]").parent().addClass "no-bullet"

