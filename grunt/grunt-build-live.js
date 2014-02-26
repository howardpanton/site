// *--------------------------------------------------------------------------------*\
//         ==  BUILD LIVE  ==
//
//          build LIVE site and push assets to LIVE bucket in AWS
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {

    grunt.registerTask('buildlive', [ 'prompt:confirm_live_build', 'confirm_live_build'] );

    // Do live build
    grunt.registerTask('go_build_live', [
                                            'replace:spritePath',
                                            'gzip_assets',
                                            'aws_s3:live',
                                            'cloudfront_clear:live'
                                      ]);
};







