// this script handles the default UAL dropdown lists


// this function takes an element name as a parameter 'el' and 
// toggles the .active class on that element when it is clicked.
// It's used to show or hide the drop down lists. 
// -- example syntax to create a new dropdown class: dd = new DropDown( $('#dd') );  --
function DropDown(el) {
				this.dd = el;
				this.initEvents();
			}
			DropDown.prototype = {
				initEvents : function() {
					var obj = this;

					obj.dd.on('click', function(event){
						$(this).toggleClass('active');
						event.stopPropagation();
					});	
				}
			}


