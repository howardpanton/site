// *---------------------------------------------------------------*\
//  connect : grunt-contrib-connect plugin
//            Starts a grunt server to preview files in the browser
// *---------------------------------------------------------------*/

var LIVERELOAD_PORT = 30000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    grunt.config('connect', {
        options: {
            port: 9000,
            // change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },

        // the livereload task puts script at the bottom of each file to handle the livereloading in the browser
        // it uses the lrSnippet settings which we set at the top of this file.
        livereload: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, 'build')
                        ];
                    }
                }
            },

  });
    grunt.loadNpmTasks('grunt-contrib-connect');
};

