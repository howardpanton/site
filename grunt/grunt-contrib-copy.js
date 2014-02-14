// *--------------------------------------------------------------------------------------------------*\
//  Copy: (grunt-copy plugin)  -- Copy /style-guide to /download folder
// *--------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('copy', {

        css: {
            files: [
                // {expand: true, flatten: true, src:  dest: 'build/assets/css/', filter: 'isFile'},
                {expand: true, flatten: true, src: ['source/assets/css/print.css', '.tmp/assets/css/**/*.css'], dest: 'build/assets/css/', filter: 'isFile'},
            ]
        },
        js: {
            files: [
                {expand: true, flatten: true, src: ['.tmp/assets/js/script.js', '.tmp/assets/js/script.min.js'], dest: 'build/assets/js/', filter: 'isFile'},

            ]
        },

    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};

