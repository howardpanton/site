// *--------------------------------------------------------------------------------------------------*\
//  Usebanner: (Grunt-banner plugin)
//
//          Use this plugin to add banner to files
//
// *--------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('usebanner', {
        addBanner: {
            options: {
                position: 'top',
                banner: '/*!Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */\n',
                linebreak: true
            },
            files: {
                src: [ '.tmp/assets/js/script.min.js', '.tmp/assets/js/script.js' ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-banner');
};

