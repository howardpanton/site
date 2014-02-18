// *--------------------------------------------------------------------------------*\
//         ==  gzip_assets task ==
//
//         gizp files before upload to amazon S3
//
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {
    grunt.registerTask('gzip_assets', 'gizps files before uploading to Amazon S3', function() {

    var deployTo = grunt.config('deployTo');
    var buildFileType = grunt.config('buildFileType');

    //only gzip files if destination set for deployment to Amazon s3
    if (deployTo) {

        switch (buildFileType) {

            case 'css-only':
                // gzip css only and copy files into build folder
                grunt.task.run('compress:gzip_css', 'copy:gzipped_css', 'compress:gzip_image_assets', 'copy:gzipped_image_assets:');
            break;

            case 'js-only':
                // gzip js only and copy files into build folder
                grunt.task.run('compress:gzip_js', 'copy:gzipped_js');
            break;

            case 'js-and-css':
               // gzip both css and js. Then copy files into build folder
                grunt.task.run(['compress:gzip_css', 'compress:gzip_js','copy:gzipped_css', 'copy:gzipped_js', 'compress:gzip_image_assets', 'copy:gzipped_image_assets:']);
            break;

            default:
            break;
        }

    }


    




    });

};







