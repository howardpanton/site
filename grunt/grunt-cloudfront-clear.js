// *---------------------------------------------------------------*\
//  Invalidate cloudfront:  (clear cache on ual-live bucket)
//                      - this runs at the end of the buildlive task
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('cloudfront_clear', {

        staging: {
                resourcePaths: ["/assets/**/*.*", "/assets/js/**/*.js", "/assets/js/*.js", "/assets/css/*.css" ],
                secret_key: "<%= aws.AWSSecretKey %>",
                access_key: "<%= aws.AWSAccessKeyId %>",
                dist: "<%= aws.AWSStaging %>"
        },

        live: {
                resourcePaths: ["/assets/**/*.*", "/assets/js/**/*.js", "/assets/js/*.js" ],
                secret_key: "<%= aws.AWSSecretKey %>",
                access_key: "<%= aws.AWSAccessKeyId %>",
                dist: "<%= aws.AWSLive %>"
        }


    });
    grunt.log.writeln(grunt.config.get('AWSdist'));

    grunt.loadNpmTasks('grunt-cloudfront-clear');
};
