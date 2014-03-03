// *---------------------------------------------------------------*\
//  watch : a grunt plugin to watch files for changes and
//          then run a task after a change is detected
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('watch', {
        livereload: {
            options: {
                livereload: 30000
            },
            files: [
                '.tmp/scripts/*.js',
                'build/**/*.html',
                'assets/styles/{,*/}*.css',
                'assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        },
        compass: {
            files: ['source/assets/sass/**/*.scss'],
            tasks: ['compass:server']
        },
        js: {
            files: ['source/assets/coffeescript/**/*.coffee'],
            tasks: ['compilejs']
        },
        jade: {
            files: ['source/**/*.jade', '!source/**/_*.jade'],
            tasks: ['jade']
        },
        copy: {
            files: ['.tmp/assets/css/**/*.css'],
            tasks: ['copy:css']
        },
  });
    grunt.loadNpmTasks('grunt-contrib-watch');
};

