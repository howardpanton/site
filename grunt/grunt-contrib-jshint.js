// *--------------------------------------------------------------------------------*\
//  jshint: All js file should be tested with Jshint.
//  Build will fail if it doesn't pass jshint
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('jshint', {
    // define the files to lint
    files: ['.tmp/assets/js/script.js' ],
    // configure JSHint (documented at http://www.jshint.com/docs/)
    options: {
    // more options here if you want to override JSHint defaults
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        laxcomma: true,
        "-W116": false,
        globals: {
            jQuery: true
        },
        reporter: require('jshint-stylish')
    }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};

