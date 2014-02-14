// *--------------------------------------------------------------------------------*\
//         ==  BUILD LIVE  ==
//
//          build LIVE site and push assets to LIVE bucket in AWS
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {

    grunt.registerTask('buildlive', [ 'prompt:confirm_live_build', 'confirm_live_build'] );

    // // Do live build
    // grunt.registerTask('go_build_live', [
    //                                         'concat:dist',
    //                                         'newer:exec:compress',
    //                                         'usebanner',
    //                                         'compress:main',
    //                                         'exec:buildlive',
    //                                         'cssmin:minify',
    //                                         'compress:css',
    //                                         'compress:js',
    //                                         'copy:minified_assets',
    //                                         'clean:build',
    //                                         'newer:aws_s3:live',
    //                                         'cloudfront_clear',
    //                                         'sass:local',
    //                                   ]);
};







