// *---------------------------------------------------------------*\
//  Jade:  (grunt-contrib-jade plugin)
//            This task will output jade templates to the build folder
//
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('jade', {
        debug: {

            files: [{
                expand: true,
                cwd: 'source',
                src: [ '**/*.jade', '!**/_*.jade', '!blog/**/*.jade' ],
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
    grunt.event.on('watch', function(action, filepath) {
      grunt.config('jade.debug.src', filepath);
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
};

