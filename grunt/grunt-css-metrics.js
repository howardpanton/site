// *---------------------------------------------------------------*\
//  cssmetrics:  (grunt-cssmetrics plugin)
//  Run a report on all of rthe CSS files
//
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('cssmetrics', {
        dist: {
            src: ['.tmp/assets/css/*.css']
        }
    });
    grunt.loadNpmTasks('grunt-css-metrics');
};
