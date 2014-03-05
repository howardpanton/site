// *---------------------------------------------------------------*\
//  Invalidate cloudfront:  (clear cache on ual-live bucket)
//                      - this runs at the end of the buildlive task
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('cloudfront_clear', {
        invalidateIndex: {
                resourcePaths: [
                                "/assets/js/script.js",
                                "/assets/js/script.min.js",
                                "/assets/css/screen.css",
                                "/assets/css/screen.min.css",
                                "/assets/img/sprite/ui-icons-s4101694952.png",
                                "/assets/img/sprite/ui-icons-2x-s5cedf63ff4.png"
                                ],
                secret_key: "<%= aws.AWSSecretKey %>",
                access_key: "<%= aws.AWSAccessKeyId %>",
                dist: "<%= grunt.option(\"AWS_id\") %>"
        }

    });

    grunt.loadNpmTasks('grunt-cloudfront-clear');
};
