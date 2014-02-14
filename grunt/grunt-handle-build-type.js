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

    grunt.log.writeln('deploy varible is set to: ' +  deployTo);

    function deployFiles() {
        switch (deployTo) {
          // case 'local':
          //   grunt.log.writeln('Building files for local testing in GitHub....');
          //   grunt.task.run(['server']);
          //   break;
          case 'deployToStaging':
            grunt.log.writeln('Running buildstaging....');
            grunt.task.run('buildstaging');
            break;
          case 'deployToLive':
            grunt.log.writeln('Running build live....');
            //grunt.task.run('buildlive');
            break;
          default:
            break;
        }
    }


    switch (buildFileType) {
        case 'css-only':
            grunt.task.run('compilecss');
            deployFiles();
        break;
        case 'js-only':
            grunt.task.run('compilejs');
            deployFiles();
        break;
        case 'js-and-css':
            grunt.task.run(['compilecss', 'compilejs']);
            deployFiles();
        break;

    }






    });

};







