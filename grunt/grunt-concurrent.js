// *--------------------------------------------------------------------------------*\
//  concurrent: This allows tasks to at the same time.
//  We use this to do compass watch and jekyll watch at the same time
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('concurrent', {
        options: {
          logConcurrentOutput: true
        },
        server: [
                'jade',
                'copy:css'
        ]
    });
    grunt.loadNpmTasks('grunt-concurrent');
};

