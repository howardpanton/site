// *--------------------------------------------------------------------------------*\
//         == confirm_staging_build task ==
//
//         Confirm STAGING build files to the STAGING AWS BUCKET if user selects "yes"
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.registerTask('confirm_staging_build', 'runs go_build_staging task if user selected YES from the prompt task', function() {

        var buildconfirmed = grunt.config('optionselected');  // get boolean value user selected from prompt:confirm_staging_build task
        if (buildconfirmed) {
             grunt.log.writeln('you selected YES... \n Uploading to staging bucket...');
             grunt.task.run(['go_build_staging']);
        }
        else {
           grunt.log.writeln('You selected NO..... Exiting without uploading to staging.');
        }

    });
};







