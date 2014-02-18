// *--------------------------------------------------------------------------------*\
//         == confirm_gruntserver task ==
//
//         run grunt server if user selects "yes"
//
// *--------------------------------------------------------------------------------*/
 module.exports = function(grunt) {
    grunt.registerTask('confirm_gruntserver', 'Run grunt server task if user selects YES from the prompt task', function() {

        var gsConfirmed = grunt.config('gruntServer');

        if (gsConfirmed) {
            grunt.task.run(['server']);
        }

    });
};