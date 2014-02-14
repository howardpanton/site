// *---------------------------------------------------------------*\
//  open :  Open file in Chrome Browser
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    // var path_to_open = 'http://localhost:9000'; // default path to open in grunt server

    // get config.json 
    var json = grunt.file.readJSON('grunt/config/config.json');
    // read baseURL
    var path_to_open = json.lastEditedURL;

    grunt.log.writeln(path_to_open);

    if (path_to_open.length < 1) { path_to_open = "http://localhost:9000/";}

    grunt.config('open', {

        root: {
            // path: 'http://localhost:9000<%= config.pathToBuiltFile %>'
            path: path_to_open
        }

    });



    grunt.loadNpmTasks('grunt-open');

};

