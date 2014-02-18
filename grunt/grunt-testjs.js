// *--------------------------------------------------------------------------------*\
//         ==  testjs Task ==
//
//         Run JSlint on built out script.js 
//         This should be run after "grunt buildjs" task
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.registerTask('testjs', [ 'prompt:checkJS',  'confirm_js_hint']);
};