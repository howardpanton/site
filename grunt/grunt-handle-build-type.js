// *--------------------------------------------------------------------------------*\
//         ==  handle_build_type task ==
//
//         run buildlocal, buildlive, or buildstaging tasks based on selection from user
//
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {
    grunt.registerTask('handle_build_type', 'runs build task based on the option user selects', function() {

        var deployTo = grunt.config('deployTo');
        var buildFileType = grunt.config('buildFileType');

        if (deployTo === "staging") {
            grunt.option("AWS_id", grunt.config.get('AWS_staging_id'));
        }
        if (deployTo === "live") {
            grunt.option("AWS_id",  grunt.config.get('AWS_live_id'));
        }


        grunt.log.writeln("Setting up AWS path to: " + grunt.option("AWS_id"));

        // build files first

        switch (buildFileType) {

            case 'css-only':
                grunt.task.run('compilecss');
            break;

            case 'js-only':
                grunt.task.run('compilejs');
            break;

            case 'js-and-css':
                grunt.task.run(['compilecss', 'compilejs']);
            break;

            default:
            break;

        }

        // then deploy to selected destination
        switch (deployTo) {

            case 'staging':
                grunt.log.writeln('Running build staging....');
                grunt.task.run('buildstaging');
            break;

            case 'live':
                grunt.log.writeln('Running build live....');

                //grunt.task.run('buildlive');

            break;

            default:
            break;

        }

    });

};







