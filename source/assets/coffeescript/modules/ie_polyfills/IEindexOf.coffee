###
    -------------------------------------------------------------
        add indexOf support for IE8 compatibility

          Used to reformat dates within feeds
    -------------------------------------------------------------
###
unless Array::indexOf
  Array::indexOf = (elt) -> #, from
    len = +@length or 0
    from = Number(arguments_[1]) or 0
    from = (if (from < 0) then Math.ceil(from) else Math.floor(from))
    from += len  if from < 0
    while from < len
      return from  if from of this and this[from] is elt
      from++
    -1
