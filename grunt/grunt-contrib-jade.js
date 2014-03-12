// *---------------------------------------------------------------*\
//  Jade:  (grunt-contrib-jade plugin)
//            This task will output jade templates to the build folder
//
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    function lastModified(minutes) {
      return function(filepath) {
        var filemod = (require('fs').statSync(filepath)).mtime;
        var timeago = (new Date()).setDate((new Date()).getMinutes() - minutes);
        return (filemod > timeago);
      }
    }

    grunt.config('jade', {
        debug: {

            files: [{
                expand: true,
                cwd: 'source',
                src: [ '**/*.jade', '!**/_*.jade', '!blog/**/*.jade' ],
                // filter based on whether it's newer than our repo creation time
                filter: lastModified(1 * 45), // one day ago
                dest: 'build',
                ext: '.html'
            }],
            options: {
                pretty: true,
                data: {
                    debug: true,
                    timestamp: "<%= new Date().getTime() %>"
                },
                bare: true,
                spawn: false
            }

        }
    });


    // on watch events configure jade:debug to only run on changed file
    // grunt.event.on('watch', function(action, filepath) {
    //   grunt.config('jade.debug.src', filepath);
    // });

    grunt.loadNpmTasks('grunt-contrib-jade');
};

