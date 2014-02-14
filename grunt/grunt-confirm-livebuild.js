// *--------------------------------------------------------------------------------*\
//         == confirm_live_build task ==
//
//         Confirm live build and run go_build_live task if user selects "yes" 
//
// *--------------------------------------------------------------------------------*/
 module.exports = function(grunt) {
    grunt.registerTask('confirm_live_build', 'Build only runs if user selected YES from the prompt task', function() {

        var buildconfirmed = grunt.config('optionselected');  // get boolean value user selected from prompt:confirm_live_build task
        if (buildconfirmed) {
             grunt.log.writeln('you selected YES... \n Now building and uploading to artslive bucket...');
             grunt.task.run(['go_build_live']);
        }
        else {
           grunt.log.writeln('You selected NO..... Exiting without making changes.');
        }

    });
};
