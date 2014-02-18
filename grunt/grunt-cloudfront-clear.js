// *---------------------------------------------------------------*\
//  Invalidate cloudfront:  (clear cache on ual-live bucket)
//                      - this runs at the end of the buildlive task
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('cloudfront_clear', {
        invalidateIndex: {
            resourcePaths: ["/assets/css/**/*.css", "/assets/js/**/*.js", "/assets/js/*.js" ],
            secret_key: "<%= aws.AWSSecretKey %>",
            access_key: "<%= aws.AWSAccessKeyId %>",
            dist: "<%= aws.AWSLive %>"
        }
    });
    grunt.loadNpmTasks('grunt-cloudfront-clear');
};
