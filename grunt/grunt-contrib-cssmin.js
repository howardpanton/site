// *---------------------------------------------------------------*\
//  cssmin : minify css & and add a banner at the top of the file to show when last updated
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('cssmin', {
        minify: {
            expand: true,
            cwd: '.tmp/assets/css/',
            src: ['*.css', '!*.min.css'],
            dest: '.tmp/assets/css/',
            ext: '.min.css',
            options: {
                banner: '/* Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */',
                // report: 'gzip'
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};


