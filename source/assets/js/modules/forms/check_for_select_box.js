/*
    -------------------------------------------------------------
        checkForSelectBox()

        Check if there are any selectBoxes on the page,
        Run script
    -------------------------------------------------------------
*/

function checkForSelectBox() {

  if ($('.select-box').length > 0) {
    enableSelectBoxes();
  }
}
