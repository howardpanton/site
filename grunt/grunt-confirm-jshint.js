// *--------------------------------------------------------------------------------*\
//         == confirm_js_hint task ==
//
//         run JSlint on javascript (script.js) if user selects "yes"
//
// *--------------------------------------------------------------------------------*/
 module.exports = function(grunt) {
    grunt.registerTask('confirm_js_hint', 'Lint javascript code if user selects YES from the prompt task', function() {

        var lintconfirmed = grunt.config('lintJS');

        if (lintconfirmed) {
            grunt.task.run(['jshint']);
        }

    });
};