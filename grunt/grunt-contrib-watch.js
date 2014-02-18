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
            tasks: ['compass:server'],
            options: { livereload: true, spawn: false }
        },
        js: {
            files: ['source/assets/coffeescript/**/*.coffee'],
            tasks: ['coffee', 'copy:js'],
            options: { livereload: true, spawn: false }
        },
        jade: {
            files: ['source/**/*.jade', '!source/**/_*.jade'],
            tasks: ['jade'],
            options: { livereload: true, spawn: false }
        },
        copy: {
            files: ['.tmp/assets/css/**/*.css'],
            tasks: ['copy:css'],
            options: { livereload: true, spawn: false }
        },
  });
    grunt.loadNpmTasks('grunt-contrib-watch');
};

