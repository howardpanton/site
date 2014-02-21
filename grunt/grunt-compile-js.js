// *--------------------------------------------------------------------------------*\
//         ==  compilejs task ==
//
//         To run type: 'grunt compilejs'
//
// *--------------------------------------------------------------------------------*/

// compile out script.js and script-min.js file from libraries and coffeescript code modules
module.exports = function(grunt) {

    grunt.registerTask( 'compilejs', [
                        'coffee',
                        'concat:jslibs',
                        'concat:libs_and_built_scriptjs',
                        'prompt:checkJS',
                        'confirm_js_hint',
                        'exec:minifyjs',
                        'concat:hammerjs',
                        'usebanner',
                        'copy:js'
                        ]);
};



