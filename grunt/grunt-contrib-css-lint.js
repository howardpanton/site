// *--------------------------------------------------------------------------------*\
//  csslint: screen.css file should be tested with csslint.
//  Build will fail of it doesn't pass csslint
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('csslint', {
        options: {
            csslintrc: '.csslintrc'
        },
        strict: {
            options: {
                import: 2
            },
            src: ['assets/css/screen.css']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-csslint');
};
