// This javascript will fetch the latest showtime images from UAL colleges.
// and output as either object array or a list of links to images sorted by date.
// 
// 
// #TO DO: cache the results either locally or on the server side, to prevent multiple requests and slow performance
// This should be cleared every 10 minutes
//
//(function() { cache = {}; }).periodical(1000 * 60 * 10); //10 minutes
//our cache object - #TO DO
//var cache = {};

var combo_array = [{}];
var profiles = [];
var profile_data = {};
var collegesToGrab = ['lcf', 'csm', 'lcc'];


//function outputFunction(items) {
//    console.log(items);
//}


function sortShowtimeResultsByDate() {
  window.combo_array.sort(function(a, b){
       var dateA=new Date(a.updated), dateB=new Date(b.updated);
       return dateB-dateA; //sort by date descending
  });    

}


// inject the results of the showtime query into an html element
function injectResultsIntoHTML (targetElement) {

  // set default values if no parameters passed to the function
  if(typeof(targetElement)==='undefined') targetElement = 'body'; // default to body if no HTML element or class name is given

  var newHTML = ''; // variable to store html for slides to be added

  for (var cnt = 1; cnt < window.combo_array.length; cnt++) {
    var cnt_entry = window.combo_array[cnt];


    // TO DO - need to remove fresco data- tags if we decide not to use the fresco lightbox, 
    // or make alternative function that can utilise fresco or just return the images without the data- tags
    if (typeof(cnt_entry) !== undefined && cnt_entry){
      newHTML += "<a href='" + cnt_entry.largeImg + "' rel='group1' data-fresco-group='frescoexample' data-fresco-caption='"+ cnt_entry.fullName +"' title='" + cnt_entry.fullName + "'> <img src='" + cnt_entry.thumb + "' alt='" + cnt_entry.fullName + "'/> </a>";
      //console.log ('** item was uploaded on: ' + cnt_entry.updated +' ** ');

    } else {
      console.log('We caught an undefined object');
    }
  }
  document.getElementById(targetElement).innerHTML = newHTML;
}
  
/* fetches thumbnails and links to screen size images from showtime, sorted by date.
   the function takes these parameters:
   1. Number of images required from each college (default: 5)
   2. An array of the colleges you want to get results from (default: all) 
   3. The image size you want to appear as the thumbnail link (default: thumb) 
   4. The size of the large image you want the thumbnail to link to (default: screen) 
   5. The id or class of the htmlElement you want the links to be pasted inside (default: 'body')
*/  
function fetchShowtimeGallery (numOfImgsToGet, colleges, thumbSize, largeImg, htmlElement, callback) {
  var collegeCount = 0;
  var profileCount = 0;
  var the_url = '';

  // set default values if no parameters passed to the function
  if(typeof(numOfImgsToGet)==='undefined') numOfImgsToGet = 5; // default 5 images returned for each college
  if(typeof(colleges)==='undefined') colleges = ['lcf', 'csm', 'lcc', 'wimbledon', 'camberwell', 'chelsea']; // query all colleges by default
  if(colleges == 'all') colleges = ['lcf', 'csm', 'lcc', 'wimbledon', 'camberwell', 'chelsea'];   // if "all" is passed in, set colleges to all colleges
  if(typeof(thumb)==='undefined') thumbSize = "thumb";   // if not defined set default thumbnail img size 
  if(typeof(largeImg)==='undefined') largeImg = "screen"; // get screen size images by default
  if(typeof(htmlElement)==='undefined') htmlElement = "body"; // set paste location to body by default

  $.each (colleges, function(i, college) {
    //console.log('starting college: ' + college);
    the_url = 'http://showtime.arts.ac.uk/' + encodeURIComponent(college) + '.json&limit=' + numOfImgsToGet + '&callback=?';

    $.getJSON( the_url, function(data) {
      
      profiles = data.data.Profiles;   
       
      for (var cntB = 0; cntB < profiles.length; cntB++){
        
        var profile = profiles[cntB];
        var urlToCheck = profile.thumb;
        var thumbUrl = '';
        var largeImgUrl = '';

        // find out what size image to get for the thumbnail
        switch(thumbSize) {
          case 'thumb':
            thumbUrl = urlToCheck;
            break;
          case 'screen':
            thumbUrl = urlToCheck.replace(/gallery.jpg/g,"screen.jpg");
            break;
          case 'ualupload':
            thumbUrl = urlToCheck.replace(/gallery.jpg/g,"ualupload.jpg");
            break;
          case 'original':
            thumbUrl = urlToCheck.replace(/gallery.jpg/g,"ualupload.jpg");
            break;
          default:
            thumbUrl = urlToCheck; // default to thumbnail size image
            console.log('thumbUrl is : ' + thumbUrl);
        }

        // find out what size largeImg to grab
        switch(largeImg) {
        case 'screen':
          largeImgUrl = urlToCheck.replace(/gallery.jpg/g,"screen.jpg");
          break;
        case 'ualupload':
          largeImgUrl = urlToCheck.replace(/gallery.jpg/g,"ualupload.jpg");
          break;
        case 'original':
          largeImgUrl = urlToCheck.replace(/gallery.jpg/g,"ualupload.jpg");
          break;
        default:
          largeImgUrl = urlToCheck.replace(/gallery.jpg/g,"screen.jpg"); // default large image set to 'screen' size
        }
         
        // push item to combo array
        window.combo_array.push( {
          "id": profile.id,
          "fullName": profile.fullName,
          "thumb": thumbUrl,
          "largeImg": largeImgUrl,
          "course": profile.course,
          "updated": profile.updated
        } );
       
        profileCount++;
         
      } 
       // });
      collegeCount++;
      //console.log('college count is: ' + collegeCount);
      
      if (collegeCount == colleges.length) { 
        // sort by date (most recent upload first)
        sortShowtimeResultsByDate();
        // output results to page
        injectResultsIntoHTML (htmlElement);
      }

     }); // end of getJSON

   }); // end of each loop for colleges

} // end fetchShowtimeGallery() function




// Example use of fetchShowtimeGallery:
// fetchShowtimeGallery(3, collegesToGrab, 'thumb', 'screen');






